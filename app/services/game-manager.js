import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { Player } from "../objects/agents/player";
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import { task, enqueueTask } from 'ember-concurrency-decorators';
import { constants } from 'emberquest/services/constants';


export default class GameManagerService extends Service {
  @service('spawner') spawnerService;
  @service modals;
  @service inventory;

  @tracked player;
  @tracked volume = 0;

  @tracked gamePaused = true;

  counterSpeed = 1000;
  // @tracked levelStartXP;
  // @tracked levelEndXP;
  // @tracked levelXPRange;
  @tracked xpGainedCounter = 0;
  @tracked gemsGainedCounter = 0;
  @tracked xpTotal = 20;

  scene = undefined;
  ember = undefined;
  storedData = undefined;

  chests = {};
  players = {};
  agents = {};
  transports = {};

  spawnLocations = {
    players: [],
    chests: [],
    monsters: [],  // same as agent?
    agents: [],
    transports: []
  }

  setup(scene) {
    this.scene = scene;
    this.ember = scene.ember;
    this.storedData = scene.storedData;

    this.setupEventListener();
    this.setupSpawners();
    this.spawnPlayer();
    this.setupUniques();
    this.pauseGame(false);
  }

  get levelStartXP() {
    return this.player ? this.getExperienceFromLevel(this.player.level) : 0;
  }

  get levelEndXP() {
    return this.player ? this.getExperienceFromLevel(this.player.level + 1) : 1;
  }

  get levelXPRange() {
    return this.levelEndXP - this.levelStartXP;
  }

  get xpSinceStartXP() {
    return this.player ? (this.player.experience - this.levelStartXP) : 0;
  }

  get xpTotalPercentage() {
    // console.log('xpTotalPercentage levelStartXP', this.levelStartXP, 'levelEndXP', this.levelEndXP, 'XP', this.player ? this.player.experience : 0)
    return Math.min(100, Math.floor((this.xpSinceStartXP / this.levelXPRange) * 100));
  }

  @enqueueTask
  *countXP(xpToAdd) {
    let xpGainedCounter = 0;
    const timeoutDelay = Math.floor(this.counterSpeed / xpToAdd);
    // console.log('timeoutDelay', timeoutDelay)
    while (xpGainedCounter < xpToAdd) {
      xpGainedCounter++;
      this.player.experience++;

      // this.xpTotal = Math.min(100, Math.floor(((xpSinceStartXP + this.xpGainedCounter) / this.levelXPRange) * 100));

      // if (this.player.experience >= this.levelEndXP) {
      //   this.levelUp();
      // }
      yield timeout(timeoutDelay);
    }
  }

  @enqueueTask
  *countGems(gemsToAdd) {
    let gemsGainedCounter = 0;
    const timeoutDelay = Math.floor(this.counterSpeed / gemsToAdd);
    // console.log('timeoutDelay', timeoutDelay)
    while (gemsGainedCounter < gemsToAdd) {
      gemsGainedCounter++;
      this.player.gold++;

      // this.xpTotal = Math.min(100, Math.floor(((xpSinceStartXP + this.xpGainedCounter) / this.levelXPRange) * 100));

      // if (this.player.experience >= this.levelEndXP) {
      //   this.levelUp();
      // }
      yield timeout(timeoutDelay);
    }

  }

  // setLevelStartAndEndXP() {
  //   if (this.player) {
  //     this.levelStartXP = this.getExperienceFromLevel(this.player.level);
  //     this.levelEndXP = this.getExperienceFromLevel(this.player.level+1);
  //     this.levelXPRange = this.levelEndXP - this.levelStartXP;
  //   }
  // }
  // levelUp() {
  //   // show any visual effect?
  //   this.setLevelStartAndEndXP();
  // }

