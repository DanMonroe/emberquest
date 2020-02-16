import { BaseAgent } from './base-agent';
// import PlayerContainer from "../phaser/agents/player/playerContainer";
import TransportContainer from "../../phaser/agents/transport/transportContainer";

export class Transport extends BaseAgent {

  constructor(scene, config) {
    console.log('in transport obj')
    super(scene, config);

    let transportContainer = new TransportContainer(scene, config);

    this.container = transportContainer

    // let player = args.player;
    // this.game = args.game;
    // this.maxHealth = args.maxHealth;
    // this.health = args.health;
    // this.maxPower = args.maxPower;
    // this.power = args.power;

  }
}
