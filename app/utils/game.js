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
  // debugger;
  let board = scene.rexBoard.add.board(config);
  console.log('create board', board);
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
  });
  return board;
}
