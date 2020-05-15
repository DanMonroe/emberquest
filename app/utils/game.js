// import Player from '../phaser/player'

// const COLOR_DARK = 0x007ac1;


// export function getHexagonGrid(scene) {
//   let staggeraxis = 'y';
//   let staggerindex = 'even';
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

// export function createBoard(scene, config) {
//
//   let board = scene.rexBoard.add.board(config);
//
//   board.scene.data.set('tileAttributes', config.sceneTiles);
//
//   // draw grid
//   let graphics = scene.add.graphics({
//     lineStyle: {
//       width: 1,
//       color: COLOR_DARK,
//       alpha: .7
//       // alpha: 0
//     }
//   });
//
//   // const blitter = scene.add.blitter(0, 0, 'blackhex');
//   // blitter.setAlpha(Constants.ALPHA_VISIBLE);
//   // console.log('blitter', blitter)
//
//   board.forEachTileXY((tileXY, board) => {
//     // const scene = board.scene;
//
//     if(config.showHexInfo) {
//       const travelFlags = getTileAttribute(scene, tileXY, 'travelFlags');
//       // const wesnoth = getTileAttribute(scene, tileXY, 'w'); // wesnoth tile
//
//       const points = board.getGridPoints(tileXY.x, tileXY.y, true);
//       graphics.strokePoints(points, true);
//       const out = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
//       // scene.add.text(out.x, out.y, tileXY.x + ',' + tileXY.y + ' ' + wesnoth + ',' + travelFlags, {color: '#EFB21A'})
//       scene.add.text(out.x, out.y, tileXY.x + ',' + tileXY.y + ' ' + travelFlags, {color: '#EFB21A'})
//         // scene.add.text(out.x, out.y, tileXY.x + ',' + tileXY.y, {color: '#EFB21A'})
//         .setOrigin(0.5)
//         .setDepth(3);
//     }
//
//
//     // scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, Constants.TILEZ_FOG, Constants.COLOR_HIDDEN, Constants.ALPHA_VISIBLE);
//
//
//     // if (tileXY.x === 3 && tileXY.y === 1) {
//       let shape = scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, Constants.TILEZ_FOG, Constants.COLOR_HIDDEN, Constants.ALPHA_VISIBLE);
//     //   console.log('shape', shape)
//     // }
//     // if (tileXY.x % 3 === 0 && tileXY.y % 2 === 0) {
//     //   const bob = blitter.create(((tileXY.x + 1) * 36) + 27, ((tileXY.y + 1) * 36) - 2);
//     //   // console.log('bob', bob)
//     //   console.count('bob')
//     //   // bob.setAlpha(0.3)
//     // }
//
//
//
//
//   });
//
//
//
//   // board.addChess(config.player, config.playerStartX, config.playerStartY, 0, true);
//
//   // enable touch events
//   if (true || this.boardIsInteractive) {
//     console.log('board is interactive');
//     board.setInteractive();
//   }
//
//   console.log('Created Board', board);
//   return board;
// }

// export function createPlayer(scene, config) {
//   let player = new Player(scene, config);
//   console.log('Created Player', player);
//   return player;
// }

// export function findFOV(chessA) {
//   const board = chessA.rexChess.board;
//   // var scene = board.scene;
//
//   const chessArray = board.tileZToChessArray(-1);
//   for (let i = 0, cnt = chessArray.length; i < cnt; i++) {
//     chessArray[i].destroy();
//   }
//
//   let tileXYArray = chessA.fov.clearDebugGraphics().findFOV(chessA.visiblePoints);
//   // console.log('findFOV tileXYArray', tileXYArray);
//   // console.log('lastSeenTiles', board.scene.lastSeenTiles);
//   // console.log('player tile', chessA.rexChess.tileXYZ);
//   let tileXY;
//   let visibleTiles = new Set();
//
//   // add player tile to visibility array
//   tileXYArray.push(chessA.rexChess.tileXYZ);
//
//   for (let i = 0, cnt = tileXYArray.length; i < cnt; i++) {
//     tileXY = tileXYArray[i];
//
//     visibleTiles.add(`${tileXY.x}_${tileXY.y}`);
//
//     const fovShape = getShapeAtTileXY(board, tileXY);
//
//     if (fovShape) {
//       fovShape.fillAlpha = Constants.ALPHA_VISIBLE_TO_PLAYER;
//     }
//
//   }
//
//   // update tiles visibility that are no longer in FOV
//   let tempTiles = new Set();
//   board.scene.lastSeenTiles.forEach((tileXY) => {
//     if ( ! visibleTiles.has(tileXY)) {
//       tempTiles.add(tileXY);
//     }
//   });
//
//   tempTiles.forEach((tileXY) => {
//     const splitTileXY = tileXY.split('_');
//     const fovShape = getShapeAtTileXY(board, splitTileXY);
//
//     if (fovShape) {
//       fovShape.fillAlpha = Constants.ALPHA_PREVIOUSLY_SEEN;
//     }
//
//   });
//
//   // remove player tile if there
//   tempTiles.delete(`${chessA.rexChess.tileXYZ.x}_${chessA.rexChess.tileXYZ.y}`)
//
//   board.scene.lastSeenTiles = visibleTiles;
// }

// export function getShapeAtTileXY(board, tileXY) {
//   const fovShapeArray = board.tileXYToChessArray(tileXY.x, tileXY.y);
//   if (fovShapeArray && fovShapeArray.length > 0) {
//     return fovShapeArray.find(object => (object.type && object.type === "Polygon"));
//   }
//   return undefined;
// }

// export function getTileAttribute(scene, tileXY, attribute) {
//   if (!scene.data || !tileXY) {
//     return null;
//   }
//   let tileAttrs = scene.data.get('tileAttributes');
//   if (tileAttrs.length < tileXY.y) {  // rows
//     return null;
//   }
//   if (tileAttrs[0].length < tileXY.x) {  // cols
//     return null;
//   }
//   try {
//
//     let thisTileAttrs = tileAttrs[tileXY.y][tileXY.x]
//
//     if (attribute) {
//       return thisTileAttrs[attribute]
//     } else {
//       // return all attributes
//       return thisTileAttrs;
//     }
//   } catch (e) {
// // debugger;
//   }
// }

// export function playerHasAbilityFlag(playerObj, type, flag) {
//
//   if (!playerObj.data) {
//     return false;
//   }
//   let attrs = playerObj.data.get('attrs');
//
//   if (flag && flag.value) {
//     flag = flag.value;
//   }
//   if (flag) {
//     switch (type) {
//       case Constants.FLAG_TYPE_TRAVEL:
//         return attrs['travelFlags'] & flag
//       case Constants.FLAG_TYPE_VISIBILITY:
//         return attrs['sightFlags'] & flag
//       default:
//     }
//   }
//   return false;
// }
