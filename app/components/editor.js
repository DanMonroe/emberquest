import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { constants } from 'emberquest/services/constants';

export default class EditorComponent extends Component {

  @tracked mapText;
  @tracked mapArray;

  @tracked hexesTextArray;
  @tracked hexRowsTextArray;

  @tracked hexRowIdsArray;

  @tracked finalMap;

  constants = constants;

  @action
  generateHexes() {
    this.createArrayFromTextarea();
    console.log('this.mapArray', this.mapArray);

    this.createFinalMap();
  }

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
        const speedCost = this.getTravelCost(terrainText);
        const sightFlags = this.getSightFlags(terrainText);
        const sightCost = this.getSightCost(terrainText);
        const special = this.getSpecial(terrainText);
        mapSource += `{'row': ${row}, 'col': ${col}, 'sightCost': ${sightCost}, 'sightFlags': ${sightFlags}, 'speedCost': ${speedCost}, 'travelFlags': ${travelFlags}, 'special': ${special}, 'wesnoth': '${terrainText.replace(/\\/g,"\\\\")}'},
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


  createArrayFromTextarea() {
    let lines = this.mapText.trim().split('\n');

    this.mapArray = [];
    lines.forEach(line => {
      let hexes = line.split(', ');
      this.mapArray.push(hexes);
    });
  }

  WESNOTH = {
    WATER: 'W',
    BRIDGE: 'B',
    FOREST: 'F',
    SNOW: 'A',
    DESERT: 'D',
    HILL: 'H',
    ROAD: 'R',
    SWAMP: 'S',
    MOUNTAIN: 'M',
    UNWALKABLE: 'Q',
    IMPASSABLE: 'X'
  };

  SPEED = {
    FOREST: -0.35,
    HILL: -0.3,
    MOUNTAIN: -0.7,
    SNOW: -0.1,
    DESERT: -0.1,
    ROAD: 0.2,
    SWAMP: -0.7,
  };

  getSpecial(terrain) {
    let special = 0;

    const terrainParts = this.getWesnothTerrainParts(terrain);

    switch (terrainParts.primary) {
      case this.WESNOTH.WATER:
        switch (terrainParts.secondary) {
          case this.WESNOTH.BRIDGE:
            special |= this.constants.FLAGS.TRAVEL.SPECIAL.DOCK.value;
            break;
          default:  // regular water
        }
        break;
      default:
    }

    return special;
  }

  getTravelFlags(terrain) {
    let terrainFlags = 0;

    const terrainParts = this.getWesnothTerrainParts(terrain);

    switch (terrainParts.primary) {
      case this.WESNOTH.WATER:
        switch (terrainParts.secondary) {
          case this.WESNOTH.BRIDGE:
            terrainFlags |= this.constants.FLAGS.TRAVEL.LAND.value;
            break;
          default:  // regular water
            terrainFlags |= this.constants.FLAGS.TRAVEL.SEA.value;
            terrainFlags |= this.constants.FLAGS.TRAVEL.AIR.value;
        }
        break;
      case this.WESNOTH.UNWALKABLE:
        switch (terrainParts.secondary) {
          case this.WESNOTH.BRIDGE: // can use land or air flags to pass through
            terrainFlags |= this.constants.FLAGS.TRAVEL.LAND.value;
            terrainFlags |= this.constants.FLAGS.TRAVEL.AIR.value;
            break;
          default:  // fly
            terrainFlags |= this.constants.FLAGS.TRAVEL.AIR.value;
        }
        break;
      case this.WESNOTH.MOUNTAIN:
        switch (terrainParts.secondary) {
          case this.WESNOTH.IMPASSABLE: // can use air flags to pass through
            terrainFlags |= this.constants.FLAGS.TRAVEL.IMPASSABLE.value;
            break;
          default:
            terrainFlags |= this.constants.FLAGS.TRAVEL.AIR.value;
        }
        break;
      case this.WESNOTH.IMPASSABLE:
        terrainFlags |= this.constants.FLAGS.TRAVEL.IMPASSABLE.value;
        break;
      default:
        terrainFlags |= this.constants.FLAGS.TRAVEL.LAND.value;
        terrainFlags |= this.constants.FLAGS.TRAVEL.AIR.value;
    }

    return terrainFlags;
  }

  getTravelCost(terrain) {
    let terrainCost = 1;

    const terrainParts = this.getWesnothTerrainParts(terrain);

    switch (terrainParts.primary) {
      case this.WESNOTH.ROAD:
        terrainCost += this.SPEED.ROAD;
        break;
      case this.WESNOTH.SWAMP:
        terrainCost += this.SPEED.SWAMP;
        break;
      case this.WESNOTH.HILL:
        terrainCost += this.SPEED.HILL;
        break;
      case this.WESNOTH.MOUNTAIN:
        terrainCost += this.SPEED.MOUNTAIN;
        break;
      case this.WESNOTH.DESERT:
        terrainCost += this.SPEED.DESERT;
        break;
      case this.WESNOTH.SNOW:
        terrainCost += this.SPEED.SNOW;
        break;
      default:
    }

    switch (terrainParts.secondary) {
      case this.WESNOTH.FOREST:
        terrainCost += this.SPEED.FOREST;
        break;
      default:  // regular water
    }

    return Math.round(terrainCost*100)/100;
  }

  getSightCost(terrain) {
    let sightCost = 1;

    const terrainParts = this.getWesnothTerrainParts(terrain);

    switch (terrainParts.primary) {
      case this.WESNOTH.MOUNTAIN:
        // sightCost += 6;
        break;
      case this.WESNOTH.IMPASSABLE:
        sightCost += 6;
        break;

      default:
    }

    switch (terrainParts.secondary) {
      case this.WESNOTH.FOREST:
        sightCost += 4;
        break;
      case this.WESNOTH.IMPASSABLE:
        sightCost += 6;
        break;
      default:  // fly
    }

    return sightCost;
  }

  getSightFlags(terrain) {
    let sightFlags = 0;

    const terrainParts = this.getWesnothTerrainParts(terrain);

    switch (terrainParts.primary) {
    // switch (terrainParts.secondary) {
      case this.WESNOTH.IMPASSABLE:
        sightFlags |= this.constants.FLAGS.SIGHT.IMPASSABLE.value;
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
