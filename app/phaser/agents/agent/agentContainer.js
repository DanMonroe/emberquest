import BasePhaserAgentContainer from "../base-phaser-agent-container";
import {task} from "ember-concurrency-decorators";
import {timeout,waitForProperty } from "ember-concurrency";
import {tracked} from '@glimmer/tracking';
import { v4 } from "ember-uuid";
import {isPresent} from '@ember/utils';

export default class AgentContainer extends BasePhaserAgentContainer {

  currentTargetTileCounter = -1;
  @tracked moveQueue = {path:[]};
  @tracked patrolEnabled = true;
  @tracked agentState = 0;  // IDLE
  @tracked lastAgentState = 0;  // IDLE
  @tracked config;

  constructor(scene, config, agent) {
    super(scene, config);
// console.warn('AGENT CONTAINER CONFIG', config)
    this.containerType = this.ember.constants.SHAPE_TYPE_AGENT;

    this.agent = agent;
    this.config = config;
    this.showPowerBar = false;
    this.showLevel = true;

    this.setupSprite();

    this.setDisplaySize(50,50)

    this.patrol = config.patrol;    // should this be on data.attrs ?
    // this.weapons = config.weapons;

    this.setData('attrs', config.flagAttributes);

    this.moveToObject = scene.rexBoard.add.moveTo(this, {
      speed: config.speed,
      occupiedTest: true,
      blockerTest: true
    });

    this.moveToObject.on('complete', this.moveToComplete);

    this.moveToObject.moveableTestCallback = (curTile, targetTile, pathFinder) => {

      if (this.moveToObject.isRunning) {
        return false;
      }

      const allattrs = this.ember.map.getTileAttribute(pathFinder.scene, targetTile);
      let canMove = this.ember.playerHasAbilityFlag(this, this.ember.constants.FLAG_TYPE_TRAVEL, allattrs.travelFlags);

      if (!canMove) {
        // console.log('cant move! targetTile', targetTile, 'travelFlags', allattrs.travelFlags, 'w', allattrs.wesnoth);
      } else if ( ! this.boardedTransport) {  // don't adjust speed/power when on a transport
        this.moveToObject.setSpeed(config.speed * allattrs.speedCost);
      }

      return canMove;
    };

    this.pathFinder = scene.rexBoard.add.pathFinder(this, {
      occupiedTest: true,
      pathMode: 'A*',
      blockerTest: true,
      costCallback: (curTile, targetTile, pathFinder) => {
        const travelFlags = this.ember.map.getTileAttribute(pathFinder.chessData.board.scene, targetTile, 'travelFlags');
        const canMove = this.ember.playerHasAbilityFlag(this, this.ember.constants.FLAG_TYPE_TRAVEL, travelFlags);

        return canMove ? 1 : undefined; // undefined is a "blocker"
      },

    });

    this.createHealthBar();
    this.reloadHealth.perform();
    this.reloadPower.perform();

  }

  update() {
    this.updateHealthBar();
  }

  setupSprite() {
    const agentSprite = this.scene.add.sprite(0,0,this.config.texture);
    agentSprite.setScale(this.config.scale);

    this.add(agentSprite);

    this.phaserAgentSprite = agentSprite;

    if (this.config.animeframes) {
      if (this.config.animeframes.rest) {
        this.scene.anims.create({
          key: this.config.animeframes.rest.key,
          frames: this.scene.anims.generateFrameNumbers(this.config.texture, { start: this.config.animeframes.rest.start, end: this.config.animeframes.rest.end}),
          frameRate: this.config.animeframes.rest.rate,
          repeat: this.config.animeframes.rest.repeat,
        });
      }
      if (this.config.animeframes.attack) {
        const attackFrames = this.scene.anims.generateFrameNumbers(this.config.texture, { start: this.config.animeframes.attack.start, end: this.config.animeframes.attack.end });

        if (this.config.animeframes.attack.delays) {
          attackFrames[this.config.animeframes.attack.delays.frameNum].duration = this.config.animeframes.attack.delays.delay;
        }

        this.scene.anims.create({
          key: this.config.animeframes.attack.key,
          frames: attackFrames,
          frameRate: this.config.animeframes.attack.rate
        });
      }
      if (this.config.animeframes.range) {
        const rangeFrames = this.scene.anims.generateFrameNumbers(this.config.texture, { start: this.config.animeframes.range.start, end: this.config.animeframes.range.end });

        if (this.config.animeframes.range.delays) {
          rangeFrames[this.config.animeframes.range.delays.frameNum].duration = this.config.animeframes.range.delays.delay;
        }

        this.scene.anims.create({
          key: this.config.animeframes.range.key,
          frames: rangeFrames,
          frameRate: this.config.animeframes.range.rate
        });
      }
    }

    agentSprite.on('animationcomplete',  (anim, frame) => {
      agentSprite.emit('animationcomplete' + anim.key.replace(this.config.texture, ""), anim, frame);
    }, agentSprite);

    if (this.config.animeframes.rest) {
      agentSprite.on('animationcomplete-rest', () => {
      });
    }
    if (this.config.animeframes.attack) {
      agentSprite.on('animationcomplete-attack', () => {
        this.playAnimation(this.ember.constants.ANIMATION.KEY.REST);
      });
    }
    if (this.config.animeframes.range) {
      agentSprite.on('animationcomplete-range', () => {
        this.playAnimation(this.ember.constants.ANIMATION.KEY.REST);
      });
    }

    // start playing the rest animation
    this.playAnimation(this.ember.constants.ANIMATION.KEY.REST);
  }

