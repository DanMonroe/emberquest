import { constants } from 'emberquest/services/constants';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import { A as emberArray } from '@ember/array';
// import { InventoryItem } from 'emberquest/objects/models/inventory-item';
// import { Stat } from 'emberquest/objects/models/stat';


export class BaseAgent {

  @tracked health;
  @tracked power;
  @tracked energizeSpeed = 2000;
  @tracked energizePower = 2;

  @tracked inventory = emberArray([]);
  equippedSlot = [];

  @tracked experience = 0;

  @tracked aggressionScale = 0;
  @tracked gold = 0;

  constructor(scene, config) {
    // console.log('in base-agent constructor', scene, config)

    this.scene = scene;
    this.board = scene.board;
    this.ember = scene.ember;

    this.id = config.id;

    this.health = config.health || 10;
    this.gold = config.gold || 0;

    this.power = config.power || 10;

    this.baseHealingPower = config.baseHealingPower || 2;
    this.baseHealingSpeed = config.baseHealingSpeed || 2000;  // how fast they heal
    this.energizeSpeed = config.energizeSpeed || 10;// how fast they recharge power
    this.energizePower = config.energizePower || 10;// how much power they recharge each time

    for (let i = 0; i < constants.INVENTORY.TOTAL_BODYPARTS; i++) {
      this.equippedSlot[i] = null;
    }

    // this.fists = new InventoryItem({
    //   id: 8675309,
    //   type: constants.INVENTORY.TYPE.WEAPON,
    //   bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
    //   name: 'Fists',
    //   stats: [
    //     new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 1}),
    //     new Stat({type: constants.INVENTORY.STATS.POWER, value: 2}),
    //     new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: .5})
    //   ]
    // })
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
    return equippedMeleeWeapon ? equippedMeleeWeapon : this.ember.inventory.fists;
  }

  @computed('inventory.@each.equipped')
  get equippedRangedWeapon() {
    const equippedRangedWeapon = this.ember.inventory.getEquippedSlot(this, constants.INVENTORY.BODYPART.LEFT_HAND);

    // no default ranged weapon, so just return what is in left hand.
    return equippedRangedWeapon;
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

  @computed('experience')
  get level() {
    let level = 0;
    for (let i = 0; i < constants.LEVEL_BY_EXPERIENCE.length; i++) {
      level = i;
      if (constants.LEVEL_BY_EXPERIENCE[i] > this.experience) {
  // console.log('this.experience', this.experience, level)
        return level;
      }
    }
    const maxXPInArray = constants.LEVEL_BY_EXPERIENCE[constants.LEVEL_BY_EXPERIENCE.length-1];
    const remainderXP = this.experience - maxXPInArray;
    const levelsAboveArrayLimit = Math.floor(remainderXP / constants.LEVEL_RANGE_AFTER_12);
    return level + levelsAboveArrayLimit + 1;
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

  // experience award to player after a victory
  get experienceAwarded() {
    const halfBaseHealth = Math.floor(this.baseHealth * .5);
    const xp =  Math.floor(Math.random() * (this.baseHealth - halfBaseHealth + 1) + halfBaseHealth);
    // const xp =  Math.floor(Math.random() * (max - min + 1) + min)
    return xp;
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
  // it will add 1.  if all adjustments are 0 then there will be no change to attackSpeed timeout
  // an adjustment speed less than 1 is faster
  @computed('inventory.@each.equipped')
  get attackSpeedAdj() {
    const attackSpeed = this.getStats(constants.INVENTORY.STATS.ATTACKSPEED);
    if (!attackSpeed) {
      // should at least have fists which have a .5, so adjustment is 2x
      return 2;
    }
    return +parseFloat(constants.BASE_ATTACK_TIMEOUT/(this.getStats(constants.INVENTORY.STATS.ATTACKSPEED)*constants.BASE_ATTACK_TIMEOUT));
  }

  @computed('attackSpeedAdj')
  get attackSpeedAdjRounded() {
    return this.attackSpeedAdj.toFixed(constants.FLOATING_POINT_PRECISION_1);
  }

  @computed('inventory.@each.equipped')
  get moveSpeedAdj() {
    return +parseFloat((this.getStats(constants.INVENTORY.STATS.MOVESPEED)).toFixed(constants.FLOATING_POINT_PRECISION_4)) + 1;
  }

  @computed('inventory.@each.equipped')
  get healingSpeedAdj() {
    return +parseFloat((this.getStats(constants.INVENTORY.STATS.HEALINGSPEEDADJ)).toFixed(constants.FLOATING_POINT_PRECISION_4)) + 1;
  }

  @computed('inventory.@each.equipped')
  get healingPowerAdj() {
    return +parseFloat((this.getStats(constants.INVENTORY.STATS.HEALINGPOWERADJ)).toFixed(constants.FLOATING_POINT_PRECISION_4)) + 1;
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
