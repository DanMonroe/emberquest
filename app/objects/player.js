import { BaseAgent } from './base-agent';
import { tracked } from '@glimmer/tracking';

export class Player extends BaseAgent {

  constructor(args) {
    super(...arguments);

    // let player = args.player;
    this.game = args.game;
    this.maxHealth = args.maxHealth;
    this.health = args.health;
    this.maxPower = args.maxPower;
    this.power = args.power;

  }
}
