import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import {get} from '@ember/object';
import { htmlSafe } from '@ember/template';
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
  @service messages;
  @service('spawner') spawnerService;
  @service agentPool;

  // @tracked cameraMainZoom = 1;
  @tracked cameraMainZoom = 1.4;
  @tracked playerImgSrc = '/images/agents/avatar.png';

  @tracked showAgentSelector = false;
  @tracked thisIsDan = false; // 'dan' on the query param
  @tracked showHexInfo = false;
  @tracked epmModalContainerClass = '';

  @tracked showInfoHeader = "";
  @tracked showInfoPrompt = "";

  @tracked showInfoCancel = "";
  @tracked showInfoConfirm = "OK";
  @tracked showInfoConfirmer = null;
  @tracked showPausedConfirmer = null;

  @tracked sceneData = [];
  @tracked gameData = {};

  @tracked placedBrazier = false;

  // @reads('gameManager.game.hasFocus') gameHasFocus;

  constants = constants;

  showInfoDialog(message, trackMessage = false, messageId) {

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

    if (trackMessage && messageId) {
      this.messages.addMessage(messageId, message);
    }
  }

  closePausedDialog() {
    this.showPausedConfirmer = null;
  }
  showPausedDialog() {

    new Confirmer(showPausedConfirmer => {
      this.showPausedConfirmer = showPausedConfirmer
    })
    .onConfirmed(async () => {
    })
    .onDone(() => {
      this.showPausedConfirmer = null;
    });

  }

  agentsToSelect() {
    let agents = [{key: '', 'name': 'Select Agent'}];
    this.agentPool.getAgentPool().forEach((value, key) => {
      agents.push( {key: key, 'name': value.name} );
    })
    return agents;
  }

  async saveSceneData(scene) {
    // SCENE ATTRIBUTES
    //
    const mapname = scene.mapname;

    const currentMapData = this.sceneData[mapname] || {};

    this.gameData.currentMap = mapname;
    let sceneData = await this.loadGameData('sceneData');
    if (sceneData) {
      this.gameData.sceneData = sceneData;
    } else {
      this.gameData.sceneData = [];
    }
    this.sceneData = this.gameData.sceneData;

    // this.gameData = await this.loadGameData('gameboard');
    // // console.log('___ saveSceneData this.gameData', this.gameData)
    // if (!this.gameData) {
    //   this.gameData = { 'currentMap': mapname, sceneData: [] };
    // } else {
    //   this.gameData.currentMap = mapname;
    // }
    // this.sceneData = this.gameData.sceneData;

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

    // console.log('save spawnTile', scene.spawnTile, 'boardedTransport', boardedTransportId)

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

    let previousTile = await this.loadGameData('playerTile');
    if (previousTile) {
      const previousTileObject = Object.assign({boardedTransport: playerAttrs.boardedTransport}, previousTile);
      if(previousTileObject.x !== scene.player.container.rexChess.tileXYZ.x || previousTileObject.y !== scene.player.container.rexChess.tileXYZ.y) {
        await this.saveGameData('previousTile', previousTileObject);
      }
    }

    await this.saveGameData('currentMap', mapname);
    await this.saveGameData('playerAttrs', playerAttrs);
    await this.saveGameData('transports', allTransportsArray);
    await this.saveGameData('sceneData', this.sceneData);
    await this.saveGameData('playerTile', Object.assign({mapname: mapname}, scene.player.container.rexChess.tileXYZ));
  }

  async loadSettingsData() {
    // console.log('loading settings');
    const settingsData = await this.loadGameData('settings') || {};
    if (settingsData) {
      this.gameManager.mutedSoundEffectsVolume = settingsData.mutedSoundEffectsVolume || false;
      this.gameManager.mutedMusicEffectsVolume = settingsData.mutedMusicEffectsVolume || false;
      this.gameManager.soundEffectsVolume = settingsData.soundEffectsVolume || 0.3;
      this.gameManager.musicEffectsVolume = settingsData.musicEffectsVolume || 0.2;
      this.gameManager.noPowerWarned = settingsData.noPowerWarned || false;
      this.gameManager.noMovePowerWarned = settingsData.noMovePowerWarned || false;
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
      'musicEffectsVolume' : this.gameManager.musicEffectsVolume,
      'noPowerWarned' : this.gameManager.noPowerWarned,
      'noMovePowerWarned' : this.gameManager.noMovePowerWarned
    }
    await this.saveGameData('settings', settingsData);
  }

  async loadPlayerStats() {
    // console.log('loading stats');
    const statsData = await this.loadGameData('gamestats') || {};
    if (statsData) {
      this.gameManager.deathCount = statsData.deathCount || 0;
      this.gameManager.killCount = statsData.killCount || 0;
    }
  }

  async savePlayerStats() {
    // console.log('saving settings');
    const statsData = {
      'deathCount' : this.gameManager.deathCount,
      'killCount' : this.gameManager.killCount
    }
    await this.saveGameData('gamestats', statsData);
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

      // Delete a found cache from cookie
      if (this.debug.resetcache) {
        cachesData.delete(this.debug.resetcache)
      }

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
    transport.container.setDepth(scene.ember.constants.TILEZ_TRANSPORTS)
    return transport.container;
  }

  processPlayerMove(playerContainer, moveTo, fieldOfViewTileXYArray) {
    this.embarkOrDisembarkTransport(playerContainer, moveTo);
    this.checkForPortal(playerContainer, moveTo);
    this.checkForAgents(playerContainer, moveTo, fieldOfViewTileXYArray);
    // this.checkForSpecial(playerContainer, moveTo);
    this.gameManager.gameClock.perform(playerContainer, moveTo);
  }


  embarkOrDisembarkTransport(playerContainer/*, moveTo*/) {
    if (playerContainer.disembarkTransport) {
// console.log('disembark')
      this.turnOffPlayerTravelAbilityFlag(playerContainer, playerContainer.boardedTransport.agent.playerConfig.flagAttributes.tF);
      // this.turnOffPlayerTravelAbilityFlag(playerContainer, this.constants.FLAGS.TRAVEL.SEA);
      this.turnOnPlayerTravelAbilityFlag(playerContainer, this.constants.FLAGS.TRAVEL.LAND);

      playerContainer.boardedTransport.playAnimation(constants.ANIMATION.KEY.REST);

      playerContainer.boardedTransport = undefined;
      playerContainer.disembarkTransport = false;
      this.setSpawnTile(playerContainer);
    } else if (playerContainer.embarkTransport) {
// console.log('embark')
      playerContainer.boardedTransport = playerContainer.transportToBoard;

      this.turnOffPlayerTravelAbilityFlag(playerContainer, this.constants.FLAGS.TRAVEL.LAND);
      this.turnOnPlayerTravelAbilityFlag(playerContainer, playerContainer.transportToBoard.agent.playerConfig.flagAttributes.tF);
      // this.turnOnPlayerTravelAbilityFlag(playerContainer, this.constants.FLAGS.TRAVEL.SEA);

      playerContainer.transportToBoard.playAnimation(constants.ANIMATION.KEY.MOVE);

      playerContainer.embarkTransport = false;
      playerContainer.transportToBoard = undefined;
      this.setSpawnTile(playerContainer);
    }
  }

  setSpawnTile(playerContainer) {
    playerContainer.scene.spawnTile = {x:playerContainer.rexChess.tileXYZ.x, y:playerContainer.rexChess.tileXYZ.y, sF: playerContainer.data.get('attrs').sF, tF: playerContainer.data.get('attrs').tF}
  }

  teleportInMap(scene, playerContainer, targetTile) {
    scene.cameras.main.fadeOut(300);
    scene.cameras.main.off('camerafadeoutcomplete').on('camerafadeoutcomplete', async () => {
      this.gameManager.scene.board.moveChess(playerContainer, targetTile.x, targetTile.y);
      if (playerContainer.boardedTransport) {
        this.gameManager.scene.board.moveChess(playerContainer.boardedTransport, targetTile.x, targetTile.y);
      }
      scene.game.ember.saveSceneData(scene);
      let fieldOfViewTileXYArray = playerContainer.fov.findFOV(playerContainer.visiblePoints);
      scene.game.ember.map.findAgentFieldOfView(playerContainer, fieldOfViewTileXYArray);
      scene.cameras.main.fadeIn(300);
    });

  }

  checkForPortal(playerContainer, moveTo) {
    let tileIsPortal = moveTo.scene.game.ember.map.tileIsPortal(moveTo.scene, playerContainer.rexChess.tileXYZ);

    if (tileIsPortal) {
      this.teleport(playerContainer, moveTo.scene, tileIsPortal);
    }
  }

  // targetTile needs .map, .x, .y
  teleport(playerContainer, scene, targetTile) {
      scene.ember.gameManager.musicEffects.stop();

      let requiredSprite = undefined

      // does the portal require anything before it will work?
      if (targetTile.requires) {

        switch (targetTile.requires.id) {
          case constants.PORTAL.REQUIRED.GETCHEST:
            if (!this.cache.isCacheFound(targetTile.requires.data.gccode)) {
              return;
            }
            break;
          case constants.PORTAL.REQUIRED.TRAPDOOROPEN:
            requiredSprite = scene.getSpriteByName(targetTile.requires.data.sprite);
            if (requiredSprite && !requiredSprite.getData(targetTile.requires.data.property)) {
              return;
            }
            break;
          case constants.PORTAL.REQUIRED.UNMOUNTED:
            // console.log('playerContainer.boardedTransport', playerContainer.boardedTransport)
            if (playerContainer.boardedTransport && playerContainer.boardedTransport.agent.playerConfig.id === constants.AGENTS.GRYPHON) {
              scene.game.ember.showInfoDialog(this.intl.t(`messages.unmount-gryphon`), true, constants.MESSAGEIDS.UNMOUNT_GRYPHON_FOR_PORTAL);
              return;
            }
            break;
          default:
            break;
        }
      }


      if (targetTile.map === this.gameManager.scene.mapname) {
        // portal to another hex in the same map
        this.teleportInMap(scene, playerContainer, targetTile);
      } else {
        this.gameManager.pauseGame(true);
        this.gameManager.loadingNewScene = true;

        scene.game.ember.saveSceneData(scene);

        // cancel all patrol tasks...
        const agentContainers = this.gameManager.scene.agents.children;
        agentContainers.entries.forEach(agentContainer => {
          agentContainer.cancelAllTasks();
        });

        this.spawnerService.cancelAllSpawnerTasks();

        scene.cameras.main.fade(300, 0, 0, 0);
        scene.cameras.main.on('camerafadeoutcomplete', async () => {

          // let currentMap = await this.loadGameData('currentMap');
          let playerAttrs = await this.loadGameData('playerAttrs');
          let sceneData = await this.loadGameData('sceneData');
          // let playerTile = await this.loadGameData('playerTile');

          let transports = await this.loadGameData('transports');
          // scene.game.ember.gameData.transports = transports || [];

          const sceneDataForMap = sceneData[targetTile.map] || {
            allSeenTiles: [],
            storedTransports: [],
            boarded: 0
          };
          // console.log('');
          // console.log('');
          // console.error('>>>>>> portal ===> loading map', targetTile.map.toUpperCase(), 'sceneDataForMap', sceneDataForMap);
          // console.log('sceneDataForMap', sceneDataForMap);
          // console.log('');
          let data = {
            'map': targetTile.map,

            // 'gameboardData': gameboardData,
            'sceneData': sceneDataForMap,
            // 'sceneData': sceneData,

            'storedPlayerTile': {x: targetTile.x, y: targetTile.y},
            'spawnTile': {x: targetTile.x, y: targetTile.y, sF: playerAttrs.sF || 0, tF: playerAttrs.tF || 2},
            'storedPlayerAttrs': playerAttrs,
            'allSeenTiles': sceneDataForMap.seenTiles,
            'storedTransports': transports || [],
            // 'storedTransports': sceneDataForMap.transports,
            'boarded': this.playerContainer.boardedTransport?.agent?.id ? this.playerContainer.boardedTransport.agent.id : 0
          };
          this.map.getDynamicMapData(data.map).then(mapData => {
            // console.log('mapData', mapData);
            data.mapData = mapData;
            data.mapData.mapKey = data.map;

            scene.scene.start('gameboard', data);
          });

      });
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
    let waterDamage = 0;
    switch (specialTile.value) {
      case constants.FLAGS.SPECIAL.MESSAGE.value:
        if (agentContainer.isPlayer) {
          if (this.shouldShowMessage(specialTile, moveTo.scene)) {
            moveTo.scene.game.ember.showInfoDialog(this.intl.t(`messages.${specialTile.msg}`));
          }
        }
        break;
      case constants.FLAGS.SPECIAL.LAVA.value:
        if (!agentContainer.boardedTransport) {
          // fireDamage += agentContainer.agent.maxHealth + 10;
          // fireDamage += Math.floor(agentContainer.agent.maxHealth * .9) + 10;
          fireDamage += Math.floor(agentContainer.agent.maxHealth * 10) + 10;
          // console.log('on lava', agentContainer.agent.maxHealth, Math.floor(agentContainer.agent.maxHealth * 10) + 10 );
        }
        break;
      case constants.FLAGS.SPECIAL.DROWN.value:
        // console.log('on drowning water', agentContainer.agent.maxHealth, Math.floor(agentContainer.agent.maxHealth * .9) + 10 );
        waterDamage += Math.floor(agentContainer.agent.maxHealth * .9) + 10;
        break;
      case constants.FLAGS.SPECIAL.ROYALEMBER.value:
        this.checkForRoyalEmber(moveTo.scene);
        break;
      case constants.FLAGS.SPECIAL.NEST.value:
      case constants.FLAGS.SPECIAL.PORTAL.value:
      case constants.FLAGS.SPECIAL.DOCK.value:
        // do nothing
        break;
      default:
        console.log(`No handler for special value ${specialTile.value} at x:${agentContainer.rexChess.tileXYZ.x} y:${agentContainer.rexChess.tileXYZ.y}`);
        break;
    }

    // check for any special damage
    if (fireDamage) {
      this.processSpecialDamage(fireDamage, agentContainer.agent.getResistance(constants.INVENTORY.RESISTANCE.FIRE), agentContainer, 'Fire');
    }
    if (waterDamage) {
      this.processSpecialDamage(waterDamage, agentContainer.agent.getResistance(constants.INVENTORY.RESISTANCE.WATER), agentContainer, 'Water');
    }
  }

  processSpecialDamage(damage, resistance, agentContainer, killedBy) {
    if (resistance) {
      damage -= (damage * (resistance / 100));
    }

    if (damage > 0) {
      // agentContainer.takeDamage(1, agentContainer.agent, null, false);
      const takeDamageOptions = {
        baseDamage: damage,
        agentTakingDamage: agentContainer.agent,
        agentAttacking: null,
        awardExperience: false,
        killedBy: killedBy
      }

      agentContainer.takeDamage(takeDamageOptions);
    }
  }

  checkForRoyalEmber(scene) {
    if (this.placedBrazier) {
      // already placed the brazier
      return;
    }
    if (this.inventory.hasRoyalEmber()) {
      this.gameManager.pauseGame(true);

      // add the brazier flame
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

        const inventoryRoyalEmber = this.inventory.getItemById(this.constants.INVENTORY.ROYAL_EMBER_ID);
        if (inventoryRoyalEmber) {
          inventoryRoyalEmber.owned = false;
          inventoryRoyalEmber.display = false;
          this.gameManager.player.container.agent.removeInventory(inventoryRoyalEmber);
        }
      }

      // remove the gate:
      // {value: constants.SPECIAL_ACTIONS.REMOVE_DOOR.value, data: { door_id:4, tileXY: {x: 26, y: 15} }},
      let doorShapes = scene.game.ember.map.getGameObjectsAtTileXY(scene.board, {x: 26, y: 15}, scene.game.ember.constants.SHAPE_TYPE_DOOR);
      if (doorShapes && doorShapes.length) {
        doorShapes[0].makeInactive();
      }

      this.gameManager.pauseGame(false);

      // play sound  (cant be paused
      // {value: constants.SPECIAL_ACTIONS.PLAY_SOUND.value, data: { sound: 'open_door_1' }}
      this.gameManager.playSound({key: 'open_door_1'})


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

  createTeleportCommand(mapname, tileXY) {
    console.log('');
    console.log(`%c Command`, 'color: blue; font-size: 16px; margin: 15px 0 0 0;')
    console.log('');

    let teleportCommand = `{ "command": "teleport", "map": "${mapname}", "x": ${tileXY.x}, "y": ${tileXY.y} }`;
    const encryptedFix = this.storage.encrypt(teleportCommand);
    const message = htmlSafe(`Open the settings drop down dialog (the gearbox) and click the "Self Help" tab on the left side.
Copy/Paste the following characters into the white box, then click the "Fix It" button.

${encryptedFix}

That should move you to a place where you can continue the game.

Have fun!
Dan`);
    console.log(teleportCommand);
    console.log(encryptedFix);
    console.log(message.string);

    // this.ember.showInfoDialog(encryptedFix);
    // this.showInfoDialog(message);
    console.log('');

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

      if (chest.requires) {
        switch (chest.requires.id) {
          case this.constants.CHESTS.REQUIRED.UNMOUNTED:
            if (this.gameManager.player.container.boardedTransport) {
              if (chest.mountMessageDisplayed) {
                return; // don't show message again
              }
              if (this.gameManager.player.container.boardedTransport.agent.playerConfig.id === constants.AGENTS.GRYPHON) {
                this.showInfoDialog(this.intl.t(`messages.unmount-gryphon-for-chest`), true, constants.MESSAGEIDS.UNMOUNT_GRYPHON_FOR_CHEST);
                chest.mountMessageDisplayed = true;
                return;
              }
            }
            break;
          default:
            break;
        }
      }

      this.gameManager.playSound(this.constants.AUDIO.CHEST)

      chest.found = !chest.found;

      chest.sprite.anims.play(chest.animKeys[1]);

      // chest.setFrame(chest.found ? 0 : 1);
      // chest.setFrame(chest.found ? chest.openFrameIndex : chest.closedFrameIndex);

      // debugger;
      this.gameManager.player.gold = +this.gameManager.player.gold + +chest.gold;
      // chest.gold = 0;

      // special actions
      if (chest.specialActions) {
        // console.log('special Actions:', chest.specialActions)
        chest.specialActions.forEach(async (specialAction) => {
          await this.processSpecialAction.perform(chest.scene, specialAction, chest.sprite);
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
        geocache.found = true;
        await this.saveCacheFound(geocache);

        this.gameManager.pauseGame(true);  // has to be after playSound

        // show found it modal
        this.epmModalContainerClass = 'chest';
        await this.modals.open('chest-dialog', {
          coords:geocache.coords,
          parking:geocache.parking,
          gccode:geocache.gccode,
          inventory:chest.inventory,
          gold:chest.gold,
        });

        this.gameManager.pauseGame(false);

        // geocache.found = true;
        // await this.saveCacheFound(geocache);

        // all chest found?  Show Victory
        if (this.cache.allCachesFound) {
          console.log('show victory')
          this.gameManager.pauseGame(true);
          this.epmModalContainerClass = 'victory';
          await this.modals.open('victory-dialog', {
            player: {
              level: 1
            }
          });
          this.gameManager.pauseGame(false);

        }
      }

    }
  }

  @task
  *gobackTask() {
    let previousTile = yield this.loadGameData('previousTile');
    if (previousTile) {
      let targetTile = {
        map: previousTile.mapname,
        x: previousTile.x,
        y: previousTile.y
      }
      this.teleport(this.gameManager.scene.player.container, this.gameManager.scene, targetTile);
    }
  }

  @task
  *fixItTask(command) {
    if(!command) {
      return;
    }
    try {
      const decryptedCommand = this.storage.decrypt(command.trim());
      const parsedCommands = JSON.parse(decryptedCommand);
      // console.log('decrypted', decryptedCommand)
      // console.log('parsed', parsedCommands);

      let targetTile, grantedItem;

      parsedCommands.forEach(commandObj => {


      switch (commandObj.command) {
        case constants.FIXIT.TELEPORT:
          targetTile = {
            map: commandObj.map,
            x: commandObj.x,
            y: commandObj.y
          }
          this.teleport(this.gameManager.scene.player.container, this.gameManager.scene, targetTile);
          if (commandObj.tF !== undefined) {
            this.gameManager.scene.player.container.data.get('attrs').tF = commandObj.tF
          }
          if (commandObj.transportId !== undefined) {
            const transport = this.gameManager.scene.findTransportById(commandObj.transportId)
            if (transport) {
              this.gameManager.scene.player.container.boardedTransport = transport;
            } else {
              this.gameManager.scene.player.container.boardedTransport = undefined;
            }
          }
          break;
        case constants.FIXIT.INVENTORY:
          commandObj.ids.forEach(inventoryToGrant => {
            grantedItem = this.inventory.getItemById(inventoryToGrant);
            if (grantedItem) {
              grantedItem.locked = false;
              this.inventory.addInventoryFromChest(grantedItem);
            }
          });

          break;
        case constants.FIXIT.LEVEL:
          this.gameManager.player.experience = this.gameManager.getExperienceFromLevel(commandObj.level);
          break;
        case constants.FIXIT.GOLD:
          this.gameManager.player.gold = commandObj.gold;
          break;
        case constants.FIXIT.CACHES:
            commandObj.caches.forEach(cacheToGrant => {
            const geocache = this.cache.findCache(cacheToGrant);
            if (geocache) {
              geocache.found = true;
              this.saveCacheFound(geocache);
            }
          });
          break;

        default:
          console.error('No command found');
        }
      });


    } catch(error) {
      console.error(error);
    }
    yield timeout(1);
  }

  @task
  *processSpecialAction(scene, specialAction, gameObj) {
    let doorShapes, signShapes, transport, currentValue, royalEmber;
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
      case this.constants.SPECIAL_ACTIONS.REMOVE_SIGNPOST.value: // data: { sign_id:1, tileXY: {x: 11, y: 4} }
        signShapes = scene.game.ember.map.getGameObjectsAtTileXY(scene.board, specialAction.data.tileXY, scene.game.ember.constants.SHAPE_TYPE_SIGNPOST);
        if (signShapes && signShapes.length) {
          signShapes[0].makeInactive();
        }
        break;
      case this.constants.SPECIAL_ACTIONS.GET_CHEST.value:
        // debugger;
        yield timeout(1);

        break;
      case this.constants.SPECIAL_ACTIONS.PLAY_SOUND.value: // data: { sound: 'open_door_1' }
        yield timeout(400);
        this.gameManager.playSound({key: specialAction.data.sound}, specialAction.data.forcePlay, specialAction.data.volume)

        // scene.openDoorAudio.play();
        break;
      case this.constants.SPECIAL_ACTIONS.FINAL_FANFAIR.value:
        // wait for found chest sound to play...
        yield timeout(1200);
        break;
      case this.constants.SPECIAL_ACTIONS.PICKUP_ROYAL_EMBER.value:
        // console.log('Pickup royal ember');
        if (!this.inventory.hasRoyalEmber()) {
          royalEmber = this.inventory.getItemById(this.constants.INVENTORY.ROYAL_EMBER_ID);
          if (royalEmber) {
            gameObj.setAlpha(this.constants.ALPHA_OBJECT_HIDDEN_TO_PLAYER);
            gameObj.setVisible(false);
            gameObj.setActive(false);
            this.inventory.addInventoryFromChest(royalEmber);
          } else {
            console.warn('should have found royal ember')
          }
        }

        break;
      case this.constants.SPECIAL_ACTIONS.READ_SIGN.value:
        scene.game.ember.showInfoDialog(this.intl.t(`messages.signs.${specialAction.data.signMessageId}`));
        break;
      case this.constants.SPECIAL_ACTIONS.TOGGLE_PROPERTY.value:
        if (specialAction.data.spritesToToggle) { // example usage: m3-hut.js
          const numSprites = specialAction.data.spritesToToggle.length;
          for (let i = 0; i < numSprites; i++) {
            const spriteToToggle = scene.getSpriteByName(specialAction.data.spritesToToggle[i]);
            // console.log('spriteToToggle', spriteToToggle)
            if (spriteToToggle) {
              const currentValue = spriteToToggle.getData(specialAction.data.property);
// console.log('spriteToToggle before', spriteToToggle, currentValue);
              spriteToToggle.setData(specialAction.data.property, !currentValue);
// console.log('spriteToToggle after', spriteToToggle, spriteToToggle.getData(specialAction.data.property));
            }
          }
        }
        break;
      case this.constants.SPECIAL_ACTIONS.PLAY_DEPENDANT_ANIMATION.value:
        currentValue = gameObj.getData(specialAction.data.property);
        if (currentValue !== undefined && specialAction.data.sprites) {  // example usage: m3-hut.js
          const numSprites = specialAction.data.sprites.length;
          for (let i = 0; i < numSprites; i++) {
            const spriteToPlay = scene.getSpriteByName(specialAction.data.sprites[i]);
            if (spriteToPlay) {
              spriteToPlay.anims.stop();
              spriteToPlay.anims.load( currentValue ? specialAction.data.keyOn : specialAction.data.keyOff);
              spriteToPlay.anims.play( currentValue ? specialAction.data.keyOn : specialAction.data.keyOff);
            }
          }
        }
        break;
      case this.constants.SPECIAL_ACTIONS.PLAY_ANIMATION.value:
        // console.log('Do animation', specialAction.data.key);
        if (gameObj.anims) {
          gameObj.anims.play(specialAction.data.key);
        }
        break;
      case this.constants.SPECIAL_ACTIONS.MOVE_TRANSPORT.value:   // lava boat
        // console.log('TODO Move Transport', specialAction.data);
        transport = scene.findTransportById(specialAction.data.transportId);
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
