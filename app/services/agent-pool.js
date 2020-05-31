import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';

export default class AgentPoolService extends Service {

  @tracked agentpool;

  getAgentConfig(key) {
    const pool = this.getAgentPool();
    const agentConfig = pool.get(key);
    // const agentConfig = this.getAgentPool().get(key);
    // console.log('agentConfig', key, agentConfig);
    return agentConfig;
    // return this.getAgentPool().get(key);
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
    // SPIDER
    let baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('spider',
      Object.assign(baseAgentclone, {
        id: 1,
        name: 'Spider',
        texture: 'spider',
        health: 20,
        maxHealth: 20,
        healingPower: 3,
        // aggressionScale: 100,  // TODO need a better way to track aggression levels

        animeframes: {
          rest: {key: 'spider-rest', start: 1, end: 2, repeat: -1, rate: 1},
          attack: {key: 'spider-attack', start: 2, end: 14, rate: 12},
          range: {key: 'spider-range', start: 15, end: 21, rate: 8}
        },
        inventory: [
          {
            bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: [{itemId: 2001, droppable: false}],
          },
          {
            bodypart: constants.INVENTORY.BODYPART.RANGED, items: [ { itemId: 2002, droppable: false } ]
          }
        ]

        // patrol: {
        //   tiles: [
        //     // {x: 13, y: 4}, {x: 13, y: 2}
        //   ]
        // }
      })
    );

    // YOUNG-OGRE
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('young-ogre',
      Object.assign(baseAgentclone, {
        id: 2,
        name: 'Young Ogre',
        texture: 'young-ogre',
// health: 2,
// maxHealth: 2,
// healingPower: 1,
        scale: 1.5,
        animeframes: {
          rest: {key: 'young-ogre-rest', start: 1, end: 4, rate: 3, repeat: -1},
          attack: {key: 'young-ogre-attack', start: 5, end: 8, rate: 12, delays: { frameNum: 3, delay: 300 }}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items:
            [
              { itemId: 2000, droppable: false }  // sword
            ]},
        ]

        // patrol: {
        //   tiles: [
        //     // {x: 13, y: 4}, {x: 13, y: 2}
        //   ]
        // }
      })
    );

    // DOG
    baseAgentclone = Object.assign({}, this.baseAgent);
    this.agentpool.set('dog',
      Object.assign(baseAgentclone, {
        id: 3,
        name: 'Dog',
        texture: 'dog',
// health: 2,
// maxHealth: 2,
// healingPower: 1,
        scale: 1.5,
        animeframes: {
          rest: {key: 'dog-rest', start: 1, end: 3, rate: 3, repeat: -1},
          // attack: {key: 'dog-attack', start: 4, end: 5, rate: 12}
          attack: {key: 'dog-attack', start: 3, end: 5, rate: 12, delays: { frameNum: 1, delay: 300 }}
        },
        inventory: [
          { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items:
            [
              { itemId: 2003 }  // bite
            ]},
        ]

        // patrol: {
        //   tiles: [
        //     // {x: 13, y: 4}, {x: 13, y: 2}
        //   ]
        // }
      })
    );
  }

  baseAgent = {
    id: 1,
    name: '',
    texture: '',
    textureSize: { width: 72, height: 72},

    animeframes: {},

    audio: [{ die: '' }],

    scale: 1,

    speed: 200,
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
      sightFlags: 0,
      travelFlags: 2
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
