import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import localforage from 'localforage';

// import MapData from './tiledata/cave1'
// import MapData from './tiledata/testmap'
import MapData from '../phaser/scenes/tiledata/landsea'

// import PlayerContainer from "../phaser/agents/player/playerContainer";
// import TransportContainer from "../phaser/agents/transport/transportContainer";

import {Player} from "../objects/agents/player";
import {Transport} from "../objects/agents/transport";

export default class GameService extends Service {

  @service constants;
  @service map;
  // @service('spawner') spawnerService;
  @service('game-manager') manager;

  @tracked cameraMainZoom = 1;
  @tracked playerImgSrc = '/images/agents/pirate.png';
  @tracked showHexInfo = false;

  @tracked sceneData = [];

  @tracked playerCoins = 0;

  getMapData() {
    return MapData;
  }

  saveSceneData(scene) {
    const sceneKey = scene.scene.key;

    const currentData = this.sceneData[sceneKey] || {};

    const transports = [];
    scene.transports.children.entries.forEach(transport => {
      transports.push({
        'id': transport.id,
        'tile': transport.rexChess.tileXYZ
      })
    });

    // children.entries[""0""].rexChess
    Object.assign(currentData, {
      'playerTile': scene.player.container.rexChess.tileXYZ,
      'playerAttrs': scene.player.container.data.get('attrs'),
      'seenTiles': scene.allSeenTiles,
      'transports': transports
    });

    this.saveGameData(sceneKey, currentData);
  }

  saveGameData(key, value) {
    localforage.setItem(key, value)
      .then((value) => {
      // console.log('done saving', value)
    }).catch((err) => {
      console.error(err);
    });
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

  createTransport(scene, transportConfig) {
    let transport = new Transport(scene, transportConfig);
    // let transport = new TransportContainer(scene, transportConfig);

    scene.board.addChess(transport.container, transportConfig.playerX, transportConfig.playerY, this.constants.TILEZ_TRANSPORTS);

    // transport.fov = scene.rexBoard.add.fieldOfView(transport, transportConfig);

    return transport.container;
  }

  processPlayerMove(player) {
    if (player.disembarkTransport) {
      this.turnOffPlayerTravelAbilityFlag(player, this.constants.FLAGS.TRAVEL.SEA);
      this.turnOnPlayerTravelAbilityFlag(player, this.constants.FLAGS.TRAVEL.LAND);

      player.boardedTransport = undefined;
      player.disembarkTransport = false;
    } else if (player.embarkTransport) {
      player.boardedTransport = player.transportToBoard;

      this.turnOffPlayerTravelAbilityFlag(player, this.constants.FLAGS.TRAVEL.LAND);
      this.turnOnPlayerTravelAbilityFlag(player, this.constants.FLAGS.TRAVEL.SEA);

      player.embarkTransport = false;
      player.transportToBoard = undefined;
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
      descriptions.push(this.constants.FLAGS.TRAVEL.LAND.description)
    }
    if (this.playerHasTravelAbilityFlag(player, this.constants.FLAGS.TRAVEL.SEA)) {
      descriptions.push(this.constants.FLAGS.TRAVEL.SEA.description)
    }
    return `Player flags: ${descriptions.join(', ')}`;
  }

  playerHasTravelAbilityFlag(player, flag) {
    return this.playerHasAbilityFlag(player, this.constants.FLAG_TYPE_TRAVEL, flag);
  }


  foundChest(chest) {
    if (chest) {
      this.playerCoins += chest.coins;
      chest.coins = 0;
    }
  }
}
