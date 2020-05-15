import { constants } from 'emberquest/services/constants';

export default {

  player: {
    startX: 14,
    startY: 5
  },

  mapUrl: '/images/maps/intro.png',

  chests: [
    {
      id: 1, x: 5, y: 7,
      gccode: 'GC8QAYM',
      gold: 15,
      specialActions: [
        {value: constants.SPECIAL_ACTIONS.REMOVE_DOOR.value, data: { door_id:1, tileXY: {x: 11, y: 4} }},
        {value: constants.SPECIAL_ACTIONS.REMOVE_SIGHT_COST.value, data: { tileXY: {x: 11, y: 3} }},
        {value: constants.SPECIAL_ACTIONS.PLAY_SOUND.value, data: { sound: 'open_door_1' }}
      ]
    }
  ],

  doors: [
    {
      id: 1, x: 11, y: 4,
      texture: 'door_wooden_n',
      textureSize: { width: 42, height: 42},
      scale: 1,
      tileBeyond: { x: 11, y: 3},  // tile that has sightCost blocker,
      hideIfCacheFound: 'GC8QAYM'    // don't spawn if this cache is found
    }
  ],

  spawnLocations : {
    players: [{x: 15, y: 5}], // tiles where the player may spawn
    transports: {
      spawnInterval: 3000,
      limit: 1,
      locations: []
    },

    agents: {
      spawnInterval: 3000,
      limit: 5,
      locations: []
    }
  },

  sceneTiles: [
    [
      {'row': 0, 'col': 0, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 1, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 2, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 3, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 4, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 5, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 6, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 7, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 8, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 9, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 10, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 11, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 12, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 13, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 14, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 15, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 16, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 17, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 18, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 0, 'col': 19, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
    ],
    [
      {'row': 1, 'col': 0, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 1, 'col': 1, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 1, 'col': 2, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 1, 'col': 3, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 1, 'col': 4, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 1, 'col': 5, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 1, 'col': 6, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 1, 'col': 7, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 1, 'col': 8, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 1, 'col': 9, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 1, 'col': 10, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Gg^Efm'},
      {'row': 1, 'col': 11, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 1, 'col': 12, 'sightCost': 5, 'sightFlags': 0, 'speedCost': 0.65, 'travelFlags': 6, 'special': 0, 'w': 'Gs^Fms'},
      {'row': 1, 'col': 13, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 1, 'col': 14, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 1, 'col': 15, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 1, 'col': 16, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 1, 'col': 17, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 1, 'col': 18, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 1, 'col': 19, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
    ],
    [
      {'row': 2, 'col': 0, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 2, 'col': 1, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 2, 'col': 2, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 2, 'col': 3, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 2, 'col': 4, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 2, 'col': 5, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 2, 'col': 6, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 2, 'col': 7, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 2, 'col': 8, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 2, 'col': 9, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Gg'},
      {'row': 2, 'col': 10, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': {value:constants.FLAGS.SPECIAL.PORTAL.value,map:'intro2',x:10,y:17}, 'w': 'Gs'},
      {'row': 2, 'col': 11, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': {value:constants.FLAGS.SPECIAL.PORTAL.value,map:'intro2',x:10,y:17}, 'w': 'Ur'},
      {'row': 2, 'col': 12, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': {value:constants.FLAGS.SPECIAL.PORTAL.value,map:'intro2',x:10,y:17}, 'w': 'Gg^Efm'},
      {'row': 2, 'col': 13, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Gg'},
      {'row': 2, 'col': 14, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 2, 'col': 15, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 2, 'col': 16, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 2, 'col': 17, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 2, 'col': 18, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 2, 'col': 19, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
    ],
    [
      {'row': 3, 'col': 0, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 3, 'col': 1, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 3, 'col': 2, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 3, 'col': 3, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 3, 'col': 4, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 3, 'col': 5, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 3, 'col': 6, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 3, 'col': 7, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 3, 'col': 8, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom^Efs'},
      {'row': 3, 'col': 9, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 3, 'col': 10, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom^Efs'},
      {'row': 3, 'col': 11, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': {value: constants.FLAGS.SPECIAL.DOOR.value, id:1, sightCost: 7}, 'w': 'Ur'},
      {'row': 3, 'col': 12, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom^Efs'},
      {'row': 3, 'col': 13, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 3, 'col': 14, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom^Efs'},
      {'row': 3, 'col': 15, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 3, 'col': 16, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 3, 'col': 17, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 3, 'col': 18, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 3, 'col': 19, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
    ],
    [
      {'row': 4, 'col': 0, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 4, 'col': 1, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 4, 'col': 2, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 4, 'col': 3, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 4, 'col': 4, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 4, 'col': 5, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 4, 'col': 6, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 4, 'col': 7, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom^Efs'},
      {'row': 4, 'col': 8, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 4, 'col': 9, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 4, 'col': 10, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 4, 'col': 11, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1.2, 'travelFlags': 6, 'special': 0, 'w': 'Rr^Pw|o'},
      {'row': 4, 'col': 12, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr^Efs'},
      {'row': 4, 'col': 13, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 4, 'col': 14, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 4, 'col': 15, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom^Efs'},
      {'row': 4, 'col': 16, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 4, 'col': 17, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 4, 'col': 18, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 4, 'col': 19, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
    ],
    [
      {'row': 5, 'col': 0, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 5, 'col': 1, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 5, 'col': 2, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 5, 'col': 3, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 5, 'col': 4, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 5, 'col': 5, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 5, 'col': 6, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 5, 'col': 7, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 5, 'col': 8, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 5, 'col': 9, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 5, 'col': 10, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 5, 'col': 11, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': {value: constants.FLAGS.SPECIAL.MESSAGE.value, id: 1, msg:'intro.id1', repeat: true, showIf: {value: constants.SHOW_MESSAGE_WHEN.DOOR_EXISTS.value, data: { door_id:1, tileXY: {x: 11, y: 4} }}}, 'w': 'Iwr'},
      {'row': 5, 'col': 12, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 5, 'col': 13, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 5, 'col': 14, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 5, 'col': 15, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 5, 'col': 16, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 5, 'col': 17, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 5, 'col': 18, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 5, 'col': 19, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
    ],
    [
      {'row': 6, 'col': 0, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 6, 'col': 1, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 6, 'col': 2, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 6, 'col': 3, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 6, 'col': 4, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 6, 'col': 5, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 6, 'col': 6, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr^Ebn'},
      {'row': 6, 'col': 7, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 6, 'col': 8, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 6, 'col': 9, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 6, 'col': 10, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 6, 'col': 11, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 6, 'col': 12, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 6, 'col': 13, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 6, 'col': 14, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 6, 'col': 15, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 6, 'col': 16, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 6, 'col': 17, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 6, 'col': 18, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 6, 'col': 19, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
    ],
    [
      {'row': 7, 'col': 0, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 7, 'col': 1, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 7, 'col': 2, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 7, 'col': 3, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 7, 'col': 4, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr^Ebn'},
      {'row': 7, 'col': 5, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 7, 'col': 6, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 7, 'col': 7, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 7, 'col': 8, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 7, 'col': 9, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 7, 'col': 10, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 7, 'col': 11, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 7, 'col': 12, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 7, 'col': 13, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 7, 'col': 14, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 7, 'col': 15, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 7, 'col': 16, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 7, 'col': 17, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 7, 'col': 18, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 7, 'col': 19, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
    ],
    [
      {'row': 8, 'col': 0, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 8, 'col': 1, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 8, 'col': 2, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 8, 'col': 3, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 8, 'col': 4, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 8, 'col': 5, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 8, 'col': 6, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 8, 'col': 7, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1.2, 'travelFlags': 6, 'special': 0, 'w': 'Rr^Pw/o'},
      {'row': 8, 'col': 8, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 8, 'col': 9, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 8, 'col': 10, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 8, 'col': 11, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 8, 'col': 12, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 8, 'col': 13, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 8, 'col': 14, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 8, 'col': 15, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 8, 'col': 16, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 8, 'col': 17, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 8, 'col': 18, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 8, 'col': 19, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
    ],
    [
      {'row': 9, 'col': 0, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 9, 'col': 1, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 9, 'col': 2, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 9, 'col': 3, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 9, 'col': 4, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 9, 'col': 5, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 9, 'col': 6, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 9, 'col': 7, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 9, 'col': 8, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 9, 'col': 9, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 9, 'col': 10, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 9, 'col': 11, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 9, 'col': 12, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 9, 'col': 13, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 9, 'col': 14, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 9, 'col': 15, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 9, 'col': 16, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 9, 'col': 17, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 9, 'col': 18, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 9, 'col': 19, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
    ],
    [
      {'row': 10, 'col': 0, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 10, 'col': 1, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 10, 'col': 2, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 10, 'col': 3, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 10, 'col': 4, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 10, 'col': 5, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 10, 'col': 6, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 10, 'col': 7, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 10, 'col': 8, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 10, 'col': 9, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'special': 0, 'w': 'Iwr'},
      {'row': 10, 'col': 10, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 10, 'col': 11, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 10, 'col': 12, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 10, 'col': 13, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 10, 'col': 14, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 10, 'col': 15, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 10, 'col': 16, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 10, 'col': 17, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 10, 'col': 18, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 10, 'col': 19, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
    ],
    [
      {'row': 11, 'col': 0, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 1, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 2, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 3, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 4, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 5, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 6, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 7, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 8, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 9, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xom'},
      {'row': 11, 'col': 10, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 11, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 12, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 13, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 14, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 15, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 16, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 17, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 18, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 11, 'col': 19, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
    ],
    [
      {'row': 12, 'col': 0, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 1, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 2, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 3, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 4, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 5, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 6, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 7, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 8, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 9, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 10, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 11, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 12, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 13, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 14, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 15, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 16, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 17, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 18, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
      {'row': 12, 'col': 19, 'sightCost': 8, 'sightFlags': 1, 'speedCost': 1, 'travelFlags': 8, 'special': 0, 'w': 'Xv'},
    ],
  ]
}