  stopAnimation() {
    this.phaserAgentSprite.anims.stop();
  }

  playAnimation(key) {
    switch (key) {
      case this.ember.constants.ANIMATION.KEY.REST:
        // start playing the rest animation
        if (this.config.animeframes.rest) {
          this.phaserAgentSprite.anims.play(this.config.animeframes.rest.key);
        }
        break;
      case this.ember.constants.ANIMATION.KEY.ATTACK:
        if (this.config.animeframes.attack) {
          this.phaserAgentSprite.anims.play(this.config.animeframes.attack.key);
        }
        break;
      case this.ember.constants.ANIMATION.KEY.RANGE:
        if (this.config.animeframes.range) {
          this.phaserAgentSprite.anims.play(this.config.animeframes.range.key);
        }
        break;
      default:
        break;
    }
  }

  playSound(key) {
    switch (key) {
      case this.ember.constants.AUDIO.KEY.ATTACK:
        this.scene.swordMiss.play();
        break;
      default:
        break;
    }
  }

  async cancelAllTasks() {
    console.log('cancelling all tasks for', this.agent.playerConfig.texture)
    await this.patrolTask.cancelAll();
    await this.engagePlayer.cancelAll();
    await this.chasePlayer.cancelAll();
    await this.attack.cancelAll();
  }

  @task
  *timeoutTask(agentContainer) {
    // console.log('timeoutTask', agentContainer);
    switch (this.agentState) {
      case this.ember.constants.AGENTSTATE.IDLE:
        break;
      case this.ember.constants.AGENTSTATE.PATROL:
        yield timeout(agentContainer.patrol.timeout || 2000);
        break;
      case this.ember.constants.AGENTSTATE.PURSUIT:
        yield timeout(agentContainer.patrol.aggressionSpeedTimeout || 1500);
        break;
      default:
        console.log('=== AGENT STATE: UNKNOWN', this.agentState);
        yield timeout(5000);
    }

  }

  async moveToComplete() {
    const agentContainer = arguments[0];

    // console.log('agent moveToComplete', agentContainer.agent.playerConfig.texture);
    // console.log('agent moveToComplete', agentContainer.agent.playerConfig.texture, agentContainer.agent);
    agentContainer.describeAgentState();

    await agentContainer.timeoutTask.perform(agentContainer);

    // set visibility of agent after it moves.

    if (agentContainer.rexChess.tileXYZ) {
      const isNeighbor = agentContainer.scene.board.areNeighbors(agentContainer.rexChess.tileXYZ, agentContainer.ember.playerContainer.rexChess.tileXYZ);

// console.log('   isNeighbor', isNeighbor, 'checkAggression', agentContainer.checkAggression(agentContainer))

      if (isNeighbor && agentContainer.checkAggression(agentContainer)) {
console.log('      do transitionToMelee')
          agentContainer.transitionToMelee(agentContainer);
      } else {
        const isInLOS = agentContainer.ember.playerContainer.fov.isInLOS(agentContainer.rexChess.tileXYZ);

        agentContainer.setVisibilityIfInLineOfSight(agentContainer, isInLOS);

        if (isInLOS) {
          console.log('      is in LOS')
          const shouldPursue = agentContainer.checkAggression(agentContainer);
          console.warn('         >>>>> shouldPursue', shouldPursue)
          if (shouldPursue) {
            agentContainer.transitionToPursuit();
          } else {
            // return to patrol
            agentContainer.transitionToPatrol();
          }
        }
      }
    }

    agentContainer.ember.checkForSpecial(agentContainer, agentContainer.moveToObject);
  }

