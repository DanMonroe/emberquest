const constants = Object.freeze({

  FLOATING_POINT_PRECISION: 4,

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

  // Base agent properties are derived from inventory items from the listed inventory property
  INVENTORY: {
    // DAMAGE: 'damage',
    // HEALTH: 'health',
    // POWER: 'power',
    // ATTACK_SPEED: 'attackSpeed',
    // MOVE_SPEED: 'moveSpeed',
    // HEALING_SPEED: 'healingSpeedAdj',
    // HEALING_POWER: 'healingPowerAdj',

    TOTAL_BODYPARTS: 9,

    BODYPART: {
      BODY: 0,
      FEET: 1,
      HEAD: 2,
      ARMS: 3,
      LEFT_HAND: 4,
      RIGHT_HAND: 5,
      NECK: 6,
      FINGERS: 7,
      GLOVES: 8
    },

    STATS: {
      DAMAGE: 0,
      HEALTH: 1,
      POWER: 2,
      MOVESPEED: 3,
      ATTACKSPEED: 4,
      HEALINGSPEEDADJ: 5,
      HEALINGPOWERADJ: 6
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

  BASE_POWER: 100,
  POWER_PER_LEVEL: 2,

  HEALTH_PER_LEVEL: 20,
  HEALTH_BONUS_PER_LEVEL: 1.2,

  LEVEL_1:     0,
  LEVEL_2:   300,
  LEVEL_3:   900,
  LEVEL_4:  2700,
  LEVEL_5:  6500,
  LEVEL_6: 14000,
  LEVEL_7: 23000,
  LEVEL_8: 34000,
  LEVEL_9: 48000,
  LEVEL_10:64000,
  LEVEL_11: 85000,
  LEVEL_12:100000,
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
  SHAPE_TYPE_ENEMY: 'Enemy',
  SHAPE_TYPE_AGENT: 'Agent',

  FLAG_TYPE_TRAVEL: 0,
  FLAG_TYPE_VISIBILITY: 1,

  TILEZ_PLAYER: 1, // "layer" for player
  TILEZ_FOG: 2,    // "layer" for fog of war
  TILEZ_CHESTS: 3,    // "layer" for chests
  TILEZ_MONSTERS: 4,    // "layer" for monsters
  TILEZ_TRANSPORTS: 5, // "layer" for transports
  TILEZ_AGENTS: 6, // "layer" for agents

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
    MONSTER: 'MONSTER',
    CHEST: 'CHEST',
    TRANSPORT: 'TRANSPORT',
    AGENT: 'AGENT'
  },

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
      PORTAL: {value: 2, description: 'Portal'}
    }
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
