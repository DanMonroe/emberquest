import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import localforage from 'localforage';

// import MapData from './tiledata/cave1'
// import MapData from './tiledata/testmap'
import MapData from '../phaser/scenes/tiledata/landsea'

import Player from "../phaser/player";

export default class GameService extends Service {

  @service constants;
  @service map;
  @service('spawner') spawnerService;

  @tracked cameraMainZoom = 0.8;
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

    Object.assign(currentData, {
      'playerTile': scene.player.rexChess.tileXYZ,
      'seenTiles': scene.allSeenTiles
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

  createPlayer(scene, playerConfig) {
    let player = new Player(scene, playerConfig);

    scene.board.addChess(player, playerConfig.playerX, playerConfig.playerY, this.constants.TILEZ_PLAYER);

    player.fov = scene.rexBoard.add.fieldOfView(player, playerConfig);

    return player;
  }

  processPlayerMove(player) {
    const tileXYZ = player.rexChess.tileXYZ;
    console.log('player moved', tileXYZ, player);

    const chestsHere = player.scene.board.tileXYZToChess(tileXYZ.x, tileXYZ.y, this.constants.TILEZ_CHESTS);
    console.log('chestsHere', chestsHere);
    if (chestsHere) {
      chestsHere.playerFound();
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


  foundChest(chest) {
    if (chest) {
      this.playerCoins += chest.coins;
      chest.coins = 0;
    }
  }
}
