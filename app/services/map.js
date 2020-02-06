import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class MapService extends Service {

  @service constants;

  getHexagonGrid(scene) {
    return scene.rexBoard.add.hexagonGrid({
      x: 10,
      y: 36,
      cellWidth: 72,
      cellHeight: 72,
      staggeraxis: 'y',
      staggerindex: 'even'
    });
  }

  createBoard(scene, config) {

    let board = scene.rexBoard.add.board(config);

    board.scene.data.set('tileAttributes', config.sceneTiles);

    // draw grid
    let graphics;
    if(config.showHexInfo) {
      graphics = scene.add.graphics({
        lineStyle: {
          width: 1,
          color: this.constants.COLORS.DARK,
          alpha: .7
          // alpha: 0
        }
      });
    }

    // const blitter = scene.add.blitter(0, 0, 'blackhex');
    // blitter.setAlpha(Constants.ALPHA_VISIBLE);
    // console.log('blitter', blitter)

    board.forEachTileXY((tileXY, board) => {

      if(config.showHexInfo) {
        const travelFlags = this.getTileAttribute(scene, tileXY, 'travelFlags');

        const points = board.getGridPoints(tileXY.x, tileXY.y, true);
        graphics.strokePoints(points, true);
        const out = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
        scene.add.text(out.x, out.y, tileXY.x + ',' + tileXY.y + ' ' + travelFlags, {color: '#EFB21A'})
          .setOrigin(0.5)
          .setDepth(3);
      }


      scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, this.constants.TILEZ_FOG, this.constants.COLOR_HIDDEN, this.constants.ALPHA_VISIBLE);

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

  findFOV(agent) {
    const board = agent.rexChess.board;

    const chessArray = board.tileZToChessArray(-1);
    for (let i = 0, cnt = chessArray.length; i < cnt; i++) {
      chessArray[i].destroy();
    }

    let tileXYArray = agent.fov.clearDebugGraphics().findFOV(agent.visiblePoints);
    let tileXY;
    let visibleTiles = new Set();

    // add player tile to visibility array
    tileXYArray.push(agent.rexChess.tileXYZ);

    for (let i = 0, cnt = tileXYArray.length; i < cnt; i++) {
      tileXY = tileXYArray[i];

      visibleTiles.add(`${tileXY.x}_${tileXY.y}`);

      const fovShape = this.getShapeAtTileXY(board, tileXY);

      if (fovShape) {
        fovShape.fillAlpha = this.constants.ALPHA_HIDDEN;
      }
    }

    // update tiles visibility that are no longer in FOV
    let tempTiles = new Set();
    board.scene.lastSeenTiles.forEach((tileXY) => {
      if ( ! visibleTiles.has(tileXY)) {
        tempTiles.add(tileXY);
      }
    });

    tempTiles.forEach((tileXY) => {
      const splitTileXY = tileXY.split('_');
      const fovShape = this.getShapeAtTileXY(board, splitTileXY);

      if (fovShape) {
        fovShape.fillAlpha = this.constants.ALPHA_PREVIOUSLY_SEEN;
      }
    });

    // remove player tile if there
    tempTiles.delete(`${agent.rexChess.tileXYZ.x}_${agent.rexChess.tileXYZ.y}`)

    board.scene.lastSeenTiles = visibleTiles;
  }

  getShapeAtTileXY(board, tileXY) {
    const fovShapeArray = board.tileXYToChessArray(tileXY.x, tileXY.y);
    if (fovShapeArray && fovShapeArray.length > 0) {
      return fovShapeArray.find(object => (object.type && object.type === "Polygon"));
    }
    return undefined;
  }

  getTileAttribute(scene, tileXY, attribute) {
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
// debugger;
    }
  }

}