  setAgentState(newState) {
    this.agentState = newState;
    this.describeAgentState();
  }

  describeAgentState() {
    switch (this.agentState) {
      case this.ember.constants.AGENTSTATE.IDLE:
        // console.log('=== AGENT STATE: IDLE');
        break;
      case this.ember.constants.AGENTSTATE.PATROL:
        // console.log('=== AGENT STATE: PATROL');
        break;
      case this.ember.constants.AGENTSTATE.MELEE:
        // console.log('=== AGENT STATE: MELEE');
        break;
      case this.ember.constants.AGENTSTATE.MISSILE:
        // console.log('=== AGENT STATE: MISSILE');
        break;
      case this.ember.constants.AGENTSTATE.PURSUE:
        // console.log('=== AGENT STATE: PURSUE');
        break;
      default:
        // console.log('=== AGENT STATE: UNKNOWN', this.agentState);
    }
  }

  @task
  // @restartableTask
  *engagePlayer(agentContainer) {
    console.log('               engagePlayer')
// console.log('engage player', agentContainer.agent.playerConfig.texture, this.agentState)
    this.attack.cancelAll();
    this.chasePlayer.cancelAll();
    this.patrolTask.cancelAll();

    if (agentContainer.scene.board.areNeighbors(agentContainer.rexChess.tileXYZ, agentContainer.ember.playerContainer.rexChess.tileXYZ)) {
      console.log('                 ----  neighbors.. use melee')
      this.setAgentState(this.ember.constants.AGENTSTATE.MELEE);
    } else {
      console.log('                 ----  not neighbors.. use missile')
      const equippedMeleeWeapon = agentContainer.agent.equippedMeleeWeapon;
      const equippedRangedWeapon = agentContainer.agent.equippedRangedWeapon;

      if (equippedRangedWeapon) {
        console.log('                    got ranged weapon..go ahead and shoot')
      } else {
        console.log('                    no ranged weapon..use melee or chase?')
        // this.agentState = this.ember.constants.AGENTSTATE.MISSILE;
        // this.setAgentState(this.ember.constants.AGENTSTATE.MISSILE);
        this.chasePlayer.perform();
        return;
      }
    }
// debugger;
    let engageCount = 0;
    switch (this.agentState) {
      case this.ember.constants.AGENTSTATE.PURSUE:
      // case this.ember.constants.AGENTSTATE.MISSILE:
        while(this.agentState === this.ember.constants.AGENTSTATE.PURSUE && engageCount <= 50) {
        // while(this.agentState === this.ember.constants.AGENTSTATE.MISSILE && engageCount <= 50) {
          if (!this.ember.gameManager.gamePaused) {
            engageCount++;
            if (this.ember.playerContainer.fov.isInLOS(this.rexChess.tileXYZ)) {
              yield this.attack.perform();
            } else {
              this.transitionToPatrol();
            }
          } else {
            yield waitForProperty(this.ember.gameManager, 'gamePaused', false);
          }

          // yield timeout(5000);
          // yield timeout(this.patrol.aggressionSpeedTimeout);
        }
        break;
      case this.ember.constants.AGENTSTATE.MELEE:
        // console.log('engagePlayer melee. this.agentState', this.agentState)
        // while(this.agentState === this.ember.constants.AGENTSTATE.MELEE) {
        while(this.agentState === this.ember.constants.AGENTSTATE.MELEE && engageCount <= 50) {
          if (!this.ember.gameManager.gamePaused) {
            engageCount++;
            // if not neighbor, go back to patrol
            if (agentContainer.scene.board.areNeighbors(agentContainer.rexChess.tileXYZ, agentContainer.ember.playerContainer.rexChess.tileXYZ)) {
              yield this.attack.perform();
            } else {
              const shouldPursue = agentContainer.checkAggression(agentContainer);
              if (shouldPursue) {
                console.log('meleee...  chase em')
                this.chasePlayer.perform();
              } else {
                console.log('meleee...  run away')
                this.transitionToPatrol();
              }
            }
          } else {
            yield waitForProperty(this.ember.gameManager, 'gamePaused', false);
          }
          // yield timeout(5000);
          // yield timeout(this.patrol.aggressionSpeedTimeout || 2000);
        }
        break;
      default:
    }
  }

