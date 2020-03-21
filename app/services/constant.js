const constants = Object.freeze({

  FLOATING_POINT_PRECISION: 4,

  // Base agent properties are derived from inventory items from the listed inventory property
  INVENTORY : {
    DAMAGE: 'damage',
    HEALTH: 'health',
    ATTACK_SPEED: 'attackSpeed',
    MOVE_SPEED: 'moveSpeed',
    HEALING_SPEED: 'healingSpeedAdj',
    HEALING_POWER: 'healingPowerAdj',

    RESISTANCE : {
      FIRE: 0,
      COLD: 1
    },

    TYPE : {
      ARMOR: 0,
      WEAPON: 1,
      OTHER: 2
    }
  },

  HEALTH_PER_LEVEL: 20,
  HEALTH_BONUS_PER_LEVEL: 1.2,

  LEVEL_1 :     0,
  LEVEL_2 :   300,
  LEVEL_3 :   900,
  LEVEL_4 :  2700,
  LEVEL_5 :  6500,
  LEVEL_6 : 14000,
  LEVEL_7 : 23000,
  LEVEL_8 : 34000,
  LEVEL_9 : 48000,
  LEVEL_10 :64000,
  LEVEL_11: 85000,
  LEVEL_12:100000,
  LEVEL_RANGE_AFTER_12:25000
})

export {constants};
