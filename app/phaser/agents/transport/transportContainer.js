import TransportPhaserAgent from "./transport-phaser-agent";
import BasePhaserAgentContainer from "../base-phaser-agent-container";

export default class TransportContainer extends BasePhaserAgentContainer {
// export default class TransportContainer extends Phaser.GameObjects.Container {

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


  // @task
  // *reloadHealth() {
  //   while (this.health < this.maxHealth) {
  //     // console.log('reloadHealth')
  //     yield timeout(this.healingSpeed);
  //     this.health += Math.max(1, this.healingPower);
  //   }
  // }
  //
  // @task
  // *reloadPower() {
  //   while (this.power < this.maxPower) {
  //     // console.log('reloadPower')
  //     yield timeout(this.energizeSpeed);
  //     this.power += Math.max(1, this.energizePower);
  //   }
  // }

  constructor(scene, config, agent) {

    super(scene, config);
    this.containerType = this.scene.game.ember.constants.SHAPE_TYPE_TRANSPORT;


    // this.cachedHealthPercentage = 0;

    // create the tranport
    this.transport = new TransportPhaserAgent(this.scene, config);
    this.add(this.transport);

    this.agent = agent;
    this.phaserAgent = this.transport;

    this.moveToObject = this.scene.rexBoard.add.moveTo(this, {
      speed: config.speed, // 400 default
    });

    this.moveToObject.on('complete', this.moveToComplete);

    this.moveToObject.moveableTestCallback = (curTile, targetTile, pathFinder) => {
      // console.log('transport moveTo testCallback', curTile, targetTile, pathFinder.scene.player.container.rexChess.tileXYZ)

      const canMove = ( (pathFinder.scene.player.container.rexChess.tileXYZ.x === targetTile.x) &&
        (pathFinder.scene.player.container.rexChess.tileXYZ.y === targetTile.y) );

      if (this.ember.map.tileIsDock(pathFinder.scene, targetTile)) {
        return false;
      }
      // console.log('transport canMove', canMove);
      return canMove;

    };


    this.createHealthBar();
    this.reloadHealth.perform();
    this.reloadPower.perform();
  }

  // moveToComplete(transport, moveTo) {
  //   console.log('transport moveComplete', arguments)
  // }

  // update() {
  //   // console.log('player update');
  //   // this.moveTo(cursors);
  //   this.updateHealthBar();
  // }

  // createHealthBar() {
  //   this.healthBar = this.scene.add.graphics();
  //   this.powerBar = this.scene.add.graphics();
  //   this.updateHealthBar();
  // }
  //
  // updateHealthBar() {
  //   const healthPercentage = (this.health / this.maxHealth);
  //   this.healthBar.clear();
  //   this.healthBar.fillStyle(0xffffff, 0.4);
  //   this.healthBar.fillRect(this.x + this.ember.constants.healthBarOffsetX, this.y + this.ember.constants.healthBarOffsetY, this.ember.constants.healthBarWidth, this.ember.constants.healthBarHeight);
  //   this.healthBar.fillStyle(healthPercentage <= this.ember.constants.healthBarColorTippingPoint ? this.ember.constants.healthBarColorDanger : this.ember.constants.healthBarColorGood, 1);
  //   this.healthBar.fillRect(this.x + this.ember.constants.healthBarOffsetX, this.y + this.ember.constants.healthBarOffsetY, this.ember.constants.healthBarWidth * healthPercentage, this.ember.constants.healthBarHeight);
  //
  //   const powerPercentage = (this.power / this.maxPower);
  //   this.powerBar.clear();
  //   this.powerBar.fillStyle(0xffffff, 0.4);
  //   this.powerBar.fillRect(this.x + this.ember.constants.powerBarOffsetX, this.y + this.ember.constants.powerBarOffsetY, this.ember.constants.powerBarWidth, this.ember.constants.powerBarHeight);
  //   this.powerBar.fillStyle(this.ember.constants.powerBarColor, 1);
  //   this.powerBar.fillRect(this.x + this.ember.constants.powerBarOffsetX, this.y + this.ember.constants.powerBarOffsetY, this.ember.constants.powerBarWidth * powerPercentage, this.ember.constants.powerBarHeight);
  // }

  // updateHealth(health, power) {
  //   this.health = health;
  //   this.power = power;
  //   this.updateHealthBar();
  // }


  // moveTo(cursors) {
  //
  //   if (!this.moveToObject.isRunning) {
  //
  //     if (cursors.D.isDown) {
  //       this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.SE);
  //       // this.showMoveableArea();
  //     } else if (cursors.S.isDown) {
  //       this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.S);
  //       // this.showMoveableArea();
  //     } else if (cursors.A.isDown) {
  //       this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.SW);
  //       // this.showMoveableArea();
  //     } else if (cursors.Q.isDown) {
  //       this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.NW);
  //       // this.showMoveableArea();
  //     } else if (cursors.W.isDown) {
  //       this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.N);
  //       // this.showMoveableArea();
  //     } else if (cursors.E.isDown) {
  //       this.moveToObject.moveToward(this.ember.constants.DIRECTIONS.NE);
  //       // this.showMoveableArea();
  //     }
  //   }
  // }

  moveToComplete(transport, moveTo) {
    // console.log('moved transport')
    // moveTo.scene.game.emberGame.saveSceneData(moveTo.scene);
    // moveTo.scene.game.emberGame.saveGameData("transportTile", transport.rexChess.tileXYZ);
    // moveTo.scene.game.emberGame.map.findFOV(transport);
    // moveTo.scene.game.emberGame.processPlayerMove(transport);
  }

  // moveToTileXY = (endTileXY) => {
  //   console.log('transport moveToTileXY', endTileXY);
  //   if (this.moveToObject.isRunning) {
  //     return false;
  //   }
  //   const tileXYArray = this.pathFinder.findPath(endTileXY);
  //   console.log('tileXYArray', tileXYArray);
  //
  //   this.showMovingPath(tileXYArray);
  //   this.moveAlongPath(tileXYArray);
  //   return true;
  // }
  //
  // moveAlongPath = (path) => {
  //   if (path.length === 0) {
  //     this.showMoveableArea();
  //     return;
  //   }
  //
  //   this.moveToObject.once('complete', function () {
  //     this.moveAlongPath(path);
  //   }, this);
  //   this.moveToObject.moveTo(path.shift());
  //   return this;
  // }
  //
  // showMovingPath = (tileXYArray) => {
  //   this.hideMovingPath();
  //   var tileXY, worldXY;
  //   var scene = this.scene,
  //     board = this.rexChess.board;
  //   for (var i = 0, cnt = tileXYArray.length; i < cnt; i++) {
  //     tileXY = tileXYArray[i];
  //     worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
  //     var text = scene.add.text(worldXY.x, worldXY.y, tileXY.cost)
  //       .setOrigin(0.5);
  //     this._markers.push(text);
  //   }
  // }
  //
  // hideMovingPath = () => {
  //   for (var i = 0, cnt = this._markers.length; i < cnt; i++) {
  //     this._markers[i].destroy();
  //   }
  //   this._markers.length = 0;
  //   return this;
  // }

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
