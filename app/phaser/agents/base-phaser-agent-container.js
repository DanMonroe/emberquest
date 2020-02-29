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
  @tracked energizePower = 1;


  constructor(scene, config) {

    super(scene, 0, 0);
// debugger;
    this.scene = scene;
    this.board = scene.board;
    this.ember = this.scene.game.ember;

    this.id = config.id;
    this.config = config;

    this.showPowerBar = config.showPowerBar;

    this.health = config.health;
    this.maxHealth = config.maxHealth;
    this.healingPower = config.healingPower;
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

  update() {
    if (this.ember.gameManager.gamePaused) { return }
    this.baseUpdate();
  }

  baseUpdate() {
    if (this.ember.gameManager.gamePaused) { return }
    this.updateHealthBar();
  }

  // player just hit the agent with some type of weapon.
  async takeDamage(sourceWeapon, agentTakingDamage) {
    if (this.ember.gameManager.gamePaused) { return }

    // console.log('take Damage', sourceWeapon);
    if (isNaN(agentTakingDamage.health) === true) {
      agentTakingDamage.health = 0;   // TODO // why sometimes NaN ?
    }
    agentTakingDamage.health -= sourceWeapon.damage;

    if (agentTakingDamage.agent) {
      agentTakingDamage.agent.tint = 0xff3333;
      this.scene.time.addEvent({
        delay: 200,
        callback: () => {
          // this.hitDelay = false;
          agentTakingDamage.agent.tint = 0xffffff;
        },
        callbackScope: this
      });

      if (agentTakingDamage.health <= 0) {
        this.ember.gameManager.enemyVictory(agentTakingDamage);
      }
    }
    if (agentTakingDamage.player) {
      agentTakingDamage.player.tint = 0xff3333;

      if (agentTakingDamage.health <= 0) {
        this.ember.gameManager.playerDied(agentTakingDamage);
      }

      this.scene.time.addEvent({
        delay: 200,
        callback: () => {
          // this.hitDelay = false;
          agentTakingDamage.player.tint = 0xffffff;
        },
        callbackScope: this
      });


    }
  }

  // For Conference Talk - carbon.now.sh
  // One Dark theme, Javascript, No border
  // // agents/base-agent-container.js
  // @task
  // *reloadHealth() {
  //   while (this.health < this.maxHealth) {
  //     this.health += this.healingIncrement;
  //     yield timeout(this.healingSpeed);
  //   }
  // }
  @task
  *reloadHealth() {
    while (this.health < this.maxHealth) {
      yield timeout(this.healingSpeed);
      if (!this.ember.gameManager.gamePaused) {
        this.health += Math.max(1, this.healingPower);
      }
    }
  }

  @task
  *reloadPower() {
    while (this.power < this.maxPower) {
      // console.log('reloadPower')
      yield timeout(this.energizeSpeed);
      if (!this.ember.gameManager.gamePaused) {
        this.power += Math.max(1, this.energizePower);
      }
    }
  }

  @task
  *fireWeapon(agent, weapon, startTileXYZ, radian) {
    if (this.ember.gameManager.gamePaused) { return }

    // console.log('firing weapon', agent, weapon)

    this.scene.agentprojectiles.fireProjectile(startTileXYZ, radian);

    // this.game.sound.playSound(weapon.sound);

    agent.power -= weapon.poweruse;


    // if (agent.type === this.game.constants.AGENTTYPES.PLAYER) {
    //   // if (whoFiredType === BaseAgent.AGENTTYPES.PLAYER) {
    //   this.updatePowerBar(agent);
    // }
    // if(agent.currentPower < 100 && agent.reloadPower.isIdle) {
    //   agent.reloadPower.perform(weapon);
    // }

    return yield timeout(weapon.fireDelay);
  }

  createHealthBar() {
    this.healthBar = this.scene.add.graphics();
    this,this.healthBar.setAlpha(0);
    if (this.showPowerBar) {
      this.powerBar = this.scene.add.graphics();
    }
    this.updateHealthBar();
  }

  updateHealthBar() {
    // console.log('updateHealthBar this', this)
    const healthPercentage = (this.health / this.maxHealth);
    this.healthBar.clear();
    this.healthBar.fillStyle(0xffffff, 0.4);
    this.healthBar.fillRect(this.x + this.ember.constants.healthBarOffsetX, this.y + this.ember.constants.healthBarOffsetY, this.ember.constants.healthBarWidth, this.ember.constants.healthBarHeight);
    this.healthBar.fillStyle(healthPercentage <= this.ember.constants.healthBarColorTippingPoint ? this.ember.constants.healthBarColorDanger : this.ember.constants.healthBarColorGood, 1);
    this.healthBar.fillRect(this.x + this.ember.constants.healthBarOffsetX, this.y + this.ember.constants.healthBarOffsetY, this.ember.constants.healthBarWidth * healthPercentage, this.ember.constants.healthBarHeight);
    // console.log('this.healthBar', this.healthBar, this.id)

    if (this.showPowerBar) {

      const powerPercentage = (this.power / this.maxPower);
      this.powerBar.clear();
      this.powerBar.fillStyle(0xffffff, 0.4);
      this.powerBar.fillRect(this.x + this.ember.constants.powerBarOffsetX, this.y + this.ember.constants.powerBarOffsetY, this.ember.constants.powerBarWidth, this.ember.constants.powerBarHeight);
      this.powerBar.fillStyle(this.ember.constants.powerBarColor, 1);
      this.powerBar.fillRect(this.x + this.ember.constants.powerBarOffsetX, this.y + this.ember.constants.powerBarOffsetY, this.ember.constants.powerBarWidth * powerPercentage, this.ember.constants.powerBarHeight);
    }
  }

  setHealthAndPower(health, power) {
    this.health = health;
    this.power = power;
    this.updateHealthBar();
  }

  canFireWeapon(powerRequirement) {
    // console.log('canFire', agent.currentPower, powerRequirement);
    return this.power >= powerRequirement;
  }

  checkAggression(/*agentContainer*/) {
    // TODO implement.  check to see if they want to fight, or run away, etc
    return true;
  }

  setVisibilityIfInLineOfSight(agentContainer, isInLOS) {
    agentContainer.setAlpha(isInLOS ?
      agentContainer.ember.constants.ALPHA_OBJECT_VISIBLE_TO_PLAYER :
      agentContainer.ember.constants.ALPHA_OBJECT_HIDDEN_TO_PLAYER);

    if (agentContainer.healthBar) {
      agentContainer.healthBar.setAlpha(isInLOS ?
        agentContainer.ember.constants.ALPHA_OBJECT_VISIBLE_TO_PLAYER :
        agentContainer.ember.constants.ALPHA_OBJECT_HIDDEN_TO_PLAYER);
    }
  }

}
