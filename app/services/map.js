import Service from '@ember/service';
import { inject as service } from '@ember/service';
import cave1 from '../phaser/scenes/tiledata/cave1';
import landsea from '../phaser/scenes/tiledata/landsea'
// import {cave1} from './../node_modules/map-data/cave1';
// import {landsea} from '/map-data'

export default class MapService extends Service {

  @service constants;

  getMapData(mapToLoad) {
    switch (mapToLoad) {
      case 'cave1':
        return cave1;
      case 'landsea':
        return landsea;
      default:
        return null;
    }
  }
  // async getMapData(mapToLoad) {
  //   import('/map-data/tiledata/cave1').then((module) => {
  //   // import('/map-data/testmap').then((module) => {
  //     debugger;
  //     console.log(module)
  //     });
  //   // const mappath = '/map-data/tiledata/'+mapToLoad;
  //   // return await import(mappath);
  //
  //     // switch (mapToLoad) {
  //       // case 'cave1':
  //       //   return await import('/map-data/tiledata/cave1.js');
  //       // case 'landsea':
  //       //   return await import('/map-data/tiledata/landsea.js');
  //       // default:
  //       //   return await import('/map-data/testmap');
  //       // return null;
  //     // }
  //
  // }


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

      const allSeenTileKey = `${tileXY.x}_${tileXY.y}`;
      const previouslySeen = config.allSeenTiles.has(allSeenTileKey);

      scene.rexBoard.add.shape(board, tileXY.x, tileXY.y, this.constants.TILEZ_FOG, this.constants.COLOR_HIDDEN,
        previouslySeen ? this.constants.ALPHA_PREVIOUSLY_SEEN : this.constants.ALPHA_POLYGON_HIDDEN_TO_PLAYER);

    });

    // enable touch events
    if (true || this.boardIsInteractive) {
      board.setInteractive();
    }

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

      const fovShapes = this.getGameObjectsAtTileXY(board, tileXY, undefined,this.constants.SHAPE_TYPE_PLAYER);
      if (fovShapes && fovShapes.length > 0) {
        fovShapes.forEach(fovShape => {
          if (fovShape.type === this.constants.SHAPE_TYPE_POLYGON) {
            fovShape.fillAlpha = this.constants.ALPHA_POLYGON_VISIBLE_TO_PLAYER;
          } else {
            fovShape.setAlpha(this.constants.ALPHA_OBJECT_VISIBLE_TO_PLAYER);
          }
        });
      }
    }

    // update tiles visibility that are no longer in FOV
    let tempTiles = new Set();
    board.scene.lastSeenTiles.forEach((tileXY) => {
      if ( ! visibleTiles.has(tileXY)) {
        tempTiles.add(tileXY);
      }
    });

    // console.log('tempTiles', tempTiles)
    tempTiles.forEach((tileXY) => {
      const splitTileXY = tileXY.split('_');

      const fovShapes = this.getGameObjectsAtTileXY(board, {x:splitTileXY[0], y:splitTileXY[1]}, undefined,"Player");

      if (fovShapes && fovShapes.length > 0) {
        fovShapes.forEach(fovShape => {
          if (fovShape.type === this.constants.SHAPE_TYPE_POLYGON) {
            fovShape.fillAlpha = this.constants.ALPHA_PREVIOUSLY_SEEN;
          } else {
            fovShape.setAlpha(this.constants.ALPHA_OBJECT_HIDDEN_TO_PLAYER);
          }
        });
      }
    });

    // remove player tile if there
    tempTiles.delete(`${agent.rexChess.tileXYZ.x}_${agent.rexChess.tileXYZ.y}`);

    // Keep track of previously seen tiles and keep all seen tiles
    board.scene.lastSeenTiles = visibleTiles;
    visibleTiles.forEach(board.scene.allSeenTiles.add, board.scene.allSeenTiles);
  }

  // get a list of specific types with passing in a type ("Polygon", "Chest", etc)
  // or get all objects at tile that are not of type excludedType  - everything but "Player"
  getGameObjectsAtTileXY(board, tileXY, type, excludedType) {
    const fovShapeArray = board.tileXYToChessArray(tileXY.x, tileXY.y);
    if (fovShapeArray && fovShapeArray.length > 0) {
      return fovShapeArray.filter(object => {
        if (object.type) {
          if (excludedType) {
            if (object.type === this.constants.SHAPE_TYPE_CONTAINER) {
              return object.containerType !== excludedType;
            } else {
              return object.type !== excludedType;
            }
          }
          if (object.type === this.constants.SHAPE_TYPE_CONTAINER) {
            return object.containerType === type;
          } else {
            return object.type === type;
          }
        }
      });
    }
    return undefined;
  }

  getShapeAtTileXY(board, tileXY, type) {
    const fovShapeArray = board.tileXYToChessArray(tileXY.x, tileXY.y);
    if (fovShapeArray && fovShapeArray.length > 0) {
      return fovShapeArray.filter(object => {
        if (object.type) {
          if (object.type === this.constants.SHAPE_TYPE_CONTAINER) {
            return object.containerType === type;
          } else {
            return object.type === type;
          }
        } else {
          return false;
        }
        // return (object.type && object.type === type);
      });
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

  tileIsPortal(scene, tileXY) {
    const specialAttr = this.getTileAttribute(scene, tileXY, 'special')
      if (!specialAttr) {
      return undefined;
    }
    if( (specialAttr.value & this.constants.FLAGS.SPECIAL.PORTAL.value) === this.constants.FLAGS.SPECIAL.PORTAL.value);
    return specialAttr;
    // return specialAttr.value & this.constants.FLAGS.SPECIAL.PORTAL.value;
  }


  tileIsDock(scene, tileXY) {
    return this.getTileAttribute(scene, tileXY, 'special') & this.constants.FLAGS.SPECIAL.DOCK.value;
  }

  // return the transport
  targetTileHasTransport(scene, tileXY) {
    const fovShapes = this.getGameObjectsAtTileXY(scene.board, tileXY, this.constants.SHAPE_TYPE_TRANSPORT);
    return (fovShapes && fovShapes.length > 0) ? fovShapes[0] : undefined;
  }

}
