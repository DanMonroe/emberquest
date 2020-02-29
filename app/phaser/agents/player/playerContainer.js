// import Phaser from 'phaser';
import Player from "./player";
import BasePhaserAgentContainer from "../base-phaser-agent-container";
import {tracked} from '@glimmer/tracking';

export default class PlayerContainer extends BasePhaserAgentContainer {

  // scene = undefined;
  // ember = undefined;

// @tracked maxHealth;
// @tracked health;
// @tracked maxPower;
// @tracked power;
// @tracked healingSpeed = 3000;
// @tracked healingPower = 2;
// @tracked energizeSpeed = 2000;
// @tracked energizePower = 2;
  @tracked boardedTransport;


  // @task
  // *reloadPower() {
  //   while (this.power < this.maxPower) {
  //     // console.log('reloadPower')
  //     yield timeout(this.energizeSpeed);
  //     this.power += Math.max(1, this.energizePower);
  //   }
  // }

  constructor(scene, config) {

    config.showPowerBar = true;

    super(scene, config);

    // super(scene, config.playerX, config.playerY);

    this.scene = scene;
    this.board = scene.board;
    this.ember = this.scene.game.ember;
    this.containerType = this.scene.game.ember.constants.SHAPE_TYPE_PLAYER;

    this.id = config.id;
    this.playerAttacking = false;
    // this.flipX = true;
    // this.swordHit = false;
    this.health = config.health || 5;
    this.maxHealth = config.maxHealth;
    this.power = config.power;
    this.maxPower = config.maxPower;
    this.attackAudio = config.attackAudio;

    this.showPowerBar = true;
    // this.healingSpeed = 1000;
    // this.healingPower = 3;

    this.cachedHealthPercentage = 0;

    // set a size on the container
    this.setSize(config.textureSize.width, config.textureSize.height);

    // enable physics
    this.scene.physics.world.enable(this);

    // collide with world bounds
    //
    // Setting this to tr prevents the player from completing
    // a move to the outer edges of the map (causing endless loop)
    // and then they get stuck and can't move away from the edge.
    //
    // this.body.setCollideWorldBounds(true);

    // add the player container to our existing scene
    this.scene.add.existing(this);

    // have the camera follow the player
    this.scene.cameras.main.startFollow(this);


    // create the player
    this.player = new Player(this.scene, config);
    // this.player = new Player(this.scene, 0, 0, key, frame);
    this.add(this.player);

    // // create the weapon game object
    // this.weapon = this.scene.add.image(40, 0, 'items', 4);
    // this.scene.add.existing(this.weapon);
    // this.weapon.setScale(1.5);
    // this.scene.physics.world.enable(this.weapon);
    // this.add(this.weapon);
    // this.weapon.alpha = 0;

    this.moveToObject = this.scene.rexBoard.add.moveTo(this, {
      speed: config.speed, // 400 default
    });

    this.moveToObject.on('complete', this.moveToComplete);

    this.moveToObject.moveableTestCallback = (curTile, targetTile, pathFinder) => {

// TODO  Take this out or the player can move anywhere
// return true;

      if (this.moveToObject.isRunning || this.power <= 1) {
        return false;
      }

      const allattrs = this.ember.map.getTileAttribute(pathFinder.scene, targetTile);
      let canMove = this.ember.playerHasAbilityFlag(pathFinder.scene.player.container, this.ember.constants.FLAG_TYPE_TRAVEL, allattrs.travelFlags);

      if (!canMove) {
        // console.log('cant move! targetTile', targetTile, 'travelFlags', allattrs.travelFlags, 'wesnoth', allattrs.wesnoth);

        // is there a transport at targetTile
        const currentTileIsDock = this.ember.map.tileIsDock(pathFinder.scene, curTile);
        if (currentTileIsDock) {
          canMove = this.ember.map.targetTileHasTransport(pathFinder.scene, targetTile);

        } else if (this.boardedTransport) {
          // already on board a transport.. is target tile a dock?
          const targetTileIsDock = this.ember.map.tileIsDock(pathFinder.scene, targetTile);
          if (targetTileIsDock) {
            this.disembarkTransport = true;

            canMove = true;
          }
        }
      } else if ( ! this.boardedTransport) {  // don't adjust speed/power when on a transport

        this.moveToObject.setSpeed(config.speed * allattrs.speedCost);

        this.power -= (2 - allattrs.speedCost);

        // if (this.power <= 2) {
        //   console.log('No power to move!')
        //   canMove = false;
        // }
      }

      return canMove;

    };

    // add behaviors
    this.pathFinder = this.scene.rexBoard.add.pathFinder(this, {
      occupiedTest: true,
      pathMode: 'A*',
      blockerTest: true,
      costCallback: (curTile, targetTile, pathFinder) => {
        // pathFinder.gameObject is 'this'  i.e., this Player object
        const travelFlags = this.ember.map.getTileAttribute(pathFinder.chessData.board.scene, targetTile, 'travelFlags');
        console.error('pathFinder costCallback', curTile, targetTile, pathFinder, travelFlags);

        return travelFlags ? 100 : 0;
        // return travelFlags ? fov.BLOCKER : 0;
        // return (board.tileXYZToChess(tileXY.x, tileXY.y, 0)) ? fov.BLOCKER : 0;
      },

    });

    this.sightRange = config.sightRange;   // this is sight/movement Range
    this.movingPoints = config.movingPoints;   // this is sight/movement Range
    this.visiblePoints = config.visiblePoints;   // this is sight/movement Range

    this.setData('attrs', config.flagAttributes);

    this.ember.playerContainer = this;
    // this.setDepth(15);

    this.createHealthBar();
    this.reloadHealth.perform();
    this.reloadPower.perform();
  }

