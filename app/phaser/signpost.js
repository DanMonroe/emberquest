import { BasePhaserImage } from './base-image';

export default class SignPost extends BasePhaserImage {
  constructor(scene, x, y, key, frame, signPostObjConfig) {

    super(scene, x, y, key, frame);
    this.id = signPostObjConfig.id;
    // this.coords = signPostObjConfig.coords;
    this.signMessageId = signPostObjConfig.signMessageId;

    // enable physics
    // this.scene.physics.world.enable(this);

    this.type = this.scene.ember.constants.SHAPE_TYPE_SIGNPOST;

    this.scene.add.existing(this);

    // scale the chest game object
    this.setScale(signPostObjConfig.scale);
  }

}
