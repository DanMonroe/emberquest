import Phaser from 'phaser';
import { createBoard, getHexagonGrid, createPlayer, playerMoveTo } from '../utils/game'
import rexBoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin'

export class GameboardScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'gameboard'
    })
  }

  // DIRECTIONS = {
  //   SE: 0,
  //   S: 1,
  //   SW: 2,
  //   NW: 3,
  //   N: 4,
  //   NE: 5
  // }

  playerX = 7;
  playerY = 3;
  playerMoveTo = undefined;

  // config = {
  //   type: Phaser.AUTO,
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  //   parent: 'gameContainer',
  //   physics: {
  //     default: 'arcade',
  //     arcade: {
  //       gravity: { y: 0 },
  //       debug: false
  //     }
  //   },
  //   scene: {
  //     preload: this.preload,
  //     create: this.create,
  //     update: this.update
  //   },
  //   plugins: {
  //     scene: [{
  //       key: 'rexBoard',
  //       plugin: rexBoardPlugin,
  //       mapping: 'rexBoard'
  //     }]
  //   }
  // };

  // createNewPhaserGame(height, width) {
  //
  //   this = this;
  //
  //   this.mapService.test('1');
  //
  //   this.config.height = height;
  //   this.config.width = width;
  //   this.game = new Phaser.Game(this.config);
  //
  //   this.mapService.test('2');
  // }

  preload() {
  //   console.log('preload');
  // }
  // backup_preload() {
    console.log('preload');

    this.load.image('map', '/images/maps/testhex1.png');
    // this.load.image('map', '/images/maps/landsea-min.png');
    this.load.image('player', '/images/agents/pirate.png');

    // this.load.setBaseURL('http://labs.phaser.io');
    //
    // this.load.image('sky', 'assets/skies/space3.png');
    // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // this.load.image('red', 'assets/particles/red.png');

  }

  create() {
  //   console.log('create');
  //
  // }
  // backup_create() {

    console.log('create gameboard scene');
    if (false || this.showTheMap) {

      this.map = this.add.image(0, 0, 'map');
      this.map.setOrigin(0,0);

      // don't go out of the map
      this.physics.world.bounds.width = this.map.width;
      this.physics.world.bounds.height = this.map.height;

      this.board = createBoard(this, {
        grid: getHexagonGrid(this),
        width: 12,
        height: 12
      });

      this.player = createPlayer(this, this.playerX, this.playerY);
      // this.player = new Player(this, this.playerX, this.playerY, 'player');

      this.board.addChess(this.player, this.playerX, this.playerY, 0, true);

      // set bounds so the camera won't go outside the game world
      this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
      // make the camera follow the player
      this.cameras.main.startFollow(this.player);
    } else {
      this.board = createBoard(this, {
        grid: getHexagonGrid(this),
        width: 12,
        height: 12
      });

      this.player = createPlayer(this, this.playerX, this.playerY);
      // this.player = new Player(this, this.playerX, this.playerY, 'player');


      this.board.addChess(this.player, this.playerX, this.playerY, 0, true);

    }

    // this.board = createBoard(this, {
    //   grid: getHexagonGrid(this),
    //   width: 12,
    //   height: 12,
    //   player: this.player,
    //   playerStartX: 7,
    //   playerStartY: 3,
    // })

    // both the arrow keys and the Q W S A D E keys
    this.cursors = {...this.input.keyboard.createCursorKeys(), ...this.input.keyboard.addKeys('Q,W,S,A,D,E')};

    this.boardExperiments();
  }

  boardExperiments() {

    // click end tileXY
    this.board.on('tiledown',  (pointer, tileXY) => {
      console.log('tiledown - pointer', pointer, 'tileXY', tileXY);
      this.player.moveToTileXY(tileXY);
    });
  }


  update() {

    this.player.moveTo(this.cursors);

    // playerMoveTo(this.cursors, this.player.playerMoveTo);


  }
}
