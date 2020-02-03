import Phaser from 'phaser';
import Constants from '../utils/constants';
import { findFOV, getTileAttribute, playerHasAbilityFlag } from '../utils/game'

 // let player = scene.physics.add.sprite(0, 0, 'player');
export default class Player extends Phaser.GameObjects.Sprite {

  scene = undefined;

  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);

    this.scene = scene;
    this.board = scene.board;

    this.moveToObject = scene.rexBoard.add.moveTo(this, {
      speed: 200, // 400 default
      // rotateToTarget: false,
      // occupiedTest: false,
      // blockerTest: true,
      // sneak: false,
    });
    this.moveToObject.on('complete', this.moveToComplete);

    this.moveToObject.moveableTestCallback = (curTile, preTile, pathFinder) => {
      if (this.moveToObject.isRunning) {
        return false;
      }
      const travelFlags = getTileAttribute(pathFinder.scene, preTile, 'travelFlags');
      const canMove = playerHasAbilityFlag(pathFinder.scene.player, Constants.FLAG_TYPE_TRAVEL, travelFlags);
      // console.log('canMove', canMove);

      if (!canMove) {
        const wesnoth = getTileAttribute(pathFinder.scene, preTile, 'wesnoth');
        console.log('cant move! preTile', preTile, 'travelFlags', travelFlags, 'wesnoth', wesnoth);
      }

      // return true;
      return canMove;

    }

    // add behaviors
    // this.moveTo = scene.rexBoard.add.moveTo(this);
    this.pathFinder = scene.rexBoard.add.pathFinder(this, {
      occupiedTest: true,
      pathMode: 'A*',
      blockerTest: true,
      costCallback:  (curTile, preTile, pathFinder) => {
        // pathFinder.gameObject is 'this'  i.e., this Player object
        const travelFlags = getTileAttribute(pathFinder.chessData.board.scene, preTile, 'travelFlags');
        console.log('pathFinder costCallback', curTile, preTile, pathFinder, travelFlags);

        return travelFlags ? 100 : 0;
        // return travelFlags ? fov.BLOCKER : 0;
        // return (board.tileXYZToChess(tileXY.x, tileXY.y, 0)) ? fov.BLOCKER : 0;
      },

    });

    // private members
    // used in showMoveableArea
    this._sightRange = 3;   // this is sight/movement Range
    this._movingPoints = 3;   // this is sight/movement Range
    this._markers = [];       // array of possible movement hexes

    this.visiblePoints = 8;   // this is sight/movement Range
    this.movingPoints = 3;   // this is sight/movement Range

    // FOV parameters
    this.face = 0;
    this.coneMode = 'direction';
    this.cone = 2;  // 2 = 120 degrees... 6 for 360 degrees

    // this.costCallback =  (tileXY, fov) => {
    //   let board = fov.board;
    //   return (board.tileXYZToChess(tileXY.x, tileXY.y, 0)) ? fov.BLOCKER : 0;
    // };
    //
    // // this.debug = {
    // //   graphics: this.add.graphics().setDepth(10)
    // // }

    // this.fov = scene.rexBoard.add.fieldOfView(this, {
    //   face: this.face,
    //   coneMode: this.coneMode,
    //   cone: this.cone,
    //   board: this.board
    // });

    const attrs = {
      sightFlags: 0,
      travelFlags: Constants.FLAGS.TRAVEL.LAND.value
    }
    this.setData('attrs', attrs);
  }


  moveTo(cursors) {

    if (!this.moveToObject.isRunning) {

      if (cursors.D.isDown) {
        this.moveToObject.moveToward(Constants.DIRECTIONS.SE);
        // this.showMoveableArea();
      } else if (cursors.S.isDown) {
        this.moveToObject.moveToward(Constants.DIRECTIONS.S);
        // this.showMoveableArea();
      } else if (cursors.A.isDown) {
        this.moveToObject.moveToward(Constants.DIRECTIONS.SW);
        // this.showMoveableArea();
      } else if (cursors.Q.isDown) {
        this.moveToObject.moveToward(Constants.DIRECTIONS.NW);
        // this.showMoveableArea();
      } else if (cursors.W.isDown) {
        this.moveToObject.moveToward(Constants.DIRECTIONS.N);
        // this.showMoveableArea();
      } else if (cursors.E.isDown) {
        this.moveToObject.moveToward(Constants.DIRECTIONS.NE);
        // this.showMoveableArea();
      }
    }
  }

  moveToComplete(player, gameObject){
    // console.log('moveToComplete', moveTo, gameObject);
    // player.showMoveableArea();
    findFOV(player);
  }

  moveToTileXY = (endTileXY) => {
    console.log('player moveToTileXY', endTileXY);
    if (this.moveToObject.isRunning) {
      return false;
    }
    const tileXYArray = this.pathFinder.findPath(endTileXY);
    console.log('tileXYArray', tileXYArray);

    this.showMovingPath(tileXYArray);
    this.moveAlongPath(tileXYArray);
    return true;
  }

  moveAlongPath = (path) => {
    if (path.length === 0) {
      this.showMoveableArea();
      return;
    }

    this.moveToObject.once('complete', function () {
      this.moveAlongPath(path);
    }, this);
    this.moveToObject.moveTo(path.shift());
    return this;
  }

  showMovingPath = (tileXYArray) => {
    this.hideMovingPath();
    var tileXY, worldXY;
    var scene = this.scene,
      board = this.rexChess.board;
    for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
      tileXY = tileXYArray[i];
      worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
      var text = scene.add.text(worldXY.x, worldXY.y, tileXY.cost)
        .setOrigin(0.5);
      this._markers.push(text);
    }
  }

  hideMovingPath = () => {
    for (var i = 0, cnt = this._markers.length; i < cnt; i++) {
      this._markers[i].destroy();
    }
    this._markers.length = 0;
    return this;
  }

  showMoveableArea = () => {
    this.hideMoveableArea();
    // console.log('this._movingPoints', this._movingPoints);
    var tileXYArray = this.pathFinder.findArea(this._movingPoints);
    for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
      this._markers.push(
        new MoveableMarker(this, tileXYArray[i])
      );
    }
    return this;
  }

  hideMoveableArea = () => {
    for (var i = 0, cnt = this._markers.length; i < cnt; i++) {
      this._markers[i].destroy();
    }
    this._markers.length = 0;
    return this;
  }

  // findFOV = ()  => {
  //   debugger;
  //   var board = this.rexChess.board;
  //   var scene = board.scene;
  //
  //   var chessArray = board.tileZToChessArray(-1);
  //   for (var i = 0, cnt = chessArray.length; i < cnt; i++) {
  //     chessArray[i].destroy();
  //   }
  //
  //   var tileXYArray = this.fov.clearDebugGraphics().findFOV();
  //   var tileXY;
  //   for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
  //     tileXY = tileXYArray[i];
  //     scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, -1, Constants.COLOR_VISIBLE, 0.3);
  //   }
  // }

  // pathFinder = this.scene.rexBoard.add.pathFinder(this, {
  //   cacheCost: false,
  //   costCallback: (curTile, preTile, pathFinder) => {
  //     var board = pathFinder.board;
  //     if (board.contains(curTile.x, curTile.y, 0)) {
  //       return pathFinder.BLOCKER;
  //     }
  //     var cost = 1;
  //     var prePreTile = preTile.preNodes[0];
  //     if (prePreTile) {
  //       var dirPreTileToCurTile = board.getNeighborTileDirection(preTile, curTile);
  //       var dirPrePreTileToPreTile = board.getNeighborTileDirection(prePreTile, preTile);
  //       if (dirPreTileToCurTile !== dirPrePreTileToPreTile) {
  //         cost += 1;
  //       }
  //     }
  //     return cost;
  //   }
  // });






















  // // player = undefined;
  // scene = undefined;
  // x = 0;
  // y = 0;
  // key = undefined;
  // // let player = scene.physics.add.sprite(0, 0, 'player');
  // constructor(scene, x=0, y=0, key) {
  //   debugger;
  //   this.scene = scene;
  //
  //   this.player = this.scene.physics.add.sprite(x, y, key);
  //
  //   this.player.setScale(1.25);
  //   this.player.setCollideWorldBounds(true);
  // }
  //
  // // let player = scene.physics.add.sprite(0, 0, 'player');
  // // player.setScale(1.25);
  // //
  // // player.setCollideWorldBounds(true);
  //
  // // add behaviors
  // playerMoveTo = this.scene.rexBoard.add.moveTo(this.player, {
  //   speed: 200, // 400 default
  //   // rotateToTarget: false,
  //   // occupiedTest: false,
  //   // blockerTest: false,
  //   // sneak: false,
  // });
  //
  // pathFinder = scene.rexBoard.add.pathFinder(this.player, {
  //   cacheCost: false,
  //   costCallback: function (curTile, preTile, pathFinder) {
  //     var board = pathFinder.board;
  //     if (board.contains(curTile.x, curTile.y, 0)) {
  //       return pathFinder.BLOCKER;
  //     }
  //     var cost = 1;
  //     var prePreTile = preTile.preNodes[0];
  //     if (prePreTile) {
  //       var dirPreTileToCurTile = board.getNeighborTileDirection(preTile, curTile);
  //       var dirPrePreTileToPreTile = board.getNeighborTileDirection(prePreTile, preTile);
  //       if (dirPreTileToCurTile !== dirPrePreTileToPreTile) {
  //         cost += 1;
  //       }
  //     }
  //     return cost;
  //   }
  // });
  //
  // // private members  - What do these do?
  // // used in showMoveableArea
  // _movingPoints = 5;   // this is sight/movement Range
  // _markers = [];       // array of possible movement hexes
  //
  // // From https://codepen.io/rexrainbow/pen/qvGLPd?editors=0010
  // // FOV parameters
  // face = 0;
  //
  // coneMode = 'direction';
  // cone = 2;
  //
  // // coneMode: 'angle',
  // // cone: 120,
  //
  // costCallback = (tileXY, fov)  => {
  //   var board = fov.board;
  //   return (board.tileXYZToChess(tileXY.x, tileXY.y, 0)) ? fov.BLOCKER : 0;
  // };
  //
  // debug = {
  //   graphics: scene.add.graphics().setDepth(10),
  // }
  //
  // // showMoveableArea() {
  // //   this.hideMoveableArea();
  // //   var tileXYArray = this.pathFinder.findArea(this._movingPoints);
  // //   for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
  // //     this._markers.push(
  // //       new MoveableMarker(this, tileXYArray[i])
  // //     );
  // //   }
  // //   return this;
  // // }
  //
  // hideMoveableArea() {
  //   for (var i = 0, cnt = this._markers.length; i < cnt; i++) {
  //     this._markers[i].destroy();
  //   }
  //   this._markers.length = 0;
  //   return this;
  // }
  //
  // moveToTile(endTile) {
  //   if (this.moveTo.isRunning) {
  //     return false;
  //   }
  //   var tileXYArray = this.pathFinder.getPath(endTile.rexChess.tileXYZ);
  //   this.moveAlongPath(tileXYArray);
  //   return true;
  // }
  //
  // moveAlongPath(path) {
  //   if (path.length === 0) {
  //     this.showMoveableArea();
  //     return;
  //   }
  //
  //   this.moveTo.once('complete', function () {
  //     this.moveAlongPath(path);
  //   }, this);
  //   this.moveTo.moveTo(path.shift());
  //   return this;
  // }

}

class MoveableMarker extends RexPlugins.Board.Shape {
  constructor(chess, tileXY) {
    var board = chess.rexChess.board;
    var scene = board.scene;
    // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
    super(board, tileXY.x, tileXY.y, -1, Constants.COLOR2_DARK);
    scene.add.existing(this);
    this.setScale(0.5);

    // on pointer down, move to this tile
    this.on('board.pointerdown', function () {
      if (!chess.moveToTileXY(this)) {
        return;
      }
      this.setFillStyle(Constants.COLOR2_LIGHT);
    }, this);
  }
}
