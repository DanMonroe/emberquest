// import BasePhaserAgent from "../base-phaser-agent";
import Phaser from "phaser";

// export default class PhaserAgent extends BasePhaserAgent {
export default class PhaserAgent extends Phaser.Physics.Arcade.Sprite {

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

    this.setDepth(14);

    console.log('config', config);
    if (config.animeframes) {
      scene.anims.create({
        key: 'young-ogre-rest',
        frames: scene.anims.generateFrameNumbers('young-ogre', { start: 1, end: 4}),
        frameRate: 3,
        repeat: -1,
      });

    }
  }
}