  @task
  *chasePlayer() {
    // and player is still alive
    while(this.agentState === this.ember.constants.AGENTSTATE.PURSUE) {
    // while(this.agentState === this.ember.constants.AGENTSTATE.MISSILE) {
// console.log('               chasePlayerTask')
      if (!this.ember.gameManager.gamePaused) {
        const pathToPlayer = this.pathFinder.findPath(this.ember.playerContainer.rexChess.tileXYZ);

        // console.log('                  pathToPlayer', pathToPlayer, 'this.config.sightRange',this.config.sightRange);


        if (pathToPlayer && pathToPlayer.length) {

          // TODO is pathToPlayer length always going to be = 1
          // use LOS instead?
          // const isInLOS = agentContainer.ember.playerContainer.fov.isInLOS(agentContainer.rexChess.tileXYZ);
  // console.error('pathToPlayer.length', pathToPlayer.length)
          if (pathToPlayer.length > this.config.sightRange) {
            console.log('can no longer see the player')
            this.transitionToPatrol();
          } else { // don't move agent on top of player
          // } else if (pathToPlayer.length > 1) { // don't move agent on top of player
            const firstMove = pathToPlayer[0];
            if (firstMove) {
              // if( firstMove.x !== this.ember.playerContainer.rexChess.tileXYZ.x ||
              //   firstMove.y !== this.ember.playerContainer.rexChess.tileXYZ.y) {
                 this.moveToObject.moveTo(firstMove.x, firstMove.y);

                 // TODO May 10..  why does it appear to go into patrol mode after move here?
              // console.log('1')
              //   yield timeout(5000);
              // console.log('2')

              // }
            }
          }
        } else {
          this.transitionToPatrol();
        }
      } else {
        yield waitForProperty(this.ember.gameManager, 'gamePaused', false);
      }
  //     console.log('this.patrol.pursuitSpeed', this.patrol.pursuitSpeed)
  //     // debugger;
  //     yield timeout(5000);
      yield timeout(this.patrol.pursuitSpeed || 2000);
      // yield timeout(1);
    }
  }

