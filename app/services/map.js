import Service from '@ember/service';
import { constants } from 'emberquest/services/constants';

export default class MapService extends Service {

  constants = constants;

  async getMap(mapToLoad) {
    //  Build Error:  ember-auto-import only supports dynamic import() with a string literal argument.

    let result;
    switch (mapToLoad) {
      case 'final':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/final');
        break;
      case 'castle':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/castle');
        break;
      case 'cemetery':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/cemetery');
        break;
      case 'm1':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/m1');
        break;
      case 'm2':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/m2');
        break;
      case 'm2_pyramid':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/m2_pyramid');
        break;
      case 'm3':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/m3');
        break;
      case 'm4':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/m4');
        break;
      case 'm4-cabin':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/m4-cabin');
        break;
      case 'm5':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/m5');
        break;
      case 'm6':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/m6');
        break;
      case 'm7':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/m7');
        break;
      case 'm8':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/m8');
        break;
      case 'm9':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/m9');
        break;
      case 'm9-castle':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/m9-castle');
        break;
      case 'm10':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/m10');
        break;
      case 'm11':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/m11');
        break;
      case 'm12':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/m12');
        break;
      case 'm13':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/m13');
        break;
      case 'arena':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/arena');
        break;
      case 'intro':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/intro');
        break;
      case 'intro2':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/intro2');
        break;
      case 'intro3':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/intro3');
        break;
      case 'play':
        result = await import(/* webpackChunkName: "chunkName" */ 'emberquest-map-data/tiledata/play');
        break;
      default:
        return null;
    }
    return result.default;
  }

  async getDynamicMapData(mapToLoad) {
    let map = await this.getMap(mapToLoad);
    return map;
  }


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
        const travelFlags = this.getTileAttribute(scene, tileXY, 'tF');

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

  findAgentFieldOfView(agent, fieldOfViewTileXYArray) {
    // console.log('findFOV', agent)
    const board = agent.rexChess.board;

    const chessArray = board.tileZToChessArray(-1);
    for (let i = 0, cnt = chessArray.length; i < cnt; i++) {
      chessArray[i].destroy();
    }
    // let tileXYArray = agent.fov.findFOV(agent.visiblePoints);

    // let tileXYArray = agent.fov.clearDebugGraphics().findFOV(agent.visiblePoints);
    let tileXY;
    let visibleTiles = new Set();

    // add player tile to visibility array
    fieldOfViewTileXYArray.push(agent.rexChess.tileXYZ);
    // tileXYArray.push(agent.rexChess.tileXYZ);

    for (let i = 0, cnt = fieldOfViewTileXYArray.length; i < cnt; i++) {
    // for (let i = 0, cnt = tileXYArray.length; i < cnt; i++) {
      tileXY = fieldOfViewTileXYArray[i];
      // tileXY = tileXYArray[i];

      visibleTiles.add(`${tileXY.x}_${tileXY.y}`);

      const fovShapes = this.getGameObjectsAtTileXY(board, tileXY, undefined,this.constants.SHAPE_TYPE_PLAYER);
// console.error('fovShapes.length', fovShapes.length, fovShapes, 'board.scene.lastSeenTiles', board.scene.lastSeenTiles.length, board.scene.lastSeenTiles)
      if (fovShapes && fovShapes.length > 0) {
        fovShapes.forEach(fovShape => {
          if (fovShape.type === this.constants.SHAPE_TYPE_POLYGON) {
            fovShape.fillAlpha = this.constants.ALPHA_POLYGON_VISIBLE_TO_PLAYER;
          } else {
            if (!fovShape.getData('ignoreFOVUpdate')) {

              if ( ! (fovShape.config && fovShape.config.hidden)) {

                fovShape.setAlpha(this.constants.ALPHA_OBJECT_VISIBLE_TO_PLAYER);
                if (fovShape.healthBar) {
                  fovShape.healthBar.setAlpha(this.constants.ALPHA_OBJECT_VISIBLE_TO_PLAYER);
                }
              }
              else {
                console.log('hidden or no config', fovShape.config)
              }
            }
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
            if (fovShape.healthBar) {
              fovShape.healthBar.setAlpha(this.constants.ALPHA_OBJECT_HIDDEN_TO_PLAYER);
            }

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
      console.error(e);
    }
  }

  getTileSpecial(scene, tileXY) {
    return this.getTileAttribute(scene, tileXY, 'spcl');
  }

  tileIsPortal(scene, tileXY) {
    return this.tileHasGivenSpecialAttribute(scene, tileXY, this.constants.FLAGS.SPECIAL.PORTAL.value);
  }

  tileIsDoor(scene, tileXY) {
    return this.tileHasGivenSpecialAttribute(scene, tileXY, this.constants.FLAGS.SPECIAL.DOOR.value);
  }

  tileIsDock(scene, tileXY) {
    return this.tileHasGivenSpecialAttribute(scene, tileXY, this.constants.FLAGS.SPECIAL.DOCK.value);
  }

  tileIsNest(scene, tileXY) {
    return this.tileHasGivenSpecialAttribute(scene, tileXY, this.constants.FLAGS.SPECIAL.NEST.value);
  }

  tileIsLand(scene, tileXY) {
    const travelFlags = this.getTileAttribute(scene, tileXY, 'tF');
    return travelFlags & this.constants.FLAGS.TRAVEL.LAND.value;
  }

  tileHasGivenSpecialAttribute(scene, tileXY, specialAttribute) {
    const specialAttr = this.getTileAttribute(scene, tileXY, 'spcl');
    if (!specialAttr) {
      return false;
    }

    return ((specialAttr.value & specialAttribute) === specialAttribute) ? specialAttr : undefined;
  }

  tileIsGreatTree(scene, tileXY) {
    const wesnothTerrain = this.getTileAttribute(scene, tileXY, 'w');
    if (!wesnothTerrain) {
      return false;
    }
    const terrainObj = this.getWesnothTerrainParts(wesnothTerrain);
    return terrainObj.terrainParts.length > 1 && (terrainObj.terrainParts[1].startsWith('Fet') || terrainObj.terrainParts[1].startsWith('FYa'));
  }

  // return the transport
  targetTileHasTransport(scene, tileXY) {
    const fovShapes = this.getGameObjectsAtTileXY(scene.board, tileXY, this.constants.SHAPE_TYPE_TRANSPORT);
    return (fovShapes && fovShapes.length > 0) ? fovShapes[0] : undefined;
  }

  getWesnothTerrainParts(terrain) {
    const terrainParts = terrain.split('^');
    return {
      primary: (terrainParts.length >= 1) ? terrainParts[0].charAt(0) : '',
      secondary: (terrainParts.length >= 2) ? terrainParts[1].charAt(0) : '',
      terrainParts: terrainParts
    };
  }

}
