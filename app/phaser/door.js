import Phaser from 'phaser';

export default class Door extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame, doorObj) {

    super(scene, x, y, key, frame);
    this.scene = scene; // the scene this game object will be added to
    this.id = doorObj.id;
    this.coords = doorObj.coords;

    // enable physics
    this.scene.physics.world.enable(this);

    this.type = this.scene.ember.constants.SHAPE_TYPE_DOOR;

    this.scene.add.existing(this);
    // scale the chest game object
    // this.setScale(.3);
  }

  makeInactive() {
    this.setActive(false);
    this.setVisible(false);
    this.body.checkCollision.none = true;
    this.rexChess.setBlocker(false);
  }

}
