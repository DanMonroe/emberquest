import Service from '@ember/service';
import Phaser from 'phaser';
// import
import rexBoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import {createBoard, getHexagonGrid} from '../utils/game';

import { PhaserGame } from '../phaser/game'

let ember_this = undefined;



// Field of View from https://codepen.io/rexrainbow/pen/RzaMev?editors=0010
//   change fov.cone to 6 (from 2) for 360 degree fov

// also look at "finder-draw" https://codepen.io/rexrainbow/pen/JjjwPgE?editors=0010

// ahttps://codepen.io/rexrainbow/pen/xeyvPx?editors=0010

// const COLOR_PRIMARY = 0x03a9f4;
// const COLOR_LIGHT = 0x67daff;
// const COLOR_DARK = 0x007ac1;
// const COLOR_VISIBLE = 0xc49000;


export default class PhaserService extends Service {
  // DIRECTIONS = {
  //     SE: 0,
  //     S: 1,
  //     SW: 2,
  //     NW: 3,
  //     N: 4,
  //     NE: 5
  // }

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


  @service ('map') mapService;

  @tracked game;
  @tracked platforms;
  @tracked cursors;
  @tracked map;

  @tracked player;


  @tracked playerX = 10;
  @tracked playerY = 12;
  @tracked playerMoveTo;




  // ember_this = undefined;

  // createNewPhaserGame(height, width) {
  //
  //   ember_this = this;
  //
  //   ember_this.mapService.test('1');
  //
  //   this.config.height = height;
  //   this.config.width = width;
  //   this.game = new Phaser.Game(this.config);
  //
  //   ember_this.mapService.test('2');
  // }
  //
  // createBoard(scene, config) {
  //   // debugger;
  //   let board = scene.rexBoard.add.board(config);
  //   console.log('create board', board);
  //   // draw grid
  //   let graphics = scene.add.graphics({
  //     lineStyle: {
  //       width: 1,
  //       color: COLOR_DARK,
  //       alpha: .7
  //       // alpha: 0
  //     }
  //   });
  //   board.forEachTileXY((tileXY, board) => {
  //     let points = board.getGridPoints(tileXY.x, tileXY.y, true);
  //     // console.log('tileXY', tileXY, 'points', points);
  //     graphics.strokePoints(points, true);
  //   });
  //   return board;
  // }

  // getHexagonGrid(scene) {
  //   let staggeraxis = 'y';
  //   let staggerindex = 'odd';
  //   let grid = scene.rexBoard.add.hexagonGrid({
  //     x: 10,
  //     y: 36,
  //     cellWidth: 72,
  //     cellHeight: 72,
  //     staggeraxis: staggeraxis,
  //     staggerindex: staggerindex
  //   })
  //   console.log('getHexagonGrid', grid);
  //   return grid;
  // }






  // preload() {
  //   console.log('preload');
  //
  //   this.load.image('map', '/images/maps/landsea-min.png');
  //   this.load.image('player', '/images/agents/pirate.png');
  //
  //   // this.load.setBaseURL('http://labs.phaser.io');
  //   //
  //   // this.load.image('sky', 'assets/skies/space3.png');
  //   // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  //   // this.load.image('red', 'assets/particles/red.png');
  //
  // }
  //
  // create() {
  //
  //   // console.log('create');
  //   this.map = this.add.image(900, 918, 'map');
  //
  //   // don't go out of the map
  //   this.physics.world.bounds.width = this.map.width;
  //   this.physics.world.bounds.height = this.map.height;
  //
  //   this.player = this.physics.add.sprite(400, 250, 'player');
  //
  //   this.player.setCollideWorldBounds(true);
  //
  //   // set bounds so the camera won't go outside the game world
  //   this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
  //   // make the camera follow the player
  //   this.cameras.main.startFollow(this.player);
  //
  //
  //   let board = createBoard(this, {
  //   // let board = ember_this.createBoard(this, {
  //     grid: getHexagonGrid(this),
  //     // grid: ember_this.getHexagonGrid(this),
  //     // grid: getQuadGrid(this),
  //     width: 34,
  //     height: 26,
  //   })
  //
  //   board.addChess(this.player, ember_this.playerX, ember_this.playerY, 0, true);
  //
  //   ember_this.playerMoveTo = this.rexBoard.add.moveTo(this.player, {
  //     speed: 200,
  //     // rotateToTarget: false,
  //     // occupiedTest: false,
  //     // blockerTest: false,
  //     // sneak: false,
  //   })
  //   console.log('ember_this.playerMoveTo', ember_this.playerMoveTo);
  //
  //   // this.mapService = ember_this.mapService;
  //
  //   console.log(this);
  //
  //   // both the arrow keys and the Q W S A D E keys
  //   this.cursors = {...this.input.keyboard.createCursorKeys(), ...this.input.keyboard.addKeys('Q,W,S,A,D,E')};
  //
  // }
  //
  // update() {
  //   if (!ember_this.playerMoveTo.isRunning) {
  //
  //     if (this.cursors.D.isDown) {
  //       ember_this.playerX += 1;
  //       ember_this.playerY += 1;
  //       ember_this.playerMoveTo.moveToward(ember_this.DIRECTIONS.SE);
  //       // ember_this.playerMoveTo.moveTo(ember_this.playerX, ember_this.playerY);
  //     } else if (this.cursors.S.isDown) {
  //       ember_this.playerY += 1;
  //       ember_this.playerMoveTo.moveToward(ember_this.DIRECTIONS.S);
  //     } else if (this.cursors.A.isDown) {
  //       ember_this.playerX -= 1;
  //       ember_this.playerY += 1;
  //       ember_this.playerMoveTo.moveToward(ember_this.DIRECTIONS.SW);
  //     } else if (this.cursors.Q.isDown) {
  //       ember_this.playerX -= 1;
  //       ember_this.playerY -= 1;
  //       ember_this.playerMoveTo.moveToward(ember_this.DIRECTIONS.NW);
  //     } else if (this.cursors.W.isDown) {
  //       ember_this.playerY -= 1;
  //       ember_this.playerMoveTo.moveToward(ember_this.DIRECTIONS.N);
  //     } else if (this.cursors.E.isDown) {
  //       ember_this.playerX += 1;
  //       ember_this.playerY -= 1;
  //       ember_this.playerMoveTo.moveToward(ember_this.DIRECTIONS.NE);
  //     }
  //   } // is running
  //
  //   // const playerSpeed = 300;
  //   // const playerSpeed = 120;
  //
  //   // this.player.setVelocity(0);
  //   //
  //   // if (this.cursors.left.isDown || this.cursors.A.isDown) {
  //   //   // this.mapService.test('West');
  //   //   // ember_this.mapService.test('West');
  //   //   this.player.setVelocityX(-playerSpeed);
  //   //   // debugger;
  //   //
  //   // } else if (this.cursors.right.isDown || this.cursors.D.isDown) {
  //   //
  //   //   this.player.setVelocityX(playerSpeed);
  //   //
  //   // }
  //   //
  //   // if (this.cursors.up.isDown || this.cursors.W.isDown) {
  //   //
  //   //   this.player.setVelocityY(-playerSpeed);
  //   //
  //   // } else if (this.cursors.down.isDown || this.cursors.S.isDown) {
  //   //
  //   //   this.player.setVelocityY(playerSpeed);
  //   //
  //   // }
  //
  // }
}
