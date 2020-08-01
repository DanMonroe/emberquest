// import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';

export class Resistance {
  type;
  value;
  show = true;

  constructor(config) {
    // console.log('resistance config'. config)
    Object.assign(this, config);
  }

  get getTitle() {
    switch (this.type) {
      case constants.INVENTORY.RESISTANCE.FIRE:
        return 'Fire';
      case constants.INVENTORY.RESISTANCE.COLD:
        return 'Cold';
      case constants.INVENTORY.RESISTANCE.WATER:
        return 'Water';
      default:
        console.log('unmapped resistance title', this);
        return '';
    }
  }

  get getDescription() {
    switch (this.type) {
      case constants.INVENTORY.RESISTANCE.FIRE:
      case constants.INVENTORY.RESISTANCE.COLD:
      case constants.INVENTORY.RESISTANCE.WATER:
        return `${this.value}%`;
      default:
        console.log('unmapped resistance description', this);
        return '';
    }
  }
}
