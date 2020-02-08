import Phaser from 'phaser';
import Player from "./player";

export default class PlayerContainer extends Phaser.GameObjects.Container {

  scene = undefined;
  ember = undefined;

  constructor(scene, config) {

    // constructor(scene, x, y, key, frame, health, maxHealth, id, attackAudio) {
    // super(scene, config.playerX, config.playerY, config.texture);
    super(scene, 0, 0);
    // super(scene, config.playerX, config.playerY);

    this.scene = scene;
    this.board = scene.board;
    this.ember = this.scene.game.emberGame;

    this.id = config.id;
    this.playerAttacking = false;
    // this.flipX = true;
    // this.swordHit = false;
    this.health = config.health;
    this.maxHealth = config.maxHealth;
    this.power = config.power;
    this.maxPower = config.maxPower;
    this.attackAudio = config.attackAudio;

    this.cachedHealthPercentage = 0;

    // set a size on the container
    this.setSize(42, 42);

    // enable physics
    this.scene.physics.world.enable(this);

    // collide with world bounds
    this.body.setCollideWorldBounds(true);

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

    this.moveToObject.moveableTestCallback = (curTile, preTile, pathFinder) => {
      if (this.moveToObject.isRunning) {
        return false;
      }

      const allattrs = this.ember.map.getTileAttribute(pathFinder.scene, preTile);
      const canMove = this.ember.playerHasAbilityFlag(pathFinder.scene.player, this.ember.constants.FLAG_TYPE_TRAVEL, allattrs.travelFlags);

      if (!canMove) {
        // console.log('cant move! preTile', preTile, 'travelFlags', allattrs.travelFlags, 'wesnoth', allattrs.wesnoth);
      } else {
        // console.log('speed', config.speed * allattrs.speedCost)
        this.moveToObject.setSpeed(config.speed * allattrs.speedCost)
      }

      // return true;
      return canMove;

    };

    // add behaviors
    this.pathFinder = this.scene.rexBoard.add.pathFinder(this, {
      occupiedTest: true,
      pathMode: 'A*',
      blockerTest: true,
      costCallback: (curTile, preTile, pathFinder) => {
        // pathFinder.gameObject is 'this'  i.e., this Player object
        const travelFlags = this.ember.map.getTileAttribute(pathFinder.chessData.board.scene, preTile, 'travelFlags');
        console.log('pathFinder costCallback', curTile, preTile, pathFinder, travelFlags);

        return travelFlags ? 100 : 0;
        // return travelFlags ? fov.BLOCKER : 0;
        // return (board.tileXYZToChess(tileXY.x, tileXY.y, 0)) ? fov.BLOCKER : 0;
      },

    });

    this.sightRange = config.sightRange;   // this is sight/movement Range
    this.movingPoints = config.movingPoints;   // this is sight/movement Range
    this.visiblePoints = config.visiblePoints;   // this is sight/movement Range


    this.setData('attrs', config.flagAttributes);

    // this.setScale(config.scale);

    // this.setDepth(15);

    this.createHealthBar();
  }

  update(cursors) {
    // console.log('player update');
    this.moveTo(cursors);
    this.updateHealthBar();
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
    this.healthBar.fillStyle(healthPercentage <- this.ember.constants.healthBarColorTippingPoint ? this.ember.constants.healthBarColorDanger : this.ember.constants.healthBarColorGood, 1);
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
        // this.showMoveableArea();
      } else if (cursors.S.isDown) {
        this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.S);
        // this.showMoveableArea();
      } else if (cursors.A.isDown) {
        this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.SW);
        // this.showMoveableArea();
      } else if (cursors.Q.isDown) {
        this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.NW);
        // this.showMoveableArea();
      } else if (cursors.W.isDown) {
        this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.N);
        // this.showMoveableArea();
      } else if (cursors.E.isDown) {
        this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.NE);
        // this.showMoveableArea();
      }
    }
  }

  moveToComplete(player, moveTo) {
    moveTo.scene.game.emberGame.saveSceneData(moveTo.scene);
    moveTo.scene.game.emberGame.saveGameData("playerTile", player.rexChess.tileXYZ);
    moveTo.scene.game.emberGame.map.findFOV(player);
    moveTo.scene.game.emberGame.processPlayerMove(player);
  }

  moveToTileXY = (endTileXY) => {
    console.log('player moveToTileXY', endTileXY);
    if (this.moveToObject.isRunning) {
      return false;
    }
    const tileXYArray = this.pathFinder.findPath(endTileXY);
    console.log('tileXYArray', tileXYArray);

    this.showMovingPath(tileXYArray);
    this.moveAlongPath(tileXYArray);
    return true;
  }

  moveAlongPath = (path) => {
    if (path.length === 0) {
      this.showMoveableArea();
      return;
    }

    this.moveToObject.once('complete', function () {
      this.moveAlongPath(path);
    }, this);
    this.moveToObject.moveTo(path.shift());
    return this;
  }

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

  // showMoveableArea = () => {
  //   this.hideMoveableArea();
  //   // console.log('this._movingPoints', this._movingPoints);
  //   var tileXYArray = this.pathFinder.findArea(this._movingPoints);
  //   for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
  //     this._markers.push(
  //       new MoveableMarker(this, tileXYArray[i])
  //     );
  //   }
  //   return this;
  // }
  //
  // hideMoveableArea = () => {
  //   for (var i = 0, cnt = this._markers.length; i < cnt; i++) {
  //     this._markers[i].destroy();
  //   }
  //   this._markers.length = 0;
  //   return this;
  // }

}
