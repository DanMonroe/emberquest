import BasePhaserAgent from "../base-phaser-agent";

export default class PhaserAgent extends BasePhaserAgent {

  constructor(scene, config) {
    super(scene, config);

    this.setDepth(14);

  }
}
