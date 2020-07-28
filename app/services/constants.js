const constants = Object.freeze({

  FLOATING_POINT_PRECISION_4: 4,
  FLOATING_POINT_PRECISION_1: 1,

  GAMECLOCKDELAY: 3000,

  STOREDATTRS: [
    { key: 'xp', attr: 'experience', default: 0 },
    { key: 'health', attr: 'health', default: 10 },
    { key: 'power', attr: 'power', default: 10 },
    { key: 'gold', attr: 'gold', default: 0 }
  ],

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
      ATTACK: 1,
      RANGE: 2,
      MOVE: 3,
      DEATH: 4
    }
  },

  AUDIO: {
    KEY: {
      REST: 0,
      ATTACK: 1,
      SWORD: 2,
      PLAYERDEATH: 3
    },
    CHEST: {key: 'pickup'}
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

    ROYAL_EMBER_ID: 12600,

    BODYPARTS: [
      { name: "torso", part: 0, text: "Body", tooltipSide: "right" },
      { name: "feet", part: 1, text: "Feet", tooltipSide: "right" },
      { name: "head", part: 2, text: "Head", tooltipSide: "right" },
      { name: "arms", part: 3, text: "Arms", tooltipSide: "left" },
      { name: "lefthand", part: 4, text: "Left Hand", tooltipSide: "left" },
      { name: "righthand", part: 5, text: "Right Hand", tooltipSide: "right" },
      { name: "neck", part: 6, text: "Neck", tooltipSide: "left" },
      { name: "fingers", part: 7, text: "Fingers", tooltipSide: "left" },
      { name: "gloves", part: 8, text: "Gloves", tooltipSide: "right" },
      { name: "ranged", part: 9, text: "Ranged Weapon", tooltipSide: "left" }
    ],

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
      HEALINGPOWERADJ: 7,
      ACCURACY: 8,
    },

    RESISTANCE: {
      FIRE: 0,
      COLD: 1,
      WATER: 2
    },

    TYPE: {
      ARMOR: 0,
      WEAPON: 1,
      OTHER: 2,
      STATS: 3,
      TRANSPORT: 4,
      NONDISPLAY: 5
    }
  },

  BASE_ATTACK_TIMEOUT: 1000,  // yield this * attackAdj of inventory item equipped

  BASE_POWER: 100,
  POWER_PER_LEVEL: 2,

  HEALTH_PER_LEVEL: 20,
  HEALTH_BONUS_PER_LEVEL: 1.2,

  LEVEL_BY_EXPERIENCE: [0,50,70,85,300,400,900,2700,6500,14000,23000,34000,48000,64000,85000,100000],
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

  ALPHA_POLYGON_VISIBLE_TO_PLAYER: 0,
  ALPHA_POLYGON_HIDDEN_TO_PLAYER: 1,
  ALPHA_OBJECT_VISIBLE_TO_PLAYER: 1,
  ALPHA_OBJECT_HIDDEN_TO_PLAYER: 0,

  ALPHA_PREVIOUSLY_SEEN: 0.4,

  SHAPE_TYPE_PLAYER: 'Player',
  SHAPE_TYPE_POLYGON: 'Polygon',
  SHAPE_TYPE_CONTAINER: 'Container',
  SHAPE_TYPE_TRANSPORT: 'Transport',
  SHAPE_TYPE_DOOR: 'Door',
  SHAPE_TYPE_SIGNPOST: 'Sign',
  SHAPE_TYPE_SPRITE: 'Sprite',
  SHAPE_TYPE_CHEST: 'Chest',
  SHAPE_TYPE_ENEMY: 'Enemy',
  SHAPE_TYPE_AGENT: 'Agent',

  SPRITES_TEXTURE: 'eq_sprites',

  FLAG_TYPE_TRAVEL: 0,
  FLAG_TYPE_VISIBILITY: 1,

  TILEZ_PLAYER: 100, // "layer" for player
  TILEZ_CHESTS: 10,    // "layer" for chests
  TILEZ_FOG: 20,    // "layer" for fog of war
  TILEZ_MONSTERS: 30,    // "layer" for monsters
  TILEZ_TRANSPORTS: 40, // "layer" for transports
  TILEZ_AGENTS: 50, // "layer" for agents
  TILEZ_DOORS: 60, // "layer" for doors
  TILEZ_SIGNS: 80, // "layer" for signs
  TILEZ_SPRITES: 90, // "layer" for sprites

  AGENTSTATE: {
    IDLE: 0,
    PATROL: 1,
    MELEE: 2,
    MISSILE: 3,
    SEARCHING: 4,
    FLEEING: 5,
    FINDHELP: 6,
    DEAD: 7,
    PURSUE: 8
  },

  PATROLMETHOD: {
    RANDOM: 'random',
    STATIC: 'static',
    WANDER: 'wander'
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
      IMPASSABLE: {value: 8, description: 'Impassable'},
      ICE: {value: 16, description: 'Ice Breaker'}
    },
    SIGHT: {
      IMPASSABLE: {value: 128, description: 'Impassable'}
    },
    SPECIAL: {
      DOCK: {value: 1, description: 'Dock'},
      PORTAL: {value: 2, description: 'Portal'},
      DOOR: {value: 4, description: 'Door'},
      MESSAGE: {value: 8, description: 'Message'},
      LAVA: {value: 16, description: 'Lava'},
      ROYALEMBER: {value: 32, description: 'Royal Ember'},
      NEST: {value: 64, description: 'Nest'}, // Dock for flying
      DROWN: {value: 128, description: 'Drown'},
    }
  },

  // requirements before a portal will work
  PORTAL: {
    REQUIRED: {
      GETCHEST: 1,  // must have specific chest first
      UNMOUNTED: 2  // cant be mounted
    }
  },

  // requirements before a chest can be picked up
  CHESTS: {
    REQUIRED: {
      UNMOUNTED: 1  // cant be mounted
    }
  },

  // specific agent IDs
  AGENTS: {
    GRYPHON: 1309
  },

  MESSAGEIDS: {
    UNMOUNT_GRYPHON_FOR_PORTAL: 4000,
    UNMOUNT_GRYPHON_FOR_CHEST: 4001
  },

  SHOW_MESSAGE_WHEN: {
    DOOR_EXISTS: {value: 1, description: 'Show Only When Door Exists'}, // data: { door_id:1, tileXY: {x: 11, y: 4} }}
  },

  SPECIAL_ACTIONS: {
    REMOVE_DOOR: {value: 1, description: 'Remove Door'},  // data: { door_id:1, tileXY: {x: 11, y: 4} }
    REMOVE_SIGHT_COST: {value: 2, description: 'Remove Sight Cost'},     // data: { tileXY: {x: 11, y: 3} }
    PLAY_SOUND: {value: 3, description: 'Play Sound'},     // data: { sound: 'open_door_1' }
    FINAL_FANFAIR: {value: 4, description: 'Final Chest Found'},
    PLAY_ANIMATION: {value: 5, description: 'Play Animation'},     // data: { key: 'lever-on' }
    MOVE_TRANSPORT: {value: 6, description: 'Move Transport'}, // data: { poolkey: 'final_1', target:{ x: 38, y: 59 }}}
    WHIRLPOOL_IN: {value: 7, description: 'Whirlpool into castle'}, // data: { target:{ x: 36, y: 36 }}}
    WHIRLPOOL_OUT: {value: 8, description: 'Whirlpool out of castle'}, // data: { target:{ x: 36, y: 36 }}}
    GET_CHEST: {value: 9, description: 'Pick up chest'},
  },


  levelIndicatorOffsetX: -35,
  levelIndicatorOffsetY: -70,

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
