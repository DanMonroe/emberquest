import Constants from '../utils/constants';
import Shape from 'phaser3-rex-plugins/plugins/board/shape/Shape'
import Player from '../phaser/player'

const COLOR_PRIMARY = 0x03a9f4;
const COLOR_LIGHT = 0x67daff;
const COLOR_DARK = 0x007ac1;
const COLOR_VISIBLE = 0xc49000;


export function getHexagonGrid(scene) {
  let staggeraxis = 'y';
  let staggerindex = 'even';
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

  board.scene.data.set('tileAttributes', config.sceneTiles);

  // draw grid
  let graphics = scene.add.graphics({
    lineStyle: {
      width: 1,
      color: COLOR_DARK,
      alpha: .7
      // alpha: 0
    }
  });
  // const scene = board.scene;

  // for (let tileY = 0; tileY < board.height; tileY++) {
  //   for (let tileX = 0; tileX < board.width; tileX++) {
  //     const tileXY = {
  //       x: tileX,
  //       y: tileY
  //     }
  //     console.log('tileXY', tileXY);
  //     const travelFlags = getTileAttribute(scene, tileXY, 'travelFlags');
  //
  //     const points = board.getGridPoints(tileXY.x, tileXY.y, true);
  //     graphics.strokePoints(points, true);
  //     const out = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
  //     scene.add.text(out.x, out.y, tileXY.x + ',' + tileXY.y + '-' + travelFlags, {color: '#EFB21A'})
  //       // scene.add.text(out.x, out.y, tileXY.x + ',' + tileXY.y, {color: '#EFB21A'})
  //       .setOrigin(0.5)
  //       .setDepth(3);
  //
  //
  //     // scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, Constants.COLOR_HIDDEN, Constants.ALPHA_VISIBLE, true);
  //     scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, Constants.COLOR_HIDDEN, Constants.ALPHA_VISIBLE);
  //     // .setDepth(40)
  //
  //   }
  // }

  board.forEachTileXY((tileXY, board) => {
    // const scene = board.scene;

    if(config.showHexInfo) {
      const travelFlags = getTileAttribute(scene, tileXY, 'travelFlags');
      // const wesnoth = getTileAttribute(scene, tileXY, 'wesnoth');

      const points = board.getGridPoints(tileXY.x, tileXY.y, true);
      graphics.strokePoints(points, true);
      const out = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
      // scene.add.text(out.x, out.y, tileXY.x + ',' + tileXY.y + ' ' + wesnoth + ',' + travelFlags, {color: '#EFB21A'})
      scene.add.text(out.x, out.y, tileXY.x + ',' + tileXY.y + ' ' + travelFlags, {color: '#EFB21A'})
        // scene.add.text(out.x, out.y, tileXY.x + ',' + tileXY.y, {color: '#EFB21A'})
        .setOrigin(0.5)
        .setDepth(3);
    }

    // scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, Constants.COLOR_HIDDEN, Constants.ALPHA_VISIBLE, true);
    scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, Constants.COLOR_HIDDEN, Constants.ALPHA_VISIBLE);
      // .setDepth(40)
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

export function findFOV(chessA, lastSeenTiles) {
  const board = chessA.rexChess.board;
  // var scene = board.scene;

  const chessArray = board.tileZToChessArray(-1);
  for (let i = 0, cnt = chessArray.length; i < cnt; i++) {
    chessArray[i].destroy();
  }

  let tileXYArray = chessA.fov.clearDebugGraphics().findFOV(chessA.visiblePoints);
  console.log('findFOV tileXYArray', tileXYArray);
  console.log('lastSeenTiles', board.scene.lastSeenTiles);
  console.log('player tile', chessA.rexChess.tileXYZ);
  let tileXY;
  let visibleTiles = new Set();

  for (let i = 0, cnt = tileXYArray.length; i < cnt; i++) {
    tileXY = tileXYArray[i];

    // not the player tile
    if( ! (tileXY.x === chessA.rexChess.tileXYZ.x && tileXY.y === chessA.rexChess.tileXYZ.y) ){

      // visibleTiles.add(tileXY);
      visibleTiles.add(`${tileXY.x}_${tileXY.y}`);

      const fovShape = board.tileXYToChessArray(tileXY.x, tileXY.y);

      if (fovShape && fovShape.length > 0) {
        fovShape[0].fillAlpha = Constants.ALPHA_HIDDEN;
        // console.log('fovShape', fovShape);
      }
    }

    // scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, -1, COLOR_VISIBLE, 0.3);
  }

  // update tiles visibility that are no longer in FOV
  let tempTiles = new Set();
  board.scene.lastSeenTiles.forEach((tileXY) => {
    // console.log('tile', tileXY, 'visibleTiles.has(tileXY)', visibleTiles.has(tileXY));
    if ( ! visibleTiles.has(tileXY)) {
    // if (visibleTiles.has(`${tileXY.x}_${tileXY.y}`)) {
      tempTiles.add(tileXY);
    }
  });
  console.log('tempTiles', tempTiles);

  tempTiles.forEach((tileXY) => {
    const splitTileXY = tileXY.split('_');
    const fovShape = board.tileXYToChessArray(splitTileXY[0], splitTileXY[1]);

    if (fovShape && fovShape.length > 0) {
      fovShape[0].fillAlpha = Constants.ALPHA_PREVIOUSLY_SEEN;
    } else {
      console.log('no shape - TODO find shape on from board', tileXY, fovShape);
      // const foo = board.tileXYToChessArray(splitTileXY[0], splitTileXY[1]);
    }
  });

  // remove player tile if there
  tempTiles.delete(`${chessA.rexChess.tileXYZ.x}_${chessA.rexChess.tileXYZ.y}`)

  board.scene.lastSeenTiles = visibleTiles;
// debugger;
}

export function getTileAttribute(scene, tileXY, attribute) {
  if (!scene.data || !tileXY) {
    return null;
  }
  let tileAttrs = scene.data.get('tileAttributes');
  if (tileAttrs.length < tileXY.y) {  // rows
    return null;
  }
  if (tileAttrs[0].length < tileXY.x) {  // cols
    return null;
  }
  try {

    let thisTileAttrs = tileAttrs[tileXY.y][tileXY.x]

    if (attribute) {
      return thisTileAttrs[attribute]
    } else {
      // return all attributes
      return thisTileAttrs;
    }
  } catch (e) {
debugger;
  }
}

export function playerHasAbilityFlag(playerObj, type, flag) {

  if (!playerObj.data) {
    return false;
  }
  let attrs = playerObj.data.get('attrs');

  if (flag && flag.value) {
    flag = flag.value;
  }
  if (flag) {
    switch (type) {
      case Constants.FLAG_TYPE_TRAVEL:
        return attrs['travelFlags'] & flag
      case Constants.FLAG_TYPE_VISIBILITY:
        return attrs['sightFlags'] & flag
      default:
    }
  }
  return false;
}
