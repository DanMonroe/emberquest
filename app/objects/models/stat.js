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
      case constants.INVENTORY.STATS.MOVESPEED:
        return 'Move Speed';
      case constants.INVENTORY.STATS.ATTACKSPEED:
        return 'Speed Cost';
      case constants.INVENTORY.STATS.RANGEDDAMAGE:
        return 'Ranged Damage';
      case constants.INVENTORY.STATS.HEALTH:
        return 'Health';
      case constants.INVENTORY.STATS.HEALINGSPEEDADJ:
        return 'Regain Health Amount';
      case constants.INVENTORY.STATS.HEALINGPOWERADJ:
        return 'Regain Health Speed';
      case constants.INVENTORY.STATS.ENERGIZEPOWERADJ:
        return 'Regain Power Amount';
      case constants.INVENTORY.STATS.ENERGIZESPEEDADJ:
        return 'Regain Power Speed';
      default:
        console.log('unmapped stat title', this);
        return '';
    }
  }

  get getDescription() {
    switch (this.type) {
      case constants.INVENTORY.STATS.DAMAGE:
      case constants.INVENTORY.STATS.RANGEDDAMAGE:
      case constants.INVENTORY.STATS.POWER:
      case constants.INVENTORY.STATS.ENERGIZEPOWERADJ:
      case constants.INVENTORY.STATS.ENERGIZESPEEDADJ:
      case constants.INVENTORY.STATS.HEALINGSPEEDADJ:
      case constants.INVENTORY.STATS.HEALINGPOWERADJ:
      case constants.INVENTORY.STATS.MOVESPEED:
      case constants.INVENTORY.STATS.ATTACKSPEED:
        return this.value;
      case constants.INVENTORY.STATS.HEALTH:
        return `+${this.value}`;
      default:
        console.log('unmapped stat description', this);
        return '';
    }
  }
}
