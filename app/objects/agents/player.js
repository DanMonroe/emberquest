import { BaseAgent } from './base-agent';
import PlayerContainer from "../../phaser/agents/player/playerContainer";
import { v4 } from "ember-uuid";

export class Player extends BaseAgent {

  constructor(scene, config) {
    super(scene, config);

    let uuid = v4();
    this.id = `player-${uuid}`;

    this.container = new PlayerContainer(scene, config, this);
    this.playerConfig = config;
  }
}
