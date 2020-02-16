import BasePhaserAgent from "../base-phaser-agent";

export default class Player extends BasePhaserAgent {

  constructor(scene, config) {
    super(scene, config);

    this.setDepth(15);

    // add the player to our existing scene
    scene.add.existing(this);

  }

}
