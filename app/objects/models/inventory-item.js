import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';

export class InventoryItem {
  id;
  name;
  type;
  description;
  sound;
  soundhit;
  listorder;

  maxRange = 20;
  // weaponSpeed = 1000; // time between attacks
  projectileSpeed = 200;
  // poweruse = 10;
  // accuracy = 90; // percentage

  bodypart;  // where the item can be equipped

  @tracked img;
  @tracked projectileImg;
  @tracked velocity;
  @tracked price;
  @tracked owned = false;
  @tracked display = false;
  @tracked locked;
  @tracked equipped = false;
  @tracked tileX;
  @tracked tileY;
  @tracked stats; // array of Stat objects
  @tracked resistance; // array of Objects: { fire = 0, cold = 0 }
  @tracked accuracy = 5; // 1 - 10

  @tracked confirmUnlock;

  constructor(config) {
    // this.id = config.id;
    Object.assign(this, config);
  }

  get powerUse() {
    const powerStat = this.findStat(constants.INVENTORY.STATS.POWER);
    return powerStat ? powerStat.value : 10;
  }

  get attackSpeed() {
    const powerStat = this.findStat(constants.INVENTORY.STATS.ATTACKSPEED);
    return powerStat ? powerStat.value * constants.BASE_ATTACK_TIMEOUT : constants.BASE_ATTACK_TIMEOUT;
  }

  get unlockText() {
    return this.confirmUnlock ? "Confirm" : "Buy";
  }

  findStat(type) {
    return this.stats.findBy('type', type);
  }
}