  @task({
    drop:true,
    maxConcurrency: 1
  })
  *attack() {
    if (this.ember.gameManager.gamePaused) {
      return;
    }

    const equippedMeleeWeapon = this.agent.equippedMeleeWeapon;
    const equippedRangedWeapon = this.agent.equippedRangedWeapon;
    switch (this.agentState) {
      case this.ember.constants.AGENTSTATE.PURSUE:
      case this.ember.constants.AGENTSTATE.MISSILE:
// console.log('Agent Ranged Attack!');
        if (!this.ember.playerContainer.fov.isInLOS(this.rexChess.tileXYZ)) {
// yield timeout(5000);
          return;
        }

        // equippedRangedWeapon = this.agent.equippedRangedWeapon;
        // console.log('agent equippedRangedWeapon', equippedRangedWeapon)
        if (equippedRangedWeapon && this.ember.gameManager.hasEnoughPowerToUseItem(equippedRangedWeapon, this.agent)) {

          const hit = this.ember.gameManager.didAttackHit(equippedRangedWeapon, this.ember.playerContainer.agent, this.agent);

          // find a way to play appropriate sound
          this.playSound(this.ember.constants.AUDIO.KEY.ARROW);

          this.stopAnimation();
          this.playAnimation(this.ember.constants.ANIMATION.KEY.RANGE);
          this.playSound(this.ember.constants.AUDIO.KEY.RANGE);

          this.scene.agentprojectiles.fireProjectile(this.scene, this, this.ember.playerContainer.rexChess.tileXYZ, equippedRangedWeapon, hit);

          if (equippedRangedWeapon) {
            yield timeout(equippedRangedWeapon.attackSpeed); // cooldown
            this.agent.power -= equippedRangedWeapon.powerUse;
          } else {
            yield timeout(this.ember.constants.BASE_ATTACK_TIMEOUT); // cooldown
          }

        } else {

        }
        break;
      case this.ember.constants.AGENTSTATE.MELEE:
        // console.log('Agent Melee Attack!');
        // equippedMeleeWeapon = this.agent.equippedMeleeWeapon;
        // console.log('agent equippedMeleeWeapon', equippedMeleeWeapon.name, equippedMeleeWeapon)
// debugger;
        if (equippedMeleeWeapon) {
          if (this.agent.power < equippedMeleeWeapon.powerUse) {
            console.warn(`Not enough power to wield ${equippedMeleeWeapon.name}`);
            yield timeout(equippedMeleeWeapon.attackSpeed);
            return;
          }

          const hit = this.ember.gameManager.didAttackHit(equippedMeleeWeapon, this.ember.playerContainer.agent, this.agent);

          const meleeAttackDamage = hit ? this.agent.attackDamage : 0;
          // const targetsHealth = this.ember.playerContainer.agent.health;
          // console.log('meleeAttackDamage', meleeAttackDamage, 'targetsHealth', targetsHealth);

          this.stopAnimation();
          this.playAnimation(this.ember.constants.ANIMATION.KEY.ATTACK);
          this.playSound(this.ember.constants.AUDIO.KEY.ATTACK);

          // weapon will have speed, damage?, timeout cooldown
          this.ember.playerContainer.takeDamage(meleeAttackDamage, this.ember.playerContainer.agent, this.agent);

          if (equippedMeleeWeapon) {
            // console.log('melee timeout', equippedMeleeWeapon.attackSpeed, this.agent)
            yield timeout(equippedMeleeWeapon.attackSpeed); // cooldown
            this.agent.power -= equippedMeleeWeapon.powerUse;
          } else {
            yield timeout(this.ember.constants.BASE_ATTACK_TIMEOUT); // cooldown
          }

        }

        break;
      default:
    }
    return;
  }

