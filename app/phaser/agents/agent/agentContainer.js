import BasePhaserAgentContainer from "../base-phaser-agent-container";
import PhaserAgent from './phaser-agent';
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

  constructor(scene, config, agent) {
    super(scene, config);

    this.containerType = this.ember.constants.SHAPE_TYPE_AGENT;

    this.agent = agent;
    // this.phaserAgentSprite = new PhaserAgent(this.scene, config);

    const agentSprite = this.scene.add.sprite(0,0,config.texture);

    if (config.animeframes) {
      if (config.animeframes.rest) {
        this.scene.anims.create({
          key: config.animeframes.rest.key,
          frames: this.scene.anims.generateFrameNumbers(config.texture, { start: config.animeframes.rest.start, end: config.animeframes.rest.end}),
          frameRate: config.animeframes.rest.rate,
          repeat: config.animeframes.rest.repeat,
        });
      }
      if (config.animeframes.attack) {
        this.scene.anims.create({
          key: config.animeframes.attack.key,
          frames: this.scene.anims.generateFrameNumbers(config.texture, { start: config.animeframes.attack.start, end: config.animeframes.attack.end}),
          frameRate: config.animeframes.attack.rate
        });
      }
    }
    agentSprite.setScale(config.scale);

    this.add(agentSprite);

    // start playing the rest animation
    if (config.animeframes.rest) {
      agentSprite.anims.play(config.animeframes.rest.key);
    }

    this.phaserAgentSprite = agentSprite;

    this.setDisplaySize(50,50)

    this.patrol = config.patrol;    // should this be on data.attrs ?
    this.weapons = config.weapons;

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
        // console.log('agent update', this)
    //
    // if (this.phaserAgentSprite) {
    //   this.phaserAgentSprite.update();
    // }
  }

  moveToComplete() {
    // console.log('moveToComplete');
    const agentContainer = arguments[0];
    // console.log('moveToComplete', agentContainer, agentContainer.healthBar)
    // set visibility of agent after it moves.

    // TODO Seems like the health bar should also be set when the container is set??

    if (agentContainer.rexChess.tileXYZ) {
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



  @task
  *engagePlayer() {
    while(this.agentState === this.ember.constants.AGENTSTATE.MISSILE) {
      // and player is still alive
      // console.log('engagePlayerTask', this)
      if (!this.ember.gameManager.gamePaused) {

        if (!this.ember.playerContainer.fov.isInLOS(this.rexChess.tileXYZ)) {
          this.transitionToPatrol();
        }

        // agentContainer.transitionToPatrol();
        this.attack.perform();
      }
      yield timeout(this.patrol.aggressionSpeedTimeout);
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

  @task
  *attack() {
    if (this.ember.gameManager.gamePaused) { return }

    // console.log('Enemy Fire!');
    // yield timeout(1000);
    // // if (this.game.player.boardedTransport === null) {
    // // not on ship
    // // return;
    // // }
    //

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
    //
    // if (this.hex) {
    //   let startPoint = this.point;
    //   let playerTargetHex = this.game.player.hex;
    //   let targetPoint = playerTargetHex.point;
    //   // let targetPoint = this.game.mapService.currentLayout.hexToPixel(playerTargetHex);
    //
    const startTileXYZ = this.rexChess.tileXYZ
    const radian = this.scene.board.angleBetween(startTileXYZ, this.ember.playerContainer.rexChess.tileXYZ);

    yield this.fireWeapon.perform(this, weapon, startTileXYZ, radian);
      // yield this.fireWeapon.perform(this, weapon,  startPoint, targetPoint);
    // }
  }

  // pushAgentWaypointToMoveQueue() {
  //   debugger;
  //   const nextTargetTile = this.getNextTargetTile();
  //   const tileXYArrayPath = this.pathFinder.findPath(nextTargetTile);
  //   console.error('pushAgentWaypointToMoveQueue', nextTargetTile, tileXYArrayPath)
  //
  //   this.showMovingPath(tileXYArrayPath)
  //
  //   // tileXYArrayPath.forEach((tile) => {
  //   //   const moveQueueId = v4();
  //   //   const moveObject = {
  //   //     agent: this,
  //   //     tile: tile,
  //   //     uuid: moveQueueId,
  //   //     finishedCallback: () => {
  //   //       console.log('in finishedCallback')
  //   //       this.pushAgentWaypointToMoveQueue();
  //   //     }
  //   //   }
  //   //   this.moveQueue.push(moveObject);
  //   // })
  //
  //   const moveQueueId = v4();
  //   this.moveQueueId = moveQueueId;
  //   let moveObject = {
  //     agent: this,
  //     path: tileXYArrayPath,
  //     uuid: moveQueueId,
  //     finishedCallback: () => {
  //       console.log('in finishedCallback')
  //       this.pushAgentWaypointToMoveQueue();
  //     }
  //   }
  //   this.moveQueue.push(moveObject);
  //   console.log('moveObject', moveObject)
  //
  // }

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
    // console.log('patrol task')
    while (this.patrolEnabled === true) {

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
      yield timeout(this.patrol.timeout);
    }


  }

  removeAgentFromMoveQueue(agent) {
    // console.log('removeAgentFromMoveQueue', this.moveQueue);
    this.moveQueue = this.moveQueue.reject((thisAgent) => {
      // console.log('remove agent', thisAgent);
      return agent.moveQueueId === thisAgent.uuid;
      // return thisAgent.name = agent.name;
    });
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
    if (this.agentState !== this.ember.constants.AGENTSTATE.PATROL) {
      this.agentState = this.ember.constants.AGENTSTATE.PATROL;
      if (isPresent(this.patrol.tiles.length) > 0) {

        this.moveQueue = {path:[]};
        this.populatePatrolMoveQueue();
        // this.pushAgentWaypointToMoveQueue();
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