  // @task
  // *countXP(maxXP) {
  //   this.xpGainedCounter = 0;
  //
  //   const timeoutDelay = Math.floor(this.counterSpeed / maxXP);
  //   const xpSinceStartXP = this.player.experience - this.levelStartXP;
  //
  //   while (this.xpGainedCounter < maxXP) {
  //     this.xpGainedCounter++;
  //     this.player.experience++;
  //
  //     this.xpTotal = Math.min(100, Math.floor(((xpSinceStartXP + this.xpGainedCounter) / this.levelXPRange) * 100));
  //
  //     if (this.player.experience >= this.levelEndXP) {
  //       this.levelUp();
  //     }
  //     yield timeout(timeoutDelay);
  //   }
  // }
  //
  // @task
  // *countGems(maxGems) {
  //   const timeoutDelay = Math.floor(this.counterSpeed / maxGems);
  //   this.gemsGainedCounter = 0;
  //   while (this.gemsGainedCounter < maxGems) {
  //     this.gemsGainedCounter++;
  //     this.player.gold++;
  //     yield timeout(timeoutDelay);
  //   }
  // }


  pauseGame(paused) {
    this.gamePaused = paused;
  }

  async saveSceneData() {
    await this.ember.saveSceneData(this.scene);
  }


  adjustVolume() {
    this.volume++;
    if (this.volume > 2) {
      this.volume = 0;
    }
    switch (this.volume) {
      case 0:
        this.scene.musicAudio.setVolume(0);
        break;
      case 1:
        this.scene.musicAudio.setVolume(0.3);
        break;
      case 2:
        this.scene.musicAudio.setVolume(0.7);
        break;
      default:
        break;
    }
  }


  setupEventListener() {
    this.scene.events.on('pickUpChest', (chestId, playerId) => {
      console.log('pickUpChest', chestId, playerId);
      // // update the spawner
      // if (this.chests[chestId]) {
      //   const { gold } = this.chests[chestId];
      //
      //   // updating the players gold
      //   this.players[playerId].updateGold(gold);
      //   this.scene.events.emit('updateScore', this.players[playerId].gold);
      //
      //   // removing the chest
      //   this.spawners[this.chests[chestId].spawnerId].removeObject(chestId);
      //   this.scene.events.emit('chestRemoved', chestId);
      // }
    });
  }

  setupSpawners() {
    this.spawnerService.setup(this.scene);
  }

  setupUniques() {
    this.spawnerService.spawnUniques();
  }

  spawnPlayer() {
    const playerTile = this.storedData.storedPlayerTile ? {x: this.storedData.storedPlayerTile.x, y: this.storedData.storedPlayerTile.y} : {x: this.scene.mapData.player.startX, y: this.scene.mapData.player.startY};

    this.playerConfig = {
      playerX: playerTile.x,
      playerY: playerTile.y,
      texture: 'player',
      textureSize: { width: 42, height: 42},
      // scale: 0.1,
      scale: 1.5,
      face: 0,
      coneMode: 'direction',
      cone: 6,
      speed: 200,
      // sightRange: 30,   // this is sight/movement Range
      sightRange: 3,   // this is sight/movement Range
      movingPoints: 3,   // this is sight/movement Range
      // visiblePoints: 60,   // this is sight/movement Range
      visiblePoints: 8,   // this is sight/movement Range

      gold: 15,

      // health: 2,
      health: 11,
      // maxHealth: 200,
      // healingPower: 5,
      // healingSpeed: 2500,

      baseHealingPower: 2,
      baseHealingSpeed: 2500,


      energizeSpeed : 2000,
      energizePower: 2,
      power: 50,
      // maxPower: 50,
      id: 'player1',
      playerAttackAudio: undefined, // when ready, get from Boot scene  --- actually should get from the weapon the player is using.

      flagAttributes: {
        sightFlags: (this.storedData.storedPlayerAttrs && this.storedData.storedPlayerAttrs.sightFlags) || 0,
        travelFlags: (this.storedData.storedPlayerAttrs && this.storedData.storedPlayerAttrs.travelFlags) || this.ember.constants.FLAGS.TRAVEL.LAND.value
      },

      storedPlayerAttrs: this.storedData.storedPlayerAttrs,

      costCallback:  (tileXY) => {
        let totalSightCost = this.ember.map.getTileAttribute(this.scene, tileXY, 'sightCost');
        if (this.ember.map.tileIsDoor(this.scene, tileXY)) {
          const portalSpecialAttr = this.ember.map.getTileAttribute(this.scene, tileXY, 'special');
          totalSightCost += portalSpecialAttr.sightCost;
        }

        return totalSightCost;
      },
      preTestCallback: (tileXYArray) => {

        // Limit sight range tp player's sightRange
        // array includes player hex so add one
        // return tileXYArray.length <= (this.playerConfig.sightRange + 1);
        return tileXYArray.length <= (this.player.container.sightRange + 1);
        // return tileXYArray.length <= (this.player.sightRange + 1);
      },

      debug: {
        // graphics: this.add.graphics().setDepth(10),
        log: false
      }

    };

    this.player = new Player(this.scene, this.playerConfig);
    this.players[this.player.id] = this.player;

    this.scene.events.emit('spawnPlayer', this.player);

  }

