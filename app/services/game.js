import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import {get} from '@ember/object';
import { inject as service } from '@ember/service';
import localforage from 'localforage';
import {task} from "ember-concurrency-decorators";
import {timeout} from 'ember-concurrency';
import Confirmer from 'confirmed';
import { constants } from 'emberquest/services/constants';
import {Transport} from "../objects/agents/transport";
import {Agent} from "../objects/agents/agent";

// import MapData from '../phaser/scenes/tiledata/cave1'
// // import MapData from '../phaser/scenes/tiledata/landsea'

// import {Player} from "../objects/agents/player";


export default class GameService extends Service {

  @service modals;
  @service map;
  @service inventory;
  @service cache;
  @service gameManager;
  @service storage;
  @service intl;
  @service('spawner') spawnerService;

  // @tracked cameraMainZoom = 1;
  @tracked cameraMainZoom = 1.4;
  @tracked playerImgSrc = '/images/agents/avatar.png';
  // @tracked playerImgSrc = '/images/agents/pirate.png';
  @tracked showHexInfo = false;
  @tracked epmModalContainerClass = '';

  @tracked showInfoHeader = "";
  @tracked showInfoPrompt = "";

  @tracked showInfoCancel = "";
  @tracked showInfoConfirm = "OK";
  @tracked showInfoConfirmer = null;

  @tracked sceneData = [];
  @tracked gameData = {};

  @tracked placedBrazier = false;

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

    // SCENE ATTRIBUTES
    //
    const mapname = scene.mapname;

    const currentMapData = this.sceneData[mapname] || {};

    this.gameData = await this.loadGameData('gameboard');
    // console.log('___ saveSceneData this.gameData', this.gameData)
    if (!this.gameData) {
      this.gameData = { 'currentMap': mapname, sceneData: [] };
    } else {
      this.gameData.currentMap = mapname;
    }
    this.sceneData = this.gameData.sceneData;

    const sceneTransports = [];
    if (scene.transports.children) {
      scene.transports.getChildren().forEach(transport => {
        sceneTransports.push({
          'id': transport.id,
          'tile': transport.rexChess.tileXYZ,
          'texture': transport.config.texture
        })
      });
    }

    const agents = [];
// console.log('scene.agents', scene.agents)
    if (scene.agents.children) {
      scene.agents.getChildren().forEach(thisAgent => {
        // console.log('thisAgent', thisAgent.agent)
        agents.push({
          'id': thisAgent.id,
          'tile': thisAgent.rexChess.tileXYZ,
          'texture': thisAgent.agent.playerConfig.texture,
          'health': thisAgent.agent.health,
          'power': thisAgent.agent.power,
          'gold': thisAgent.agent.gold,
          'state': thisAgent.agent.agentState
        })
      });
    }

    // console.log('save agents', agents);

    const boardedTransportId = scene.player.container.boardedTransport ? scene.player.container.boardedTransport.id : 0;
    Object.assign(currentMapData, {
      'map': mapname,
      'seenTiles': scene.allSeenTiles,
      'transports': sceneTransports,
      'agents': agents,
      'deadAgents': scene.deadAgents,
      'boarded':  boardedTransportId,
      'spawnTile': scene.spawnTile
    });

    // console.log('save spawnTile', scene.spawnTile)

    this.sceneData[mapname] = currentMapData;

    // ALL TRANSPORTS
    //
    let allTransports = new Map();

    if (scene.player.container.boardedTransport) {
      if(!allTransports.has(scene.player.container.boardedTransport.id)) {
        // console.log(' <<<<<<<<< boardedTransport', {
        //   'id': scene.player.container.boardedTransport.id,
        //   'tile': scene.player.container.boardedTransport.rexChess.tileXYZ,
        //   'map': mapname
        // });
        allTransports.set(scene.player.container.boardedTransport.id,
          {
            'id': scene.player.container.boardedTransport.id,
            'tile': scene.player.container.boardedTransport.rexChess.tileXYZ,
            'map': mapname
          }
        );
      }
    }

