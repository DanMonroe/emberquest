// import Phaser from 'phaser';
import BasePhaserAgentContainer from "../base-phaser-agent-container";
// import {tracked} from '@glimmer/tracking';
// import {timeout} from 'ember-concurrency';
// import {task} from 'ember-concurrency-decorators';

export default class EnemyContainer extends BasePhaserAgentContainer {

  constructor(scene, config) {
    super(scene, config);

    this.containerType = this.ember.constants.SHAPE_TYPE_ENEMY;

  }
    // @tracked maxHealth;
  // @tracked health;
  // @tracked maxPower;
  // @tracked power;
  // @tracked healingSpeed = 3000;
  // @tracked healingPower = 2;
  // @tracked energizeSpeed = 2000;
  // @tracked energizePower = 2;
  //
  // @task
  // *reloadHealth() {
  //   while (this.health < this.maxHealth) {
  //     // console.log('reloadHealth')
  //     yield timeout(this.healingSpeed);
  //     this.health += Math.max(1, this.healingPower);
  //   }
  // }
  //
  // @task
  // *reloadPower() {
  //   while (this.power < this.maxPower) {
  //     // console.log('reloadPower')
  //     yield timeout(this.energizeSpeed);
  //     this.power += Math.max(1, this.energizePower);
  //   }
  // }
  //
  // constructor(scene, config) {
  //
  //   super(scene, 0, 0);
  //
  //   this.scene = scene;
  //   this.board = scene.board;
  //   this.ember = this.scene.game.emberGame;
  //   this.containerType = this.scene.game.emberGame.constants.SHAPE_TYPE_ENEMY;
  //
  //   this.id = config.id;
  //   this.health = config.health;
  //   this.maxHealth = config.maxHealth;
  //   this.power = config.power;
  //   this.maxPower = config.maxPower;
  //   this.attackAudio = config.attackAudio;
  //   this.healingSpeed = config.healingSpeed;
  //   this.healingPower = config.healingPower;
  //   this.sightRange = config.sightRange;   // this is sight/movement Range
  //   this.movingPoints = config.movingPoints;   // this is sight/movement Range
  //   this.visiblePoints = config.visiblePoints;   // this is sight/movement Range
  //   this.setData('attrs', config.flagAttributes);
  //
  //   this.cachedHealthPercentage = 0;
  //
  //   // set a size on the container
  //   this.setSize(42, 42);
  //
  //   // enable physics
  //   this.scene.physics.world.enable(this);
  //
  //   // collide with world bounds
  //   this.body.setCollideWorldBounds(true);
  //
  //   // add the enemy container to our existing scene
  //   this.scene.add.existing(this);
  //
  //   // create the enemy
  //   this.enemy = new Enemy(this.scene, config);
  //
  //   this.add(this.enemy);
  //
  //   this.createHealthBar();
  //   this.reloadHealth.perform();
  //   this.reloadPower.perform();
  //
  // }
  //
  // update() {
  //   // this.moveTo();
  //   this.updateHealthBar();
  // }
  //
  // createHealthBar() {
  //   this.healthBar = this.scene.add.graphics();
  //   this.updateHealthBar();
  // }
  //
  // updateHealthBar() {
  //   const healthPercentage = (this.health / this.maxHealth);
  //   this.healthBar.clear();
  //   this.healthBar.fillStyle(0xffffff, 0.4);
  //   this.healthBar.fillRect(this.x + this.ember.constants.healthBarOffsetX, this.y + this.ember.constants.healthBarOffsetY, this.ember.constants.healthBarWidth, this.ember.constants.healthBarHeight);
  //   this.healthBar.fillStyle(healthPercentage <= this.ember.constants.healthBarColorTippingPoint ? this.ember.constants.healthBarColorDanger : this.ember.constants.healthBarColorGood, 1);
  //   this.healthBar.fillRect(this.x + this.ember.constants.healthBarOffsetX, this.y + this.ember.constants.healthBarOffsetY, this.ember.constants.healthBarWidth * healthPercentage, this.ember.constants.healthBarHeight);
  //
  // }
  //
  // updateHealth(health, power) {
  //   this.health = health;
  //   this.power = power;
  //   this.updateHealthBar();
  // }
}
