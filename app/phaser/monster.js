import Phaser from 'phaser';

export default class Monster extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame, id, health, maxHealth) {
    super(scene, x, y, key, frame);
    this.scene = scene; // the scene this game object will be added to
    this.id = id;
    this.health = health;
    this.maxHealth = maxHealth;

    // enable physics
    this.scene.physics.world.enable(this);

    // set immovable if another object collides with our monster
    this.setImmovable(false);

    // collide with world bounds
    this.setCollideWorldBounds(true);

    // add the player to our existing scene
    this.scene.add.existing(this);

    // scale the game object
    // this.setScale(.3);

    // update the origin
    // this.setOrigin(0);

    // this.createHealthBar();

  }

  createHealthBar() {
    this.healthBar = this.scene.add.graphics();
    this.updateHealthBar();
  }

  updateHealthBar() {
    this.healthBar.clear();
    this.healthBar.fillStyle(0xffffff, 1);
    this.healthBar.fillRect(this.x, this.y - 8, 64, 5);
    this.healthBar.fillGradientStyle(0xff0000, 0xffffff, 4);
    this.healthBar.fillRect(this.x, this.y - 8, 64 * (this.health / this.maxHealth), 5);
  }

  setHealth(health) {
    this.health = health;
    this.updateHealthBar();
  }

  makeActive() {
    this.setActive(true);
    this.setVisible(true);
    this.body.checkCollision.none = false;
    this.updateHealthBar();
  }

  makeInactive() {
    this.setActive(false);
    this.setVisible(false);
    this.body.checkCollision.none = true;
    this.healthBar.clear();
  }

  update() {
    this.updateHealthBar();
  }
}
