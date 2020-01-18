import Phaser from 'phaser';
import { createBoard, getHexagonGrid } from '../utils/game'
import rexBoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin'



export class GameboardScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'gameboard'
    })
  }

  DIRECTIONS = {
    SE: 0,
    S: 1,
    SW: 2,
    NW: 3,
    N: 4,
    NE: 5
  }

  playerX = 10;
  playerY = 12;
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

    this.load.image('map', '/images/maps/landsea-min.png');
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

    console.log('create');
    this.map = this.add.image(900, 918, 'map');

    // don't go out of the map
    this.physics.world.bounds.width = this.map.width;
    this.physics.world.bounds.height = this.map.height;

    this.player = this.physics.add.sprite(400, 250, 'player');

    this.player.setCollideWorldBounds(true);

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);


    let board = createBoard(this, {
      // let board = this.createBoard(this, {
      grid: getHexagonGrid(this),
      // grid: this.getHexagonGrid(this),
      // grid: getQuadGrid(this),
      width: 34,
      height: 26,
    })

    board.addChess(this.player, this.playerX, this.playerY, 0, true);

    this.playerMoveTo = this.rexBoard.add.moveTo(this.player, {
      speed: 200,
      // rotateToTarget: false,
      // occupiedTest: false,
      // blockerTest: false,
      // sneak: false,
    })
    console.log('this.playerMoveTo', this.playerMoveTo);

    // this.mapService = this.mapService;

    console.log(this);

    // both the arrow keys and the Q W S A D E keys
    this.cursors = {...this.input.keyboard.createCursorKeys(), ...this.input.keyboard.addKeys('Q,W,S,A,D,E')};

  }
  update() {
  //
  // }
  // backup_update() {
    if (!this.playerMoveTo.isRunning) {

      if (this.cursors.D.isDown) {
        this.playerX += 1;
        this.playerY += 1;
        this.playerMoveTo.moveToward(this.DIRECTIONS.SE);
        // this.playerMoveTo.moveTo(this.playerX, this.playerY);
      } else if (this.cursors.S.isDown) {
        this.playerY += 1;
        this.playerMoveTo.moveToward(this.DIRECTIONS.S);
      } else if (this.cursors.A.isDown) {
        this.playerX -= 1;
        this.playerY += 1;
        this.playerMoveTo.moveToward(this.DIRECTIONS.SW);
      } else if (this.cursors.Q.isDown) {
        this.playerX -= 1;
        this.playerY -= 1;
        this.playerMoveTo.moveToward(this.DIRECTIONS.NW);
      } else if (this.cursors.W.isDown) {
        this.playerY -= 1;
        this.playerMoveTo.moveToward(this.DIRECTIONS.N);
      } else if (this.cursors.E.isDown) {
        this.playerX += 1;
        this.playerY -= 1;
        this.playerMoveTo.moveToward(this.DIRECTIONS.NE);
      }
    } // is running

    // const playerSpeed = 300;
    // const playerSpeed = 120;

    // this.player.setVelocity(0);
    //
    // if (this.cursors.left.isDown || this.cursors.A.isDown) {
    //   // this.mapService.test('West');
    //   // this.mapService.test('West');
    //   this.player.setVelocityX(-playerSpeed);
    //   // debugger;
    //
    // } else if (this.cursors.right.isDown || this.cursors.D.isDown) {
    //
    //   this.player.setVelocityX(playerSpeed);
    //
    // }
    //
    // if (this.cursors.up.isDown || this.cursors.W.isDown) {
    //
    //   this.player.setVelocityY(-playerSpeed);
    //
    // } else if (this.cursors.down.isDown || this.cursors.S.isDown) {
    //
    //   this.player.setVelocityY(playerSpeed);
    //
    // }

  }
}
