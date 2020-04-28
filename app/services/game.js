import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import localforage from 'localforage';
import {task} from "ember-concurrency-decorators";
import {timeout} from 'ember-concurrency';
import Confirmer from 'confirmed';

// import MapData from '../phaser/scenes/tiledata/cave1'
// // import MapData from '../phaser/scenes/tiledata/landsea'

// import {Player} from "../objects/agents/player";
import {Transport} from "../objects/agents/transport";
import {Agent} from "../objects/agents/agent";
import { constants } from 'emberquest/services/constants';


export default class GameService extends Service {

  @service modals;
  @service map;
  @service inventory;
  @service cache;
  @service gameManager;
  @service storage;
  @service intl;

  @tracked cameraMainZoom = 1;
  // @tracked playerImgSrc = '/images/agents/tomster-head-classic.png';
  @tracked playerImgSrc = '/images/agents/pirate.png';
  @tracked showHexInfo = false;
  @tracked epmModalContainerClass = '';

  @tracked showInfoHeader = "";
  @tracked showInfoPrompt = "";

  @tracked showInfoCancel = "";
  @tracked showInfoConfirm = "OK";
  @tracked showInfoConfirmer = null;


  @tracked sceneData = [];
  @tracked gameData = undefined;

  constants = constants;

  showInfoDialog(message) {

    this.showInfoPrompt = message;
    new Confirmer(showInfoConfirmer => {
      this.gameManager.pauseGame(true);
      this.showInfoConfirmer = showInfoConfirmer
    })
      .onConfirmed(async () => {
      })
      .onDone(() => {
        this.showInfoConfirmer = null;
        this.gameManager.pauseGame(false);
      });
  }



  async saveSceneData(scene) {
    const mapname = scene.mapname;

    const currentMapData = this.sceneData[mapname] || {};

    let gameData = await this.loadGameData('gameboard');
    if (!gameData) {
      gameData = { 'currentMap': mapname, sceneData: [] };
    } else {
      gameData.currentMap = mapname;
    }

    const transports = [];
    if (scene.transports.children) {
      scene.transports.getChildren().forEach(transport => {
        transports.push({
          'id': transport.id,
          'tile': transport.rexChess.tileXYZ,
          'texture': transport.texture
        })
      });
    }

    Object.assign(currentMapData, {
      'map': mapname,
      'seenTiles': scene.allSeenTiles,
      'transports': transports,
      'boarded':  scene.player.container.boardedTransport ? scene.player.container.boardedTransport.id : 0
    });

    this.sceneData[mapname] = currentMapData;

    let playerAttrs = scene.player.container.data.get('attrs');

    // console.log('scene.player.experience', scene.player.experience)

    // add inventory, mapname to playerAttrs
    Object.assign(playerAttrs, {
      'inventory': scene.player.container.agent.saveGameInventoryAttrs,
      'mapname': mapname,
      'xp': this.storage.encrypt(scene.player.experience)
    });

    Object.assign(gameData, {
      'playerTile': scene.player.container.rexChess.tileXYZ,
      'playerAttrs': playerAttrs,
      sceneData: this.sceneData
    });

    await this.saveGameData('gameboard', gameData);
  }

  async saveGameData(key, value) {
    await localforage.setItem(key, value)
      .then(() => {
      // console.log('done saving', value)
    }).catch((err) => {
      console.error(err);
    });
  }

  async saveCacheFound(geocache) {
    const cachesData = await this.loadGameData('caches') || new Map();

    let cipherObject = this.storage.encrypt(geocache.gccode);
    cachesData.set(geocache.gccode, cipherObject);
    await this.saveGameData('caches', cachesData);
  }

  async initializeCachesAlreadyFound() {
    const cachesData = await this.loadGameData('caches') || new Map();
    if (cachesData) {

      cachesData.forEach((encryptedhash, gccode) => {
        // console.log(`${gccode}: ${encryptedhash}`);
        const decryptedObject = this.storage.decrypt(encryptedhash);
        // make sure the player didn't mess with the data in localforage
        if (decryptedObject === gccode) {
          const geocache = this.cache.findCache(gccode);
          if (geocache) {
            console.log('found chest', geocache);
            geocache.found = true;
          }
        }
      });
    }
  }

  async loadSceneData(sceneMapName) {
    const gameData = await this.loadGameData('gameboard');
    const currentSceneData = gameData.sceneData[sceneMapName] || {};
    return currentSceneData;
  }

  async loadGameData(key) {
    const result = await localforage.getItem(key)
      .catch((err) => {
        console.error(err);
      });

    return result;
  }

  // transports is an array
  findTransportFromArrayById(transports, transportId) {
    if (!transports || !transports.length) {
      return undefined;
    }
    return transports.find(transport => transport.id === transportId);
  }

