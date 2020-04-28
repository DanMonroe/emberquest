const constants = Object.freeze({

  FLOATING_POINT_PRECISION_4: 4,
  FLOATING_POINT_PRECISION_1: 1,

  CACHE: {
    TYPE: {
      MYSTERY: 0
    },
    SIZE: {
      MICRO: 'Micro',
      SMALL: 'Small',
      REGULAR: 'Regular',
      LARGE: 'Large',
      OTHER: 'Other'
    }
  },

  ANIMATION: {
    KEY: {
      REST: 0,
      ATTACK: 1
    }
  },

  AUDIO: {
    KEY: {
      REST: 0,
      ATTACK: 1
    }
  },

  // Base agent properties are derived from inventory items from the listed inventory property
  INVENTORY: {
    // DAMAGE: 'damage',
    // HEALTH: 'health',
    // POWER: 'power',
    // ATTACK_SPEED: 'attackSpeed',
    // MOVE_SPEED: 'moveSpeed',
    // HEALING_SPEED: 'healingSpeedAdj',
    // HEALING_POWER: 'healingPowerAdj',

    TOTAL_BODYPARTS: 10,

    BODYPART: {
      BODY: 0,
      FEET: 1,
      HEAD: 2,
      ARMS: 3,
      LEFT_HAND: 4,
      RIGHT_HAND: 5,
      NECK: 6,
      FINGERS: 7,
      GLOVES: 8,
      RANGED: 9
    },

    STATS: {
      DAMAGE: 0,
      RANGEDDAMAGE: 1,
      HEALTH: 2,
      POWER: 3,
      MOVESPEED: 4,
      ATTACKSPEED: 5,
      HEALINGSPEEDADJ: 6,
      HEALINGPOWERADJ: 7
    },

    RESISTANCE: {
      FIRE: 0,
      COLD: 1
    },

    TYPE: {
      ARMOR: 0,
      WEAPON: 1,
      OTHER: 2
    }
  },

  BASE_ATTACK_TIMEOUT: 1000,  // yield this * attackAdj of inventory item equipped

  BASE_POWER: 100,
  POWER_PER_LEVEL: 2,

  HEALTH_PER_LEVEL: 20,
  HEALTH_BONUS_PER_LEVEL: 1.2,

  LEVEL_BY_EXPERIENCE: [0,50,70,85,300,400,900,2700,6500,14000,23000,34000,48000,64000,85000,100000],


  // LEVEL_1:     0,
  // LEVEL_2:   300,
  // LEVEL_3:   900,
  // LEVEL_4:  2700,
  // LEVEL_5:  6500,
  // LEVEL_6: 14000,
  // LEVEL_7: 23000,
  // LEVEL_8: 34000,
  // LEVEL_9: 48000,
  // LEVEL_10:64000,
  // LEVEL_11: 85000,
  // LEVEL_12:100000,
  LEVEL_RANGE_AFTER_12:25000,

  COLORS: {
    DARK: 0x007ac1
  },

  DIRECTIONS: {
    SE: 0,
    S: 1,
    SW: 2,
    NW: 3,
    N: 4,
    NE: 5
  },


  COLOR_HIDDEN: 0x000000,
  // COLOR_HIDDEN: 0x333333,

  ALPHA_POLYGON_VISIBLE_TO_PLAYER: 0,
  ALPHA_POLYGON_HIDDEN_TO_PLAYER: 1,
  ALPHA_OBJECT_VISIBLE_TO_PLAYER: 1,
  ALPHA_OBJECT_HIDDEN_TO_PLAYER: 0,

  // ALPHA_VISIBLE_TO_PLAYER: 0,
  // ALPHA_HIDDEN_FROM_PLAYER: 1,
  ALPHA_PREVIOUSLY_SEEN: 0.4,

  SHAPE_TYPE_PLAYER: 'Player',
  SHAPE_TYPE_POLYGON: 'Polygon',
  SHAPE_TYPE_CONTAINER: 'Container',
  SHAPE_TYPE_TRANSPORT: 'Transport',
  SHAPE_TYPE_DOOR: 'Door',
  SHAPE_TYPE_ENEMY: 'Enemy',
  SHAPE_TYPE_AGENT: 'Agent',

  FLAG_TYPE_TRAVEL: 0,
  FLAG_TYPE_VISIBILITY: 1,

  TILEZ_PLAYER: 100, // "layer" for player
  TILEZ_FOG: 2,    // "layer" for fog of war
  TILEZ_CHESTS: 3,    // "layer" for chests
  TILEZ_MONSTERS: 4,    // "layer" for monsters
  TILEZ_TRANSPORTS: 5, // "layer" for transports
  TILEZ_AGENTS: 6, // "layer" for agents
  TILEZ_DOORS: 7, // "layer" for doors

  AGENTSTATE: {
    IDLE: 0,
    PATROL: 1,
    MELEE: 2,
    MISSILE: 3,
    SEARCHING: 4,
    FLEEING: 5,
    FINDHELP: 6,
    DEAD: 7
  },

  PATROLMETHOD: {
    RANDOM: 'random',
    STATIC: 'static'
  },

  SPAWNER_TYPE: {
    DOOR: 'DOOR',
    CHEST: 'CHEST',
    TRANSPORT: 'TRANSPORT',
    AGENT: 'AGENT'
  },

  // all values in FLAGS should be bits  1, 2, 4, 8, 16, etc
  FLAGS: {
    TRAVEL: {
      SEA: {value: 1, description: 'Travel by Sea'},
      LAND: {value: 2, description: 'Travel by Land'},
      AIR: {value: 4, description: 'Travel by Air'},
      IMPASSABLE: {value: 8, description: 'Impassable'}
    },
    SIGHT: {
      IMPASSABLE: {value: 1, description: 'Impassable'}
    },
    SPECIAL: {
      DOCK: {value: 1, description: 'Dock'},
      PORTAL: {value: 2, description: 'Portal'},
      DOOR: {value: 4, description: 'Door'},
      MESSAGE: {value: 8, description: 'Message'}
    }
  },

  SHOW_MESSAGE_WHEN: {
    DOOR_EXISTS: {value: 1, description: 'Show Only When Door Exists'}, // data: { door_id:1, tileXY: {x: 11, y: 4} }}
  },

  SPECIAL_ACTIONS: {
    REMOVE_DOOR: {value: 1, description: 'Remove Door'},  // data: { door_id:1, tileXY: {x: 11, y: 4} }
    REMOVE_SIGHT_COST: {value: 2, description: 'Remove Sight Cost'},     // data: { tileXY: {x: 11, y: 3} }
    PLAY_SOUND: {value: 3, description: 'Play Sound'}     // data: { sound: 'open_door_1' }
  },


  healthBarOffsetX: -24,
  healthBarOffsetY: -33,
  healthBarWidth: 48,
  healthBarHeight: 5,
  healthBarColorGood: 0x30dd00,
  healthBarColorDanger: 0xff0000,
  healthBarColorTippingPoint: 0.25,

  powerBarOffsetX: -24,
  powerBarOffsetY: -27,
  powerBarWidth: 48,
  powerBarHeight: 5,
  powerBarColor: 0x1E5AFF
})

export {constants};
