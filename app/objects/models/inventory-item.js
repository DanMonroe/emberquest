import { tracked } from '@glimmer/tracking';

export class InventoryItem {
  id;
  name;
  type;
  description;
  sound;
  soundhit;
  listorder;

  maxRange = 20;
  weaponSpeed = 1000; // time between attacks
  projectileSpeed = 200;
  poweruse = 10;
  accuracy = 90; // percentage

  bodypart;

  @tracked img;
  @tracked price;
  @tracked owned = false;
  @tracked locked;
  // @tracked skills;
  @tracked equipped = false;
  @tracked tileX;
  @tracked tileY;
  @tracked stats; // array of Stat objects
  @tracked resistance; // array of Objects: { fire = 0, cold = 0 }

  @tracked confirmUnlock;

  constructor(config) {
    // this.id = config.id;
    Object.assign(this, config);
  }

  get unlockText() {
    return this.confirmUnlock ? "Confirm" : "Buy";
  }
}
