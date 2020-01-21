// import { Player } from '../phaser/player';

import Player from '../phaser/player'

const COLOR_PRIMARY = 0x03a9f4;
const COLOR_LIGHT = 0x67daff;
const COLOR_DARK = 0x007ac1;
const COLOR_VISIBLE = 0xc49000;


export function getHexagonGrid(scene) {
  let staggeraxis = 'y';
  let staggerindex = 'odd';
  let grid = scene.rexBoard.add.hexagonGrid({
    x: 10,
    y: 36,
    cellWidth: 72,
    cellHeight: 72,
    staggeraxis: staggeraxis,
    staggerindex: staggerindex
  })
  console.log('getHexagonGrid', grid);
  return grid;
}

export function createBoard(scene, config) {

  let board = scene.rexBoard.add.board(config);

  // draw grid
  let graphics = scene.add.graphics({
    lineStyle: {
      width: 1,
      color: COLOR_DARK,
      alpha: .7
      // alpha: 0
    }
  });
  board.forEachTileXY((tileXY, board) => {
    let points = board.getGridPoints(tileXY.x, tileXY.y, true);
    // console.log('tileXY', tileXY, 'points', points);
    graphics.strokePoints(points, true);
    var scene = board.scene;
    var out = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
    scene.add.text(out.x, out.y, tileXY.x + ',' + tileXY.y, {color: '#EFB21A'})
      .setOrigin(0.5)
      .setDepth(3);

  });

  // board.addChess(config.player, config.playerStartX, config.playerStartY, 0, true);

  // enable touch events
  if (true || this.boardIsInteractive) {
    console.log('board is interactive');
    board.setInteractive();
  }

  console.log('Created Board', board);
  return board;
}

export function createPlayer(scene, playerX, playerY) {
  let player = new Player(scene, playerX, playerY, 'player');
  // let player = scene.physics.add.sprite(0, 0, 'player');
  player.setScale(1.25);

  // player.setCollideWorldBounds(true);

  // add behaviors
  // player.playerMoveTo = scene.rexBoard.add.moveTo(player, {
  //   speed: 200, // 400 default
  //   // rotateToTarget: false,
  //   // occupiedTest: false,
  //   // blockerTest: false,
  //   // sneak: false,
  // });

  // player.pathFinder = scene.rexBoard.add.pathFinder(player, {
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

  // private members  - What do these do?
  // used in showMoveableArea
  // player._movingPoints = 5;   // this is sight/movement Range
  // player._markers = [];       // array of possible movement hexes

  // From https://codepen.io/rexrainbow/pen/qvGLPd?editors=0010
  // FOV parameters
  // player.face = 0;
  //
  // player.coneMode = 'direction';
  // player.cone = 2;
  //
  // // coneMode: 'angle',
  // // cone: 120,
  //
  // player.costCallback = (tileXY, fov)  => {
  //   var board = fov.board;
  //   return (board.tileXYZToChess(tileXY.x, tileXY.y, 0)) ? fov.BLOCKER : 0;
  // };
  //
  // player.debug = {
  //   graphics: scene.add.graphics().setDepth(10),
  // }

  // player.moveToTileXY = (endTileXY) => {
  //   console.log('player moveToTileXY', endTileXY);
  //   if (this.playerMoveTo.isRunning) {
  //     return false;
  //   }
  //   // var tileXYArray = this.pathFinder.findPath(endTileXY);
  //   // this.showMovingPath(tileXYArray);
  //   // this.moveAlongPath(tileXYArray);
  //   // return true;
  // }
  //
  // player.moveAlongPath(path) {
  //   if (path.length === 0) {
  //     return;
  //   }
  //
  //   this.moveTo.once('complete', function () {
  //     this.moveAlongPath(path);
  //   }, this);
  //   this.moveTo.moveTo(path.shift());
  //   return this;
  // }
  //
  // player.showMovingPath(tileXYArray) {
  //   this.hideMovingPath();
  //   var tileXY, worldXY;
  //   var scene = this.scene,
  //     board = this.rexChess.board;
  //   for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
  //     tileXY = tileXYArray[i];
  //     worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
  //     var text = scene.add.text(worldXY.x, worldXY.y, tileXY.cost)
  //       .setOrigin(0.5);
  //     this._marker.push(text);
  //   }
  // }
  //
  // player.hideMovingPath() {
  //   for (var i = 0, cnt = this._marker.length; i < cnt; i++) {
  //     this._marker[i].destroy();
  //   }
  //   this._marker.length = 0;
  //   return this;
  // }

  console.log('Created Player', player);
  return player;
}

export function playerMoveTo(cursors, moveToObj) {
  // if (!moveToObj.isRunning) {
  //   if (cursors.D.isDown) {
  //     moveToObj.moveToward(DIRECTIONS.SE);
  //   } else if (cursors.S.isDown) {
  //     moveToObj.moveToward(DIRECTIONS.S);
  //   } else if (cursors.A.isDown) {
  //     moveToObj.moveToward(DIRECTIONS.SW);
  //   } else if (cursors.Q.isDown) {
  //     moveToObj.moveToward(DIRECTIONS.NW);
  //   } else if (cursors.W.isDown) {
  //     moveToObj.moveToward(DIRECTIONS.N);
  //   } else if (cursors.E.isDown) {
  //     moveToObj.moveToward(DIRECTIONS.NE);
  //   }
  // }
}
