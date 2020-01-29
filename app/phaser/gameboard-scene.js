import Phaser from 'phaser';
import { createBoard, getHexagonGrid, createPlayer, getTileAttribute, findFOV } from '../utils/game'
import rexBoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin'

export class GameboardScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'gameboard'
    })
  }

  playerX = 8;
  playerY = 3;
  playerMoveTo = undefined;


  preload() {
  //   console.log('preload');
  // }
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

    const playerConfig = {
      playerX: this.playerX,
      playerY: this.playerY,
      face: 0,
      coneMode: 'direction',
      cone: 6,
      // cone: 2,
      // board: this.board
      costCallback:  (tileXY, fov) => {
        const sightFlags = getTileAttribute(this.board.scene, tileXY, 'sightFlags');
        return sightFlags ? fov.BLOCKER : 0;
        // return (board.tileXYZToChess(tileXY.x, tileXY.y, 0)) ? fov.BLOCKER : 0;
      },
      preTestCallback: (tileXYArray, visiblePoints, fov) => {
        // debugger;
        // console.log('preTestCallback', tileXYArray, visiblePoints, fov);

        // Limit sight range tp player's "moving points"
        // array includes player hex so add one
        if (tileXYArray.length > (this.player._sightRange + 1)) {
          return false;
        }

        // var board = fov.board;
        // var tileXY;
        // for (var i = 1, cnt = tileXYArray.length; i < cnt; i++) {
        //   tileXY = tileXYArray[i];
        //   if (board.tileXYZToChess(tileXY.x, tileXY.y, 0)) {
        //     return false;
        //   }
        // }
        return true;
      },

      debug: {
        graphics: this.add.graphics().setDepth(10),
        log: false
      }

    };

    if (true || this.showTheMap) {

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

      this.player = createPlayer(this, playerConfig);
      // this.player = new Player(this, this.playerX, this.playerY, 'player');

      this.board.addChess(this.player, this.playerX, this.playerY, 0, true);

      this.player.fov = this.rexBoard.add.fieldOfView(this.player, playerConfig);

      // new Blocker(this.board, {x:4,y:4});
      // new Blocker(this.board, {x:4,y:5});
      // new Blocker(this.board, {x:4,y:7});
      // new Blocker(this.board, {x:5,y:3});
      // new Blocker(this.board, {x:5,y:4});
      // new Blocker(this.board, {x:5,y:5});
      // new Blocker(this.board, {x:5,y:6});
      // new Blocker(this.board, {x:6,y:4});
      // new Blocker(this.board, {x:6,y:5});
      // new Blocker(this.board, {x:6,y:6});


      // set bounds so the camera won't go outside the game world
      this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
      // make the camera follow the player
      this.cameras.main.startFollow(this.player);

      this.player.showMoveableArea();

      this.input.on('pointerdown', (pointer) => {
        // chessA.fov.face++;
        findFOV(this.player);
      });

      findFOV(this.player);

    } else {
      this.board = createBoard(this, {
        grid: getHexagonGrid(this),
        width: 12,
        height: 12
      });


console.log('this.board', this.board);


      // this.player = createPlayer(this.board,
      this.player = createPlayer(this, playerConfig);
      // this.player = new Player(this, this.playerX, this.playerY, 'player');

      this.board.addChess(this.player, this.playerX, this.playerY, 0, true);

      this.player.fov = this.rexBoard.add.fieldOfView(this.player, playerConfig);

      new Blocker(this.board, {x:5,y:5});
      // add some
      // blockers
      for (var i = 0; i < 10; i++) {
        new Blocker(this.board);
      }

      // this.board.addChess(this.player, this.playerX, this.playerY, 0, true);

      this.player.showMoveableArea();

      this.input.on('pointerdown', (pointer) => {
        // chessA.fov.face++;
        findFOV(this.player);
      });

      findFOV(this.player);
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
      // this.player.moveToTileXY(tileXY);

      var clickedShape = this.board.tileXYToChessArray(tileXY.x, tileXY.y);
      console.log('clickedShape', clickedShape);
      clickedShape[0].fillAlpha = 0;
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
