import { tracked } from '@glimmer/tracking';

export class InventoryItem {
  id;
  name;
  type;
  description;
  sound;
  soundhit;
  listorder;
  damage = 1;
  maxRange = 20;
  weaponSpeed = 1000; // time between attacks
  projectileSpeed = 200;
  poweruse = 10;
  accuracy = 90; // percentage

  @tracked img;
  @tracked price;
  @tracked owned;
  @tracked locked;
  @tracked stats;
  @tracked skills;
  @tracked owner;
  @tracked equipped;
  @tracked tileX;
  @tracked tileY;
  @tracked resistance; // Object: { fire = 0, cold = 0 }

  constructor(config) {
    // this.id = config.id;
    Object.assign(this, config);
  }
}
