import BasePhaserAgent from "../base-phaser-agent";

export default class Enemy extends BasePhaserAgent {

  constructor(scene, config) {
    super(scene, config);

    this.setDepth(14);

  }

  // scene = undefined;
  // ember = undefined;
  //
  // constructor(scene, config) {
  //   super(scene, -1, 0, config.texture);
  //
  //
  //   this.scene = scene;
  //   this.board = scene.board;
  //   this.ember = this.scene.game.emberGame;
  //
  //   // enable physics
  //   this.scene.physics.world.enable(this);
  //
  //   // set immovable if another object collides with our player
  //   this.setImmovable(true);
  //
  //   // debugger;
  //   this.setScale(config.scale);
  //
  //   this.setDepth(14);
  //
  //   // add the player to our existing scene
  //   scene.add.existing(this);
  //
  // }
}
