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

  moveToComplete(/*transport, moveTo*/) {
    // console.log('moved transport')
  }

}
