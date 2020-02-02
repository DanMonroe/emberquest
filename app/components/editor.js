import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Constants from '../utils/constants';

export default class EditorComponent extends Component {
  // @service editor;
  // @service constants;

  @tracked mapText;
  @tracked mapArray;

  @tracked hexesTextArray;
  @tracked hexRowsTextArray;

  @tracked hexRowIdsArray;

  @tracked finalMap;

  @action
  generateHexes() {
    // this.hardcoded();
    this.createArrayFromTextarea();
    console.log('this.mapArray', this.mapArray);
    // this.createHexRows();
    //
    // console.log('hexesTextArray', this.hexesTextArray);
    // console.log('hexRowsTextArray', this.hexRowsTextArray);

    this.createFinalMap();
  }

  // hardcoded() {
  //   let rowTiles = []
  //
  //   for (let i = 0; i < 12; i++) {
  //     let colTiles = []
  //     for (let j = 0; j < 12; j++) {
  //       const tile = {'sightFlags': 0, 'travelFlags': 1};
  //       colTiles.push(tile);
  //     }
  //     rowTiles.push(colTiles);
  //   }
  //   rowTiles[6][4].sightFlags = 1;
  //   rowTiles[6][5].sightFlags = 1;
  //   rowTiles[5][5].sightFlags = 1;
  //
  //   rowTiles[1][5].travelFlags = 2;
  //   rowTiles[1][6].travelFlags = 2;
  //   rowTiles[1][7].travelFlags = 2;
  //   rowTiles[1][8].travelFlags = 2;
  //
  //   rowTiles[2][3].travelFlags = 2;
  //   rowTiles[2][4].travelFlags = 2;
  //   rowTiles[2][5].travelFlags = 2;
  //   rowTiles[2][9].travelFlags = 2;
  //
  //   rowTiles[3][2].travelFlags = 2;
  //   rowTiles[3][9].travelFlags = 2;
  //
  //   rowTiles[4][2].travelFlags = 2;
  //   rowTiles[4][4].travelFlags = 2;
  //   rowTiles[4][5].travelFlags = 2;
  //   rowTiles[4][7].travelFlags = 2;
  //   rowTiles[4][10].travelFlags = 2;
  //
  //   rowTiles[5][1].travelFlags = 2;
  //   rowTiles[5][3].travelFlags = 2;
  //   rowTiles[5][4].travelFlags = 2;
  //   rowTiles[5][5].travelFlags = 2;
  //   rowTiles[5][6].travelFlags = 2;
  //   rowTiles[5][9].travelFlags = 2;
  //
  //   rowTiles[6][1].travelFlags = 2;
  //   rowTiles[6][4].travelFlags = 2;
  //   rowTiles[6][5].travelFlags = 2;
  //   rowTiles[6][6].travelFlags = 2;
  //   rowTiles[6][8].travelFlags = 2;
  //   rowTiles[6][9].travelFlags = 2;
  //
  //   rowTiles[7][1].travelFlags = 2;
  //   rowTiles[7][7].travelFlags = 2;
  //
  //   rowTiles[8][2].travelFlags = 2;
  //   rowTiles[8][8].travelFlags = 2;
  //
  //   rowTiles[9][2].travelFlags = 2;
  //   rowTiles[9][3].travelFlags = 2;
  //   rowTiles[9][8].travelFlags = 2;
  //
  //   rowTiles[10][4].travelFlags = 2;
  //   rowTiles[10][5].travelFlags = 2;
  //   rowTiles[10][6].travelFlags = 2;
  //   rowTiles[10][7].travelFlags = 2;
  //   rowTiles[10][8].travelFlags = 2;
  //
  //   let mapSource = `sceneTiles: [`;
  //   for (let i = 0; i < 12; i++) {
  //     mapSource += `[`;
  //     for (let j = 0; j < 12; j++) {
  //       mapSource += `{'sightFlags': ${rowTiles[i][j].sightFlags}, 'travelFlags': ${rowTiles[i][j].travelFlags}},`;
  //     }
  //     mapSource += `],
  //     `;
  //   }
  //   mapSource += `]
  //   `;
  //
  //   this.finalMap = mapSource;
  // }

