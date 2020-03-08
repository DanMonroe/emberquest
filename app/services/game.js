import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import localforage from 'localforage';

// import MapData from '../phaser/scenes/tiledata/cave1'
// // import MapData from '../phaser/scenes/tiledata/landsea'

import {Player} from "../objects/agents/player";
import {Transport} from "../objects/agents/transport";
import {Agent} from "../objects/agents/agent"

export default class GameService extends Service {

  @service modals;
  @service constants;
  @service map;
  @service inventory;
  @service gameManager;
  // @service('game-manager') manager;

  @tracked cameraMainZoom = 1;
  @tracked playerImgSrc = '/images/agents/tomster-head-classic.png';
  // @tracked playerImgSrc = '/images/agents/pirate.png';
  @tracked showHexInfo = false;
  @tracked epmModalContainerClass = '';


  @tracked sceneData = [];
  @tracked gameData = undefined;

  // @tracked playerCoins = 3163;

  // getMapData() {
  //   return MapData;
  // }

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

    Object.assign(gameData, {
      'playerTile': scene.player.container.rexChess.tileXYZ,
      'playerAttrs': scene.player.container.data.get('attrs'),
      sceneData: this.sceneData
    });

    await this.saveGameData('gameboard', gameData);
  }

  async saveGameData(key, value) {
    await localforage.setItem(key, value)
      .then((value) => {
      // console.log('done saving', value)
    }).catch((err) => {
      console.error(err);
    });
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

  createPlayer(scene, playerConfig) {
    debugger; // shouldnt call this anymore ?
    let player = new Player(scene, playerConfig);

    // let player = new PlayerContainer(scene, playerConfig);

    scene.board.addChess(player.container, playerConfig.playerX, playerConfig.playerY, this.constants.TILEZ_PLAYER);

    player.container.fov = scene.rexBoard.add.fieldOfView(player.container, playerConfig);

    return player.container;
  }

  createAgent(scene, agentConfig) {
    let agent = new Agent(scene, agentConfig);
    // console.log('agent', agent)

    scene.board.addChess(agent.container, agentConfig.x, agentConfig.y, this.constants.TILEZ_AGENTS);

    return agent.container;
  }

  createTransport(scene, transportConfig) {
    let transport = new Transport(scene, transportConfig);
    console.log('transport', transport)
    scene.board.addChess(transport.container, transportConfig.x, transportConfig.y, this.constants.TILEZ_TRANSPORTS);

    return transport.container;
  }

  processPlayerMove(playerContainer, moveTo) {
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
    // debugger;
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


  foundChest(chest) {
    if (chest) {
      this.gameManager.player.playerCoins += chest.gold;
      chest.gold = 0;

      this.epmModalContainerClass = 'chest';
      this.modals.open('chest-dialog', {coords:chest.coords});

    }
  }

  decryptCacheCoordinates(source) {
    // TODO actually decrypt
    return source.coords;
  }

  // // for use for EmberConf.  item is for code example
  // async closeCurrentAndOpenNewModal(item) {
  //   console.log('closeCurrentAndOpenNewModal', item);
  //   // debugger;
  //   await this.modals.top.close();
  //   this.epmModalContainerClass = 'code-example';
  //   await this.modals.open('code-example-dialog', item);
  // }
}