  findAgentAtTile(tileXY) {
    const agentShapes = this.ember.map.getGameObjectsAtTileXY(this.scene.board, tileXY, this.ember.constants.SHAPE_TYPE_AGENT);
    // console.log('agentShapes at tile', agentShapes)
    return agentShapes.length > 0 ? agentShapes[0] : null;
  }

  // // find an agent for example
  // findTypeFromShapeArray(shapes, type) {
  //   if (isEmpty(shapes)) {
  //     return null;
  //   }
  //   const foundTypes = shapes.filter(object => {
  //     if (object.type) {
  //       if (object.type === this.constants.SHAPE_TYPE_CONTAINER) {
  //         return object.containerType === type;
  //       } else {
  //         return object.type === type;
  //       }
  //     }
  //   });
  //   if (isEmpty(foundTypes)) {
  //     return null;
  //   }
  //   return foundTypes[0];
  // }

  playSound(key) {
    switch (key) {
      case this.ember.constants.AUDIO.KEY.ATTACK:
        break;
      case this.ember.constants.AUDIO.KEY.ARROW:
        this.scene.arrow.play();
        break;
      case this.ember.constants.AUDIO.KEY.PLAYERDEATH:
        // this.scene.playerDeath.play();
        break;
      case this.ember.constants.AUDIO.KEY.SWORD:
      default:
        this.scene.swordMiss.play();
        break;
    }
  }

  @task({
    drop:true,
    maxConcurrency: 1
  })
  *attack(clickedTile, clickedShape, attacker) {
    // console.log('attack', clickedTile, clickedShape, 'by', attacker);

    if (this.gamePaused) {
      return;
    }

    const agentToAttack = this.findAgentAtTile(clickedTile);
    if (agentToAttack) {

      const isNeighbor = this.scene.board.areNeighbors(attacker.rexChess.tileXYZ, agentToAttack.rexChess.tileXYZ);
      // console.log('isNeighbor', isNeighbor)

      if (isNeighbor) {
        // Melee
        // console.log('Melee Attack!');

        // get attackers weapon (in right hand?)
        const equippedMeleeWeapon = attacker.agent.equippedMeleeWeapon;

        // console.log('equippedMeleeWeapon', equippedMeleeWeapon.name, equippedMeleeWeapon)

        if (equippedMeleeWeapon && this.hasEnoughPowerToUseItem(equippedMeleeWeapon, attacker.agent)) {

          // find a way to play appropriate sound
          this.playSound(this.ember.constants.AUDIO.KEY.SWORD);

          const meleeAttackDamage = attacker.agent.attackDamage;
          // const targetsHealth = agentToAttack.agent.health;
          // console.log('meleeAttackDamage', meleeAttackDamage, 'targetsHealth', targetsHealth);


          // weapon will have speed, damage?, timeout cooldown
          agentToAttack.takeDamage(meleeAttackDamage, agentToAttack.agent, attacker.agent);

          if (equippedMeleeWeapon) {
            yield timeout(equippedMeleeWeapon.attackSpeed); // cooldown
            attacker.agent.power -= equippedMeleeWeapon.powerUse;
          } else {
            yield timeout(this.ember.constants.BASE_ATTACK_TIMEOUT); // cooldown
          }
        }


      } else {
        // Ranged attack
        console.log('Ranged Attack!');

        // get attackers weapon (in right hand?)
        const equippedRangedWeapon = attacker.agent.equippedRangedWeapon;

console.log('game-manager - equippedRangedWeapon', equippedRangedWeapon)
        if (equippedRangedWeapon && this.hasEnoughPowerToUseItem(equippedRangedWeapon, attacker.agent)) {

          const isInLineOfSight = attacker.ember.playerContainer.fov.isInLOS(agentToAttack.rexChess.tileXYZ);

          if (isInLineOfSight) {
            // ok to fire projectile

            // find a way to play appropriate sound
            this.playSound(this.ember.constants.AUDIO.KEY.ARROW);

            this.scene.projectiles.fireProjectile(this.scene, attacker, clickedTile, equippedRangedWeapon);

            if (equippedRangedWeapon) {
              yield timeout(equippedRangedWeapon.attackSpeed); // cooldown
              attacker.agent.power -= equippedRangedWeapon.powerUse;
            } else {
              yield timeout(this.ember.constants.BASE_ATTACK_TIMEOUT); // cooldown
            }
          }


          // const radian = this.scene.board.angleBetween(attacker.rexChess.tileXYZ, clickedTile);
          //
          // const playerHasRangedWeapon = false;
          // if(playerHasRangedWeapon) { // TODO put back if the player has ranged weapon
          //   const isInLOS = attacker.ember.playerContainer.fov.isInLOS(agentToAttack.rexChess.tileXYZ);
          //   // console.log('in LOS', isInLOS);
          //   if (isInLOS) {
          //     // ok to fire projectile
          //     this.scene.projectiles.fireProjectile(attacker.rexChess.tileXYZ, radian);
          //   }
          // }
        }
      }
    } else {
      console.log('No agent to attack')
    }
  }

