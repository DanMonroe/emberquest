import { constants } from 'emberquest/services/constant';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';

export class BaseAgent {

  @tracked health;
  // @tracked maxHealth;
  // @tracked healingSpeed;
  // @tracked healingPower;
  @tracked power;
  @tracked maxPower;
  @tracked energizeSpeed = 2000;
  @tracked energizePower = 2;

  @tracked inventory = [];
  @tracked experience = 0;

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
    this.power = config.power || 10;
    this.baseHealingPower = config.baseHealingPower || 2;
    this.baseHealingSpeed = config.baseHealingSpeed || 2000;  // how fast they heal
    // this.healingPower = config.healingPower || 10;  // how much they heal each time
    this.energizeSpeed = config.energizeSpeed || 10;// how fast they recharge power
    this.energizePower = config.energizePower || 10;// how much power they recharge each time

    this.inventory = config.inventory || [];
  }

  // Main properties:

  get maxHealth() {
    return this.baseHealth + this.armorHealth;
  }

  get healingSpeed() {
    return this.baseHealingSpeed * this.healingSpeedAdj;
  }

  get healingPower() {
    return this.baseHealingPower * this.healingSpeedAdj;
  }


  // **************

  @computed('inventory.@each.equipped')
  get equippedInventory() {
    return this.inventory.filter(item => item.equipped === true);
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


  sumProperty(property) {
    return this.equippedInventory.reduce((sum, item) => {
      return sum + (item[property] || 0);
    }, 0);
  }

  addInventory(item) {
    this.inventory.push(item);
  }

  // could combine this with unequip but I think having them separate for now is better understood
  equipItem(item) {
    item.equipped = true;
  }

  unequipItem(item) {
    item.equipped = false;
  }

  get attackDamage() {
    return this.sumProperty(constants.INVENTORY.DAMAGE);
  }

  get armorHealth() {
    return this.sumProperty(constants.INVENTORY.HEALTH);
  }

  // this will be multiplied by the attackSpeed concurrency timeout
  // it will add 1.  if all adjustments are 0m the there will be no change to attackSpeed timeout
  // an adjustment speed less than 1 is faster
  get attackSpeedAdj() {
    return +parseFloat((this.sumProperty(constants.INVENTORY.ATTACK_SPEED)).toFixed(constants.FLOATING_POINT_PRECISION)) + 1;
  }
  get moveSpeedAdj() {
    return +parseFloat((this.sumProperty(constants.INVENTORY.MOVE_SPEED)).toFixed(constants.FLOATING_POINT_PRECISION)) + 1;
  }
  get healingSpeedAdj() {
    return +parseFloat((this.sumProperty(constants.INVENTORY.HEALING_SPEED)).toFixed(constants.FLOATING_POINT_PRECISION)) + 1;
  }
  get healingPowerAdj() {
    return +parseFloat((this.sumProperty(constants.INVENTORY.HEALING_POWER)).toFixed(constants.FLOATING_POINT_PRECISION)) + 1;
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
