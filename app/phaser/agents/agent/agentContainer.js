import BasePhaserAgentContainer from "../base-phaser-agent-container";
import Agent from './agent';

export default class AgentContainer extends BasePhaserAgentContainer {

  constructor(scene, config) {
    super(scene, config);

    this.containerType = this.ember.constants.SHAPE_TYPE_AGENT;

    this.agent = new Agent(this.scene, config);

    this.add(this.agent);

  }

}
