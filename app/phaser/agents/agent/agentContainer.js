import BasePhaserAgentContainer from "../base-phaser-agent-container";
import Agent from './agent';
import {task} from "ember-concurrency-decorators";
import {timeout} from "ember-concurrency";
import {tracked} from '@glimmer/tracking';
import { v4 } from "ember-uuid";

export default class AgentContainer extends BasePhaserAgentContainer {

  currentTargetTileCounter = -1;
  @tracked moveQueue = [];
  @tracked patrolEnabled = true;

  constructor(scene, config) {
    super(scene, config);

    this.containerType = this.ember.constants.SHAPE_TYPE_AGENT;

    this.agent = new Agent(this.scene, config);

    this.patrol = config.patrol;
    this.setData('attrs', config.flagAttributes);

    this.add(this.agent);

    this.moveToObject = scene.rexBoard.add.moveTo(this, {
      speed: config.speed
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
      // occupiedTest: true,
      pathMode: 'A*',
      // blockerTest: true,
      costCallback: (curTile, targetTile, pathFinder) => {
        const travelFlags = this.ember.map.getTileAttribute(pathFinder.chessData.board.scene, targetTile, 'travelFlags');
        const canMove = this.ember.playerHasAbilityFlag(this, this.ember.constants.FLAG_TYPE_TRAVEL, travelFlags);

        return canMove ? 1 : undefined; // undefined is a "blocker"
      },

    });

    this.createHealthBar();
    this.reloadHealth.perform();

  }

  update() {
    this.updateHealthBar();
  }

  moveToComplete() {
    const agentContainer = arguments[0];
    // console.log('moveToComplete', agentContainer, agentContainer.healthBar)
    // set visibility of agent after it moves.

    // TODO Seems like the health bar should also be set when the container is set??

    const isInLOS = agentContainer.ember.playerContainer.fov.isInLOS(agentContainer.rexChess.tileXYZ);

    agentContainer.setAlpha(isInLOS ?
      agentContainer.ember.constants.ALPHA_OBJECT_VISIBLE_TO_PLAYER :
      agentContainer.ember.constants.ALPHA_OBJECT_HIDDEN_TO_PLAYER);

    agentContainer.healthBar.setAlpha(isInLOS ?
      agentContainer.ember.constants.ALPHA_OBJECT_VISIBLE_TO_PLAYER :
      agentContainer.ember.constants.ALPHA_OBJECT_HIDDEN_TO_PLAYER);

  }

  pushAgentWaypointToMoveQueue() {

    const nextTargetTile = this.getNextTargetTile();
    // debugger;
    // const tileXYArrayPath = this.pathFinder.getPath(nextTargetTile);
    const tileXYArrayPath = this.pathFinder.findPath(nextTargetTile);

    // this.showMovingPath(tileXYArrayPath)

    let moveObject = {
      agent: this,
      path: tileXYArrayPath,
      uuid: v4(),
      finishedCallback: () => {
        this.pushAgentWaypointToMoveQueue();
      }
    }
    this.moveQueue.push(moveObject);
    // console.log('moveObject', moveObject)

  }

  @task
  *patrolTask() {
    // console.log('in moveQueue', this.moveQueueEnabled);
    while (this.patrolEnabled === true) {

      // console.log('this.moveQueue.length', this.moveQueue.length)
      // if there are things to move
      if (this.moveQueue.length > 0) {

        this.moveQueue.forEach((moveObject) => {
          // is there anywhere for this object to go?
          if (moveObject.path.length > 0) {

            // grab the next waypoint
            let firstMove = moveObject.path[0]
// console.log('firstMove', firstMove)
            // attempt the move
            this.moveToObject.moveTo(firstMove.x, firstMove.y);

            // we're done, remove it from the list of waypoints to go to
            moveObject.path.shift();

          } else {
            // no moves left for this object
            if (typeof moveObject.finishedCallback === 'function') {
              moveObject.finishedCallback();
            }

            // remove the object from the global move list
            this.moveQueue = this.moveQueue.filter(obj => obj.uuid !== moveObject.uuid);

          }
        });

      } else {
        // console.log('waiting....');
      }

      yield timeout(this.patrol.timeout);

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
