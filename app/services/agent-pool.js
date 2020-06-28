import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';

export default class AgentPoolService extends Service {

  @tracked agentpool;

  getAgentConfig(key) {
    const pool = this.getAgentPool();
    const agentConfig = pool.get(key);

    return agentConfig;
  }

  getAgentPool() {
    if (this.agentpool === undefined) {
      this.populateAgentPool();
    }
    return this.agentpool;
  }

  populateAgentPool() {
    // console.log('populate agent pool');

    this.agentpool = new Map();
    let baseAgentclone = Object.assign({}, this.baseAgent);

    let agentId = 1;

    // // SPIDER
    // this.agentpool.set('spider',
    //   Object.assign(baseAgentclone, {
    //     id: 1,
    //     name: 'Spider',
    //     texture: 'spider',
    //     health: 20,
    //     maxHealth: 20,
    //     healingPower: 3,
    //     // aggressionScale: 100,  // TODO need a better way to track aggression levels
    //
    //     animeframes: {
    //       rest: {key: 'spider-rest', start: 1, end: 2, repeat: -1, rate: 1},
    //       attack: {key: 'spider-attack', start: 2, end: 14, rate: 12},
    //       range: {key: 'spider-range', start: 15, end: 21, rate: 8}
    //     },
    //     inventory: [
    //       {
    //         bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{itemId: 5001, droppable: false}],
    //       },
    //       {
    //         bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5002, droppable: false } ]
    //       }
    //     ]
    //   })
    // );

    // YOUNG-OGRE
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('young-ogre',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Young Ogre',
        scale: 1.5,
        animeframes: {
          rest: {key: 'young-ogrerest', prefix: 'ogres/young-ogre-idle-', start: 1, end: 4, rate: 3, repeat: -1},
          attack: {key: 'young-ogreattack', prefix: 'ogres/young-ogre-attack', start: 1, end: 5, rate: 12, delays: { frameNum: 3, delay: 300 }}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items:
            [
              { itemId: 5000, droppable: false }  // sword
            ]},
        ]
      })
    );

    // DOG
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('dog',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Dog',
        scale: 1.5,
        animeframes: {
          rest: {key: 'dogrest', prefix: 'dog/dog-', start: 0, end: 3, rate: 3, repeat: -1},
          attack: {key: 'dogattack', prefix: 'dog/dog-', start: 3, end: 4, rate: 12, delays: { frameNum: 1, delay: 300 }}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items:
            [
              { itemId: 5003 }  // bite
            ]},
        ]
      })
    );

    // Pirate
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('pirate',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Pirate',
        // texture: 'pirate',
        scale: 1.5,
        animeframes: {
          rest: {key: 'piraterest', prefix: 'pirates/pirate-galleon', start: 1, end: 1, repeat: 0},
        },
        inventory: [
          {
            bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5100, droppable: false } ]
          }
        ]
      })
    );

    // Keep
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('keep',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Keep',
        // texture: 'keep',
        offsets: {
          img: { x: -1, y: -20 },
          healthbar: { x: 0, y: -55 },
          name: { x: 0, y: -85 },
          damage: { x: 0, y: -85 }
        },
        scale: 1.4,
        animeframes: {
          rest: {key: 'keeprest', prefix: 'keeps/keep', start: 1, end: 1, repeat: 0},
        },
        inventory: [
          {
            bodypart: constants.INVENTORY.BODYPART.RANGED, items:
              [
                { itemId: 5101 }  // Tower
              ]
          },
        ]
      })
    );

    // Desert Keep
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('desert_keep',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Desert Keep',
        offsets: {
          img: { x: -1, y: -25 },
          healthbar: { x: 0, y: -55 },
          name: { x: 0, y: -85 },
          damage: { x: 0, y: -85 }
        },
        scale: 1.5,
        animeframes: {
          rest: {key: 'desert_keeprest', prefix: 'keeps/desert_keep', start: 1, end: 1, repeat: 0},
        },
        inventory: [
          {
            bodypart: constants.INVENTORY.BODYPART.RANGED, items:
              [
                { itemId: 5101 }  // Tower
              ]
          },
        ]
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('bat',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Bat',
        animeframes: {
          rest: {key: 'batrest', prefix: 'bats/bat-se-', start: 1, end: 5, rate: 3, repeat: -1}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('bloodbat',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Blood Bat',
        animeframes: {
          rest: {key: 'bloodbatrest', prefix: 'bats/bloodbat-se-', start: 1, end: 5, rate: 3, repeat: -1}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('dreadbat',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Dread Bat',
        animeframes: {
          rest: {key: 'dreadbatrest', prefix: 'bats/dreadbat-se-', start: 1, end: 5, rate: 3, repeat: -1}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('youngcyclop',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Young Cyclop',
        animeframes: {
          rest: {key: 'youngcycloprest', prefix: 'cyclops/youngcyclop/cyclop-', start: 1, end: 2, rate: 3, repeat: -1},
          attack: {key: 'youngcyclopattack', prefix: 'cyclops/youngcyclop/cyclop-attack-', start: 1, end: 3, rate: 12, delays: { frameNum: 2, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('goliath',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Goliath',
        offsets: {
          healthbar: { x: 0, y: -25 },
          name: { x: 0, y: -40 },
          damage: { x: 0, y: -45 }
        },
        animeframes: {
          rest: {key: 'goliathrest', prefix: 'cyclops/goliath/goliath-se', start: 1, end: 1, rate: 3, repeat: -1},
          attack: {key: 'goliathattack', prefix: 'cyclops/goliath/goliath-se', start: 1, end: 9, rate: 12}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('ancientcyclop',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Ancient Cyclop',
        animeframes: {
          rest: {key: 'ancientcycloprest', prefix: 'cyclops/ancientcyclop/ancientcyclop-', start: 1, end: 1, rate: 3, repeat: -1},
          attack: {key: 'ancientcyclopattack', prefix: 'cyclops/ancientcyclop/ancientcyclop-attack-', start: 1, end: 2, rate: 12, delays: { frameNum: 2, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('direwolf',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Direwolf',
        animeframes: {
          rest: {key: 'direwolfrest', prefix: 'direwolf/direwolf', start: 1, end: 2, rate: 3, repeat: -1},
          attack: {key: 'direwolfattack', prefix: 'direwolf/direwolf-attack-', start: 1, end: 1, rate: 12, delays: { frameNum: 1, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    // Humanoids:
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('humanoid_bandit',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Bandit',
        animeframes: {
          rest: {key: 'humanoid_banditrest', prefix: 'humanoid/bandit/bandit', start: 1, end: 1, rate: 3, repeat: -1},
          attack: {key: 'humanoid_banditattack', prefix: 'humanoid/bandit/bandit-melee-', start: 1, end: 8, rate: 12, delays: { frameNum: 8, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('humanoid_outlaw',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Outlaw',
        animeframes: {
          rest: {key: 'humanoid_outlawrest', prefix: 'humanoid/outlaw/outlaw', start: 1, end: 1, rate: 3, repeat: -1},
          attack: {key: 'humanoid_outlawattack', prefix: 'humanoid/outlaw/outlaw-melee-', start: 1, end: 3, rate: 12, delays: { frameNum: 3, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('humanoid_footpad',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Footpad',
        animeframes: {
          rest: {key: 'humanoid_footpadrest', prefix: 'humanoid/footpad/footpad', start: 1, end: 1, rate: 3, repeat: -1},
          attack: {key: 'humanoid_footpadattack', prefix: 'humanoid/footpad/footpad-melee-', start: 1, end: 4, rate: 12, delays: { frameNum: 4, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('humanoid_peasant',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Peasant',
        animeframes: {
          rest: {key: 'humanoid_peasantrest', prefix: 'humanoid/peasant/peasant', start: 1, end: 1, rate: 3, repeat: -1},
          attack: {key: 'humanoid_peasantattack', prefix: 'humanoid/peasant/peasant-melee-', start: 1, end: 4, rate: 12, delays: { frameNum: 4, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('mutant_rat',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Mutant Rat',
        animeframes: {
          rest: {key: 'mutant_ratrest', prefix: 'rat/mutant-rat', start: 1, end: 1, rate: 3, repeat: -1},
          attack: {key: 'mutant_ratattack', prefix: 'rat/mutant-rat-attack-', start: 1, end: 7, rate: 12, delays: { frameNum: 7, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    // Bugs
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('myriapod',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Myriapod',
        animeframes: {
          rest: {key: 'myriapodrest', prefix: 'bugs/myriapod/myriapod-se', start: 1, end: 3, rate: 3, repeat: -1},
          attack: {key: 'myriapodattack', prefix: 'bugs/myriapod/myriapod-attack-', start: 1, end: 2, rate: 12, delays: { frameNum: 2, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );


  } // end of populateAgentPool


  baseAgent = {
    id: 1,
    name: '',
    texture: '',
    textureSize: { width: 72, height: 72},

    animeframes: {},

    audio: [{ die: '' }],

    // scale: 1,
    scale: 1.5,

    speed: 100,
    sightRange: 3,   // this is sight/movement Range
    movingPoints: 3,   // this is sight/movement Range
    visiblePoints: 8,   // this is sight/movement Range
// health: 2,
// maxHealth: 22,
// healingPower: 1,
    health: 20,
    maxHealth: 20,
    power: 25,
    healingPower: 1,
    energizePower: 20,
    energizeSpeed: 3000,

    // aggressionScale: 3,
    aggressionScale: 5,

    // xpGain: 15,
    gold: 1,
    // either a specific level, or a level range relative to the players
    level: 1,
    levelRange: 0,
    // levelRange: 2, +/- 2 levels from player

    flagAttributes: {
      sF: 0,
      tF: 2
    },
    patrol: {
      // timeout: 200,
      timeout: 2000,
      pursuitSpeed: 1500,
      aggressionSpeedTimeout: 2000,
      // aggressionTimeout: 1000,  // delay time in between aggression turns
      method: 'random',
      tiles: [
        // {x: 13, y: 4}, {x: 13, y: 2}
      ]
    },
    // Inventory: arrays containing inventory item arrays of
    // possible items in each body part.
    // Different spawns will pick at random one of the items to equip
    inventory: [
      // { bodypart: constants.INVENTORY.BODYPART.BODY, items: []},
      // { bodypart: constants.INVENTORY.BODYPART.FEET, items: []},
      // { bodypart: constants.INVENTORY.BODYPART.HEAD, items: []},
      // { bodypart: constants.INVENTORY.BODYPART.ARMS, items: []},
      // { bodypart: constants.INVENTORY.BODYPART.LEFT_HAND, items: []},
      // { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: []},
      // { bodypart: constants.INVENTORY.BODYPART.NECK, items: []},
      // { bodypart: constants.INVENTORY.BODYPART.FINGERS, items: []},
      // { bodypart: constants.INVENTORY.BODYPART.GLOVES, items: []}
    ]
  }
}
