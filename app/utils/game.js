import Constants from '../utils/constants';

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

// export function createPlayer(board, config) {
export function createPlayer(scene, config) {
//   var tileX = config.playerX,
//     tileY = config.playerY;
//   if (tileX === undefined) {
//     var tileXY = board.getRandomEmptyTileXY(0, true);
//     tileX = tileXY.x;
//     tileY = tileXY.y;
//   }
//   var scene = board.scene;
//   var chessA = scene.rexBoard.add.shape(board, tileX, tileY, 0, Constants.COLOR_LIGHT)
//     .setDepth(1);
//   chessA.fov = scene.rexBoard.add.fieldOfView(chessA, config);
//   return chessA;




  let player = new Player(scene, config.playerX, config.playerY, 'player');
  // let player = scene.physics.add.sprite(0, 0, 'player');
  player.setScale(1.25);
  player.setDepth(10);

  // player.setCollideWorldBounds(true);

  // scene.rexBoard.add.existing(player);
  // scene.rexBoard.add.shape(scene.board, 5,4, 0, COLOR_LIGHT)
    // .setDepth(1);
  // player.fov = scene.rexBoard.add.fieldOfView(player, config);
  // player.fov = scene.board.scene.rexBoard.add.fieldOfView(player, config);

  // player.fov = scene.rexBoard.add.fieldOfView(player, config);

  // player.fov = scene.rexBoard.add.fieldOfView(this, config);


  console.log('Created Player', player);
  return player;
}

export function findFOV(chessA) {
  var board = chessA.rexChess.board;
  var scene = board.scene;

  var chessArray = board.tileZToChessArray(-1);
  for (var i = 0, cnt = chessArray.length; i < cnt; i++) {
    chessArray[i].destroy();
  }

  var tileXYArray = chessA.fov.clearDebugGraphics().findFOV();
  var tileXY;
  for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
    tileXY = tileXYArray[i];
    scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, -1, COLOR_VISIBLE, 0.3);
  }
}
