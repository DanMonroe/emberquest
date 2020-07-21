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
          attack: {key: 'humanoid_peasantattack', prefix: 'humanoid/peasant/peasant-melee-', start: 1, end: 4, rate: 12, delays: { frameNum: 4, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5000 } ]}]  // sword
      })
    );

    // Animals
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('mutant_rat',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Mutant Rat',
        animeframes: {
          rest: {yoyo: true, key: 'mutant_ratrest', prefix: 'rat/mutant-rat', start: 1, end: 1, rate: 3, repeat: -1},
          attack: {key: 'mutant_ratattack', prefix: 'rat/mutant-rat-attack-', start: 1, end: 7, rate: 12, delays: { frameNum: 7, delay: 300 }}
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
          rest: {yoyo: true, key: 'spider', prefix: 'bugs/spider-little2-meelee-', start: 1, end: 3, rate: 3, repeat: -1},
          attack: {key: 'spider', prefix: 'bugs/spider-little2-meelee-', start: 1, end: 13, rate: 7, delays: { frameNum: 13, delay: 300 }},
          range: {key: 'spider', prefix: 'bugs/spider-little2-ranged-', start: 1, end: 7, rate: 12, delays: { frameNum: 7, delay: 300 }}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]},
          { bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 5002} ]}
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
        animeframes: {
          rest: {yoyo: true, key: 'flappers-rest', prefix: 'chaos/flappers-stand-', start: 1, end: 4, rate: 3, repeat: -1}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
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
    this.agentpool.set('lessor-demon',
      Object.assign(baseAgentclone, {
        id: agentId++,
        name: 'Lessor Demon',
        animeframes: {
          rest: {yoyo: true, key: 'lessor-demon-rest', prefix: 'chaos/lessor-demon-attack', start: 1, end: 1, rate: 3, repeat: -1},
          attack: {key: 'lessor-demon-attack', prefix: 'chaos/lessor-demon-attack', start: 1, end: 3, rate: 3, repeat: -1, delays: { frameNum: 3, delay: 300 }},
          range: {key: 'lessor-demon-ranged', prefix: 'chaos/lessor-demon-range', start: 1, end: 4, rate: 3, repeat: -1, delays: { frameNum: 4, delay: 300 }}
        },
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]}]  // bite
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
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5003 } ]},
          { bodypart: constants.INVENTORY.BODYPART.FINGERS, items: [{ itemId: 5005 } ] }
          ]  // bite
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
          attack: {key: 'dwarf-guard-attack', prefix: 'dwarves/guard/guard-attack', start: 1, end: 7, rate: 8, repeat: -1, delays: { frameNum: 7, delay: 300 }}
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
          rest: {yoyo: true, key: 'dwarf-heavywarrior-rest', prefix: 'dwarves/heavywarrior/heavywarrior', start: 1, end: 1, rate: 3},
          attack: {key: 'dwarf-heavywarrior-attack', prefix: 'dwarves/heavywarrior/heavywarrior-attack', start: 1, end: 2, rate: 8, repeat: -1, delays: { frameNum: 2, delay: 300 }}
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
        inventory: [{ bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{ itemId: 5004 } ]}]  // axe
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
      // timeout: 200,
      timeout: 2000,
      pursuitSpeed: 1500,
      aggressionSpeedTimeout: 2000,
      // aggressionTimeout: 1000,  // delay time in between aggression turns
      method: 'random',
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
