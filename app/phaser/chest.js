import Phaser from 'phaser';

export default class Chest extends Phaser.Physics.Arcade.Image {
// export default class Chest extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, key, frame, chestObj) {

    super(scene, x, y, key, frame);
    this.scene = scene; // the scene this game object will be added to

    this.id = chestObj.id;
    this.gold = chestObj.gold; // the amount of coins this chest contains
    this.inventory = chestObj.inventory; // the amount of coins this chest contains
    this.coords = chestObj.coords;
    this.gccode = chestObj.gccode;
    this.specialActions = chestObj.specialActions;

    // previously found?
    this.found = this.scene.ember.cache.isCacheFound(this.gccode);

    this.setFrame(this.found ? 0 : 1);

    // enable physics
    this.scene.physics.world.enable(this);

    // add the player to our existing scene

    this.scene.add.existing(this);
    // scale the chest game object
    this.setScale(.3);

    this.setDepth(this.scene.ember.constants.TILEZ_CHESTS);
  }

  playerFoundChest() {
    // console.log('player found chest', this);

    this.found = !this.found;
    this.setFrame(this.found ? 0 : 1);

    this.scene.ember.foundChest(this);
  }
}
