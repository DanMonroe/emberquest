import { BaseAgent } from './base-agent';
import PlayerContainer from "../../phaser/agents/player/playerContainer";
import { v4 } from "ember-uuid";
import { tracked } from '@glimmer/tracking';

export class Player extends BaseAgent {

  @tracked playerCoins;

  constructor(scene, config) {
    super(scene, config);

    let uuid = v4();
    this.id = `player-${uuid}`;

    this.container = new PlayerContainer(scene, config);
    this.playerConfig = config;

    this.playerCoins = config.playerCoins;
  }
}