  hasEnoughPowerToUseItem(inventoryItem, wieldingAgent) {

    if (!inventoryItem.powerUse) {
      return true;
    }
    if (wieldingAgent.power < inventoryItem.powerUse) {
      console.warn(`Not enough power to wield ${inventoryItem.name}`);  // TODO tell the user?
      return false;
    }
    return true;
  }


  async enemyDied(enemy, player, scene, shouldAwardExperience = true) {
    this.pauseGame(true);

    // Only save unique dead agents
    if (enemy.agent.playerConfig.uniqueId) {
      scene.deadAgents.add(enemy.agent.playerConfig.uniqueId);
    }

    enemy.agentState = this.ember.constants.AGENTSTATE.DEAD;
    scene.ember.gameManager.spawnerService.deleteAgent(enemy);
    enemy.healthBar.destroy();
    enemy.destroy();

    // rewards
    // console.log('player', player, enemy.agent.baseHealth)

    if (shouldAwardExperience) {
      const experienceAwarded = enemy.agent.experienceAwarded;
      this.countXP.perform(experienceAwarded || 0);
      this.countGems.perform(enemy.agent.gold || 0);
    }

    // show dialog
    // this.ember.epmModalContainerClass = 'victory';
    // await this.modals.open('victory-dialog', {
    //   player: player,
    //   xp: experienceAwarded || 0,
    //   gems: enemy.agent.gold || 0
    // });

    await this.saveSceneData();

    this.pauseGame(false);
  }

  async playerDied(playerContainer, scene) {
    // debugger;
    this.pauseGame(true);
    // this.playSound(this.ember.constants.AUDIO.KEY.PLAYERDEATH);

    // TODO what penalties?  For now, heal
    playerContainer.agent.health = playerContainer.agent.baseHealth;

    this.ember.epmModalContainerClass = 'victory';
    await this.modals.open('death-dialog', {playerDead:true});
    this.pauseGame(false);
  }

  getExperienceFromLevel(level) {
    if (level === 0) {
      return 0;
    }
    let experience = 0;
    if (level <= constants.LEVEL_BY_EXPERIENCE.length) {
      experience = constants.LEVEL_BY_EXPERIENCE[level-1];
    } else {
      const baseXP = constants.LEVEL_BY_EXPERIENCE[constants.LEVEL_BY_EXPERIENCE.length];
      const moreLevels = level - constants.LEVEL_BY_EXPERIENCE.length;
      const additionalXP = moreLevels * constants.LEVEL_RANGE_AFTER_12;
      experience = baseXP + additionalXP;
    }
    return experience;
  }

}
