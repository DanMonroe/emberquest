import BasePhaserAgent from "../base-phaser-agent";

export default class Transport extends BasePhaserAgent {

  // scene = undefined;
  // ember = undefined;
  constructor(scene, config) {
    super(scene, config);

    console.log('in transport phaser obj')

    this.setDepth(15);

    // add the player to our existing scene
    scene.add.existing(this);

  }
}

// import Phaser from 'phaser';
//
// export default class Transport extends Phaser.Physics.Arcade.Sprite {
//
//   scene = undefined;
//   ember = undefined;
//
//   constructor(scene, config) {
//     super(scene, -1, 0, config.texture);
//     // super(scene, config.playerX, config.playerY, config.texture);
//     // super(scene, config.playerX, config.playerY, config.texture, config.frame);
//
//
//     this.scene = scene;
//     this.board = scene.board;
//     this.ember = this.scene.game.emberGame;
//
//     // enable physics
//     // this.scene.physics.world.enable(this);
//
//     // set immovable if another object collides with our player
//     // this.setImmovable(true);
//
//     // debugger;
//     this.setScale(config.scale);
//
//     this.setDepth(15);
//
//     // add the player to our existing scene
//     scene.add.existing(this);
//
//   }
// }
