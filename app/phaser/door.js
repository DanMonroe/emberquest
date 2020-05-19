import { BasePhaserImage } from './base-image';

export default class Door extends BasePhaserImage {
  constructor(scene, x, y, key, frame, doorObj) {

    super(scene, x, y, key, frame);

    this.id = doorObj.id;
    this.coords = doorObj.coords;

    // enable physics
    // this.scene.physics.world.enable(this);

    this.type = this.scene.ember.constants.SHAPE_TYPE_DOOR;

    this.scene.add.existing(this);

    // scale the chest game object
    // this.setScale(.3);
  }

}