  // createPlayer(scene, playerConfig) {
  //   debugger; // shouldnt call this anymore ?
  //   let player = new Player(scene, playerConfig);
  //
  //   // let player = new PlayerContainer(scene, playerConfig);
  //
  //   scene.board.addChess(player.container, playerConfig.playerX, playerConfig.playerY, this.constants.TILEZ_PLAYER);
  //
  //   player.container.fov = scene.rexBoard.add.fieldOfView(player.container, playerConfig);
  //
  //   return player.container;
  // }

  createAgent(scene, agentConfig) {
    let agent = new Agent(scene, agentConfig);
    console.log('agent', agent)

    const agentChess = scene.board.addChess(agent.container, agentConfig.x, agentConfig.y, this.constants.TILEZ_AGENTS);
// debugger;
//     var chess = scene.board.tileXYZToChess(agentConfig.x, agentConfig.y, this.constants.TILEZ_AGENTS);
    // chess.getFirst().anims.play('young-ogre-rest');
    // agent.container.phaserAgentSprite.anims.play('young-ogre-rest');

    return agent.container;
  }

  createTransport(scene, transportConfig) {
    let transport = new Transport(scene, transportConfig);
    console.log('transport', transport)
    scene.board.addChess(transport.container, transportConfig.x, transportConfig.y, this.constants.TILEZ_TRANSPORTS);

    return transport.container;
  }

  processPlayerMove(playerContainer, moveTo) {
    this.embarkOrDisembarkTransport(playerContainer);
    this.checkForPortal(playerContainer, moveTo);
    this.checkForAgents(playerContainer, moveTo);
    this.checkForSpecial(playerContainer, moveTo);
  }

  embarkOrDisembarkTransport(playerContainer) {
    if (playerContainer.disembarkTransport) {
      this.turnOffPlayerTravelAbilityFlag(playerContainer, this.constants.FLAGS.TRAVEL.SEA);
      this.turnOnPlayerTravelAbilityFlag(playerContainer, this.constants.FLAGS.TRAVEL.LAND);

      playerContainer.boardedTransport = undefined;
      playerContainer.disembarkTransport = false;
    } else if (playerContainer.embarkTransport) {
      playerContainer.boardedTransport = playerContainer.transportToBoard;

      this.turnOffPlayerTravelAbilityFlag(playerContainer, this.constants.FLAGS.TRAVEL.LAND);
      this.turnOnPlayerTravelAbilityFlag(playerContainer, this.constants.FLAGS.TRAVEL.SEA);

      playerContainer.embarkTransport = false;
      playerContainer.transportToBoard = undefined;
    }
  }

  checkForPortal(playerContainer, moveTo) {
    let tileIsPortal = moveTo.scene.game.ember.map.tileIsPortal(moveTo.scene, playerContainer.rexChess.tileXYZ);

    if (tileIsPortal) {
      moveTo.scene.cameras.main.fade(500, 0, 0, 0);
      moveTo.scene.cameras.main.on('camerafadeoutcomplete', async () => {

        const sceneData = await this.loadSceneData(tileIsPortal.map)
        moveTo.scene.scene.restart({
          'map': tileIsPortal.map,
          'storedPlayerTile': { x: tileIsPortal.x || 10, y: tileIsPortal.y || 10 },
          'storedPlayerAttrs': moveTo.scene.player.container.data.get('attrs'),
          'allSeenTiles': sceneData.seenTiles || new Set(),
          'storedTransports': sceneData.transports || new Set()
        });
      });
    }
  }

  checkForAgents(playerContainer, moveTo) {
    // Any agents nearby?  if so, transition them to pursue if they are aggressive

    const neighborAgents = moveTo.scene.board.getNeighborChess(playerContainer, null, constants.TILEZ_AGENTS);
    // console.log('checkForAgents: neighborAgents', neighborAgents);
    neighborAgents.forEach(agentContainer => {
      agentContainer.transitionToMelee(agentContainer);
    })
  }

  checkForSpecial(playerContainer, moveTo) {
    // any special flags for the target hex?
    let specialTile = moveTo.scene.game.ember.map.getTileSpecial(moveTo.scene, playerContainer.rexChess.tileXYZ);
    if (!specialTile || !specialTile.value) {
      return;
    }
    console.log(`Special Tile at x:${playerContainer.rexChess.tileXYZ.x} y:${playerContainer.rexChess.tileXYZ.y}`, specialTile)
    switch (specialTile.value) {
      case constants.FLAGS.SPECIAL.MESSAGE.value:
        if (this.shouldShowMessage(specialTile, moveTo.scene)) {
          moveTo.scene.game.ember.showInfoDialog(this.intl.t(`messages.${specialTile.msg}`));
        }
        break;
      default:
        console.log(`No handler for special value ${specialTile.value} at x:${playerContainer.rexChess.tileXYZ.x} y:${playerContainer.rexChess.tileXYZ.y}`);
        break;
    }
  }

