import Phaser from 'phaser';
import { tracked } from '@glimmer/tracking';
import {timeout} from 'ember-concurrency';
import {task} from 'ember-concurrency-decorators';

export default class BasePhaserAgentContainer extends Phaser.GameObjects.Container {

  scene = undefined;
  ember = undefined;

  agent = undefined;

  showPowerBar = false;

  @tracked maxHealth;
  @tracked health;
  @tracked maxPower;
  @tracked power;
  @tracked healingSpeed = 3000;
  @tracked healingPower = 2;
  @tracked energizeSpeed = 2000;
  @tracked energizePower = 2;


  constructor(scene, config) {

    super(scene, 0, 0);
// debugger;
    this.scene = scene;
    this.board = scene.board;
    this.ember = this.scene.game.emberGame;

    this.id = config.id;

    this.showPowerBar = config.showPowerBar;

    this.health = config.health;
    this.maxHealth = config.maxHealth;
    this.power = config.power;
    this.maxPower = config.maxPower;
    this.attackAudio = config.attackAudio;

    if (config.textureSize) {
      this.setSize(config.textureSize.width, config.textureSize.height);
    }
    // enable physics
    this.scene.physics.world.enable(this);

    // collide with world bounds
    // this.body.setCollideWorldBounds(true);

    // add the player container to our existing scene
    this.scene.add.existing(this);


  }

  baseUpdate() {
    this.updateHealthBar();
  }

  @task
  *reloadHealth() {
    while (this.health < this.maxHealth) {
      yield timeout(this.healingSpeed);
      this.health += Math.max(1, this.healingPower);
    }
  }

  @task
  *reloadPower() {
    while (this.power < this.maxPower) {
      // console.log('reloadPower')
      yield timeout(this.energizeSpeed);
      this.power += Math.max(1, this.energizePower);
    }
  }


  createHealthBar() {
    this.healthBar = this.scene.add.graphics();
    if (this.showPowerBar) {
      this.powerBar = this.scene.add.graphics();
    }
    this.updateHealthBar();
  }

  updateHealthBar() {
    const healthPercentage = (this.health / this.maxHealth);
    this.healthBar.clear();
    this.healthBar.fillStyle(0xffffff, 0.4);
    this.healthBar.fillRect(this.x + this.ember.constants.healthBarOffsetX, this.y + this.ember.constants.healthBarOffsetY, this.ember.constants.healthBarWidth, this.ember.constants.healthBarHeight);
    this.healthBar.fillStyle(healthPercentage <- this.ember.constants.healthBarColorTippingPoint ? this.ember.constants.healthBarColorDanger : this.ember.constants.healthBarColorGood, 1);
    this.healthBar.fillRect(this.x + this.ember.constants.healthBarOffsetX, this.y + this.ember.constants.healthBarOffsetY, this.ember.constants.healthBarWidth * healthPercentage, this.ember.constants.healthBarHeight);

    if (this.showPowerBar) {
      const powerPercentage = (this.power / this.maxPower);
      this.powerBar.clear();
      this.powerBar.fillStyle(0xffffff, 0.4);
      this.powerBar.fillRect(this.x + this.ember.constants.powerBarOffsetX, this.y + this.ember.constants.powerBarOffsetY, this.ember.constants.powerBarWidth, this.ember.constants.powerBarHeight);
      this.powerBar.fillStyle(this.ember.constants.powerBarColor, 1);
      this.powerBar.fillRect(this.x + this.ember.constants.powerBarOffsetX, this.y + this.ember.constants.powerBarOffsetY, this.ember.constants.powerBarWidth * powerPercentage, this.ember.constants.powerBarHeight);
    }
  }

  updateHealth(health, power) {
    this.health = health;
    this.power = power;
    this.updateHealthBar();
  }

}
