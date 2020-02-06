import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

// import MapData from './tiledata/cave1'
// import MapData from './tiledata/testmap'
import MapData from '../phaser/scenes/tiledata/landsea'

import Player from "../phaser/player";

export default class GameService extends Service {

  @service map;
  @service constants;

  @tracked cameraMainZoom = 0.8;
  @tracked playerImgSrc = '/images/agents/pirate.png';
  @tracked showHexInfo = false;

  getMapData() {
    return MapData;
  }

  createPlayer(scene, playerConfig) {
    let player = new Player(scene, playerConfig);

    scene.board.addChess(player, playerConfig.playerX, playerConfig.playerY, this.constants.TILEZ_PLAYER);

    player.fov = scene.rexBoard.add.fieldOfView(player, playerConfig);

    return player;
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

}
