import Phaser from 'phaser';
import rexBoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin'
import {GameboardScene} from './scenes/gameboard-scene';

export default class PhaserGame {

  config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'gameContainer',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: GameboardScene,
    plugins: {
      scene: [{
        key: 'rexBoard',
        plugin: rexBoardPlugin,
        mapping: 'rexBoard'
      }]
    }
  };

  game = undefined;

  emberGameService = undefined;

  constructor(emberGameService, height, width) {
    this.createNewPhaserGame(emberGameService, height, width);
  }

  createNewPhaserGame(emberGameService, height, width) {

    this.config.height = height;
    this.config.width = width;

    this.game = new Phaser.Game(this.config);

    this.game.emberGameService = emberGameService;

    console.log('this.game',this.game);
  }

}
