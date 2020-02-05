import Phaser from 'phaser';
import { createBoard, getHexagonGrid, createPlayer, getTileAttribute, findFOV } from '../../utils/game'

// import MapData from './tiledata/cave1'
// import MapData from './tiledata/testmap'
import MapData from './tiledata/landsea'
import Constants from '../../utils/constants';

export class GameboardScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'gameboard'
    })
  }

  playerMoveTo = undefined;

  lastSeenTiles = new Set();

  preload() {

    this.load.image('map', MapData.mapUrl);
    // this.load.image('map', '/images/maps/landsea-min.png');
    this.load.image('player', '/images/agents/pirate.png');

  }

  create() {
    console.log('create gameboard scene');

    this.cameras.main.zoom = 0.8;


    const playerConfig = {
      playerX: MapData.player.startX,
      playerY: MapData.player.startY,
      // playerX: this.playerX,
      // playerY: this.playerY,
      face: 0,
      coneMode: 'direction',
      cone: 6,
      // cone: 2,
      // board: this.board
      costCallback:  (tileXY, fov) => {
        // const sightFlags = getTileAttribute(this.board.scene, tileXY, 'sightFlags');
        const sightCost = getTileAttribute(this.board.scene, tileXY, 'sightCost');

        return sightCost;
        // return sightFlags ? sightFlags * 4 : 1;

      },
      preTestCallback: (tileXYArray, visiblePoints, fov) => {
        // debugger;
        // console.log('preTestCallback', tileXYArray, visiblePoints, fov);

        // Limit sight range tp player's "moving points"
        // array includes player hex so add one
// if (tileXYArray.length > (this.player.visiblePoints-1)) {
if (tileXYArray.length > (this.player._sightRange + 1)) {
  return false;
}


        return true;
      },

      debug: {
        // graphics: this.add.graphics().setDepth(10),
        log: false
      }

    };

    // if (true || this.showTheMap) {

      this.map = this.add.image(0, 0, 'map');
      this.map.setOrigin(0,0);

      // don't go out of the map
      this.physics.world.bounds.width = this.map.width;
      this.physics.world.bounds.height = this.map.height;

      console.log('MapData.sceneTiles', MapData.sceneTiles);

      this.board = createBoard(this, {
        grid: getHexagonGrid(this),
        width: MapData.sceneTiles[0].length,
        height: MapData.sceneTiles.length,
        // width: 12,
        // height: 12,

        sceneTiles: MapData.sceneTiles,
        showHexInfo: false
      });

      this.player = createPlayer(this, playerConfig);
      // this.player = new Player(this, this.playerX, this.playerY, 'player');

      // this will kick out the shape at the player location! ??
      this.board.addChess(this.player, playerConfig.playerX, playerConfig.playerY, Constants.TILEZ_PLAYER);
      // this.board.addChess(this.player, playerConfig.playerX, playerConfig.playerY, 0, true);

      this.player.fov = this.rexBoard.add.fieldOfView(this.player, playerConfig);

      // set bounds so the camera won't go outside the game world
      this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
      // make the camera follow the player
      this.cameras.main.startFollow(this.player);

      // this.player.showMoveableArea();

      // this.input.on('pointerdown', (pointer) => {
      //   // chessA.fov.face++;
      //   findFOV(this.player, this.lastSeenTiles);
      // });

      findFOV(this.player);

//     } else {
//       this.board = createBoard(this, {
//         grid: getHexagonGrid(this),
//         width: 12,
//         height: 12
//       });
//
//
// // console.log('this.board', this.board);
//
//
//       // this.player = createPlayer(this.board,
//       this.player = createPlayer(this, playerConfig);
//       // this.player = new Player(this, this.playerX, this.playerY, 'player');
//
//       this.board.addChess(this.player, playerConfig.playerX, playerConfig.playerY, 0, true);
//
//       this.player.fov = this.rexBoard.add.fieldOfView(this.player, playerConfig);
//
//       new Blocker(this.board, {x:5,y:5});
//       // add some
//       // blockers
//       for (var i = 0; i < 10; i++) {
//         new Blocker(this.board);
//       }
//
//       // this.player.showMoveableArea();
//
//       this.input.on('pointerdown', (pointer) => {
//         // chessA.fov.face++;
//         findFOV(this.player);
//       });
//
//       findFOV(this.player);
//     }

    // both the arrow keys and the Q W S A D E keys
    this.cursors = {...this.input.keyboard.createCursorKeys(), ...this.input.keyboard.addKeys('Q,W,S,A,D,E')};

    this.boardExperiments();

    console.log('this gameboard-scene', this)
  }

  boardExperiments() {

    // click end tileXY
    this.board.on('tiledown',  (pointer, tileXY) => {
      const allAttrs = getTileAttribute(this, tileXY);

      console.log('tiledown tileXY', tileXY,'allAttrs',allAttrs);
      // this.player.moveToTileXY(tileXY);

      var clickedShape = this.board.tileXYToChessArray(tileXY.x, tileXY.y);
      console.log('clickedShape', clickedShape);
      // clickedShape[0].fillAlpha = 0;
    });
  }


  update() {

    this.player.moveTo(this.cursors);

    // playerMoveTo(this.cursors, this.player.playerMoveTo);


  }
}

class Blocker extends RexPlugins.Board.Shape {
  constructor(board, tileXY) {
    var scene = board.scene;
    if (tileXY === undefined) {
      tileXY = board.getRandomEmptyTileXY(0);
    }
    // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
    super(board, tileXY.x, tileXY.y, 0, 0x000000, 0);
    // super(board, tileXY.x, tileXY.y, 0, 0x555555);
    scene.add.existing(this);
  }
}
