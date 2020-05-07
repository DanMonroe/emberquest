import Phaser from 'phaser';
import { tracked } from '@glimmer/tracking';
import {timeout} from 'ember-concurrency';
import {task} from 'ember-concurrency-decorators';

export default class BasePhaserAgentContainer extends Phaser.GameObjects.Container {

  scene = undefined;
  ember = undefined;
  agent = undefined;

  isPlayer = false;

  // showPowerBar = true;
  showPowerBar = false;

  @tracked aggressionScale = 0;


  constructor(scene, config) {

    super(scene, 0, 0);
    this.scene = scene;
    this.board = scene.board;
    this.ember = this.scene.game.ember;

    this.id = config.id;
    this.config = config;

    this.showHealthBar = config.showHealthBar !== undefined ? config.showHealthBar : true;
    this.showPowerBar = config.showPowerBar;

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

  // agentAttacking just hit the agent with some type of weapon.
  // agentAttacking can have bonus Adjustments in the inventory
  // that adjust base damage.
  // likewise, agent taking damage can have resistance to lower damage
  async takeDamage(baseDamage, agentTakingDamage, agentAttacking) {
  // async takeDamage(sourceWeapon, agentTakingDamage) {
    if (this.ember.gameManager.gamePaused) { return }

    // console.log('take Damage', sourceWeapon);
    if (isNaN(agentTakingDamage.health) === true) {
      debugger;
      agentTakingDamage.health = 0;   // TODO // why sometimes NaN ?
    }
    agentTakingDamage.health -= baseDamage;

    if (agentTakingDamage.container.phaserAgentSprite) {

      // agentTakingDamage.container.phaserAgentSprite.anims.play('young-ogre-damage');

      agentTakingDamage.container.phaserAgentSprite.tint = 0xff3333;
      this.scene.time.addEvent({
        delay: 200,
        callback: () => {
          // this.hitDelay = false;
          agentTakingDamage.container.phaserAgentSprite.tint = 0xffffff;
        },
        callbackScope: this
      });

      if (agentTakingDamage.health <= 0) {
        if (this.isPlayer) {
          this.ember.gameManager.playerDied(agentTakingDamage.container, this.scene);
        } else {
          this.ember.gameManager.enemyVictory(agentTakingDamage.container, agentAttacking, this.scene);
        }
      }
    }
  }

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

    this.scene.agentprojectiles.fireProjectile(startTileXYZ, radian);

    // this.game.sound.playSound(weapon.sound);

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
    if (this.showHealthBar) {
      this.healthBar = this.scene.add.graphics();
      this.healthBar.setAlpha(this.isPlayer ? 1 : 0);
      this.healthBar.setDepth(this.ember.constants.TILEZ_PLAYER);
    }
    if (this.showPowerBar) {
    // console.log('adding power bar')
      this.powerBar = this.scene.add.graphics();
      this.powerBar.setDepth(this.ember.constants.TILEZ_PLAYER);
    }
    this.updateHealthBar();
  }

  updateHealthBar() {
    // console.log('updateHealthBar this', this.agent.health, this.agent.maxHealth)
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

  canFireWeapon(powerRequirement) {
    // console.log('canFire', agent.currentPower, powerRequirement);
    return this.power >= powerRequirement;
  }

  checkAggression(agentContainer) {
    // const isNeighbor = this.scene.board.areNeighbors(agentContainer.rexChess.tileXYZ, agentContainer.ember.playerContainer.rexChess.tileXYZ);
    // console.log('checkAggression isNeighbor', isNeighbor)

    // TODO implement.  check to see if they want to fight, or run away, etc
    return agentContainer.aggressionScale > 5; // TODO just picked a number higher than 1
    // return true;
  }

  setVisibility() {
    if (this.ember.playerContainer) {
      const isInLOS = this.ember.playerContainer.fov.isInLOS(this.rexChess.tileXYZ);
      this.setVisibilityIfInLineOfSight(this, isInLOS)
    }
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
