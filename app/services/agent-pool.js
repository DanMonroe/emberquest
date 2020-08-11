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

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('whirlpool',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Whirlpool',
        scale: 1.5,
        showHealthBar: false,
        showLevel: false,
        flagAttributes: {
          tF: 1
        },
        animeframes: {
          rest: {key: 'whirlpool-rest', prefix: 'items/whirlpool', start: 1, end: 12, rate: 5, repeat: -1}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items:
            [
              { itemId: 4050 }  // whirlpool
            ]}
          ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('whirlpoolinner',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Whirlpool',
        scale: 1.5,
        showHealthBar: false,
        showLevel: false,
        flagAttributes: {
          tF: 1
        },
        animeframes: {
          rest: {key: 'whirlpool-rest', prefix: 'items/whirlpool', start: 1, end: 12, rate: 5, repeat: -1}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items:
            [
              { itemId: 4051 }  // whirlpool
            ]}
          ]
      })
    );

    // YOUNG-OGRE
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('young-ogre',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Young Ogre',
        scale: 1.5,
        animeframes: {
          rest: {yoyo: true, key: 'young-ogrerest', prefix: 'ogres/young-ogre-idle-', start: 1, end: 4, rate: 3, repeat: -1},
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

    // Pirate
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('pirate',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Pirate',
        hasMelee: false,
        scale: 1.6,
        offsets: {
          healthbar: { x: 0, y: -20 },
          name: { x: 0, y: -35 },
          damage: { x: 0, y: -55 }
        },

        flagAttributes: {
          tF: 1
        },
        animeframes: {
          rest: {key: 'piraterest', prefix: 'ships/pirate-galleon', start: 1, end: 1, repeat: 0},  // yoyo: true,
        },
        inventory: [
          {
            bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5100, droppable: false } ]
          }
        ]
      })
    );

    // Ghost ship
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('ghost-ship',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Ghost Ship',
        hasMelee: false,
        scale: 1.7,
        offsets: {
          healthbar: { x: 0, y: -20 },
          name: { x: 0, y: -35 },
          damage: { x: 0, y: -55 }
        },

        flagAttributes: {
          tF: 1
        },
        animeframes: {
          rest: {key: 'ghost-ship-rest', prefix: 'ships/ghost-ship-', start: 1, end: 3, rate: 4, repeat: -1},
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
        hasMelee: false,
        offsets: {
          img: { x: -1, y: -20 },
          healthbar: { x: 0, y: -55 },
          name: { x: 0, y: -85 },
          damage: { x: 0, y: -85 }
        },
        scale: 1.4,
        animeframes: {
          rest: {yoyo: true, key: 'keeprest', prefix: 'keeps/keep', start: 1, end: 1, repeat: 0},
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
        hasMelee: false,
        offsets: {
          img: { x: -1, y: -25 },
          healthbar: { x: 0, y: -55 },
          name: { x: 0, y: -85 },
          damage: { x: 0, y: -85 }
        },
        scale: 1.5,
        animeframes: {
          rest: {yoyo: true, key: 'desert_keeprest', prefix: 'keeps/desert_keep', start: 1, end: 1, repeat: 0},
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
        flagAttributes: {
          sF: 0,
          tF: 3
        },
        animeframes: {
          rest: {yoyo: true, key: 'batrest', prefix: 'bats/bat-se-', start: 1, end: 5, rate: 3, repeat: -1}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('bloodbat',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Blood Bat',
        flagAttributes: {
          sF: 0,
          tF: 3
        },
        animeframes: {
          rest: {yoyo: true, key: 'bloodbatrest', prefix: 'bats/bloodbat-se-', start: 1, end: 5, rate: 3, repeat: -1}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ] },   // bite
          { bodypart: constants.INVENTORY.BODYPART.FINGERS, items: [{ itemId: 5005 } ] }       // 100 fire resistance
        ]
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('dreadbat',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Dread Bat',
        animeframes: {
          rest: {yoyo: true, key: 'dreadbatrest', prefix: 'bats/dreadbat-se-', start: 1, end: 5, rate: 3, repeat: -1}
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
          rest: {yoyo: true, key: 'youngcycloprest', prefix: 'cyclops/youngcyclop/cyclop-', start: 1, end: 2, rate: 3, repeat: -1},
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
          rest: {yoyo: true, key: 'goliathrest', prefix: 'cyclops/goliath/goliath-se', start: 1, end: 1, rate: 3, repeat: -1},
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
          rest: {yoyo: true, key: 'ancientcycloprest', prefix: 'cyclops/ancientcyclop/ancientcyclop-', start: 1, end: 1, rate: 3, repeat: -1},
          attack: {key: 'ancientcyclopattack', prefix: 'cyclops/ancientcyclop/ancientcyclop-attack-', start: 1, end: 2, rate: 12, delays: { frameNum: 2, delay: 300 }}
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
          rest: {yoyo: true, key: 'humanoid_banditrest', prefix: 'humanoid/bandit/bandit', start: 1, end: 1, rate: 3, repeat: -1},
          attack: {key: 'humanoid_banditattack', prefix: 'humanoid/bandit/bandit-melee-', start: 1, end: 8, rate: 12, delays: { frameNum: 8, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]}]  // sword
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('humanoid_outlaw',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Outlaw',
        animeframes: {
          rest: {yoyo: true, key: 'humanoid_outlawrest', prefix: 'humanoid/outlaw/outlaw', start: 1, end: 1, rate: 3, repeat: -1},
          attack: {key: 'humanoid_outlawattack', prefix: 'humanoid/outlaw/outlaw-melee-', start: 1, end: 3, rate: 12, delays: { frameNum: 3, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]}]  // sword
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('humanoid_footpad',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Footpad',
        animeframes: {
          rest: {yoyo: true, key: 'humanoid_footpadrest', prefix: 'humanoid/footpad/footpad', start: 1, end: 1, rate: 3, repeat: -1},
          attack: {key: 'humanoid_footpadattack', prefix: 'humanoid/footpad/footpad-melee-', start: 1, end: 4, rate: 12, delays: { frameNum: 4, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]}]  // sword
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('humanoid_peasant',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Peasant',
        animeframes: {
          rest: {yoyo: true, key: 'humanoid_peasantrest', prefix: 'humanoid/peasant/peasant', start: 1, end: 1, rate: 3, repeat: -1},
          attack: {key: 'humanoid_peasantattack', prefix: 'humanoid/peasant/peasant-attack', start: 1, end: 4, rate: 12, delays: { frameNum: 4, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]}]  // sword
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('camelmaster',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Camel Master',
        animeframes: {
          rest: {yoyo: true, key: 'camelmaster-rest', prefix: 'humanoid/camelmaster/camelmaster', start: 1, end: 1},
          attack: {key: 'camelmaster-attack', prefix: 'humanoid/camelmaster/camelmaster-attack-', start: 1, end: 4, rate: 7},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]}
          // { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5102} ]}
        ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('camelrider',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Camel Rider',
        animeframes: {
          rest: {yoyo: true, key: 'camelrider-rest', prefix: 'humanoid/camelrider/camelrider', start: 1, end: 1},
          attack: {key: 'camelrider-attack', prefix: 'humanoid/camelrider/camelrider-attack-', start: 1, end: 4, rate: 7},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]}
          // { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5102} ]}
        ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('fencer',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Fencer',
        animeframes: {
          rest: {yoyo: true, key: 'fencer-rest', prefix: 'humanoid/fencer/fencer', start: 1, end: 1},
          attack: {key: 'fencer-attack', prefix: 'humanoid/fencer/fencer-attack-', start: 1, end: 9, rate: 8},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]}
          // { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5102} ]}
        ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('fireslicer',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Fire Slicer',
        animeframes: {
          rest: {yoyo: true, key: 'fireslicer-rest', prefix: 'humanoid/fireslicer/fireslicer', start: 1, end: 3, rate: 4},
          attack: {key: 'fireslicer-attack', prefix: 'humanoid/fireslicer/fireslicer-attack1-', start: 2, end: 4, rate: 5},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5007 } ]}
          // { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5102} ]}
        ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('lieutenant',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Lieutenant',
        animeframes: {
          rest: {yoyo: true, key: 'lieutenant-rest', prefix: 'humanoid/lieutenant/lieutenant-attack-sword-', start: 1, end: 1},
          attack: {key: 'lieutenant-attack', prefix: 'humanoid/lieutenant/lieutenant-attack-sword-', start: 1, end: 3, rate: 6},
          range: {key: 'lieutenant-range', prefix: 'humanoid/lieutenant/lieutenant-crossbow-attack', start: 1, end: 2, rate: 2}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]},
          { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5103} ]} // bow
        ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('general',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'General',
        animeframes: {
          rest: {yoyo: true, key: 'general-rest', prefix: 'humanoid/general/general', start: 1, end: 1},
          attack: {key: 'general-attack', prefix: 'humanoid/general/general-attack-sword', start: 1, end: 5, rate: 7},
          range: {key: 'general-range', prefix: 'humanoid/general/general-crossbow-attack', start: 1, end: 2, rate: 2}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]},
          { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5103} ]} // bow
        ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('siegetrooper',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Siege Trooper',
        animeframes: {
          rest: {yoyo: true, key: 'siegetrooper-rest', prefix: 'humanoid/siegetrooper/siegetrooper', start: 1, end: 1},
          attack: {key: 'siegetrooper-attack', prefix: 'humanoid/siegetrooper/siegetrooper-attack-', start: 1, end: 6, rate: 7},
          // range: {key: 'general-range', prefix: 'humanoid/general/general-crossbow-attack', start: 1, end: 2, rate: 2}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]},
          // { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5103} ]} // bow
        ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('horseman',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Horseman',
        animeframes: {
          rest: {yoyo: true, key: 'horseman-rest', prefix: 'humanoid/horseman/general', start: 1, end: 1},
          attack: {key: 'horseman-attack', prefix: 'humanoid/horseman/horseman-se-attack', start: 1, end: 12, rate: 7}
          // range: {key: 'general-range', prefix: 'humanoid/general/general-crossbow-attack', start: 1, end: 2, rate: 2}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]}
          // { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5103} ]} // bow
        ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    // Desert
    this.agentpool.set('summoner',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Summoner',
        animeframes: {
          rest: {yoyo: true, key: 'summoner-rest', prefix: 'humanoid/summoner/summoner', start: 1, end: 1},
          attack: {key: 'summoner-attack', prefix: 'humanoid/summoner/summoner-attack', start: 1, end: 4, rate: 7}
          // range: {key: 'general-range', prefix: 'humanoid/general/general-crossbow-attack', start: 1, end: 2, rate: 2}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]}
          // { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5103} ]} // bow
        ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    // Desert
    this.agentpool.set('sunfollower',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Sun Follower',
        animeframes: {
          rest: {yoyo: true, key: 'sunfollower-rest', prefix: 'humanoid/sunfollower/sunfollower', start: 1, end: 1},
          attack: {key: 'sunfollower-attack', prefix: 'humanoid/sunfollower/sunfollower-attack', start: 1, end: 4, rate: 7}
          // range: {key: 'general-range', prefix: 'humanoid/general/general-crossbow-attack', start: 1, end: 2, rate: 2}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]}
          // { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5103} ]} // bow
        ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('wizard',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Wizard',
        animeframes: {
          rest: {yoyo: true, key: 'wizard-rest', prefix: 'humanoid/wizard/wizard', start: 1, end: 1},
          attack: {key: 'wizard-attack', prefix: 'humanoid/wizard/wizard-attack', start: 1, end: 5, rate: 7}
          // range: {key: 'general-range', prefix: 'humanoid/general/general-crossbow-attack', start: 1, end: 2, rate: 2}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5008 } ]}
          // { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5103} ]} // bow
        ]
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('hydra-black',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Black Hydra',
        animeframes: {
          rest: {yoyo: true, key: 'hydra-black-rest', prefix: 'hydras/hydra-black/chaoshydra', start: 1, end: 3, rate: 3}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5004 } ]}
          // { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5103} ]} // bow
        ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('hydra-green',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Green Hydra',
        animeframes: {
          rest: {yoyo: true, key: 'hydra-green-rest', prefix: 'hydras/hydra-green/hydra', start: 1, end: 3, rate: 3}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5004 } ]}
          // { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5103} ]} // bow
        ]
      })
    );

    // Animals
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('owl',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Owl',
        flagAttributes: {
          sF: 0,
          tF: 3
        },
        animeframes: {
          rest: {key: 'owl-rest', prefix: 'animals/owl-s', start: 0, end: 5, rate: 3},
          attack: {key: 'owl-attack', prefix: 'animals/owl-s', start: 0, end: 5, rate: 7}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('great-owl',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Great-Owl',
        flagAttributes: {
          sF: 0,
          tF: 3
        },
        animeframes: {
          rest: {key: 'great-owl-rest', prefix: 'animals/great-owl-s', start: 0, end: 4, rate: 3},
          attack: {key: 'great-owl-attack', prefix: 'animals/great-owl-s', start: 0, end: 4, rate: 7}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('weasadillo',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Weasadillo',
        animeframes: {
          rest: {yoyo: true, key: 'weasadillo-rest', prefix: 'animals/weasadillo-m', start: 1, end: 2, rate: 1},
          attack: {key: 'weasadillo-attack', prefix: 'animals/weasadillo-t', start: 1, end: 7, rate: 8}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('rabbit',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Rabbit',
        animeframes: {
          rest: {yoyo: true, key: 'rabbit-rest', prefix: 'animals/rabbit-attack', start: 1, end: 1},
          attack: {key: 'rabbit-attack', prefix: 'animals/rabbit-attack', start: 1, end: 3, rate: 6}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('white-rabbit',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'White Rabbit',
        animeframes: {
          rest: {yoyo: true, key: 'white-rabbit-rest', prefix: 'animals/rabbit+white-attack', start: 1, end: 1},
          attack: {key: 'white-rabbit-attack', prefix: 'animals/rabbit+white-attack', start: 1, end: 3, rate: 6}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('mutant-rat',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Mutant Rat',
        animeframes: {
          rest: {yoyo: true, key: 'mutant-ratrest', prefix: 'rat/mutant-rat', start: 1, end: 1, rate: 3, repeat: -1},
          attack: {key: 'mutant-ratattack', prefix: 'rat/mutant-rat-attack-', start: 1, end: 7, rate: 12, delays: { frameNum: 7, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('bear',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Bear',
        animeframes: {
          rest: {yoyo: true, key: 'bear', prefix: 'animals/bear', start: 1, end: 1},
          attack: {key: 'bear', prefix: 'animals/bear', start: 1, end: 1}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('crab',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Crab',
        animeframes: {
          rest: {yoyo: true, key: 'crab', prefix: 'animals/crab', start: 1, end: 1},
          attack: {key: 'crab', prefix: 'animals/crab', start: 1, end: 1}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('dog',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Dog',
        scale: 1.5,
        animeframes: {
          rest: {yoyo: true, key: 'dogrest', prefix: 'dog/dog-', start: 0, end: 3, rate: 3, repeat: -1},
          attack: {key: 'dogattack', prefix: 'dog/dog-', start: 3, end: 4, rate: 12, delays: { frameNum: 2, delay: 300 }}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items:
              [
                { itemId: 5003 }  // bite
              ]},
        ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('direwolf',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Direwolf',
        animeframes: {
          rest: {yoyo: true, key: 'direwolf-rest', prefix: 'direwolf/direwolf', start: 1, end: 2, rate: 3, repeat: -1},
          attack: {key: 'direwolf-attack', prefix: 'direwolf/direwolf', start: 2, end: 3, rate: 3, repeat: -1, delays: { frameNum: 2, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('hellhound',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Hell Hound',
        scale: 1.5,
        animeframes: {
          rest: {yoyo: true, key: 'hellhound-rest', prefix: 'dog/rabid-hound-attack', start: 3, end: 3, rate: 3, repeat: -1},
          attack: {key: 'hellhound-attack', prefix: 'dog/rabid-hound-attack', start: 1, end: 2, rate: 7, delays: { frameNum: 2, delay: 300 }}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );



    // Bugs
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('myriapod',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Myriapod',
        animeframes: {
          rest: {yoyo: true, key: 'myriapodrest', prefix: 'bugs/myriapod/myriapod-se', start: 1, end: 3, rate: 3, repeat: -1},
          attack: {key: 'myriapodattack', prefix: 'bugs/myriapod/myriapod-attack', start: 1, end: 2, rate: 12, delays: { frameNum: 2, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('armored-myriapod',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Armored Myriapod',
        animeframes: {
          rest: {yoyo: true, key: 'armored-myriapodrest', prefix: 'bugs/armored-myriapod/armored_myriapod-se', start: 1, end: 3, rate: 3, repeat: -1},
          attack: {key: 'armored-myriapodattack', prefix: 'bugs/armored-myriapod/armored_myriapod-attack', start: 1, end: 2, rate: 12, delays: { frameNum: 2, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('electric-myriapod',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Electric Myriapod',
        animeframes: {
          rest: {yoyo: true, key: 'electric-myriapodrest', prefix: 'bugs/electric-myriapod/electric_myriapod-rest', start: 1, end: 2, rate: 3, repeat: -1},
          attack: {key: 'electric-myriapodattack', prefix: 'bugs/electric-myriapod/electric_myriapod-illumination-se', start: 1, end: 8, rate: 12, delays: { frameNum: 8, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('spider',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Spider',
        animeframes: {
          rest: {yoyo: true, key: 'spider-rest', prefix: 'bugs/spider-little2-melee-', start: 1, end: 3, rate: 3, repeat: -1},
          attack: {key: 'spider-attack', prefix: 'bugs/spider-little2-melee-', start: 1, end: 13, rate: 7, delays: { frameNum: 13, delay: 300 }},
          range: {key: 'spider-range', prefix: 'bugs/spider-little2-ranged-', start: 1, end: 7, rate: 12, delays: { frameNum: 7, delay: 300 }}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]},
          { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5106} ]}
        ]
      })
    );

    // CHAOS
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('blasphemists',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Blasphemists',
        animeframes: {
          rest: {yoyo: true, key: 'blasphemists-rest', prefix: 'chaos/blasphemists-attack', start: 1, end: 6, rate: 3, repeat: -1}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('flappers',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Flappers',
        flagAttributes: {
          sF: 0,
          tF: 3
        },
        animeframes: {
          rest: {yoyo: true, key: 'flappers-rest', prefix: 'chaos/flappers-stand-', start: 1, end: 4, rate: 3, repeat: -1}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]},
          { bodypart: constants.INVENTORY.BODYPART.FINGERS, items: [{ itemId: 5005 }] }
          ]// bite
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('chaos-hero',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Chaos Hero',
        animeframes: {
          rest: {yoyo: true, key: 'hero-rest', prefix: 'chaos/hero-attack', start: 1, end: 7, rate: 3, repeat: -1}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('lesser-demon',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Lesser Demon',
        animeframes: {
          rest: {yoyo: true, key: 'lesser-demon-rest', prefix: 'chaos/lesser-demon-attack', start: 1, end: 1, rate: 3, repeat: -1},
          attack: {key: 'lesser-demon-attack', prefix: 'chaos/lesser-demon-attack', start: 1, end: 3, rate: 3, repeat: -1, delays: { frameNum: 3, delay: 300 }},
          range: {key: 'lesser-demon-ranged', prefix: 'chaos/lesser-demon-range', start: 1, end: 4, rate: 3, repeat: -1, delays: { frameNum: 4, delay: 300 }}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]},
          { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5002} ]},
          { bodypart: constants.INVENTORY.BODYPART.FINGERS, items: [{ itemId: 5005 }] }
          ]  // bite
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('winged-demon',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Winged Demon',
        flagAttributes: {
          sF: 0,
          tF: 3
        },
        animeframes: {
          rest: {yoyo: true, key: 'winged-demon-rest', prefix: 'chaos/winged-demon-fly', start: 1, end: 1, rate: 3},
          attack: {key: 'winged-demon-attack', prefix: 'chaos/winged-demon-attack', start: 1, end: 2, rate: 3, repeat: -1, delays: { frameNum: 2, delay: 300 }},
          range: {key: 'winged-demon-ranged', prefix: 'chaos/winged-demon-range', start: 1, end: 3, rate: 3, repeat: -1, delays: { frameNum: 3, delay: 300 }}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5007 } ]},
          { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5102} ]},
          { bodypart: constants.INVENTORY.BODYPART.FINGERS, items: [{ itemId: 5005 }] }

        ]  // bite
      })
    );

    // COLD
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('icecrab',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Ice Crab',
        animeframes: {
          rest: {yoyo: true, key: 'icecrab-rest', prefix: 'elementals/icecrab/icecrab', start: 1, end: 1, rate: 1},
          attack: {key: 'icecrab-attack', prefix: 'elementals/icecrab/icecrab-attack', start: 1, end: 1}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]},
        ]  // axe
      })
    );


    // Dwarves
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('dwarf-fighter',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Dwarf Fighter',
        animeframes: {
          rest: {yoyo: true, key: 'dwarf-fighter-rest', prefix: 'dwarves/fighter/fighter', start: 1, end: 1, rate: 3},
          attack: {key: 'dwarf-fighter-attack', prefix: 'dwarves/fighter/fighter-se-axe', start: 1, end: 8, rate: 8, repeat: -1, delays: { frameNum: 8, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5004 } ]}]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('dwarf-guard',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Dwarf Guard',
        animeframes: {
          rest: {yoyo: true, key: 'dwarf-guard-rest', prefix: 'dwarves/guard/guard', start: 1, end: 1, rate: 3},
          attack: {key: 'dwarf-guard-attack', prefix: 'dwarves/guard/guard-attack-', start: 1, end: 7, rate: 8, repeat: -1, delays: { frameNum: 7, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5004 } ]}]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('dwarf-heavywarrior',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Dwarf Heavy Warrior',
        animeframes: {
          rest: {yoyo: true, key: 'dwarf-heavywarrior-rest', prefix: 'dwarves/heavy-warrior/heavywarrior', start: 1, end: 1, rate: 3},
          attack: {key: 'dwarf-heavywarrior-attack', prefix: 'dwarves/heavy-warrior/heavywarrior-attack', start: 1, end: 2, rate: 8, repeat: -1, delays: { frameNum: 2, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5004 } ]}]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('dwarf-lord',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Dwarf Lord',
        animeframes: {
          rest: {yoyo: true, key: 'dwarf-lord-rest', prefix: 'dwarves/lord/lord', start: 1, end: 1, rate: 3},
          attack: {key: 'dwarf-lord-attack', prefix: 'dwarves/lord/lord-se-axe', start: 1, end: 9, rate: 8, repeat: -1, delays: { frameNum: 9, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5004 } ]}]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('dwarf-warrior',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Dwarf Warrior',
        animeframes: {
          rest: {yoyo: true, key: 'dwarf-warrior-rest', prefix: 'dwarves/warrior/warrior', start: 1, end: 1, rate: 3},
          attack: {key: 'dwarf-warrior-attack', prefix: 'dwarves/warrior/warrior-attack', start: 1, end: 2, rate: 8, repeat: -1, delays: { frameNum: 2, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5004 } ]}]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('dwarf-runesmith',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Dwarf Runesmith',
        animeframes: {
          rest: {yoyo: true, key: 'dwarf-runesmith-rest', prefix: 'dwarves/runesmith/runesmith', start: 1, end: 1, rate: 3},
          attack: {key: 'dwarf-runesmith-attack', prefix: 'dwarves/runesmith/runesmith-attack-se-', start: 1, end: 10, rate: 8, repeat: -1, delays: { frameNum: 10, delay: 300 }}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5004 } ]}
        ]// axe
      })
    );

    // Elementals
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('elemental-fireghost',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Fire Ghost',
        animeframes: {
          rest: {yoyo: true, key: 'elemental-fireghost-rest', prefix: 'elementals/fireghost/fireghost', start: 1, end: 1, rate: 3},
          attack: {key: 'elemental-fireghost-attack', prefix: 'elementals/fireghost/fireghost-attack', start: 1, end: 2, rate: 3, delays: { frameNum: 2, delay: 300 }},
          death: {key: 'elemental-fireghost-death', prefix: 'elementals/fireghost/fireghost-death', start: 1, end: 6, rate: 8, delays: { frameNum: 6, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5004 } ]},
          { bodypart: constants.INVENTORY.BODYPART.FINGERS, items: [{ itemId: 5005 }] }]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('elemental-firewisp',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Fire Wisp',
        animeframes: {
          rest: {yoyo: true, key: 'elemental-firewisp-rest', prefix: 'elementals/firewisp/firewisp', start: 1, end: 1, rate: 3},
          range: {key: 'elemental-firewisp-range', prefix: 'elementals/firewisp/firewisp-ranged', start: 1, end: 2, rate: 3, delays: { frameNum: 2, delay: 300 }}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5007 } ]},
          { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5102} ]},
          { bodypart: constants.INVENTORY.BODYPART.FINGERS, items: [{ itemId: 5005 }] }
        ]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('elemental-golem',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Golem',
        animeframes: {
          rest: {yoyo: true, key: 'elemental-golem-rest', prefix: 'elementals/golem/golem', start: 1, end: 2, rate: 1},
          attack: {key: 'elemental-golem-attack', prefix: 'elementals/golem/golem-attack', start: 1, end: 1}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5008 } ]},
        ]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('elemental-genie',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Genie',
        animeframes: {
          rest: {yoyo: true, key: 'elemental-genie-rest', prefix: 'elementals/sylph/sylph-', start: 1, end: 3, rate: 1},
          attack: {key: 'elemental-genie-attack', prefix: 'elementals/sylph/sylph-attack', start: 1, end: 1}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5008 } ]},
        ]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('elemental-wave',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Rogue Wave',
        flagAttributes: {
          tF: 1
        },
        animeframes: {
          rest: {yoyo: true, key: 'elemental-wave-rest', prefix: 'elementals/tidal/tidal-', start: 1, end: 3, rate: 1},
          attack: {key: 'elemental-wave-attack', prefix: 'elementals/tidal/tidal-attack', start: 1, end: 1}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5008 } ]},
          { bodypart: constants.INVENTORY.BODYPART.HEAD, items: [{ itemId: 4052 } ]}
        ]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('dustdevil',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Dustdevil',
        flagAttributes: {
          tF: 3
        },
        animeframes: {
          rest: {key: 'dustdevil-rest', prefix: 'elementals/dust-devil', start: 1, end: 1},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5009 } ]}  // wind
        ]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('elemental-vine-beast',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Vine Beast',
        animeframes: {
          rest: {yoyo: true, key: 'elemental-vine-beast-rest', prefix: 'elementals/vine-beast/vine-beast', start: 1, end: 2, rate: 1},
          attack: {key: 'elemental-vine-beast-attack', prefix: 'elementals/vine-beast/vine-beast-attack', start: 1, end: 1}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]},
        ]  // axe
      })
    );

    // Elves
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('elf-fighter',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Elf Fighter',
        animeframes: {
          rest: {yoyo: true, key: 'elf-fighter-rest', prefix: 'elves/fighter/fighter', start: 1, end: 1, rate: 1},
          attack: {key: 'elf-fighter-attack', prefix: 'elves/fighter/fighter-melee-', start: 1, end: 2}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]},
        ]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('elf-archer',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Elf Archer',
        animeframes: {
          rest: {yoyo: true, key: 'elf-archer-rest', prefix: 'elves/hunter/hunter', start: 1, end: 1, rate: 1},
          attack: {key: 'elf-archer-attack', prefix: 'elves/hunter/hunter-sword-', start: 1, end: 4, rate: 5},
          range: {key: 'elf-archer-range', prefix: 'elves/hunter/hunter-ranged-', start: 1, end: 4, rate: 3}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]},
          { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5103} ]}
        ]  // axe
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('young-eyestalk',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Young Eyestalk',
        animeframes: {
          rest: {yoyo: true, key: 'young-eyestalk-rest', prefix: 'eyestalks/young-eyestalk/young-eyestalk', start: 1, end: 1, rate: 1},
          attack: {key: 'young-eyestalk-attack', prefix: 'eyestalks/young-eyestalk/young-eyestalk-attack-', start: 1, end: 2, rate: 3},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}
        ]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('eyestalk',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Eyestalk',
        animeframes: {
          rest: {yoyo: true, key: 'eyestalk-rest', prefix: 'eyestalks/eyestalk/full-grown-eyestalk', start: 1, end: 1, rate: 1},
          attack: {key: 'eyestalk-attack', prefix: 'eyestalks/eyestalk/full-grown-eyestalk-attack-', start: 1, end: 2, rate: 3},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}
        ]  // axe
      })
    );

    // Ghosts
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('ghost',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Ghost',
        animeframes: {
          rest: {yoyo: true, key: 'ghost-rest', prefix: 'ghosts/ghost-s-', start: 1, end: 3, rate: 3},
          attack: {key: 'ghost-attack', prefix: 'ghosts/ghost-s-attack-', start: 1, end: 3, rate: 6},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}
        ]
      })
    );
    // Chaos Skeleton
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('skeleton',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Skeleton',
        animeframes: {
          rest: {yoyo: true, key: 'skeleton-rest', prefix: 'skeleton/skeleton', start: 1, end: 1},
          attack: {key: 'skeleton-attack', prefix: 'skeleton/skeleton-se-melee', start: 1, end: 10, rate: 8},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5001 } ]},
        ]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('lich',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Lich',
        animeframes: {
          rest: {yoyo: true, key: 'lich-rest', prefix: 'ghosts/lich', start: 1, end: 1},
          attack: {key: 'lich-attack', prefix: 'ghosts/lich-melee-', start: 1, end: 2, rate: 2},
          range: {key: 'lich-range', prefix: 'ghosts/lich-magic-', start: 1, end: 3, rate: 6}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]},
          { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5105} ]}
          // { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5102} ]}
        ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('shadow',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Shadow',
        animeframes: {
          rest: {yoyo: true, key: 'shadow-rest', prefix: 'ghosts/shadow-s-', start: 1, end: 3, rate: 2},
          attack: {key: 'shadow-attack', prefix: 'ghosts/shadow-s-attack-', start: 1, end: 6, rate: 6},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]}
        ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('wraith',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Wraith',
        animeframes: {
          rest: {yoyo: true, key: 'wraith-rest', prefix: 'ghosts/wraith-s-', start: 1, end: 4, rate: 3},
          attack: {key: 'wraith-attack', prefix: 'ghosts/wraith-s-attack-', start: 1, end: 5, rate: 6},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]}
        ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('zombie-wose',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Zombie Wose',
        animeframes: {
          rest: {yoyo: true, key: 'zombie-wose-rest', prefix: 'ghosts/zombie-wose', start: 1, end: 1},
          attack: {key: 'zombie-wose-attack', prefix: 'ghosts/zombie-wose-attack', start: 1, end: 2, rate: 2},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]}
        ]
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('goblin-impaler',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Goblin',
        animeframes: {
          rest: {yoyo: true, key: 'goblin-impaler-rest', prefix: 'goblins/impaler/impaler', start: 1, end: 1},
          attack: {key: 'goblin-impaler-attack', prefix: 'goblins/impaler/goblin-impaler-attack-se-', start: 1, end: 2, rate: 2},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]}
        ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('goblin-rider',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Goblin Wolf Rider',
        animeframes: {
          rest: {yoyo: true, key: 'goblin-rider-rest', prefix: 'goblins/wolf-rider/wolf-rider', start: 1, end: 2, rate: 1},
          attack: {key: 'goblin-rider-attack', prefix: 'goblins/wolf-rider/wolf-rider-attack', start: 1, end: 2, rate: 2},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]}
        ]
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('goblin-rocrider',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Goblin Roc Rider',
        animeframes: {
          rest: {yoyo: false, key: 'goblin-rocrider-rest', prefix: 'rocrider/rocrider', start: 1, end: 8, rate: 4},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}
        ]
      })
    );

    // Water
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('merfolk-fighter',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Merfolk Fighter',
        flagAttributes: {
          tF: 1
        },
        animeframes: {
          rest: {yoyo: true, key: 'merfolk-fighter-rest', prefix: 'merfolk/fighter/fighter', start: 1, end: 1, rate: 1},
          attack: {key: 'merfolk-fighter-attack', prefix: 'merfolk/fighter/fighter-attack-', start: 1, end: 6, rate: 5}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]},
          { bodypart: constants.INVENTORY.BODYPART.HEAD, items: [{ itemId: 4052 } ]}
        ]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('merfolk-siren',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Merfolk Siren',
        flagAttributes: {
          tF: 1
        },

        animeframes: {
          rest: {yoyo: true, key: 'merfolk-siren-rest', prefix: 'merfolk/siren/siren', start: 1, end: 1, rate: 1},
          attack: {key: 'merfolk-siren-attack', prefix: 'merfolk/siren/siren-magic-', start: 1, end: 2, rate: 2}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]},
          { bodypart: constants.INVENTORY.BODYPART.HEAD, items: [{ itemId: 4052 } ]}
        ]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('mudcrawler',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Mud Crawler',
        animeframes: {
          rest: {yoyo: true, key: 'mudcrawler-rest', prefix: 'mudcrawler/mudcrawler', start: 1, end: 1, rate: 1},
          attack: {key: 'mudcrawler-attack', prefix: 'mudcrawler/mudcrawler-attack-', start: 1, end: 5, rate: 4}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]},
        ]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('giant-mudcrawler',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Giant Mud Crawler',
        animeframes: {
          rest: {yoyo: true, key: 'giant-mudcrawler-rest', prefix: 'mudcrawler/giant-mudcrawler', start: 1, end: 1, rate: 1},
          attack: {key: 'giant-mudcrawler-attack', prefix: 'mudcrawler/giant-mudcrawler-attack', start: 1, end: 11, rate: 4}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]},
        ]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('young-piranha',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Young Piranha',
        flagAttributes: {
          tF: 1
        },

        animeframes: {
          rest: {yoyo: true, key: 'young-piranha-rest', prefix: 'piranha/1/piranha1-', start: 1, end: 3, rate: 4},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]},
        ]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('piranha',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Piranha',
        flagAttributes: {
          tF: 1
        },

        animeframes: {
          rest: {yoyo: true, key: 'piranha-rest', prefix: 'piranha/2/piranha2-', start: 1, end: 3, rate: 4},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]},
        ]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('giant-piranha',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Giant Piranha',
        flagAttributes: {
          tF: 1
        },

        animeframes: {
          rest: {yoyo: true, key: 'giant-piranha-rest', prefix: 'piranha/3/piranha3-', start: 1, end: 3, rate: 4},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]},
        ]  // axe
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('black-salamander',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Black Salamander',
        animeframes: {
          rest: {yoyo: true, key: 'black-salamander-rest', prefix: 'salamanders/salamander-black/blacksalamander', start: 1, end: 1},
          attack: {key: 'black-salamander-attack', prefix: 'salamanders/salamander-black/blacksalamander-attack', start: 1, end: 6, rate: 5}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]},
        ]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('blue-salamander',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Blue Salamander',
        animeframes: {
          rest: {yoyo: true, key: 'blue-salamander-rest', prefix: 'salamanders/salamander-blue/bluesalamander', start: 1, end: 1},
          attack: {key: 'blue-salamander-attack', prefix: 'salamanders/salamander-blue/bluesalamander-attack', start: 1, end: 2, rate: 2}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]},
        ]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('green-salamander',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Green Salamander',
        animeframes: {
          rest: {yoyo: true, key: 'green-salamander-rest', prefix: 'salamanders/salamander-green/greensalamander', start: 1, end: 1},
          attack: {key: 'green-salamander-attack', prefix: 'salamanders/salamander-green/greensalamander-attack', start: 1, end: 2, rate: 2}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]},
        ]  // axe
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    // Fire
    this.agentpool.set('red-salamander',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Red Salamander',
        animeframes: {
          rest: {yoyo: true, key: 'red-salamander-rest', prefix: 'salamanders/salamander-red/redsalamander', start: 1, end: 3, rate: 2},
          attack: {key: 'red-salamander-attack', prefix: 'salamanders/salamander-red/redsalamander-attack', start: 1, end: 4, rate: 5}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]},
        ]  // axe
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    // swamp
    this.agentpool.set('saurian-warrior',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Saurian Warrior',
        animeframes: {
          rest: {yoyo: true, key: 'saurian-warrior-rest', prefix: 'saurians/warrior/warrior', start: 1, end: 1},
          attack: {key: 'saurian-warrior-attack', prefix: 'saurians/warrior/warrior-blade', start: 1, end: 4, rate: 5}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]},
        ]  // axe
      })
    );

    baseAgentclone = Object.assign({}, this.baseAgent);
    // Desert
    this.agentpool.set('sand-scuttler',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Sand Scuttler',
        animeframes: {
          rest: {yoyo: true, key: 'sand-scuttler-rest', prefix: 'scorpion/sand-scuttler-stinger-', start: 1, end: 2, rate: 2},
          attack: {key: 'sand-scuttler-attack', prefix: 'scorpion/sand-scuttler-pincer-', start: 1, end: 6, rate: 5}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5001 } ]},
        ]  // axe
      })
    );
    // Desert
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('scorpion',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Scorpion',
        animeframes: {
          rest: {yoyo: true, key: 'scorpion-rest', prefix: 'scorpion/scorpion-pincer-', start: 1, end: 2, rate: 2},
          attack: {key: 'scorpion-attack', prefix: 'scorpion/scorpion-stinger-', start: 1, end: 7, rate: 5}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5001 } ]},
        ]  // axe
      })
    );
    // Desert
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('scorpling',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Scorpling',
        animeframes: {
          rest: {yoyo: true, key: 'scorpling-rest', prefix: 'scorpion/scorpling-sting', start: 1, end: 2, rate: 2},
          attack: {key: 'scorpling-attack', prefix: 'scorpion/scorpling-pincer', start: 1, end: 7, rate: 5}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5001 } ]},
        ]  // axe
      })
    );

    // Sea Water
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('tentacle',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Deep Tentacle',
        flagAttributes: {
          tF: 1
        },
        animeframes: {
          rest: {yoyo: true, key: 'tentacle-rest', prefix: 'sea/deep-tentacle/deep-tentacle-melee-s-', start: 1, end: 2, rate: 1},
          attack: {key: 'tentacle-attack', prefix: 'sea/deep-tentacle/deep-tentacle-melee-s-', start: 1, end: 6, rate: 4},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5001 } ]},
        ]  // axe
      })
    );
    // Sea Water
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('kraken',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Kraken',
        flagAttributes: {
          tF: 1
        },
        animeframes: {
          rest: {yoyo: true, key: 'kraken-rest', prefix: 'sea/kraken/kraken', start: 1, end: 1},
          attack: {key: 'kraken-attack', prefix: 'sea/kraken/kraken-tentacle-', start: 1, end: 3, rate: 4},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5001 } ]},
        ]  // axe
      })
    );
    // Sea Water
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('seaserpent',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Sea Serpent',
        flagAttributes: {
          tF: 1
        },
        animeframes: {
          rest: {yoyo: true, key: 'seaserpent-rest', prefix: 'sea/seaserpent-old', start: 1, end: 1},
          attack: {key: 'seaserpent-attack', prefix: 'sea/seaserpent-old-attack', start: 1, end: 2, rate: 4},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5001 } ]},
        ]  // axe
      })
    );
    // Sea Water
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('young-cuttlefish',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Young Cuttlefish',
        flagAttributes: {
          tF: 1
        },
        animeframes: {
          rest: {yoyo: true, key: 'young-cuttlefish-rest', prefix: 'sea/young-cuttlefish/young-cuttlefish', start: 1, end: 1},
          attack: {key: 'young-cuttlefish-attack', prefix: 'sea/young-cuttlefish/young-cuttlefish-melee-', start: 1, end: 6, rate: 6},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5001 } ]},
        ]  // axe
      })
    );

    // Reptile Cave
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('shaman',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Shaman',
        animeframes: {
          rest: {yoyo: true, key: 'shaman-rest', prefix: 'shaman/shaman-', start: 1, end: 3, rate: 4},
          attack: {key: 'shaman-attack', prefix: 'shaman/shaman-magic-', start: 1, end: 3, rate: 5},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5007 } ]},
        ]  // axe
      })
    );

    // Swamp
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('ghast',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Ghast',
        animeframes: {
          rest: {yoyo: true, key: 'ghast-rest', prefix: 'swamp/ghast', start: 1, end: 1},
          attack: {key: 'ghast-attack', prefix: 'swamp/ghast-attack-', start: 1, end: 6, rate: 5},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5007 } ]},
        ]  // axe
      })
    );

    // Troll
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('boulder-lobber',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Boulder Lobber',
        animeframes: {
          rest: {yoyo: true, key: 'boulder-lobber-rest', prefix: 'trolls/boulderlobber', start: 1, end: 1},
          range: {key: 'boulder-lobber-range', prefix: 'trolls/boulderlobber-attack-ranged', start: 1, end: 2, rate: 2}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5008 } ]},
          { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5101} ]}
        ]  // axe
      })
    );
    // Troll
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('warmonger',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Warmonger',
        animeframes: {
          rest: {yoyo: true, key: 'warmonger-rest', prefix: 'trolls/warmonger', start: 1, end: 1},
          attack: {key: 'warmonger-attack', prefix: 'trolls/warmonger-attack-', start: 1, end: 4, rate: 5},
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5008 } ]},
          // { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5101} ]}
        ]  // axe
      })
    );

    // Reptile  Flying
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('wyvern-black',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Black Wyvern',
        flagAttributes: {
          sF: 0,
          tF: 3
        },
        animeframes: {
          rest: {yoyo: true, key: 'wyvern-black-rest', prefix: 'wyverns/wyvern-black/chaoswyvern-moving', start: 1, end: 3, rate: 2},
          attack: {key: 'wyvern-black-attack', prefix: 'wyverns/wyvern-black/chaoswyvern-attack', start: 1, end: 2, rate: 2},
          // range: {key: 'boulder-lobber-range', prefix: 'trolls/boulderlobber-attack-ranged', start: 1, end: 2, rate: 2}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5008 } ]},
          { bodypart: constants.INVENTORY.BODYPART.FINGERS, items: [{ itemId: 5005 }] }
          // { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5101} ]}
        ]  // axe
      })
    );
    // Reptile  Flying
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('wyvern-green',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Green Wyvern',
        flagAttributes: {
          sF: 0,
          tF: 3
        },
        animeframes: {
          rest: {yoyo: true, key: 'wyvern-green-rest', prefix: 'wyverns/wyveryn-green/greatwyvern-moving', start: 1, end: 3, rate: 2},
          attack: {key: 'wyvern-green-attack', prefix: 'wyverns/wyveryn-green/greatwyvern-attack', start: 1, end: 2, rate: 2},
          // range: {key: 'boulder-lobber-range', prefix: 'trolls/boulderlobber-attack-ranged', start: 1, end: 2, rate: 2}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5008 } ]},
          { bodypart: constants.INVENTORY.BODYPART.FINGERS, items: [{ itemId: 5005 }] }
        ]  // axe
      })
    );

    // Snow / Giant
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('yeti',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Yeti',
        animeframes: {
          rest: {yoyo: true, key: 'yeti-rest', prefix: 'yeti/yeti', start: 1, end: 1},
          attack: {yoyo:true, key: 'yeti-attack', prefix: 'yeti/yeti-attack', start: 1, end: 2, rate: 3},
          // range: {key: 'boulder-lobber-range', prefix: 'trolls/boulderlobber-attack-ranged', start: 1, end: 2, rate: 2}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5008 } ]},
          // { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5101} ]}
        ]  // axe
      })
    );




    // Woses / trees
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('wose-sapling',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Wose Sapling',
        animeframes: {
          rest: {yoyo: true, key: 'wose-sapling-rest', prefix: 'woses/wose-sapling', start: 1, end: 1, rate: 3},
          attack: {key: 'wose-sapling-attack', prefix: 'woses/wose-sapling', start: 2, end: 3, rate: 3, repeat: -1, delays: { frameNum: 3, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5006 } ]}]  // branch
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('wose-elder',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Wose Elder',
        animeframes: {
          rest: {yoyo: true, key: 'wose-elder-rest', prefix: 'woses/wose-elder', start: 1, end: 1, rate: 3},
          attack: {key: 'wose-elder-attack', prefix: 'woses/wose-elder-attack-', start: 1, end: 2, rate: 3, repeat: -1, delays: { frameNum: 2, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5006 } ]}]  // branch
      })
    );
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('wose-shaman',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Wose Shaman',
        animeframes: {
          rest: {yoyo: true, key: 'wose-shaman-rest', prefix: 'woses/wose-shaman', start: 1, end: 1, rate: 3},
          attack: {key: 'wose-shaman-attack', prefix: 'woses/wose-shaman-attack-', start: 1, end: 2, rate: 3, repeat: -1, delays: { frameNum: 2, delay: 300 }},
          range: {key: 'wose-shaman-attack', prefix: 'woses/wose-shaman-ranged-', start: 1, end: 2, rate: 3, repeat: -1, delays: { frameNum: 4, delay: 300 }}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5006 } ]},
          { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5002} ]}]
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

    health: 20,
    maxHealth: 20,
    power: 25,
    healingPower: 1,
    energizePower: 20,
    energizeSpeed: 3000,

    // aggressionScale: 3,
    aggressionScale: 5,

    gold: 1,
    // either a specific level, or a level range relative to the players
    level: 1,
    levelRange: 0,
    // levelRange: 2, +/- 2 levels from player

    flagAttributes: {
      sF: 0,
      tF: 2
    },
    offsets: {
      img: { x: 0, y: 0 },
      healthbar: { x: 0, y: 0 },
      name: { x: 0, y: 0 },
      damage: { x: 0, y: 0 }
    },
    patrol: {
      timeout: 4000,
      pursuitSpeed: 2000,
      aggressionSpeedTimeout: 2000,
      method: 'wander',
      tiles: [ // {x: 13, y: 4}, {x: 13, y: 2}
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
