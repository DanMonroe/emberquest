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

    this.loadInventory();
  }

  loadInventory() {
    let inventoryItems = this.ember.inventory.getInventoryItems();

    if (this.playerConfig.storedPlayerAttrs && this.playerConfig.storedPlayerAttrs.inventory) {
      this.playerConfig.storedPlayerAttrs.inventory.forEach(storedInventoryItem => {
        // console.log('stored item', storedInventoryItem);
        const gameInventoryItem = inventoryItems.findBy('id', storedInventoryItem.id);
        // console.log('gameInventoryItem', gameInventoryItem);
        if (gameInventoryItem) {
          gameInventoryItem.owned = true;
          if (storedInventoryItem.eq) {
            this.equipItem(gameInventoryItem);
          }
          this.inventory.pushObject(gameInventoryItem);
        }
      })
    }
  }
}
