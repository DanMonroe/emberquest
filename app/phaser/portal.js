import Phaser from 'phaser';

export default class Portal extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame, portalObj) {

    super(scene, x, y, key, frame);
    this.scene = scene; // the scene this game object will be added to
    this.id = portalObj.id;
    this.coords = portalObj.coords;

    // enable physics
    this.scene.physics.world.enable(this);

    this.type = this.scene.ember.constants.SHAPE_TYPE_PORTAL_DOOR;

    // this.setPosition(100, y);

    this.scene.add.existing(this);
    // scale the chest game object
    // this.setScale(.3);
  }

  makeActive() {
    this.setActive(true);
    this.setVisible(true);
    this.body.checkCollision.none = false;
  }

  makeInactive() {
    this.setActive(false);
    this.setVisible(false);
    this.body.checkCollision.none = true;
    this.rexChess.setBlocker(false);
  }

  // playerFound() {
  //   console.log('player found portal', this);
  //
  //   this.found = !this.found;
  //   this.setFrame(this.found ? 0 : 1);
  //
  //   // this.scene.ember.foundChest(this);
  // }
}