  createFinalMap() {
    let mapSource = `
export default {

  player: {
      startX: 7,
      startY: 3
  },

  mapUrl: '/images/maps/.png',

  sceneTiles: [
    `;

    let row = 0;
    this.mapArray.forEach((terrainRow) => {
      mapSource += `    [
        `;

      let col = 0;
      terrainRow.forEach((terrainText) => {
        const travelFlags = this.getTravelFlags(terrainText);
        const sightFlags = this.getSightFlags(terrainText);
        mapSource += `{'row': ${row}, 'col': ${col}, 'sightFlags': ${sightFlags}, 'travelFlags': ${travelFlags}, 'wesnoth': '${terrainText.replace(/\\/g,"\\\\")}'},
    `;
        col++;
      });
      mapSource += `],
`;

      row++;

    });
    mapSource += `  ]
}`;

    this.finalMap = mapSource;

  }

//   createFinalMap() {
//     const hexRowsListText = `hexRows: [${this.hexRowIdsArray.join(',')}]`;
//     const hexesText = this.hexesTextArray.join('\n');
//     const hexRowsText = this.hexRowsTextArray.join('\n');
//
//     const mapSource = `import { Layout } from 'geoquest-octane/objects/layout'
// import { Point } from 'geoquest-octane/objects/point'
//
// export default function(server) {
//   const layout = new Layout({
//     orientation: Layout.FLAT,
//     size: new Point({x:36, y:41.75}),
//     origin: new Point({x:0, y:0})
//   });
//
// ${hexesText}
//
// ${hexRowsText}
//
//   server.create('map', {
//     id: 1,
//     layout: layout,
//     name: '',
//     backgroundImage: '.png',
//     backgroundImageWidth: 0,
//     backgroundImageHeight: 0,
//     backgroundOffsetX: -8,
//     backgroundOffsetY: -35,
//     ${hexRowsListText}
//   });
// }
// `;
//     this.finalMap = mapSource;
//   }

  createHexRows() {
    this.hexesTextArray = [];
    this.hexRowsTextArray = [];
    this.hexRowIdsArray = [];
    this.mapArray.forEach((terrainRow, row) => {
      let hexIds = [];
      terrainRow.forEach((terrainText, col) => {
        this.hexesTextArray.push(this.createHexLine(col, row, terrainText));
        hexIds.push(`hex${col}_${row}`);
      });
      const hexListText = hexIds.join(',');
      this.hexRowsTextArray.push(`const hexRow${row} = server.create('hex-row', {hexes: [${hexListText}]});`);
      this.hexRowIdsArray.push(`hexRow${row}`);
    });
  }

  createHexLine(col, row, terrain) {
    const travelFlags = this.getTravelFlags(terrain);
    const sightFlags = this.getSightFlags(terrain);
    const specialFlags = 0;
    let hextext = `const hex${col}_${row} = server.create('hex', {layout: layout, col: ${col}, row: ${row}, wesnoth: "${terrain.replace(/\\/g,"\\\\")}", sightFlags: ${sightFlags}, travelFlags: ${travelFlags}, specialFlags: ${specialFlags}, tiles: []});`;
    return hextext;
  }

  createArrayFromTextarea() {
    let lines = this.mapText.trim().split('\n');
    // this.shiftAndPopArray(lines);

    this.mapArray = [];
    lines.forEach(line => {
      let hexes = line.split(', ');
      // this.shiftAndPopArray(hexes);
      this.mapArray.push(hexes);
    });
  }

  shiftAndPopArray(sourceArray) {
    sourceArray.pop();
    sourceArray.shift();
  }

  WESNOTH = {
    WATER: 'W',
    BRIDGE: 'B',
    UNWALKABLE: 'Q',
    IMPASSABLE: 'X'
  }

  getTravelFlags(terrain) {
    let terrainFlags = 0;

    const terrainParts = this.getWesnothTerrainParts(terrain);

    switch (terrainParts.primary) {
      case this.WESNOTH.WATER:
        switch (terrainParts.secondary) {
          case this.WESNOTH.BRIDGE: // can use land or sea flags to pass through
            terrainFlags |= Constants.FLAGS.TRAVEL.LAND.value;
            terrainFlags |= Constants.FLAGS.TRAVEL.SEA.value;
            break;
          default:  // regular water
            terrainFlags |= Constants.FLAGS.TRAVEL.SEA.value;
            terrainFlags |= Constants.FLAGS.TRAVEL.AIR.value;
        }
        break;
      case this.WESNOTH.UNWALKABLE:
        switch (terrainParts.secondary) {
          case this.WESNOTH.BRIDGE: // can use land or air flags to pass through
            terrainFlags |= Constants.FLAGS.TRAVEL.LAND.value;
            terrainFlags |= Constants.FLAGS.TRAVEL.AIR.value;
            break;
          default:  // fly
            terrainFlags |= Constants.FLAGS.TRAVEL.AIR.value;
        }
        break;
      case this.WESNOTH.IMPASSABLE:
        terrainFlags |= Constants.FLAGS.TRAVEL.IMPASSABLE.value;
        break;
      default:
        terrainFlags |= Constants.FLAGS.TRAVEL.LAND.value;
        terrainFlags |= Constants.FLAGS.TRAVEL.AIR.value;
    }

    return terrainFlags;
  }

  getSightFlags(terrain) {
    let sightFlags = 0;

    const terrainParts = this.getWesnothTerrainParts(terrain);

    switch (terrainParts.primary) {
    // switch (terrainParts.secondary) {
      case this.WESNOTH.IMPASSABLE:
        sightFlags |= Constants.FLAGS.SIGHT.IMPASSABLE.value;
        break;
      default:
    }

    return sightFlags;
  }

  getWesnothTerrainParts(terrain) {
    const terrainParts = terrain.split('^');
    return {
      primary: (terrainParts.length >= 1) ? terrainParts[0].charAt(0) : '',
      secondary: (terrainParts.length >= 2) ? terrainParts[1].charAt(0) : ''
    };
  }
}
