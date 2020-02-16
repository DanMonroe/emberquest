import { BaseModel } from './base-model';

export class Agent extends BaseModel {
  constructor(x, y, spawnerId, objectConfig) {
    super(x, y, spawnerId, objectConfig);
  }
}