    sceneTransports.forEach((sceneTransport) => {
      if(!allTransports.has(sceneTransport.id)) {
        allTransports.set(sceneTransport.id,
          {
            'id': sceneTransport.id,
            'tile': sceneTransport.tile,
            'map': mapname
          }
        );
      }
    });

    // let allTransports = []; // get existing first - dont reset
    if (scene.ember.gameData && scene.ember.gameData.transports) {
      scene.ember.gameData.transports.forEach(gameDataTransport => {
        if(!allTransports.has(gameDataTransport.id)) {
          allTransports.set(gameDataTransport.id,
            {
              'id': gameDataTransport.id,
              'tile': gameDataTransport.tile,
              'map': gameDataTransport.map
            }
          );
        }
        // }
      });
    }


    const allTransportsArray = [...allTransports.values()];

    // PLAYER ATTRIBUTES
    //
    let playerAttrs = scene.player.container.data.get('attrs');
    // add inventory, mapname to playerAttrs
    Object.assign(playerAttrs, {
      'inventory': scene.player.container.agent.saveGameInventoryAttrs,
      'boardedTransport':  scene.player.container.boardedTransport ? scene.player.container.boardedTransport.id : 0,
      'mapname': mapname,
      're': this.placedBrazier
    });
    constants.STOREDATTRS.forEach(storedObj => {
      try {
        // console.log('save ', playerAttrs[storedObj.key], storedObj.key, (+parseFloat(get(scene, `player.${storedObj.attr}`)).toFixed(0)));
        playerAttrs[storedObj.key] = this.storage.encrypt((+parseFloat(get(scene, `player.${storedObj.attr}`)).toFixed(0)));
      } catch (e) {
        console.error(e);
      }
    });

    // top level of the cookie - players sees these keys
    Object.assign(this.gameData, {
      'playerTile': scene.player.container.rexChess.tileXYZ,
      'playerAttrs': playerAttrs,
      'transports': allTransportsArray,
      sceneData: this.sceneData
    });

