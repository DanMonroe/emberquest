import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { Player } from "../objects/agents/player";
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import { task, enqueueTask, restartableTask } from 'ember-concurrency-decorators';
import { constants } from 'emberquest/services/constants';


export default class GameManagerService extends Service {
  @service('spawner') spawnerService;
  @service modals;
  @service inventory;
  @service intl;
  @service messages;

  @tracked player;
  @tracked volume = 0;
  @tracked soundEffectsVolume = 1;
  @tracked musicEffectsVolume = 1;
  @tracked mutedSoundEffectsVolume = false;
  @tracked mutedMusicEffectsVolume = false;
  @tracked cookieConfirm = false;

  @tracked gamePaused = true;
  @tracked loadingNewScene = false;

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
    this.gameClock.perform();
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

      yield timeout(timeoutDelay);
    }

  }

  pauseGame(paused) {
    this.gamePaused = paused;
  }

  async saveSceneData() {
    await this.ember.saveSceneData(this.scene);
  }

  toggleMuteVolume() {
    this.mutedSoundEffectsVolume = !this.mutedSoundEffectsVolume;
    this.mutedMusicEffectsVolume = !this.mutedMusicEffectsVolume;
    this.ember.saveSettingsData();
  }

  // adjustVolume() {
  //   this.volume++;
  //   if (this.volume > 2) {
  //     this.volume = 0;
  //   }
  //   switch (this.volume) {
  //     case 0:
  //       this.soundEffectsVolume = 0;
  //       this.musicEffectsVolume = 0;
  //       // this.scene.musicAudio.setVolume(0);
  //       break;
  //     case 1:
  //       this.soundEffectsVolume = 0.5;
  //       this.musicEffectsVolume = 0;
  //       // this.scene.musicAudio.setVolume(0.3);
  //       break;
  //     case 2:
  //       this.soundEffectsVolume = 1;
  //       this.musicEffectsVolume = 0;
  //       // this.scene.musicAudio.setVolume(0.7);
  //       break;
  //     default:
  //       break;
  //   }
  // }


  setupEventListener() {
    this.scene.events.on('pickUpChest', (chestId, playerId) => {
      console.log('pickUpChest', chestId, playerId);
    });
  }

  setupSpawners() {
    this.spawnerService.setup(this.scene);
  }

  setupUniques() {
    this.spawnerService.spawnUniques();
  }

  spawnPlayer() {
    // debugger;
    let playerTile = {x: this.scene.mapData.player.startX, y: this.scene.mapData.player.startY};
    if (this.storedData.storedPlayerTile) {
      playerTile = {x: this.storedData.storedPlayerTile.x, y: this.storedData.storedPlayerTile.y};
    }
    if (this.ember.overrideMap) {
      // x/y queryParams are strings... convert
      // x/y could be a 0
      if (this.ember.overrideMap.x !== undefined) {
        playerTile.x = +this.ember.overrideMap.x;
      }
      if (this.ember.overrideMap.y !== undefined) {
        playerTile.y = +this.ember.overrideMap.y;
      }
    }

    this.playerConfig = {
      playerX: playerTile.x,
      playerY: playerTile.y,
      texture: 'player',
      textureSize: { width: 42, height: 42},
      // scale: 0.1,
      scale: .15,
      // scale: 1.5,
      face: 0,
      coneMode: 'direction',
      cone: 6,
      speed: 125,
      // sightRange: 30,   // this is sight/movement Range
      sightRange: 3,   // this is sight/movement Range
      movingPoints: 3,   // this is sight/movement Range
      // visiblePoints: 8,   // this is sight/movement Range
      visiblePoints: 5,   // this is sight/movement Range
      // visiblePoints: 5.1,   // this is sight/movement Range

      gold: 15,

      // health: 2,
      health: 20,
      // maxHealth: 200,
      // healingPower: 5,
      // healingSpeed: 2500,

      baseHealingPower: 2,
      baseHealingSpeed: 2500,


      energizeSpeed : 2000,
      energizePower: 2,
      power: 102,
      // maxPower: 50,
      id: 'player1',
      playerAttackAudio: undefined, // when ready, get from Boot scene  --- actually should get from the weapon the player is using.

      flagAttributes: {
        sF: (this.storedData.storedPlayerAttrs && this.storedData.storedPlayerAttrs.sF) || 0,
        tF: (this.storedData.storedPlayerAttrs && this.storedData.storedPlayerAttrs.tF) || this.ember.constants.FLAGS.TRAVEL.LAND.value
      },

      storedPlayerAttrs: this.storedData.storedPlayerAttrs,

      costCallback:  (tileXY) => {

        let totalSightCost = this.ember.map.getTileAttribute(this.scene, tileXY, 'sC');

        // can't see past this hex (but CAN see this hex)
        if (totalSightCost === this.ember.constants.FLAGS.SIGHT.IMPASSABLE.value) {
          return this.ember.playerContainer.fov.BLOCKER;
        }

        if (this.ember.map.tileIsDoor(this.scene, tileXY)) {
          const portalSpecialAttr = this.ember.map.getTileAttribute(this.scene, tileXY, 'spcl');
          totalSightCost += portalSpecialAttr.sC;
        }
        // console.log('wesnoth', wesnoth, 'totalSightCost', totalSightCost, tileXY)
        // let wesnoth = this.ember.map.getTileAttribute(this.scene, tileXY, 'w');
        // if (wesnoth === 'Md') {
        //   console.log('Mountain');
          // return null;
          // totalSightCost += 10;
        // }
        return totalSightCost;
      },
      preTestCallback: (tileXYArray) => {
        // console.log('preTestCallback', tileXYArray, visiblePoints, fieldOfView)

        // Limit sight range tp player's sightRange
        // array includes player hex so add one
        // return tileXYArray.length <= (this.playerConfig.sightRange + 1);
        return tileXYArray.length <= (this.player.container.sightRange + 1);
        // return tileXYArray.length <= (this.player.sightRange + 1);
      },

      debug: {
        // graphics: this.add.graphics().setDepth(10),
        log: false,
        override: this.ember.debug || {level:null,gold:null}
      }
    };


    this.player = new Player(this.scene, this.playerConfig);
    this.players[this.player.id] = this.player;

    this.scene.events.emit('spawnPlayer', this.player);

  }

  findAgentAtTile(tileXY) {
    const agentShapes = this.ember.map.getGameObjectsAtTileXY(this.scene.board, tileXY, this.ember.constants.SHAPE_TYPE_AGENT);
    return agentShapes.length > 0 ? agentShapes[0] : null;
  }

  findSignPostAtTile(tileXY) {
    const signPostShapes = this.ember.map.getGameObjectsAtTileXY(this.scene.board, tileXY, this.ember.constants.SHAPE_TYPE_SIGNPOST);
    return signPostShapes.length > 0 ? signPostShapes[0] : null;
  }

  playSound(soundObj) {
    console.log('gameManager playSound', soundObj, this.soundEffectsVolume)
    console.count('gameManager playSound')

    if (!this.mutedSoundEffectsVolume && soundObj && soundObj.key) {
      const config = Object.assign(soundObj.config || {}, {volume: this.soundEffectsVolume});
console.log('sound config', config)
      this.scene.sound.playAudioSprite('eq_audio', soundObj.key, config);
    }

  }

  @restartableTask
  *gameClock() {
    while (true) {
      if (!this.gamePaused) {
        // console.log('gameClockTicking');

        if (this.player.container) {
          this.ember.checkForSpecial(this.player.container, this.player.container.moveToObject);
        }
      }
      yield timeout( constants.GAMECLOCKDELAY );
    }
  }

  processClickedTile(clickedTile, clickedShape, playerContainer) {
    // console.log('attack', clickedTile, clickedShape, 'by', attacker);

    const agentToAttack = this.findAgentAtTile(clickedTile);
    if (agentToAttack) {
      // Enemy agent
      this.attack.perform(clickedTile, agentToAttack, playerContainer);

    } else {
      // Signs
      const signToRead = this.findSignPostAtTile(clickedTile);
      if (signToRead) {
        const isNeighbor = this.scene.board.areNeighbors(playerContainer.rexChess.tileXYZ, signToRead.rexChess.tileXYZ);
        if (isNeighbor) {
          this.messages.addMessage(signToRead.signMessageId, this.intl.t(`messages.signs.${signToRead.signMessageId}`));
        }
        this.scene.game.ember.showInfoDialog(isNeighbor
          ? this.intl.t(`messages.signs.${signToRead.signMessageId}`)
          : this.intl.t(`messages.signs.toofar`));
      }
    }
  }


  @task({
    drop:true,
    maxConcurrency: 1
  })
  // *attack(clickedTile, clickedShape, attacker) {
  *attack(clickedTile, agentToAttack, attacker) {
    // console.log('attack', clickedTile, clickedShape, 'by', attacker);

    if (this.gamePaused) {
      return;
    }

    // const agentToAttack = this.findAgentAtTile(clickedTile);
    // if (agentToAttack) {

      const isNeighbor = this.scene.board.areNeighbors(attacker.rexChess.tileXYZ, agentToAttack.rexChess.tileXYZ);
      // console.log('isNeighbor', isNeighbor)

      if (isNeighbor) {
        // Melee
        // console.log('Melee Attack!');

        // get attackers weapon (in right hand?)
        const equippedMeleeWeapon = attacker.agent.equippedMeleeWeapon;

        // console.log('equippedMeleeWeapon', equippedMeleeWeapon.name, equippedMeleeWeapon)

        if (equippedMeleeWeapon && this.hasEnoughPowerToUseItem(equippedMeleeWeapon, attacker.agent)) {

          const hit = this.didAttackHit(equippedMeleeWeapon, agentToAttack.agent, attacker.agent);
          console.log('hit - melee', hit);

          // find a way to play appropriate sound
          this.playSound(hit && equippedMeleeWeapon ? equippedMeleeWeapon.audioMelee : {});
          // this.playSound(this.ember.constants.AUDIO.KEY.SWORD);

          const meleeAttackDamage = hit ? attacker.agent.attackDamageDuringCombat : 0;
          // const meleeAttackDamage = hit ? attacker.agent.attackDamage : 0;

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

// console.log('game-manager - equippedRangedWeapon', equippedRangedWeapon)
        if (equippedRangedWeapon && this.hasEnoughPowerToUseItem(equippedRangedWeapon, attacker.agent)) {

          const isInLineOfSight = attacker.ember.playerContainer.fov.isInLOS(agentToAttack.rexChess.tileXYZ);

          if (isInLineOfSight) {
            // ok to fire projectile

            const hit = this.didAttackHit(equippedRangedWeapon, agentToAttack.agent, attacker.agent);
            console.log('hit - ranged', hit);

            // find a way to play appropriate sound
            this.playSound(hit && equippedRangedWeapon ? equippedRangedWeapon.audioRanged : {});
            // this.playSound(this.ember.constants.AUDIO.KEY.ARROW);

            this.scene.projectiles.fireProjectile(this.scene, attacker, clickedTile, equippedRangedWeapon, hit);

            if (equippedRangedWeapon) {
              yield timeout(equippedRangedWeapon.attackSpeed); // cooldown
              attacker.agent.power -= equippedRangedWeapon.powerUse;
            } else {
              yield timeout(this.ember.constants.BASE_ATTACK_TIMEOUT); // cooldown
            }
          }
        }
      }
    // } else {
    //   console.log('No agent to attack')
    // }
  }

  didAttackHit(inventoryItem, agentToAttack, attacker) {
    const levelDiff = attacker.level - agentToAttack.level;
    const weaponAccuracy = inventoryItem.accuracy || 5;
    let bonus = 0;
    if (attacker.container.isPlayer) {
      bonus += 10;
    }
    let chanceToHit = 65 + (levelDiff * 2) + weaponAccuracy + bonus;
    if (chanceToHit > 99) {
      chanceToHit = 99; // always chance to miss
    }
    if (chanceToHit < 1) {
      chanceToHit = 1; // always chance to hit
    }
    const diceRoll = this.ember.randomIntFromInterval(0, 100);
    // console.log('chanceToHit', chanceToHit, 'diceRoll', diceRoll, inventoryItem, agentToAttack, attacker, 'levelDiff', levelDiff, 'weaponAccuracy', weaponAccuracy, 'bonus', bonus);

    return diceRoll <= chanceToHit;
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
    const experienceAwarded = enemy.agent.experienceAwarded || 0;
    const goldAwarded = enemy.agent.gold || 0;

    enemy.agentState = this.ember.constants.AGENTSTATE.DEAD;
    scene.ember.gameManager.spawnerService.deleteAgent(enemy);
    enemy.healthBar.destroy();
    await enemy.cancelAllTasks();
    this.scene.board.removeChess(enemy, null, null, null, true);
    enemy.destroy();

    // rewards
    // console.log('player', player, enemy.agent.baseHealth)

    if (shouldAwardExperience) {
      this.countXP.perform(experienceAwarded);
      this.countGems.perform(goldAwarded);
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

    this.scene.board.moveChess(playerContainer, scene.spawnTile.x, scene.spawnTile.y);
    this.scene.game.ember.saveSceneData(scene);
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
