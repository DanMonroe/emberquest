import Phaser from 'phaser';

export class BasePhaserImage extends Phaser.Physics.Arcade.Image {

  constructor(scene, x, y, key, frame, imageObjConfig) {

    super(scene, x, y, key, frame);
    this.scene = scene; // the scene this game object will be added to


    // enable physics
    // this.scene.physics.world.enable(this);

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
