import { BaseAgent } from './base-agent';
import AgentContainer from "../../phaser/agents/agent/agentContainer"
import PhaserAgent from "../../phaser/agents/agent/phaser-agent";

export class Agent extends BaseAgent {

  constructor(scene, config) {
    super(scene, config);

    let agentContainer = new AgentContainer(scene, config, this);

    // debugger;
    // agentContainer.phaserAgentSprite = new PhaserAgent(scene, config);

    // const agentSprite = scene.add.sprite(0,0,config.texture);

    // agentContainer.add(this.phaserAgentSprite);

    // agentContainer.add(agentSprite);

    // scene.anims.create({
    //   key: 'young-ogre-rest',
    //   frames: scene.anims.generateFrameNumbers('young-ogre', { start: 1, end: 4}),
    //   frameRate: 3,
    //   repeat: -1,
    // });

    // agentSprite.anims.play('young-ogre-rest');


    this.container = agentContainer;
  }
}
