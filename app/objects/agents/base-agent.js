import { constants } from 'emberquest/services/constants';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import { A as emberArray } from '@ember/array';
import { InventoryItem } from 'emberquest/objects/models/inventory-item';
import { Stat } from 'emberquest/objects/models/stat';


export class BaseAgent {

  @tracked health;
  // @tracked maxHealth;
  // @tracked healingSpeed;
  // @tracked healingPower;
  @tracked power;
  // @tracked maxPower = 1;
  @tracked energizeSpeed = 2000;
  @tracked energizePower = 2;

  @tracked inventory = emberArray([]);
  equippedSlot = [];

  @tracked experience = 0;

  @tracked aggressionScale = 0;
  @tracked xpGain = 0;
  @tracked gold = 0;

  fists = undefined;

  // These properties are derived from inventory items from the listed inventory property
  // attackDamage - from 'damage'
  // armorHealth - from 'health'
  // attackSpeedAdj - from 'attackSpeed'
  // moveSpeedAdj - from 'moveSpeed'
  // healingSpeedAdj - from 'healingSpeedAdj'

  // maxHealth =  baseHealth + armorHealth
  // healingSpeed =  baseSpeed + armorHealth
  // healingPower =  baseHealth + armorHealth

  constructor(scene, config) {
    // console.log('in base-agent constructor', scene, config)

    this.scene = scene;
    this.board = scene.board;
    this.ember = scene.ember;

    this.id = config.id;

    this.health = config.health || 10;
    // this.maxHealth = config.maxHealth || 10;
    this.gold = config.gold || 0;

    this.power = config.power || 10;
    // this.maxPower = config.maxPower || 10;

    this.baseHealingPower = config.baseHealingPower || 2;
    this.baseHealingSpeed = config.baseHealingSpeed || 2000;  // how fast they heal
    // this.healingPower = config.healingPower || 10;  // how much they heal each time
    this.energizeSpeed = config.energizeSpeed || 10;// how fast they recharge power
    this.energizePower = config.energizePower || 10;// how much power they recharge each time

    for (let i = 0; i < constants.INVENTORY.TOTAL_BODYPARTS; i++) {
      this.equippedSlot[i] = null;
    }

    this.fists = new InventoryItem({
      id: 8675309,
      type: constants.INVENTORY.TYPE.WEAPON,
      bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
      name: 'Fists',
      stats: [
        new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 1}),
        new Stat({type: constants.INVENTORY.STATS.POWER, value: 2}),
        new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 500})
      ]
    })
  }

  // Main properties:

  get maxPower() {
    return this.basePower + this.powerFromInventory;
  }

  get maxHealth() {
    return this.baseHealth + this.armorHealth;
  }

  get healingSpeed() {
    return this.baseHealingSpeed * this.healingSpeedAdj;
  }

  get healingPower() {
    return this.baseHealingPower * this.healingPowerAdj;
  }


  // **************

  @computed('inventory.@each.equipped')
  get equippedMeleeWeapon() {
    const equippedMeleeWeapon = this.ember.inventory.getEquippedSlot(this, constants.INVENTORY.BODYPART.RIGHT_HAND);

    // always have your fists to use.
    return equippedMeleeWeapon ? equippedMeleeWeapon : this.fists;
  }

  @computed('inventory.@each.equipped')
  get equippedInventory() {
    return this.inventory.filter(item => item.equipped === true);
  }

  @computed('inventory.@each.equipped')
  get saveGameInventoryAttrs() {
    let saveAttrs = this.inventory.map(item => {
      return { id: item.id, eq: item.equipped };
    })
    return saveAttrs;
  }

  get level() {
    if (this.experience < constants.LEVEL_2) { return 1; }
    if (this.experience < constants.LEVEL_3) { return 2; }
    if (this.experience < constants.LEVEL_4) { return 3; }
    if (this.experience < constants.LEVEL_5) { return 4; }
    if (this.experience < constants.LEVEL_6) { return 5; }
    if (this.experience < constants.LEVEL_7) { return 6; }
    if (this.experience < constants.LEVEL_8) { return 7; }
    if (this.experience < constants.LEVEL_9) { return 8; }
    if (this.experience < constants.LEVEL_10) { return 9; }
    if (this.experience < constants.LEVEL_11) { return 10; }
    if (this.experience < constants.LEVEL_12) { return 11; }

    // after level 11, experience between levels is a constant.
    return 12 + Math.floor((this.experience - constants.LEVEL_12)/constants.LEVEL_RANGE_AFTER_12);
  }

  get bonusPercentagePerLevel() {
    return 1 + (+parseFloat(((constants.HEALTH_BONUS_PER_LEVEL * (this.level-1))) / 10).toFixed(1));
  }

  get baseHealth() {
    /**
     * (20 * level) * (1.2 * level)%
     */
    const base = this.level * constants.HEALTH_PER_LEVEL
    const baseWithBonus = Math.floor(base * this.bonusPercentagePerLevel);
    // console.log('base, bonus, baseWithBonus', base, bonus, (1 + bonus), baseWithBonus);
    return baseWithBonus;
  }

  get basePower() {
    const base = this.level * constants.POWER_PER_LEVEL
    const baseWithBonus = Math.floor(base * this.bonusPercentagePerLevel);
    return constants.BASE_POWER + baseWithBonus;
  }


  sumProperty(property) {
    // return this.getStats(property);
    return this.equippedInventory.reduce((sum, item) => {
      return sum + (item[property] || 0);
    }, 0);
  }

  addInventory(item) {
    console.log('adding inventory', item)
    this.inventory.pushObject(item);
    console.log('   new inventory', this.inventory)
  }

  // could combine this with unequip but I think having them separate for now is better understood
  equipItem(item) {
    item.equipped = true;
    this.equippedSlot[item.bodypart] = item;
  }

  unequipItem(item) {
    this.equippedSlot[item.bodypart] = null;
    item.equipped = false;
  }

  @computed('inventory.@each.equipped')
  get attackDamage() {
    // always return at least 1 (Fists)
    return Math.max(1, this.getStats(constants.INVENTORY.STATS.DAMAGE));
  }

  @computed('inventory.@each.equipped')
  get rangedAttackDamage() {
    return this.getStats(constants.INVENTORY.STATS.RANGEDDAMAGE);
  }

  @computed('inventory.@each.equipped')
  get armorHealth() {
    return this.getStats(constants.INVENTORY.STATS.HEALTH);
  }

  @computed('inventory.@each.equipped')
  get powerFromInventory() {
    return this.getStats(constants.INVENTORY.STATS.POWER);
  }

  // this will be multiplied by the attackSpeed concurrency timeout
  // it will add 1.  if all adjustments are 0m the there will be no change to attackSpeed timeout
  // an adjustment speed less than 1 is faster
  @computed('inventory.@each.equipped')
  get attackSpeedAdj() {
    return +parseFloat((this.getStats(constants.INVENTORY.STATS.ATTACKSPEED)).toFixed(constants.FLOATING_POINT_PRECISION)) + 1;
  }

  @computed('inventory.@each.equipped')
  get moveSpeedAdj() {
    return +parseFloat((this.getStats(constants.INVENTORY.STATS.MOVESPEED)).toFixed(constants.FLOATING_POINT_PRECISION)) + 1;
  }

  @computed('inventory.@each.equipped')
  get healingSpeedAdj() {
    return +parseFloat((this.getStats(constants.INVENTORY.STATS.HEALINGSPEEDADJ)).toFixed(constants.FLOATING_POINT_PRECISION)) + 1;
  }

  @computed('inventory.@each.equipped')
  get healingPowerAdj() {
    return +parseFloat((this.getStats(constants.INVENTORY.STATS.HEALINGPOWERADJ)).toFixed(constants.FLOATING_POINT_PRECISION)) + 1;
  }

  getInventoryByType(type, equippedOnly = true) {
    switch (type) {
      case constants.INVENTORY.TYPE.ARMOR:
      case constants.INVENTORY.TYPE.WEAPON:
        return equippedOnly ? this.equippedInventory.filter(item => item.type === type) : this.inventory.filter(item => item.type === type);
      default:
        return [];
    }
  }

  getInventoryByResistance(type) {
    switch (type) {
      case constants.INVENTORY.RESISTANCE.FIRE:
        return this.equippedInventory.filter(item => {
          if (!item.resistance || item.resistance.length === 0) {
            return false;

          }
          return item.resistance.some(resistance => resistance.type === constants.INVENTORY.RESISTANCE.FIRE);
        });
      case constants.INVENTORY.RESISTANCE.COLD:
        return this.equippedInventory.filter(item => {
          if (!item.resistance || item.resistance.length === 0) {
            return false;

          }
          return item.resistance.some(resistance => resistance.type === constants.INVENTORY.RESISTANCE.COLD);
        });
      default:
        return [];
    }
  }

  getInventoryByStat(type) {
    switch (type) {
      case constants.INVENTORY.STATS.DAMAGE:
      case constants.INVENTORY.STATS.RANGEDDAMAGE:
      case constants.INVENTORY.STATS.HEALTH:
      case constants.INVENTORY.STATS.MOVESPEED:
      case constants.INVENTORY.STATS.ATTACKSPEED:
      case constants.INVENTORY.STATS.HEALINGSPEEDADJ:
      case constants.INVENTORY.STATS.HEALINGPOWERADJ:
        return this.equippedInventory.filter(item => {
          if (!item.stats || item.stats.length === 0) {
            return false;
          }
          return item.stats.some(stat => stat.type === type);
        });
      default:
        return [];
    }
  }

  getStats(type) {
    // console.count('getStats')
    let total = 0;
    // console.log('getStats', type)
    switch (type) {
      case constants.INVENTORY.STATS.DAMAGE:
      case constants.INVENTORY.STATS.RANGEDDAMAGE:
      case constants.INVENTORY.STATS.HEALTH:
      case constants.INVENTORY.STATS.MOVESPEED:
      case constants.INVENTORY.STATS.ATTACKSPEED:
      case constants.INVENTORY.STATS.HEALINGSPEEDADJ:
      case constants.INVENTORY.STATS.HEALINGPOWERADJ:

        // sum all inventory items, and each stat object in that item.
        total += this.getInventoryByStat(type).reduce((sum, { stats } ) => {
          let subtotal_stat = stats.reduce((subsum, substat ) => {
            return substat.type === type ? subsum + substat.value : subsum;
          }, 0); // start with 0
  // console.log('subtotal_stat', subtotal_stat)
          return sum + subtotal_stat;
        }, 0); // start with 0
        break;
      default:
        break;
    }
    return total;
  }

  getResistance(type) {
    let totalResistance = 0;
    switch (type) {
      case constants.INVENTORY.RESISTANCE.FIRE:
      case constants.INVENTORY.RESISTANCE.COLD:

        // sum all inventory items, and each resistance object in that item.
        totalResistance += this.getInventoryByResistance(type).reduce((sum, { resistance } ) => {
          let subtotal_resistance = resistance.reduce((subsum, subresistance ) => {
            return subresistance.type === type ? subsum + subresistance.value : subsum;
          }, 0); // start with 0

          return sum + subtotal_resistance;
        }, 0); // start with 0
        break;
      default:
        break;
    }
    return totalResistance > 100 ? 100 : totalResistance;
  }
}
