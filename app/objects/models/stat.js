// import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';

export class Stat {
  type;
  value;

  constructor(config) {
    Object.assign(this, config);
  }

  get getTitle() {
    switch (this.type) {
      case constants.INVENTORY.STATS.DAMAGE:
        return 'Damage';
      case constants.INVENTORY.STATS.POWER:
        return 'Power Use';
      case constants.INVENTORY.STATS.ATTACKSPEED:
        return 'Speed cost';
      case constants.INVENTORY.STATS.RANGEDDAMAGE:
        return 'Ranged Damage';
      case constants.INVENTORY.STATS.HEALTH:
        return 'Health';
      default:
        console.log('unmapped stat title', this);
        return '';
    }
  }

  get getDescription() {
    let speed;
    switch (this.type) {
      case constants.INVENTORY.STATS.DAMAGE:
      case constants.INVENTORY.STATS.RANGEDDAMAGE:
      case constants.INVENTORY.STATS.POWER:
        return this.value;
      case constants.INVENTORY.STATS.ATTACKSPEED:
        speed = (+parseFloat((this.value / 1000).toFixed(1)));
        return `${speed} seconds`
      case constants.INVENTORY.STATS.HEALTH:
        return `+${this.value}`;
      default:
        console.log('unmapped stat description', this);
        return '';
    }
  }
}
