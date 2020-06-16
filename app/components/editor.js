import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { constants } from 'emberquest/services/constants';
import { inject as service } from '@ember/service';

export default class EditorComponent extends Component {

  @service game;
  @service storage;

  constants = constants;

  @tracked mapText;
  @tracked mapImage;
  @tracked mapNorth;
  @tracked mapWest;
  @tracked mapEast;
  @tracked mapSouth;
  @tracked mapArray;
  @tracked hexesTextArray;
  @tracked hexRowsTextArray;
  @tracked hexRowIdsArray;
  @tracked finalMap;

  @tracked encryptedCoords;
  @tracked decryptedCoords;

  @tracked currentGameData;


  @action
  encryptcoords() {
    const encrypted = this.storage.encrypt(this.decryptedCoords);
    this.encryptedCoords = encrypted;
  }

  @action
  decryptcoords() {
    const decrypted = this.storage.decrypt(this.encryptedCoords);
    this.decryptedCoords = decrypted;
  }

  @action
  loadCurrentGameData() {
    this.game.loadGameData("gameboard")
      .then(gameboardData => {
        console.log('gameboardData', gameboardData);

        this.currentGameData = JSON.stringify(gameboardData, undefined, 2);

        document.getElementById('currentgamedata').value = this.currentGameData;
        // this.currentGameData = JSON.stringify(gameboardData);

        // let data = {'map': 'intro'}  // default initial map
        // if (gameboardData) {
        //   const sceneData = gameboardData.sceneData[gameboardData.currentMap] || {
        //     allSeenTiles: [],
        //     storedTransports: [],
        //     boarded: 0
        //   };
        //
        //   data = {
        //     'map': gameboardData.currentMap,
        //     'storedPlayerTile': gameboardData.playerTile,
        //     'storedPlayerAttrs': gameboardData.playerAttrs,
        //     'allSeenTiles': sceneData.seenTiles,
        //     'storedTransports': sceneData.transports,
        //     'boarded': sceneData.boarded
        //   }
        // }
        //
        // this.scene.start('gameboard', data);
      });
  }

  @action
  generateHexes() {
    this.createArrayFromTextarea();
    console.log('this.mapArray', this.mapArray);

    this.createFinalMap();
  }

  createFinalMap() {
    let mapSource = `import { constants } from './constants';

export default {

  player: {
      startX: 7,
      startY: 3
  },

  mapUrl: '/images/maps/${this.mapImage}.png',

  chests: [
    // {id: 1, x: 10, y: 3, gccode: 'GC002', gold: 20, specialActions: [], inventory: [2002]}
  ],

  signs: [
  ],

  spawnLocations : {
    players: [{x: 5, y: 7}], // tiles where the player may spawn
    transports: [
    ],
    agents: {
      spawnInterval: 3000,
      limit: 5,
      locations: []
    }
  },

  sceneTiles: [
    `;

    /****
     *
     * w:  wesnoth tile description
     */


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
        const special = this.getSpecial(terrainText, row, col);
        mapSource += `{'x': ${col}, 'y': ${row}, 'sightCost': ${sightCost}, 'sightFlags': ${sightFlags}, 'speedCost': ${speedCost}, 'travelFlags': ${travelFlags}, 'w': '${terrainText.replace(/\\/g,"\\\\")}', 'special': ${special} },
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
    IMPASSABLE: 'X',
    LAVA: 'Qlf'
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

  getSpecial(terrain, row, col) {
    let special = 0;

    if (row === 0 && this.mapNorth) {
      special = `{value:constants.FLAGS.SPECIAL.PORTAL.value,map:'${this.mapNorth}',x:${col},y:48}`;
    }
    if (row === 49 && this.mapSouth) {
      special = `{value:constants.FLAGS.SPECIAL.PORTAL.value,map:'${this.mapSouth}',x:${col},y:1}`;
    }
    if (col === 0 && this.mapWest) {
      special = `{value:constants.FLAGS.SPECIAL.PORTAL.value,map:'${this.mapWest}',x:64,y:${row}}`;
    }
    if (col === 65 && this.mapEast) {
      special = `{value:constants.FLAGS.SPECIAL.PORTAL.value,map:'${this.mapEast}',x:1,y:${row}}`;
    }

    const terrainParts = this.getWesnothTerrainParts(terrain);

    switch (terrainParts.primary) {
      case this.WESNOTH.WATER:
        switch (terrainParts.secondary) {
          case this.WESNOTH.BRIDGE:
            // special = `{value:constants.FLAGS.SPECIAL.DOCK.value}`;
            // special |= this.constants.FLAGS.SPECIAL.DOCK.value;
            break;
          default:  // regular water
        }
        break;
      case this.WESNOTH.UNWALKABLE:
        if(terrain === this.WESNOTH.LAVA) {
          special = `{value:constants.FLAGS.SPECIAL.LAVA.value}`;
        }
        break;
      default:
    }

    return special;
  }

  // TODO Castles need to be blocked "Kh"
  getTravelFlags(terrain) {
    let terrainFlags = 0;

    const terrainParts = this.getWesnothTerrainParts(terrain);

    switch (terrainParts.primary) {
      case this.WESNOTH.WATER:
        switch (terrainParts.secondary) {
          case this.WESNOTH.BRIDGE:
            terrainFlags |= this.constants.FLAGS.TRAVEL.LAND.value;
            terrainFlags |= this.constants.FLAGS.TRAVEL.SEA.value;
            terrainFlags |= this.constants.FLAGS.TRAVEL.AIR.value;
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
            if (terrain === this.WESNOTH.LAVA) {
              terrainFlags |= this.constants.FLAGS.TRAVEL.LAND.value;
            } else {
              terrainFlags |= this.constants.FLAGS.TRAVEL.AIR.value;
            }
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

  // TODO snowbank "Aa^DYb" needs more travel cost
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
        sightCost += 4;
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
