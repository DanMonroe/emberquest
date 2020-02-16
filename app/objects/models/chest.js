import { v4 } from "ember-uuid";

export class Chest {
  constructor(x, y, gold, spawnerId) {
    let uuid = v4();
    this.id = `${spawnerId}-${uuid}`;
    this.spawnerId = spawnerId;
    this.x = x;
    this.y = y;
    this.gold = gold;
  }
}