  update(cursors) {
    if (!this.ember.gameManager.gamePaused) {
      this.moveTo(cursors);
      this.baseUpdate();
    }
  }

  createHealthBar() {
    this.healthBar = this.scene.add.graphics();
    this.powerBar = this.scene.add.graphics();
    this.updateHealthBar();
  }

  updateHealthBar() {
    const healthPercentage = (this.health / this.maxHealth);
    this.healthBar.clear();
    this.healthBar.fillStyle(0xffffff, 0.4);
    this.healthBar.fillRect(this.x + this.ember.constants.healthBarOffsetX, this.y + this.ember.constants.healthBarOffsetY, this.ember.constants.healthBarWidth, this.ember.constants.healthBarHeight);
    this.healthBar.fillStyle(healthPercentage <= this.ember.constants.healthBarColorTippingPoint ? this.ember.constants.healthBarColorDanger : this.ember.constants.healthBarColorGood, 1);
    this.healthBar.fillRect(this.x + this.ember.constants.healthBarOffsetX, this.y + this.ember.constants.healthBarOffsetY, this.ember.constants.healthBarWidth * healthPercentage, this.ember.constants.healthBarHeight);

    const powerPercentage = (this.power / this.maxPower);
    this.powerBar.clear();
    this.powerBar.fillStyle(0xffffff, 0.4);
    this.powerBar.fillRect(this.x + this.ember.constants.powerBarOffsetX, this.y + this.ember.constants.powerBarOffsetY, this.ember.constants.powerBarWidth, this.ember.constants.powerBarHeight);
    this.powerBar.fillStyle(this.ember.constants.powerBarColor, 1);
    this.powerBar.fillRect(this.x + this.ember.constants.powerBarOffsetX, this.y + this.ember.constants.powerBarOffsetY, this.ember.constants.powerBarWidth * powerPercentage, this.ember.constants.powerBarHeight);
  }

  updateHealth(health, power) {
    this.health = health;
    this.power = power;
    this.updateHealthBar();
  }


  moveTo(cursors) {

    if (!this.moveToObject.isRunning) {

      if (cursors.D.isDown) {
        this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.SE);
        if (this.boardedTransport) {
          this.boardedTransport.moveToObject.moveToward(this.ember.constants.DIRECTIONS.SE);
        }
      } else if (cursors.S.isDown) {
        this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.S);
        if (this.boardedTransport) {
          this.boardedTransport.moveToObject.moveToward(this.ember.constants.DIRECTIONS.S);
        }
      } else if (cursors.A.isDown) {
        this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.SW);
        if (this.boardedTransport) {
          this.boardedTransport.moveToObject.moveToward(this.ember.constants.DIRECTIONS.SW);
        }
      } else if (cursors.Q.isDown) {
        this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.NW);
        if (this.boardedTransport) {
          this.boardedTransport.moveToObject.moveToward(this.ember.constants.DIRECTIONS.NW);
        }
      } else if (cursors.W.isDown) {
        this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.N);
        if (this.boardedTransport) {
          this.boardedTransport.moveToObject.moveToward(this.ember.constants.DIRECTIONS.N);
        }
      } else if (cursors.E.isDown) {
        this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.NE);
        if (this.boardedTransport) {
          this.boardedTransport.moveToObject.moveToward(this.ember.constants.DIRECTIONS.NE);
        }
      }
    }
  }

  moveToComplete(playerContainer, moveTo) {
    // console.log('move complete');
    moveTo.scene.game.ember.saveSceneData(moveTo.scene);
    moveTo.scene.game.ember.saveGameData("playerTile", playerContainer.rexChess.tileXYZ);
    moveTo.scene.game.ember.map.findFOV(playerContainer);
    moveTo.scene.game.ember.processPlayerMove(playerContainer);
  }



}
