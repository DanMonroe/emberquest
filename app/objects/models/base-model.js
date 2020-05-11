import { v4 } from "ember-uuid";

export class BaseModel {
  constructor(x, y, objectConfig) {
    let uuid = v4();
    this.id = `${uuid}`;
    this.x = x;
    this.y = y;
    this.uniqueId = objectConfig.uniqueId;
    this.objectConfig = objectConfig;
    this.objectConfig.uuid = this.id;
  }
}
