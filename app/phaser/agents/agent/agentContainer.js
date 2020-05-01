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

    this.containerType = this.ember.constants.SHAPE_TYPE_AGENT;

    this.agent = agent;
    this.config = config;

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
      // if (this.moveToObject.isRunning || this.power <= 1) {
      //   console.log('is running - return false')
        return false;
      }

      const allattrs = this.ember.map.getTileAttribute(pathFinder.scene, targetTile);
      let canMove = this.ember.playerHasAbilityFlag(this, this.ember.constants.FLAG_TYPE_TRAVEL, allattrs.travelFlags);

      // console.log('allattrs', allattrs, targetTile, pathFinder.scene, 'canMove', canMove)

      if (!canMove) {
        // console.log('cant move! targetTile', targetTile, 'travelFlags', allattrs.travelFlags, 'wesnoth', allattrs.wesnoth);

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

  moveToComplete() {
    const agentContainer = arguments[0];

    // console.log('agent moveToComplete', agentContainer.agent.playerConfig.texture, agentContainer.agent);

// return;
    // set visibility of agent after it moves.

    // TODO Seems like the health bar should also be set when the container is set??

    if (agentContainer.rexChess.tileXYZ) {
      const isNeighbor = agentContainer.scene.board.areNeighbors(agentContainer.rexChess.tileXYZ, agentContainer.ember.playerContainer.rexChess.tileXYZ);

      // console.log('checkAggression isNeighbor', isNeighbor)

      if (isNeighbor && agentContainer.checkAggression(agentContainer)) {
          agentContainer.transitionToMelee(agentContainer);
      } else {
        const isInLOS = agentContainer.ember.playerContainer.fov.isInLOS(agentContainer.rexChess.tileXYZ);

        agentContainer.setVisibilityIfInLineOfSight(agentContainer, isInLOS);

        if (isInLOS) {
          const shouldPursue = agentContainer.checkAggression(agentContainer);

          if (shouldPursue) {
            agentContainer.transitionToPursuit();
          } else {
            // return to patrol
            agentContainer.transitionToPatrol();
          }
        }
      }
    }
  }


  @task
  *engagePlayer(agentContainer) {

    this.attack.cancelAll();
    this.chasePlayer.cancelAll();
    this.patrolTask.cancelAll();

    let engageCount = 0;
    switch (this.agentState) {
      case this.ember.constants.AGENTSTATE.MISSILE:
        while(this.agentState === this.ember.constants.AGENTSTATE.MISSILE && engageCount <= 50) {
          if (!this.ember.gameManager.gamePaused) {
            engageCount++;
            if (this.ember.playerContainer.fov.isInLOS(this.rexChess.tileXYZ)) {
              yield this.attack.perform();
            } else {
              this.transitionToPatrol();
            }
          } else {
            return; // game paused while we were in loop
          }

          yield timeout(this.patrol.aggressionSpeedTimeout);
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
              this.transitionToPatrol();
            }
          } else {
            return; // game paused while we were in loop
          }
          yield timeout(this.patrol.aggressionSpeedTimeout);
        }
        break;
      default:
    }
  }

  @task
  *chasePlayer() {
    // console.log('chasePlayerTask')
    // and player is still alive
    while(this.agentState === this.ember.constants.AGENTSTATE.MISSILE) {
      if (!this.ember.gameManager.gamePaused) {
        const pathToPlayer = this.pathFinder.findPath(this.ember.playerContainer.rexChess.tileXYZ);
        // console.log('pathToPlayer', pathToPlayer, 'this.config.sightRange',this.config.sightRange);
        if (pathToPlayer) {
          if (pathToPlayer.length > this.config.sightRange) {
            // console.log('can no longer see the player')
            this.transitionToPatrol();
          } else if (pathToPlayer.length > 1) { // don't move agent on top of player
            const firstMove = pathToPlayer[0];
            if (firstMove) {
              this.moveToObject.moveTo(firstMove.x, firstMove.y);
            }
          }
        } else {
          this.transitionToPatrol();
        }
      }
      yield timeout(this.patrol.pursuitSpeed);
    }
  }

  @task({
    drop:true,
    maxConcurrency: 1
  })
  *attack() {
    if (this.ember.gameManager.gamePaused) { return }

    let equippedMeleeWeapon;
    switch (this.agentState) {
      case this.ember.constants.AGENTSTATE.MISSILE:
        // console.log('Agent Ranged Attack!');
        if (!this.ember.playerContainer.fov.isInLOS(this.rexChess.tileXYZ)) {
yield timeout(1000);
          return;
        }

        break;
      case this.ember.constants.AGENTSTATE.MELEE:
        // console.log('Agent Melee Attack!');
        equippedMeleeWeapon = this.agent.equippedMeleeWeapon;
        // console.log('agent equippedMeleeWeapon', equippedMeleeWeapon.name, equippedMeleeWeapon)
// debugger;
        if (equippedMeleeWeapon) {
          if (this.agent.power < equippedMeleeWeapon.powerUse) {
            console.warn(`Not enough power to wield ${equippedMeleeWeapon.name}`);
            yield timeout(equippedMeleeWeapon.attackSpeed);
            return;
          }

          const meleeAttackDamage = this.agent.attackDamage;
          // const targetsHealth = this.ember.playerContainer.agent.health;
          // console.log('meleeAttackDamage', meleeAttackDamage, 'targetsHealth', targetsHealth);

          this.stopAnimation();
          this.playAnimation(this.ember.constants.ANIMATION.KEY.ATTACK);
          this.playSound(this.ember.constants.AUDIO.KEY.ATTACK);


          // weapon will have speed, damage?, timeout cooldown
          this.ember.playerContainer.takeDamage(meleeAttackDamage, this.ember.playerContainer.agent, this.agent);

          if (equippedMeleeWeapon) {
            yield timeout(equippedMeleeWeapon.attackSpeed); // cooldown
            this.agent.power -= equippedMeleeWeapon.powerUse;
          } else {
            yield timeout(this.ember.constants.BASE_ATTACK_TIMEOUT); // cooldown
          }

        }

        break;
      default:
    }
    yield timeout(1000);
// debugger;
    return;

    if (false) {

    console.log('Enemy Fire!');
    // yield timeout(1000);
    // // if (this.game.player.boardedTransport === null) {
    // // not on ship
    // // return;
    // // }
    //
    debugger;

    if (!this.ember.playerContainer.fov.isInLOS(this.rexChess.tileXYZ)) {
      return;
    }

    if (!this.weapons || this.weapons.length === 0) {
      console.log('no weapons');
      return;
    }
    //
    // // let weapon = this.weapons[0];
    let weapon = this.weapons.firstObject;
    if (!this.canFireWeapon(weapon.poweruse)) {
      // console.log('no power!');
      return;
    }

    if (this.fireWeapon.isRunning) {
      // console.log('waiting to reload - 1');
      yield waitForProperty(this, 'fireWeapon.isIdle');
      // console.log('done waiting - fire!');
      return;
    }

    const startTileXYZ = this.rexChess.tileXYZ
    const radian = this.scene.board.angleBetween(startTileXYZ, this.ember.playerContainer.rexChess.tileXYZ);

    yield this.fireWeapon.perform(this, weapon, startTileXYZ, radian);
      // yield this.fireWeapon.perform(this, weapon,  startPoint, targetPoint);
    // }

    }  // if false

  }

  populatePatrolMoveQueue() {

    if (!this.moveQueue || (this.moveQueue.path && this.moveQueue.path.length === 0)) {
      // no moves.. build the next one
      const nextTargetTile = this.getNextTargetTile();
      const tileXYArrayPath = this.pathFinder.findPath(nextTargetTile);

      // this.showMovingPath(tileXYArrayPath);

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
      yield timeout(this.patrol.timeout);
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
    // console.log('transition to melee');
    const currentState = this.agentState;
    this.agentState = this.ember.constants.AGENTSTATE.MELEE;
    if (this.engagePlayer.isIdle) {
      this.engagePlayer.perform(agentContainer);
    } else {
      // go back to original state
      this.agentState = currentState;
    }
  }

  transitionToPursuit() {
    this.agentState = this.ember.constants.AGENTSTATE.MISSILE;
    if(this.patrol.method === this.ember.constants.PATROLMETHOD.STATIC) {
      if (this.engagePlayer.isIdle) {
        this.engagePlayer.perform();
      }
    } else {

      // cancel any patrolling for this enemy
      // this.removeAgentFromMoveQueue(this);
      this.moveQueue = {path:[]};

      // Fire and pursue
      if (this.engagePlayer.isIdle) {
        this.engagePlayer.perform();
      }
      if (this.chasePlayer.isIdle) {
        this.chasePlayer.perform();
      }
    }
  }

  transitionToPatrol() {
    // console.log('transition to patrol');
    this.engagePlayer.cancelAll();

    if (this.agentState !== this.ember.constants.AGENTSTATE.PATROL) {
      this.agentState = this.ember.constants.AGENTSTATE.PATROL;
      if (isPresent(this.patrol.tiles.length) > 0) {

        this.moveQueue = {path:[]};
        this.populatePatrolMoveQueue();

        if( this.patrolTask.isIdle){
          this.patrolTask.perform();
        }
      }
    }
  }

  getNextTargetTile() {
    let nextTargetTile;

    if(this.patrol.method === this.ember.constants.PATROLMETHOD.RANDOM) {
      //random patrol:
      nextTargetTile = this.patrol.tiles[Math.floor(Math.random() * this.patrol.tiles.length)];

    } else {
      // rolling patrol:
      this.currentTargetTileCounter++;
      if (this.currentTargetTileCounter >= this.patrol.tiles.length) {
        this.currentTargetTileCounter = 0;
      }
      nextTargetTile = this.patrol.tiles[this.currentTargetTileCounter];
    }
    return nextTargetTile;
  }

  _markers = [];

  showMovingPath = (tileXYArray) => {
    console.log('showMovingPath', tileXYArray)
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
