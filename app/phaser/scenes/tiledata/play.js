import { constants } from 'emberquest/services/constants';

export default {

  // player: {
  //   startX: 7,
  //   startY: 3
  // },

  mapUrl: '/images/maps/play.png',

  chests: [
    // {id: 1, x: 10, y: 3, gccode: 'GC002', gold: 20, specialActions: []}
  ],

  spawnLocations : {
    players: [{x: 5, y: 7}], // tiles where the player may spawn
    transports: {
      spawnInterval: 3000000,
      limit: 1,
      locations: []
    },
    agents: {
      spawnInterval: 300000,
      limit: 1,
      locations: [
      // locations: [
        {id: 1, x: 4, y: 4, pool: [ 'spider' ]},
        {id: 2, x: 6, y: 4, pool: [ 'spider' ]},
        {id: 3, x: 8, y: 4, pool: [ 'spider' ]}
      ],
      globalPool: [ 'spider' ]
    }
  },

  sceneTiles: [
    [
      {'col': 0, 'row': 0, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 1, 'row': 0, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 2, 'row': 0, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 3, 'row': 0, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 4, 'wesnoth': 'Qlf', 'special': 0 },
      {'col': 4, 'row': 0, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 4, 'wesnoth': 'Qlf', 'special': 0 },
      {'col': 5, 'row': 0, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 4, 'wesnoth': 'Qlf', 'special': 0 },
      {'col': 6, 'row': 0, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 4, 'wesnoth': 'Qlf', 'special': 0 },
      {'col': 7, 'row': 0, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 4, 'wesnoth': 'Ql', 'special': 0 },
      {'col': 8, 'row': 0, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 4, 'wesnoth': 'Ql', 'special': 0 },
      {'col': 9, 'row': 0, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 4, 'wesnoth': 'Ql', 'special': 0 },
      {'col': 10, 'row': 0, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 11, 'row': 0, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
    ],
    [
      {'col': 0, 'row': 1, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 5, 'wesnoth': 'Wo', 'special': 0 },
      {'col': 1, 'row': 1, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 0.7, 'travelFlags': 6, 'wesnoth': 'Hh^Vhh', 'special': 0 },
      {'col': 2, 'row': 1, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 5, 'wesnoth': 'Wo', 'special': 0 },
      {'col': 3, 'row': 1, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 4, 'row': 1, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 5, 'row': 1, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 4, 'wesnoth': 'Qlf', 'special': 0 },
      {'col': 6, 'row': 1, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 4, 'wesnoth': 'Qlf', 'special': 0 },
      {'col': 7, 'row': 1, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 4, 'wesnoth': 'Ql', 'special': 0 },
      {'col': 8, 'row': 1, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 4, 'wesnoth': 'Ql', 'special': 0 },
      {'col': 9, 'row': 1, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 4, 'wesnoth': 'Ql', 'special': 0 },
      {'col': 10, 'row': 1, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 11, 'row': 1, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
    ],
    [
      {'col': 0, 'row': 2, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 5, 'wesnoth': 'Wo', 'special': 0 },
      {'col': 1, 'row': 2, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 5, 'wesnoth': 'Wo', 'special': 0 },
      {'col': 2, 'row': 2, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 3, 'row': 2, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 5, 'wesnoth': 'Wo', 'special': 0 },
      {'col': 4, 'row': 2, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 5, 'wesnoth': 'Wo', 'special': 0 },
      {'col': 5, 'row': 2, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 6, 'row': 2, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 7, 'row': 2, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 4, 'wesnoth': 'Qlf', 'special': 0 },
      {'col': 8, 'row': 2, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 9, 'row': 2, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 10, 'row': 2, 'sightCost': 7, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 8, 'wesnoth': 'Md^Xm', 'special': 0 },
      {'col': 11, 'row': 2, 'sightCost': 7, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 8, 'wesnoth': 'Md^Xm', 'special': 0 },
    ],
    [
      {'col': 0, 'row': 3, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 4, 'wesnoth': 'Qxu', 'special': 0 },
      {'col': 1, 'row': 3, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 5, 'wesnoth': 'Wo', 'special': 0 },
      {'col': 2, 'row': 3, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 5, 'wesnoth': 'Wo', 'special': 0 },
      {'col': 3, 'row': 3, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 5, 'wesnoth': 'Wo', 'special': 0 },
      {'col': 4, 'row': 3, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 5, 'wesnoth': 'Wo', 'special': 0 },
      {'col': 5, 'row': 3, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 6, 'row': 3, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 7, 'row': 3, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 8, 'row': 3, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 9, 'row': 3, 'sightCost': 7, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 8, 'wesnoth': 'Md^Xm', 'special': 0 },
      {'col': 10, 'row': 3, 'sightCost': 7, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 8, 'wesnoth': 'Md^Xm', 'special': 0 },
      {'col': 11, 'row': 3, 'sightCost': 7, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 8, 'wesnoth': 'Md^Xm', 'special': 0 },
    ],
    [
      {'col': 0, 'row': 4, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 6, 'wesnoth': 'Ss', 'special': 0 },
      {'col': 1, 'row': 4, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 4, 'wesnoth': 'Qxu', 'special': 0 },
      {'col': 2, 'row': 4, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 4, 'wesnoth': 'Qxu', 'special': 0 },
      {'col': 3, 'row': 4, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 5, 'wesnoth': 'Wo', 'special': 0 },
      {'col': 4, 'row': 4, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 5, 'row': 4, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 6, 'row': 4, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 7, 'row': 4, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 8, 'row': 4, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 9, 'row': 4, 'sightCost': 7, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 8, 'wesnoth': 'Md^Xm', 'special': 0 },
      {'col': 10, 'row': 4, 'sightCost': 7, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 8, 'wesnoth': 'Md^Xm', 'special': 0 },
      {'col': 11, 'row': 4, 'sightCost': 7, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 8, 'wesnoth': 'Md^Xm', 'special': 0 },
    ],
    [
      {'col': 0, 'row': 5, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 6, 'wesnoth': 'Ss', 'special': 0 },
      {'col': 1, 'row': 5, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 6, 'wesnoth': 'Ss', 'special': 0 },
      {'col': 2, 'row': 5, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 6, 'wesnoth': 'Ss', 'special': 0 },
      {'col': 3, 'row': 5, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 6, 'wesnoth': 'Ss', 'special': 0 },
      {'col': 4, 'row': 5, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 5, 'row': 5, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 6, 'row': 5, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 7, 'row': 5, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 8, 'row': 5, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 9, 'row': 5, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 10, 'row': 5, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 11, 'row': 5, 'sightCost': 7, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 8, 'wesnoth': 'Mdd^Xm', 'special': 0 },
    ],
    [
      {'col': 0, 'row': 6, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 6, 'wesnoth': 'Ss', 'special': 0 },
      {'col': 1, 'row': 6, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 6, 'wesnoth': 'Ss', 'special': 0 },
      {'col': 2, 'row': 6, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 6, 'wesnoth': 'Ss', 'special': 0 },
      {'col': 3, 'row': 6, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 6, 'wesnoth': 'Ss', 'special': 0 },
      {'col': 4, 'row': 6, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 5, 'row': 6, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 6, 'row': 6, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 7, 'row': 6, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 8, 'row': 6, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 9, 'row': 6, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 10, 'row': 6, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 11, 'row': 6, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
    ],
    [
      {'col': 0, 'row': 7, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 6, 'wesnoth': 'Ss', 'special': 0 },
      {'col': 1, 'row': 7, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 6, 'wesnoth': 'Ss', 'special': 0 },
      {'col': 2, 'row': 7, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 6, 'wesnoth': 'Ss', 'special': 0 },
      {'col': 3, 'row': 7, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 0.3, 'travelFlags': 6, 'wesnoth': 'Ss', 'special': 0 },
      {'col': 4, 'row': 7, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 5, 'row': 7, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': {value:constants.FLAGS.SPECIAL.PORTAL.value,map:'intro2',x:13,y:1} },
      {'col': 6, 'row': 7, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': {value:constants.FLAGS.SPECIAL.PORTAL.value,map:'intro2',x:13,y:1} },
      {'col': 7, 'row': 7, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': {value:constants.FLAGS.SPECIAL.PORTAL.value,map:'intro2',x:13,y:1} },
      {'col': 8, 'row': 7, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 9, 'row': 7, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 10, 'row': 7, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
      {'col': 11, 'row': 7, 'sightCost': 1, 'sightFlags': 0, 'speedCost': 1, 'travelFlags': 6, 'wesnoth': 'Gg', 'special': 0 },
    ],
  ]
}