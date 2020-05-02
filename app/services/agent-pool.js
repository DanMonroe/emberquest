import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';

export default class AgentPoolService extends Service {

  @tracked agentpool;

  getAgentConfig(key) {
    const agentConfig = this.getAgentPool().get(key);
    console.log('agentConfig', key, agentConfig);
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
    console.log('populate agent pool');

    this.agentpool = new Map();

    this.agentpool.set('spider',
      Object.assign(this.baseAgent, {
        id: 1,
        texture: 'spider',
        animeframes: {
          rest: {key: 'spider-rest', start: 1, end: 1, repeat: 0},
          attack: {key: 'spider-attack', start: 2, end: 14, rate: 12},
          range: {key: 'spider-range', start: 15, end: 21, rate: 12}
        },
        patrol: {
          tiles: [
            // {x: 13, y: 4}, {x: 13, y: 2}
          ]
        }
      })
    );
  }

  baseAgent = {
    id: 1,
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
    health: 20,
    maxHealth: 20,
    power: 15,
    healingPower: 5,

    aggressionScale: 1,  // TODO need a better way to track aggression levels
    // aggressionScale: 10,  // TODO need a better way to track aggression levels

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
      aggressionSpeedTimeout: 1000,
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
      { bodypart: constants.INVENTORY.BODYPART.BODY, items: []},
      { bodypart: constants.INVENTORY.BODYPART.FEET, items: []},
      { bodypart: constants.INVENTORY.BODYPART.HEAD, items: []},
      { bodypart: constants.INVENTORY.BODYPART.ARMS, items: []},
      { bodypart: constants.INVENTORY.BODYPART.LEFT_HAND, items: []},
      { bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND, items: []},
      { bodypart: constants.INVENTORY.BODYPART.NECK, items: []},
      { bodypart: constants.INVENTORY.BODYPART.FINGERS, items: []},
      { bodypart: constants.INVENTORY.BODYPART.GLOVES, items: []}
    ]
  }
}