  populatePatrolMoveQueue() {

    if (!this.moveQueue || (this.moveQueue.path && this.moveQueue.path.length === 0)) {
      // no moves.. build the next one
      const nextTargetTile = this.getNextTargetTile();
      if (nextTargetTile) {

        const tileXYArrayPath = this.pathFinder.findPath(nextTargetTile);

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
        }
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
    // console.log('patrol task -  paused', this.ember.gameManager.gamePaused)

    while (this.patrolEnabled === true) {

      if (!this.ember.gameManager.gamePaused) {

        if (this.moveQueue.path.length > 0) {

          // grab the next waypoint
          let firstMove = this.moveQueue.path[0];
// console.log('111 patrolTask firstMove', firstMove, this.rexChess.tileXYZ, 'this.patrol.timeout', this.patrol.timeout)
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
      yield timeout(this.patrol.timeout || 2000);
    }
  }

  // removeAgentFromMoveQueue(agent) {
  //   // console.log('removeAgentFromMoveQueue', this.moveQueue);
  //   this.moveQueue = this.moveQueue.reject((thisAgent) => {
  //     // console.log('remove agent', thisAgent);
  //     return agent.moveQueueId === thisAgent.uuid;
  //     // return thisAgent.name = agent.name;
  //   });
  // }


  transitionToMelee(agentContainer) {
    // console.log('            transitionToMelee')
    // console.log('transition to melee');
    const currentState = this.agentState;
    this.setAgentState(this.ember.constants.AGENTSTATE.MELEE);
    // if (this.engagePlayer.isIdle) {
      this.engagePlayer.perform(agentContainer);
      if (this.chasePlayer.isIdle) {
        this.chasePlayer.perform();
      }

    // } else {
      // go back to original state
      // this.agentState = currentState;
    // }
  }

  transitionToPursuit() {
    // console.log('            transitionToPursuit')
    if (this.ember.debug.phaserDebug) {
      this.hideMovingPath();
    }

    this.setAgentState(this.ember.constants.AGENTSTATE.PURSUE);

    // // this.agentState = this.ember.constants.AGENTSTATE.MISSILE;

    if(this.patrol.method === this.ember.constants.PATROLMETHOD.STATIC) {
      if (this.engagePlayer.isIdle) {
        this.engagePlayer.perform();
      }
    } else {

      // cancel any patrolling for this enemy
      // this.removeAgentFromMoveQueue(this);
      this.moveQueue = {path:[]};

      // Fire and pursue
      // console.error('Fire and pursue')
      if (this.engagePlayer.isIdle) {
        this.engagePlayer.perform(this);
      }
      if (this.chasePlayer.isIdle) {
        this.chasePlayer.perform();
      }
    }
  }

  transitionToPatrol() {
    // console.log('            transitionToPatrol')
    // console.log('transition to patrol', this.agent.playerConfig.texture, this.engagePlayer.concurrency, this.engagePlayer.isRunning);
    // if (this.engagePlayer.concurrency && this.engagePlayer.isRunning) {
    //   console.log('show cancelAll')
    //   this.engagePlayer.cancelAll();
    //   // this.engagePlayer.cancel();
    // } else {
    //   console.log('no engagePlayer tasks running')
    // }

    // if (this.agentState !== this.ember.constants.AGENTSTATE.PATROL) {
    //   console.log('this.agentState !== this.ember.constants.AGENTSTATE.PATROL', this.agentState)
      this.setAgentState(this.ember.constants.AGENTSTATE.PATROL);
      // this.agentState = this.ember.constants.AGENTSTATE.PATROL;
      if (isPresent(this.patrol.tiles.length) > 0) {

        this.moveQueue = {path:[]};
        this.populatePatrolMoveQueue();

        if( this.patrolTask.isIdle){
          this.patrolTask.perform();
        }
      }
    // } else {
    //   console.log('this.agentState === this.ember.constants.AGENTSTATE.PATROL', this.agentState)
    //
    // }
  }

  getRandomNeighborTile() {
    const neighborChessTile = this.rexChess.board.getTileXYAtDirection(this.rexChess.tileXYZ, this.ember.randomIntFromInterval(0, 5), 3);
    let canMove = false;
    if (neighborChessTile) {
      const allattrs = this.ember.map.getTileAttribute(this.scene, neighborChessTile);
      canMove = this.ember.playerHasAbilityFlag(this, this.ember.constants.FLAG_TYPE_TRAVEL, allattrs.travelFlags);
    }

    if (!canMove) {
      return this.getRandomNeighborTile()
    }
    return neighborChessTile;
  }
  getNextTargetTile() {
    let nextTargetTile;

    switch (this.patrol.method) {
      case this.ember.constants.PATROLMETHOD.RANDOM:
        nextTargetTile = this.patrol.tiles[Math.floor(Math.random() * this.patrol.tiles.length)];
        break;
      case this.ember.constants.PATROLMETHOD.WANDER:
// console.log('getNextTargetTile - Wander');
        nextTargetTile = this.getRandomNeighborTile();
        break;
      default:
        // rolling patrol:
        this.currentTargetTileCounter++;
        if (this.currentTargetTileCounter >= this.patrol.tiles.length) {
          this.currentTargetTileCounter = 0;
        }
        nextTargetTile = this.patrol.tiles[this.currentTargetTileCounter];
        break;
    }
    // if(this.patrol.method === this.ember.constants.PATROLMETHOD.RANDOM) {
    //   //random patrol:
    //   nextTargetTile = this.patrol.tiles[Math.floor(Math.random() * this.patrol.tiles.length)];
    //
    // } else {
    //   // rolling patrol:
    //   this.currentTargetTileCounter++;
    //   if (this.currentTargetTileCounter >= this.patrol.tiles.length) {
    //     this.currentTargetTileCounter = 0;
    //   }
    //   nextTargetTile = this.patrol.tiles[this.currentTargetTileCounter];
    // }
    return nextTargetTile;
  }

  _markers = [];

  showMovingPath = (tileXYArray) => {
    // console.log('showMovingPath', tileXYArray)
    this.hideMovingPath();
    var tileXY, worldXY;
    var scene = this.scene,
      board = this.rexChess.board;
    for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
      tileXY = tileXYArray[i];
      worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
      var text = scene.add.text(worldXY.x, worldXY.y, tileXY.cost)
        .setOrigin(0.5);
      this._markers.push(text);
    }
  }

  hideMovingPath = () => {
    for (var i = 0, cnt = this._markers.length; i < cnt; i++) {
      this._markers[i].destroy();
    }
    this._markers.length = 0;
    return this;
  }
}
