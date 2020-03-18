import { constants } from 'emberquest/services/constant';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';

export class BaseAgent {

  @tracked health;
  @tracked maxHealth;
  @tracked healingSpeed;
  @tracked healingPower;
  @tracked power;
  @tracked maxPower;
  @tracked energizeSpeed = 2000;
  @tracked energizePower = 2;

  @tracked inventory = [];

  constructor(scene, config) {
    // console.log('in base-agent constructor', scene, config)

    this.scene = scene;
    this.board = scene.board;
    this.ember = scene.ember;

    this.id = config.id;

    this.health = config.health || 10;
    this.maxHealth = config.maxHealth || 10;
    this.power = config.power || 10;
    this.maxPower = config.maxPower || 10;
    this.healingSpeed = config.healingSpeed || 10;  // how fast they heal
    this.healingPower = config.healingPower || 10;  // how much they heal each time
    this.energizeSpeed = config.energizeSpeed || 10;// how fast they recharge power
    this.energizePower = config.energizePower || 10;// how much power they recharge each time

    this.inventory = config.inventory || [];
  }

  @computed('inventory.@each.equipped')
  get equippedInventory() {
    return this.inventory.filter(item => item.equipped === true);
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

  getInventoryByType(type, equippedOnly = true) {
    switch (type) {
      case constants.TYPE_ARMOR:
      case constants.TYPE_WEAPON:
        return equippedOnly ? this.equippedInventory.filter(item => item.type === type) : this.inventory.filter(item => item.type === type);
      default:
        return [];
    }
  }

  getInventoryByResistance(type) {
    switch (type) {
      case constants.RESISTANCE_FIRE:
        return this.equippedInventory.filter(item => {
          if (!item.resistance || item.resistance.length === 0) {
            return false;

          }
          return item.resistance.some(resistance => resistance.type === constants.RESISTANCE_FIRE);
        });
      case constants.RESISTANCE_COLD:
        return this.equippedInventory.filter(item => {
          if (!item.resistance || item.resistance.length === 0) {
            return false;

          }
          return item.resistance.some(resistance => resistance.type === constants.RESISTANCE_COLD);
        });
      default:
        return [];
    }
  }

  getResistance(type) {
    let totalResistance = 0;
    switch (type) {
      case constants.RESISTANCE_FIRE:
      case constants.RESISTANCE_COLD:

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
