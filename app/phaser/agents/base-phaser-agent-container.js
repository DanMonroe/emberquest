import Phaser from 'phaser';
import { tracked } from '@glimmer/tracking';
import {timeout} from 'ember-concurrency';
import {task} from 'ember-concurrency-decorators';

export default class BasePhaserAgentContainer extends Phaser.GameObjects.Container {

  scene = undefined;
  ember = undefined;

  agent = undefined;
  phaserAgent = undefined;

  isPlayer = false;

  showPowerBar = false;

  // @tracked maxHealth;
  // @tracked health;
  // @tracked maxPower;
  // @tracked power;
  // @tracked healingSpeed = 3000;
  // @tracked healingPower = 2;
  // @tracked energizeSpeed = 2000;
  // @tracked energizePower = 1;

  @tracked aggressionScale = 0;

  // @tracked xpGain = 0;
  // @tracked gold = 0;

  constructor(scene, config) {

    super(scene, 0, 0);
    this.scene = scene;
    this.board = scene.board;
    this.ember = this.scene.game.ember;

    this.id = config.id;
    this.config = config;

    this.showPowerBar = config.showPowerBar;

    // this.health = config.health;
    // this.maxHealth = config.maxHealth;
    // this.healingPower = config.healingPower;
    // this.power = config.power;
    // this.maxPower = config.maxPower;
    // this.attackAudio = config.attackAudio;
    // this.xpGain = config.xpGain;
    // this.gold = config.gold;

    this.aggressionScale = config.aggressionScale ? config.aggressionScale : 0;

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
      debugger;
      agentTakingDamage.health = 0;   // TODO // why sometimes NaN ?
    }
    agentTakingDamage.health -= sourceWeapon.damage;

    if (agentTakingDamage.container.phaserAgent) {
      agentTakingDamage.container.phaserAgent.tint = 0xff3333;
      this.scene.time.addEvent({
        delay: 200,
        callback: () => {
          // this.hitDelay = false;
          agentTakingDamage.container.phaserAgent.tint = 0xffffff;
        },
        callbackScope: this
      });

      if (agentTakingDamage.health <= 0) {
        if (this.isPlayer) {
          this.ember.gameManager.playerDied(agentTakingDamage.container);
        } else {
          this.ember.gameManager.enemyVictory(agentTakingDamage.container);
        }
      }
    }
    // if (agentTakingDamage.player) {
    //   agentTakingDamage.player.tint = 0xff3333;
    //
    //   if (agentTakingDamage.health <= 0) {
    //     debugger;
    //     this.ember.gameManager.playerDied(agentTakingDamage);
    //   }
    //
    //   this.scene.time.addEvent({
    //     delay: 200,
    //     callback: () => {
    //       // this.hitDelay = false;
    //       agentTakingDamage.player.tint = 0xffffff;
    //     },
    //     callbackScope: this
    //   });
    //
    //
    // }
  }

  // For Conference Talk - carbon.now.sh
  // One Dark theme, Javascript, No border
  // // agents/base-agent-container.js
  // @task
  // *reloadHealth() {
  //   while (true) {
  //     yield timeout(this.healingSpeed);
  //     if (this.health < this.maxHealth) {
  //       this.health += Math.max(1, this.healingPower);
  //     }
  //   }
  // }

  @task
  *reloadHealth() {
    while (true) {
      if (!this.ember.gameManager.gamePaused) {
        if (this.agent.health < this.agent.maxHealth) {
          this.agent.health += Math.max(1, this.agent.healingPower);
        }
      }
      yield timeout(this.agent.healingSpeed);
    }
  }

  @task
  *reloadPower() {
    while (true) {
      if (!this.ember.gameManager.gamePaused) {
        if (this.agent.power < this.agent.maxPower) {
          this.agent.power += Math.max(1, this.agent.energizePower);
        }
      }
      yield timeout(this.agent.energizeSpeed);
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
    // console.log('adding healthbar')
    this.healthBar = this.scene.add.graphics();
    this.healthBar.setAlpha(this.isPlayer ? 1 : 0);
    if (this.showPowerBar) {
    // console.log('adding power bar')
      this.powerBar = this.scene.add.graphics();
    }
    this.updateHealthBar();
  }

  updateHealthBar() {
    // console.log('updateHealthBar this', this)
    const healthPercentage = (this.agent.health / this.agent.maxHealth);
    this.healthBar.clear();
    this.healthBar.fillStyle(0xffffff, 0.4);
    this.healthBar.fillRect(this.x + this.ember.constants.healthBarOffsetX, this.y + this.ember.constants.healthBarOffsetY, this.ember.constants.healthBarWidth, this.ember.constants.healthBarHeight);
    this.healthBar.fillStyle(healthPercentage <= this.ember.constants.healthBarColorTippingPoint ? this.ember.constants.healthBarColorDanger : this.ember.constants.healthBarColorGood, 1);
    this.healthBar.fillRect(this.x + this.ember.constants.healthBarOffsetX, this.y + this.ember.constants.healthBarOffsetY, this.ember.constants.healthBarWidth * healthPercentage, this.ember.constants.healthBarHeight);
    // console.log('this.healthBar', this.healthBar, this.id)

    if (this.showPowerBar) {

      const powerPercentage = (this.agent.power / this.agent.maxPower);
      this.powerBar.clear();
      this.powerBar.fillStyle(0xffffff, 0.4);
      this.powerBar.fillRect(this.x + this.ember.constants.powerBarOffsetX, this.y + this.ember.constants.powerBarOffsetY, this.ember.constants.powerBarWidth, this.ember.constants.powerBarHeight);
      this.powerBar.fillStyle(this.ember.constants.powerBarColor, 1);
      this.powerBar.fillRect(this.x + this.ember.constants.powerBarOffsetX, this.y + this.ember.constants.powerBarOffsetY, this.ember.constants.powerBarWidth * powerPercentage, this.ember.constants.powerBarHeight);
    }
  }

  // setHealthAndPower(health, power) {
  //   this.health = health;
  //   this.power = power;
  //   this.updateHealthBar();
  // }

  canFireWeapon(powerRequirement) {
    // console.log('canFire', agent.currentPower, powerRequirement);
    return this.power >= powerRequirement;
  }

  checkAggression(agentContainer) {
    // TODO implement.  check to see if they want to fight, or run away, etc
    return agentContainer.aggressionScale > 5; // TODO just picked a number higher than 1
    // return true;
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
