import { BaseAgent } from './base-agent';
import TransportContainer from "../../phaser/agents/transport/transportContainer";

export class Transport extends BaseAgent {

  constructor(scene, config) {
    super(scene, config);

    let transportContainer = new TransportContainer(scene, config);

    this.container = transportContainer

  }
}
