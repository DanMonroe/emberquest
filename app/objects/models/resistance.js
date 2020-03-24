// import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';

export class Resistance {
  type;
  value;

  constructor(config) {
    Object.assign(this, config);
  }

  get getTitle() {
    switch (this.type) {
      case constants.INVENTORY.RESISTANCE.FIRE:
        return 'Fire';
      case constants.INVENTORY.RESISTANCE.COLD:
        return 'Cold';
      default:
        console.log('unmapped resistance title', this);
        return '';
    }
  }

  get getDescription() {
    switch (this.type) {
      case constants.INVENTORY.RESISTANCE.FIRE:
      case constants.INVENTORY.RESISTANCE.COLD:
        return `${this.value}%`;
      default:
        console.log('unmapped resitance description', this);
        return '';
    }
  }
}
