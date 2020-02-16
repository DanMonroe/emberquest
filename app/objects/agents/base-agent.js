import { tracked } from '@glimmer/tracking';

export class BaseAgent {

  @tracked maxHealth;
  @tracked health;
  @tracked maxPower;
  @tracked power;
  @tracked healingSpeed;
  @tracked healingPower;
  @tracked energizeSpeed = 2000;
  @tracked energizePower = 2;


  constructor(scene, config) {
    console.log('in base-agent constructor', scene, config)

    this.scene = scene;
    this.board = scene.board;
    this.ember = this.scene.emberGame;
    // this.ember = this.scene.game.emberGame;
    // this.containerType = this.scene.game.emberGame.constants.SHAPE_TYPE_PLAYER;

    this.id = config.id;

    this.health = config.health || 10;
    this.maxHealth = config.maxHealth || 10;
    this.power = config.power || 10;
    this.maxPower = config.maxPower || 10;
    this.healingSpeed = config.healingSpeed || 10;  // how fast they heal
    this.healingPower = config.healingPower || 10;  // how much they heal each time
    this.energizeSpeed = config.energizeSpeed || 10;// how fast they recharge power
    this.energizePower = config.energizePower || 10;// how much power they recharge each time

    // this.attackAudio = config.attackAudio;


  }
}