    await this.saveGameData('gameboard', this.gameData);
  }

  async loadSettingsData() {
    console.log('loading settings');
    const settingsData = await this.loadGameData('settings') || {};
    if (settingsData) {
      this.gameManager.mutedSoundEffectsVolume = settingsData.mutedSoundEffectsVolume || false;
      this.gameManager.mutedMusicEffectsVolume = settingsData.mutedMusicEffectsVolume || false;
      this.gameManager.soundEffectsVolume = settingsData.soundEffectsVolume || 1;
      this.gameManager.musicEffectsVolume = settingsData.musicEffectsVolume || 1;
      this.cookieConfirmed = settingsData.cookieConfirmed || false;
    }
  }

  async saveSettingsData() {
    // console.log('saving settings');
    const settingsData = {
      'cookieConfirmed' : this.cookieConfirmed,
      'mutedSoundEffectsVolume' : this.gameManager.mutedSoundEffectsVolume,
      'mutedMusicEffectsVolume' : this.gameManager.mutedMusicEffectsVolume,
      'soundEffectsVolume' : this.gameManager.soundEffectsVolume,
      'musicEffectsVolume' : this.gameManager.musicEffectsVolume
    }
    await this.saveGameData('settings', settingsData);
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

  async initializeRoyalEmberPlaced() {
    // console.log('initializeRoyalEmberPlaced')
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
            // console.log('found chest', geocache);
            geocache.found = true;
          }
        }
      });
    }
  }

  // async loadSceneData(sceneMapName) {
  //   const gameData = await this.loadGameData('gameboard');
  //   const currentSceneData = gameData.sceneData[sceneMapName] || {};
  //   return currentSceneData;
  // }

  async loadGameData(key) {
    const result = await localforage.getItem(key)
      .catch((err) => {
        console.error(err);
      });

    return result;
  }

  // agents is an array
  findAgentFromArrayById(agents, agentId) {
    if (!agents || !agents.length) {
      return undefined;
    }
    return agents.find(agent => agent.id === agentId);
  }

  // transports is an array
  findTransportFromArrayById(transports, transportId) {
    if (!transports || !transports.length) {
      return undefined;
    }
    return transports.find(transport => transport.id === transportId);
  }

  createAgent(scene, agentObject) {
    let agent = new Agent(scene, agentObject.objectConfig);

    let existingAgent = null;
    if (scene.storedData.sceneData) {
      existingAgent = this.findAgentFromArrayById(scene.storedData.sceneData.agents, agentObject.id);
      // existingAgent = this.findAgentFromArrayById(scene.storedData.sceneData.agents, agentObject.objectConfig.id);
    }

    scene.board.addChess(
      agent.container,
      existingAgent ? existingAgent.tile.x : agentObject.x,
      existingAgent ? existingAgent.tile.y : agentObject.y,
      this.constants.TILEZ_AGENTS);

    if (existingAgent) {
      agent.container.agent.health = existingAgent.health;
      agent.container.agent.power = existingAgent.power;
      agent.container.agent.state = existingAgent.state;
    }

    return agent.container;
  }

  createTransport(scene, transportConfig) {
    const transport = new Transport(scene, transportConfig.objectConfig);
    scene.board.addChess(transport.container, transportConfig.objectConfig.x, transportConfig.objectConfig.y, this.constants.TILEZ_TRANSPORTS);

    return transport.container;
  }

  processPlayerMove(playerContainer, moveTo, fieldOfViewTileXYArray) {
    this.embarkOrDisembarkTransport(playerContainer);
    this.checkForPortal(playerContainer, moveTo);
    this.checkForAgents(playerContainer, moveTo, fieldOfViewTileXYArray);
    // this.checkForSpecial(playerContainer, moveTo);
    this.gameManager.gameClock.perform(playerContainer, moveTo);
  }


  embarkOrDisembarkTransport(playerContainer) {
    if (playerContainer.disembarkTransport) {
// console.log('disembark')
      this.turnOffPlayerTravelAbilityFlag(playerContainer, playerContainer.boardedTransport.agent.playerConfig.flagAttributes.tF);
      // this.turnOffPlayerTravelAbilityFlag(playerContainer, this.constants.FLAGS.TRAVEL.SEA);
      this.turnOnPlayerTravelAbilityFlag(playerContainer, this.constants.FLAGS.TRAVEL.LAND);

      playerContainer.boardedTransport.playAnimation(constants.ANIMATION.KEY.REST);

      playerContainer.boardedTransport = undefined;
      playerContainer.disembarkTransport = false;
    } else if (playerContainer.embarkTransport) {
// console.log('embark')
      playerContainer.boardedTransport = playerContainer.transportToBoard;

      this.turnOffPlayerTravelAbilityFlag(playerContainer, this.constants.FLAGS.TRAVEL.LAND);
      this.turnOnPlayerTravelAbilityFlag(playerContainer, playerContainer.transportToBoard.agent.playerConfig.flagAttributes.tF);
      // this.turnOnPlayerTravelAbilityFlag(playerContainer, this.constants.FLAGS.TRAVEL.SEA);

      playerContainer.transportToBoard.playAnimation(constants.ANIMATION.KEY.MOVE);

      playerContainer.embarkTransport = false;
      playerContainer.transportToBoard = undefined;
    }
  }

  checkForPortal(playerContainer, moveTo) {
    let tileIsPortal = moveTo.scene.game.ember.map.tileIsPortal(moveTo.scene, playerContainer.rexChess.tileXYZ);

    if (tileIsPortal) {

      // does the portal require anything before it will work?
      if (tileIsPortal.requires) {

        switch (tileIsPortal.requires.id) {
          case constants.PORTAL.REQUIRED.GETCHEST:
            if (!this.cache.isCacheFound(tileIsPortal.requires.data.gccode)) {
              return;
            }
            break;
          default:
            break;
        }
      }


      if (tileIsPortal.map === this.gameManager.scene.mapname) {
        // portal to another hex in the same map
        moveTo.scene.cameras.main.fadeOut(300);
        moveTo.scene.cameras.main.off('camerafadeoutcomplete').on('camerafadeoutcomplete', async () => {
          this.gameManager.scene.board.moveChess(playerContainer, tileIsPortal.x, tileIsPortal.y);
          moveTo.scene.game.ember.saveSceneData(moveTo.scene);
          let fieldOfViewTileXYArray = playerContainer.fov.findFOV(playerContainer.visiblePoints);
          moveTo.scene.game.ember.map.findAgentFieldOfView(playerContainer, fieldOfViewTileXYArray);
          moveTo.scene.cameras.main.fadeIn(300);
        });
      } else {
        this.gameManager.pauseGame(true);
        this.gameManager.loadingNewScene = true;

        // cancel all patrol tasks...
        const agentContainers = this.gameManager.scene.agents.children;
        agentContainers.entries.forEach(agentContainer => {
          agentContainer.cancelAllTasks();
        });

        this.spawnerService.cancelAllSpawnerTasks();

        moveTo.scene.cameras.main.fade(300, 0, 0, 0);
        moveTo.scene.cameras.main.on('camerafadeoutcomplete', async () => {

          // const gameData = await this.loadGameData('gameboard')
          this.loadGameData('gameboard')
            .then(gameboardData => {
              // console.log('>> portal gameboardData', gameboardData);

              if (gameboardData) {
                const sceneData = gameboardData.sceneData[tileIsPortal.map] || {
                  allSeenTiles: [],
                  storedTransports: [],
                  boarded: 0
                };
                console.log('');
                console.log('');
                console.error('>>>>>> portal ===> loading map', tileIsPortal.map.toUpperCase(), 'sceneData', sceneData);
                console.log('sceneData', sceneData);
                console.log('');

                // moveTo.scene.game.ember.gameData.transports = gameboardData.transports;

                let data = {
                  'map': tileIsPortal.map,

                  'gameboardData': gameboardData,
                  'sceneData': sceneData,

                  'storedPlayerTile': {x: tileIsPortal.x || 10, y: tileIsPortal.y || 10},
                  'spawnTile': {x: tileIsPortal.x, y: tileIsPortal.y},
                  'storedPlayerAttrs': gameboardData.playerAttrs,
                  'allSeenTiles': sceneData.seenTiles,
                  'storedTransports': sceneData.transports,
                  'boarded': this.playerContainer.boardedTransport ? this.playerContainer.boardedTransport.agent.id : 0
// 'boarded': gameboardData.playerAttrs.boardedTransport  // the id of the transport the player is on
                  // 'boarded': sceneData.boarded
                };
                // console.log('restarting with data', data)
                // moveTo.scene.scene.restart(data);

                this.map.getDynamicMapData(data.map).then(mapData => {
                  // console.log('mapData', mapData);
                  data.mapData = mapData;

                  moveTo.scene.scene.start('gameboard', data);
                });

              }
            });

        });
      }
    }
  }

  checkForAgents(playerContainer, moveTo, fieldOfViewTileXYArray) {
    // console.error('remove the return in checkForAgents')
    // return;
    // Any agents nearby?  if so, transition them to pursue if they are aggressive
    const board = moveTo.scene.board;

    // let tileXYArray = playerContainer.fov.findFOV(playerContainer.visiblePoints);
    // let tileXYArray = playerContainer.fov.clearDebugGraphics().findFOV(playerContainer.visiblePoints);

// console.log('checkForAgents - findFOV', tileXYArray);
    let tileXY;
    for (let i = 0, cnt = fieldOfViewTileXYArray.length; i < cnt; i++) {
      tileXY = fieldOfViewTileXYArray[i];
    // for (let i = 0, cnt = tileXYArray.length; i < cnt; i++) {
    //   tileXY = tileXYArray[i];
      const fovShapes = this.map.getGameObjectsAtTileXY(board, tileXY, constants.SHAPE_TYPE_AGENT);
      if (fovShapes && fovShapes.length > 0) {
        fovShapes.forEach(fovShapeAgent => {

          const shouldPursue = fovShapeAgent.checkAggression(fovShapeAgent);

          if (board.areNeighbors(playerContainer, fovShapeAgent)) {
            // console.log('  is neighbor')
            fovShapeAgent.transitionToMelee(fovShapeAgent);
          } else {
            // console.log('not neighbor')
            fovShapeAgent.transitionToPursuit(fovShapeAgent);
          }
        });
      }

    }

    //   const neighborAgents = board.getNeighborChess(playerContainer, null, constants.TILEZ_AGENTS);
    // // console.log('checkForAgents: neighborAgents', neighborAgents);
    // neighborAgents.forEach(agentContainer => {
    //   agentContainer.transitionToMelee(agentContainer);
    // })
  }

  checkForSpecial(agentContainer, moveTo) {
    // any special flags for the target hex?
    if (!moveTo.scene) {
      return;
    }
    let specialTile = moveTo.scene.game.ember.map.getTileSpecial(moveTo.scene, agentContainer.rexChess.tileXYZ);
    if (!specialTile || !specialTile.value) {
      return;
    }
    let fireDamage = 0;
    let fireResistance = 0;
    // console.log(`Special Tile at x:${agentContainer.rexChess.tileXYZ.x} y:${agentContainer.rexChess.tileXYZ.y}`, specialTile)
    switch (specialTile.value) {
      case constants.FLAGS.SPECIAL.MESSAGE.value:
        if (agentContainer.isPlayer) {
          if (this.shouldShowMessage(specialTile, moveTo.scene)) {
            moveTo.scene.game.ember.showInfoDialog(this.intl.t(`messages.${specialTile.msg}`));
          }
        }
        break;
      case constants.FLAGS.SPECIAL.LAVA.value:
        console.log('on lava', agentContainer.agent.maxHealth, Math.floor(agentContainer.agent.maxHealth * .9) + 10 );
        if (!agentContainer.boardedTransport) {
          fireDamage += Math.floor(agentContainer.agent.maxHealth * .9) + 10;
        }
        break;
      case constants.FLAGS.SPECIAL.ROYALEMBER.value:
        this.checkForRoyalEmber(moveTo.scene);
        break;
      case constants.FLAGS.SPECIAL.NEST.value:
      case constants.FLAGS.SPECIAL.PORTAL.value:
        // do nothing
        break;
      default:
        console.log(`No handler for special value ${specialTile.value} at x:${agentContainer.rexChess.tileXYZ.x} y:${agentContainer.rexChess.tileXYZ.y}`);
        break;
    }

    // check for any special damage
    if (fireDamage) {
      fireResistance = agentContainer.agent.getResistance(constants.INVENTORY.RESISTANCE.FIRE);
      if (fireResistance) {
        fireDamage -= (fireDamage * (fireResistance / 100));
      }

      if (fireDamage > 0) {
          agentContainer.takeDamage(fireDamage, agentContainer.agent, null, false);
      }
    }

  }

  checkForRoyalEmber(scene) {
    if (this.placedBrazier) {
      // already placed the brazier
      return;
    }
    if (this.inventory.hasRoyalEmber()) {
      this.gameManager.pauseGame(true);

      let brazierSprite = scene.board.tileXYZToChess(32, 12, constants.TILEZ_SPRITES);
      if (brazierSprite) {

        // special actions
        const specialActions = brazierSprite.getData('specialActions');
        if (specialActions) {
          specialActions.forEach(async(specialAction) => {
            await this.processSpecialAction.perform(brazierSprite.scene, specialAction);
          })
        }
        brazierSprite.setAlpha(this.constants.ALPHA_OBJECT_VISIBLE_TO_PLAYER);

        this.placedBrazier = true;
      }
      this.gameManager.pauseGame(false);
    } else {
      // console.log('No royal ember for you')
    }
  }

  shouldShowMessage(tileSpecialData, scene) {
    if (!tileSpecialData || !tileSpecialData.showIf) {
      return true;
    }
    // 'spcl': {value: constants.FLAGS.SPECIAL.MESSAGE.value, id: 1, msg:'intro.id1', repeat: true,
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
          return attrs['tF'] & flag;
        case this.constants.FLAG_TYPE_VISIBILITY:
          return attrs['sF'] & flag;
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
        player.data.get('attrs').tF |= flag;
      }
    }
  }

  turnOffPlayerTravelAbilityFlag(player, flag) {
    if (player) {
      if (flag && flag.value) {
        flag = flag.value;
      }
      if (flag) {
        player.data.get('attrs').tF &= ~flag;
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
    // console.log('foundChest!', chest)
    if (chest) {
      // debugger;
      this.gameManager.player.gold = +this.gameManager.player.gold + +chest.gold;
      // chest.gold = 0;

      // special actions
      if (chest.specialActions) {
        // console.log('special Actions:', chest.specialActions)
        chest.specialActions.forEach(async(specialAction) => {
          await this.processSpecialAction.perform(chest.scene, specialAction);
        })
      }

      if (chest.inventory) {
        chest.inventory.forEach(swagId => {
          const swag = this.inventory.getItemById(swagId);
          if (swag) {
            swag.owned = true;
            swag.display = true;
            swag.locked = false;
          }
        })
      }
      // get cache details
      const geocache = this.cache.findCache(chest.gccode);
      if (geocache) {
        // show found it modal
        this.epmModalContainerClass = 'chest';
        this.modals.open('chest-dialog', {
          coords:geocache.coords,
          parking:geocache.parking,
          gccode:geocache.gccode,
          inventory:chest.inventory,
          gold:chest.gold,
        });

        geocache.found = true;
        await this.saveCacheFound(geocache);
      }

    }
  }

  @task
  *processSpecialAction(scene, specialAction, gameObj) {
    let doorShapes;
    switch (specialAction.value) {
      case this.constants.SPECIAL_ACTIONS.REMOVE_SIGHT_COST.value:  // data: { tileXY: {x: 11, y: 3 }}
        // find the tile, set its sightCost to 0;
        scene.game.ember.map.getTileAttribute(scene, specialAction.data.tileXY).spcl.sC = 0;
        break;
      case this.constants.SPECIAL_ACTIONS.REMOVE_DOOR.value: // data: { door_id:1, tileXY: {x: 11, y: 4} }
        doorShapes = scene.game.ember.map.getGameObjectsAtTileXY(scene.board, specialAction.data.tileXY, scene.game.ember.constants.SHAPE_TYPE_DOOR);
        if (doorShapes && doorShapes.length) {
          doorShapes[0].makeInactive();
        }
        break;
      case this.constants.SPECIAL_ACTIONS.PLAY_SOUND.value: // data: { sound: 'open_door_1' }
        yield timeout(400);
        this.gameManager.playSound({key: specialAction.data.sound})

        // scene.openDoorAudio.play();
        break;
      case this.constants.SPECIAL_ACTIONS.FINAL_FANFAIR.value:
        console.log('Do final fanfair ?');
        break;
      case this.constants.SPECIAL_ACTIONS.PLAY_ANIMATION.value:
        console.log('Do animation', specialAction.data.key);
        if (gameObj.anims) {
          gameObj.anims.play(specialAction.data.key);
        }
        break;
      case this.constants.SPECIAL_ACTIONS.MOVE_TRANSPORT.value:
        console.log('TODO Move Transport', specialAction.data);
        const transport = scene.findTransportById(specialAction.data.transportId);
        if (transport && specialAction.data.target) {
          const pathToTarget = transport.pathFinder.findPath(specialAction.data.target);
          if (pathToTarget) {
            let moveObject = {
              agent: transport,
              path: pathToTarget,
              // uuid: v4(),
              finishedCallback: () => {
                console.log('done moving transport')
                // transport.populatePatrolMoveQueue();
                transport.patrolTask.cancelAll();
              }
            };
            transport.moveQueue = moveObject;
            transport.patrolTask.perform();
          }
        }
        break;
      default:
        console.log('No Special Action found', specialAction);
        yield timeout(1);
    }
  }

  decryptCacheCoordinates(coords) {
    return this.storage.decrypt(coords);
  }

  randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
