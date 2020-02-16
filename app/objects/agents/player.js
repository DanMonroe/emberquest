import { BaseAgent } from './base-agent';
import PlayerContainer from "../../phaser/agents/player/playerContainer";
import { v4 } from "ember-uuid";

export class Player extends BaseAgent {

  constructor(scene, config) {
    console.log('in player obj')
    super(scene, config);

    let uuid = v4();
    this.id = `player-${uuid}`;

    this.container = new PlayerContainer(scene, config);
    this.playerConfig = config;

    // scene.board.addChess(this.container, config.playerX, config.playerY, this.constants.TILEZ_PLAYER);


    // let player = args.player;
    // this.game = args.game;
    // this.maxHealth = args.maxHealth;
    // this.health = args.health;
    // this.maxPower = args.maxPower;
    // this.power = args.power;

  }
}
