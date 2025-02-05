import Phaser from 'phaser';
import { tracked } from '@glimmer/tracking';
import {timeout} from 'ember-concurrency';
import {task} from 'ember-concurrency-decorators';
import { v4 } from "ember-uuid";

export default class BasePhaserAgentContainer extends Phaser.GameObjects.Container {

  scene = undefined;
  ember = undefined;
  agent = undefined;

  isPlayer = false;

  damageColor = "#ff3c00";
  damageFont = "32px Arial";

  // showPowerBar = true;
  showPowerBar = false;
  showLevel = false;

  @tracked aggressionScale = 0;
  @tracked moveQueue = {path:[]};
  @tracked patrolEnabled = true;
  @tracked agentState = 0;  // IDLE
  @tracked lastAgentState = 0;  // IDLE


  constructor(scene, config) {

    super(scene, 0, 0);
    this.scene = scene;
    this.board = scene.board;
    this.ember = this.scene.game.ember;

    this.id = config.id;
    this.config = config;
    this.config.offsets = config.offsets || {
      img: { x: 0, y: 0 },
      healthbar: { x: 0, y: 0 },
      name: { x: 0, y: 0 },
      damage: { x: 0, y: 0 }
    };

    this.showHealthBar = config.showHealthBar !== undefined ? config.showHealthBar : true;
    this.showLevel = config.showLevel !== undefined ? config.showLevel : true;
    this.showPowerBar = config.showPowerBar;

    // this.aggressionScale = config.aggressionScale ? config.aggressionScale : 0;

    if (config.textureSize) {
      this.setSize(config.textureSize.width, config.textureSize.height);
    }
    // enable physics
    this.scene.physics.world.enable(this);

    // collide with world bounds
    // this.body.setCollideWorldBounds(true);

    this.pathFinder = scene.rexBoard.add.pathFinder(this, {
      occupiedTest: true,
      pathMode: 'A*-random',
      // pathMode: 'A*',
      // shuffleNeighbors: true,
      // weight: 100,
      cacheCost: false,
      blockerTest: true,
      costCallback: (curTile, targetTile, pathFinder) => {
        const travelFlags = this.ember.map.getTileAttribute(pathFinder.chessData.board.scene, targetTile, 'tF');
        const speedCost = this.ember.map.getTileAttribute(pathFinder.chessData.board.scene, targetTile, 'spdC');
        const canMove = this.ember.playerHasAbilityFlag(this, this.ember.constants.FLAG_TYPE_TRAVEL, travelFlags);

        // console.log('speedCost', speedCost, curTile, curTile.preNodes.length, targetTile, targetTile.preNodes.length, targetTile.pathCost, targetTile.preNodesCost)

        return canMove ? 100 - speedCost : undefined; // undefined is a "blocker"
        // return canMove ? -1 * ( speedCost ) : undefined; // undefined is a "blocker"
        // return canMove ? 20 - speedCost : undefined; // undefined is a "blocker"

        // original:  return canMove ? 1 : undefined; // undefined is a "blocker"

        // TODO experiment with returning the spdC speed cost instead?
      },

    });


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
  async takeDamage({baseDamage, agentTakingDamage, agentAttacking, awardExperience = true, weaponDoingDamage, killedBy = ''} = {}) {
    if (this.ember.gameManager.gamePaused) { return }

    // console.log('take Damage', sourceWeapon);
    if (isNaN(agentTakingDamage.health) === true) {
      // debugger;
      console.error('isNaN(agentTakingDamage.health)', agentTakingDamage);
      agentTakingDamage.health = 0;   // TODO // why sometimes NaN ?
    }
    agentTakingDamage.health -= baseDamage;
    if (weaponDoingDamage && weaponDoingDamage.reportDamage) {
      agentTakingDamage.container.playDamageText(baseDamage ? baseDamage : 'Miss');
    }

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
          this.ember.gameManager.playerDied({playerContainer: agentTakingDamage.container, scene:this.scene, deathDetails:{killedBy: killedBy}});
        } else {
          if (this.ember.debug.phaserDebug) {
            this.hideMovingPath();
          }
          this.ember.gameManager.enemyDied(agentTakingDamage.container, agentAttacking, this.scene, awardExperience);
        }
      }
    }
  }

  @task
  *reloadHealth() {
    while (true) {
      if (!this.ember.gameManager.gamePaused) {
        if (this.agent.health < this.agent.maxHealth) {
          // console.log('this.agent.healingPower', this.agent.healingPower)
          this.agent.health += Math.max(1, this.agent.healingPower);
        }
      }
  // if (this.config.id === "player1") {
    // console.log('this.agent.healingSpeed', this.agent.healingSpeed, this.agent.health, this.agent.maxHealth);
  // }
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
      // if (this.config.id === "player1") {
      //   console.log('this.agent.energizeSpeed', this.agent.energizeSpeed, 'this.agent.energizePower', this.agent.energizePower, this.agent.power, this.agent.maxPower);
      // }
      yield timeout(this.agent.energizeSpeed);
    }
  }

  // @task
  // *fireWeapon(agent, weapon, startTileXYZ, radian) {
  //   debugger;
  //   if (this.ember.gameManager.gamePaused) { return }
  //
  //   this.scene.agentprojectiles.fireProjectile(startTileXYZ, radian);
  //
  //   // this.game.sound.playSound(weapon.sound);
  //
  //   // if (agent.type === this.game.constants.AGENTTYPES.PLAYER) {
  //   //   // if (whoFiredType === BaseAgent.AGENTTYPES.PLAYER) {
  //   //   this.updatePowerBar(agent);
  //   // }
  //   // if(agent.currentPower < 100 && agent.reloadPower.isIdle) {
  //   //   agent.reloadPower.perform(weapon);
  //   // }
  //
  //   return yield timeout(weapon.fireDelay);
  // }


  playDamageText(amount) {
    let damageText = this.scene.add.text(-12 + this.config.offsets.damage.x, -30 + this.config.offsets.damage.y, amount, { font: this.damageFont, color: this.damageColor, fontStyle: "strong", stroke:this.damageColor, strokeThickness: 2 });
    damageText.setDepth(230);
    this.add(damageText);

    let timeline = this.scene.tweens.createTimeline();
    timeline.add({
      targets: damageText,
      y: -100 + this.config.offsets.damage.y,               // '+=100'
      ease: 'sine.inout',       // 'Cubic', 'Elastic', 'Bounce', 'Back', 'Linear'
      duration: 800,
      repeat: 0            // -1: infinity
    });
    timeline.add({
      targets: damageText,
      alpha: 0,               // '+=100'
      ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back', 'Linear'
      duration: 801,
      repeat: 0,            // -1: infinity
      offset: '-=500',   // starts 500ms before previous tween ends
      onComplete: function () {
        // damageText.destroy();
      }
    });
    timeline.play();
  }

  createHealthBar() {
    if (this.showHealthBar) {
      this.healthBar = this.scene.add.graphics();
      this.healthBar.setAlpha(this.isPlayer ? 1 : 0);
      this.healthBar.setDepth(this.ember.constants.TILEZ_PLAYER);
    }
    if (this.showPowerBar) {
      this.powerBar = this.scene.add.graphics();
      this.powerBar.setDepth(this.ember.constants.TILEZ_PLAYER);
    }
    this.updateHealthBar();
  }

  updateHealthBar() {
    if (this.showHealthBar) {
      let healthPercentage = this.agent.health / this.agent.maxHealth;
      healthPercentage = healthPercentage <= 1 ? healthPercentage : 1;
      this.healthBar.clear();
      this.healthBar.fillStyle(0xffffff, 0.4);
      this.healthBar.fillRect(this.x + this.ember.constants.healthBarOffsetX + this.config.offsets.healthbar.x, this.y + this.ember.constants.healthBarOffsetY + this.config.offsets.healthbar.y, this.ember.constants.healthBarWidth, this.ember.constants.healthBarHeight);
      this.healthBar.fillStyle(healthPercentage <= this.ember.constants.healthBarColorTippingPoint ? this.ember.constants.healthBarColorDanger : this.ember.constants.healthBarColorGood, 1);
      this.healthBar.fillRect(this.x + this.ember.constants.healthBarOffsetX + this.config.offsets.healthbar.x, this.y + this.ember.constants.healthBarOffsetY + this.config.offsets.healthbar.y, this.ember.constants.healthBarWidth * healthPercentage, this.ember.constants.healthBarHeight);
    }

    if (this.showPowerBar) {
      // const powerPercentage = (this.agent.power / this.agent.maxPower);
      let powerPercentage = this.agent.power / this.agent.maxPower;
      powerPercentage = powerPercentage <= 1 ? powerPercentage : 1;

      this.powerBar.clear();
      this.powerBar.fillStyle(0xffffff, 0.4);
      this.powerBar.fillRect(this.x + this.ember.constants.powerBarOffsetX + this.config.offsets.powerbar.x, this.y + this.ember.constants.powerBarOffsetY + this.config.offsets.powerbar.y, this.ember.constants.powerBarWidth, this.ember.constants.powerBarHeight);
      this.powerBar.fillStyle(this.ember.constants.powerBarColor, 1);
      this.powerBar.fillRect(this.x + this.ember.constants.powerBarOffsetX + this.config.offsets.powerbar.x, this.y + this.ember.constants.powerBarOffsetY + this.config.offsets.powerbar.y, this.ember.constants.powerBarWidth * powerPercentage, this.ember.constants.powerBarHeight);
    }
  }

  canFireWeapon(powerRequirement) {
    // console.log('canFire', agent.currentPower, powerRequirement);
    return this.power >= powerRequirement;
  }

  checkAggression(agentContainer) {
    // const isNeighbor = this.scene.board.areNeighbors(agentContainer.rexChess.tileXYZ, agentContainer.ember.playerContainer.rexChess.tileXYZ);
    // console.log('checkAggression isNeighbor', isNeighbor)
    /*

    level difference between player and agent
    player level - agent level
    4 - 1 = 3     * -1 = -3
    4 - 2 = 2     * -1 = -2
    4 - 3 = 1     * -1 = -1
    4 - 4 = 0     * -1 = 0
    4 - 5 = -1    * -1 = 1
    4 - 6 = -2    * -1 = 2

    aggressionScale * health percentage
    5 * 1  =  5  100% healthy
    5 * .1  = .5  almost dead

   -3 + 5  = 2      level 3 diff, healthy
   -3 + .5  = -2.5  level 3 diff, almost dead

   0 + 3  = 3  same level, aggressionScale = 3, healthy

   -2 + 5  = 3
   -1 + 5  = 4
   0 + 5  = 5   same level, healthy
   0 + .5  = .5   same level, almost dead



     */

    // so an agent can be configured to NOT pursue at all.
    if (agentContainer.agent.aggressionScale <= 0) {
      return false;
    }

    const levelDiff = Math.abs(this.ember.playerContainer.agent.level - agentContainer.agent.level);


    const healthPercentage = this.agent.health / this.agent.maxHealth;
    const aggressionTimesHealthPercentage = agentContainer.agent.aggressionScale * healthPercentage;
    // console.warn('      final', aggressionTimesHealthPercentage - levelDiff);

    if (false) {
    // if (true) {

      console.log('%c Aggression', 'color: red; font-size: 16px; margin: 15px 0 0 0;');
      console.table([
        {
          'player level': this.ember.playerContainer.agent.level,
          'name': agentContainer.agent.playerConfig.name,
          'agent level': agentContainer.agent.level,
          'lv diff': levelDiff,
          'health': healthPercentage,
          'aggression': agentContainer.agent.aggressionScale,
          'aggression * Health %': aggressionTimesHealthPercentage,
          'final': aggressionTimesHealthPercentage - levelDiff,
          'attack ?': aggressionTimesHealthPercentage - levelDiff > 2
        }
      ])
    }
    return aggressionTimesHealthPercentage - levelDiff > 2;


    // TODO implement.  check to see if they want to fight, or run away, etc
    // return agentContainer.aggressionScale > 6; // TODO just picked a number higher than 1
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

  populatePatrolMoveQueue() {
    if (!this.rexChess || !this.rexChess.board) {
      return;
    }
    // console.log('populatePatrolMoveQueue', this)
    if (this.rexChess && this.rexChess.board && !this.moveQueue || (this.moveQueue.path && this.moveQueue.path.length === 0)) {
      // no moves.. build the next one
      const nextTargetTile = this.getNextTargetTile();
      if (nextTargetTile) {

        const tileXYArrayPath = this.pathFinder.findPath(nextTargetTile);
        // const tileXYArrayPath = this.pathFinder.findPath(nextTargetTile, undefined, false);
        // const tileXYArrayPath = this.pathFinder.findPath(nextTargetTile, 6000, false);
        // const tileXYArrayPath = this.pathFinder.getPath(nextTargetTile);
        // console.log('patrol path', tileXYArrayPath)

        if (this.ember.debug.phaserDebug) {
          this.showMovingPath(tileXYArrayPath);
        }

        let moveObject = {
          agent: this,
          path: tileXYArrayPath,
          uuid: v4(),
          finishedCallback: () => {
            this.populatePatrolMoveQueue();
          }
        };
        this.moveQueue = moveObject;
      } else {
        console.log('no nextTargetTile')
      }

    } else {
      // still have moves left
    }
  }

  @task
  *patrolTask() {
    while (this.patrolEnabled === true) {

      if (!this.ember.gameManager.gamePaused) {

        if (this.moveQueue.path.length > 0) {

          // grab the next waypoint
          let firstMove = this.moveQueue.path[0];
          // attempt the move
          this.moveToObject.moveTo(firstMove.x, firstMove.y);

          // we're done, remove it from the list of waypoints to go to
          this.moveQueue.path.shift();

        } else {
          // no moves left for this object
          if (typeof this.moveQueue.finishedCallback === 'function') {
            this.moveQueue.finishedCallback();
          }
        }
      }
      // yield timeout(5000);
      yield timeout((this.patrol && this.patrol.timeout) ? this.patrol.timeout : 2000);
    }
  }

}
