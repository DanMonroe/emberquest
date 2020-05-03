import { v4 } from "ember-uuid";

export class BaseModel {
  constructor(x, y, objectConfig) {
    let uuid = v4();
    this.id = `${uuid}`;
    this.x = x;
    this.y = y;
    this.objectConfig = objectConfig;
    this.objectConfig.uuid = this.id;
  }
  // constructor(x, y, spawnerId, objectConfig) {
  //   let uuid = v4();
  //   this.id = `${spawnerId}-${uuid}`;
  //   this.spawnerId = spawnerId;
  //   this.x = x;
  //   this.y = y;
  //   this.objectConfig = objectConfig;
  // }
}
