import Phaser from 'phaser';

export default class Chest extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame, chestObj) {

    super(scene, x, y, key, frame);
    this.scene = scene; // the scene this game object will be added to

    this.id = chestObj.objectConfig.id;
    this.gold = chestObj.objectConfig.gold; // the amount of coins this chest contains
    this.coords = chestObj.objectConfig.coords;
    this.gccode = chestObj.objectConfig.gccode;
    this.specialActions = chestObj.objectConfig.specialActions;

    // previously found?
    this.found = this.scene.ember.cache.isCacheFound(this.gccode);

    this.setFrame(this.found ? 0 : 1);

    // enable physics
    this.scene.physics.world.enable(this);

    // add the player to our existing scene

    this.scene.add.existing(this);
    // scale the chest game object
    this.setScale(.3);
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
  }

  playerFound() {
    // console.log('player found chest', this);

    this.found = !this.found;
    this.setFrame(this.found ? 0 : 1);

    this.scene.ember.foundChest(this);
  }
}
