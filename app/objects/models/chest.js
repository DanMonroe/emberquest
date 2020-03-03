import { BaseModel } from './base-model';

export class Chest extends BaseModel {
  constructor(x, y, spawnerId, objectConfig) {
    super(x, y, spawnerId, objectConfig);
    this.gold = objectConfig.gold;
    this.coords = objectConfig.coords;
  }
}
