import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {

  scene = undefined;
  ember = undefined;

  constructor(scene, config) {
    super(scene, -1, 0, config.texture);
    // super(scene, config.playerX, config.playerY, config.texture);
    // super(scene, config.playerX, config.playerY, config.texture, config.frame);


    this.scene = scene;
    this.board = scene.board;
    this.ember = this.scene.game.emberGame;

    // enable physics
    // this.scene.physics.world.enable(this);

    // set immovable if another object collides with our player
    // this.setImmovable(true);

    this.setScale(config.scale);

    this.setDepth(15);

    // add the player to our existing scene
    scene.add.existing(this);

  }
}
