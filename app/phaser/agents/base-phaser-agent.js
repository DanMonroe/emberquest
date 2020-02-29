import Phaser from 'phaser';

export default class BasePhaserAgent extends Phaser.Physics.Arcade.Sprite {

  scene = undefined;
  ember = undefined;

  constructor(scene, config) {
    super(scene, -1, 0, config.texture);

    this.scene = scene;
    this.board = scene.board;
    this.ember = this.scene.game.ember;

    // enable physics
    this.scene.physics.world.enable(this);

    // set immovable if another object collides with our player
    // this.setImmovable(true);

    // debugger;
    this.setScale(config.scale);

    // this.setDepth(14);

    // add the agent to our existing scene
    // scene.add.existing(this);

  }

}