  shouldShowMessage(tileSpecialData, scene) {
    if (!tileSpecialData || !tileSpecialData.showIf) {
      return true;
    }
    // 'special': {value: constants.FLAGS.SPECIAL.MESSAGE.value, id: 1, msg:'intro.id1', repeat: true,
    // showIf: {value: constants.SHOW_MESSAGE_WHEN.DOOR_EXISTS.value, data: { door_id:1, tileXY: {x: 11, y: 4} }}}
    let shapes;
    // Going to be a lot of very specific scenarios

    switch (tileSpecialData.showIf.value) {
      case constants.SHOW_MESSAGE_WHEN.DOOR_EXISTS.value:
        shapes = scene.game.ember.map.getGameObjectsAtTileXY(scene.board, tileSpecialData.showIf.data.tileXY, scene.game.ember.constants.SHAPE_TYPE_DOOR);
        if (shapes && shapes.length) {
          return shapes[0].active;
        }
        return false;
      default:
        break;
    }
    return true;
  }

  playerHasAbilityFlag(playerObj, type, flag) {

    if (!playerObj.data) {
      return false;
    }
    let attrs = playerObj.data.get('attrs');

    if (flag && flag.value) {
      flag = flag.value;
    }
    if (flag) {
      switch (type) {
        case this.constants.FLAG_TYPE_TRAVEL:
          return attrs['travelFlags'] & flag;
        case this.constants.FLAG_TYPE_VISIBILITY:
          return attrs['sightFlags'] & flag;
        default:
      }
    }
    return false;
  }

  turnOnPlayerTravelAbilityFlag(player, flag) {
    if (player) {
      if(flag && flag.value) {
        flag = flag.value;
      }
      if(flag) {
        player.data.get('attrs').travelFlags |= flag;
      }
    }
  }

  turnOffPlayerTravelAbilityFlag(player, flag) {
    if (player) {
      if (flag && flag.value) {
        flag = flag.value;
      }
      if (flag) {
        player.data.get('attrs').travelFlags &= ~flag;
      }
    }
  }

  describePlayerFlags(player) {
    let descriptions = [];
    // TODO there is a better way to do this
    if (this.playerHasTravelAbilityFlag(player, this.constants.FLAGS.TRAVEL.LAND)) {
      descriptions.push(`${this.constants.FLAGS.TRAVEL.LAND.value}:${this.constants.FLAGS.TRAVEL.LAND.description}`)
    }
    if (this.playerHasTravelAbilityFlag(player, this.constants.FLAGS.TRAVEL.SEA)) {
      descriptions.push(`${this.constants.FLAGS.TRAVEL.SEA.value}:${this.constants.FLAGS.TRAVEL.SEA.description}`)
    }
    return `Player flags: ${descriptions.join(', ')}`;
  }

  playerHasTravelAbilityFlag(player, flag) {
    return this.playerHasAbilityFlag(player, this.constants.FLAG_TYPE_TRAVEL, flag);
  }


  async foundChest(chest) {
    console.log('foundChest', chest)
    if (chest) {
      this.gameManager.player.gold += chest.gold;
      chest.gold = 0;

      // special actions
      if (chest.specialActions) {
        console.log('special Actions:', chest.specialActions)
        chest.specialActions.forEach(async(specialAction) => {
          await this.processSpecialAction.perform(chest.scene, specialAction);
        })
      }

      // get cache details
      const geocache = this.cache.findCache(chest.gccode);
      if (geocache) {
        // show found it modal
        this.epmModalContainerClass = 'chest';
        this.modals.open('chest-dialog', {coords:geocache.coords});

        geocache.found = true;
        await this.saveCacheFound(geocache);
      }

    }
  }

  @task
  *processSpecialAction(scene, specialAction) {
    let doorShapes;
    switch (specialAction.value) {
      case this.constants.SPECIAL_ACTIONS.REMOVE_SIGHT_COST.value:  // data: { tileXY: {x: 11, y: 3 }}
        // find the tile, set its sightCost to 0;
        scene.game.ember.map.getTileAttribute(scene, specialAction.data.tileXY).special.sightCost = 0;
        break;
      case this.constants.SPECIAL_ACTIONS.REMOVE_DOOR.value: // data: { door_id:1, tileXY: {x: 11, y: 4} }
        doorShapes = scene.game.ember.map.getGameObjectsAtTileXY(scene.board, specialAction.data.tileXY, scene.game.ember.constants.SHAPE_TYPE_DOOR);
        if (doorShapes && doorShapes.length) {
          doorShapes[0].makeInactive();
        }
        break;
      case this.constants.SPECIAL_ACTIONS.PLAY_SOUND.value: // data: { sound: 'open_door_1' }
        yield timeout(400);
        scene.openDoorAudio.play();
        break;
      default:
        console.log('No Special Action found', specialAction);
        yield timeout(1);
    }
  }

  decryptCacheCoordinates(source) {
    return this.storage.decrypt(source.coords);
  }

}
