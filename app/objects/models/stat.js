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
      case constants.INVENTORY.STATS.HEALTH:
        return 'Health';
      default:
        console.log('unmapped stat title', this);
        return '';
    }
  }

  get getDescription() {
    switch (this.type) {
      case constants.INVENTORY.STATS.DAMAGE:
        return this.value;
      case constants.INVENTORY.STATS.HEALTH:
        return `+${this.value}`;
      default:
        console.log('unmapped stat description', this);
        return '';
    }
  }
}
