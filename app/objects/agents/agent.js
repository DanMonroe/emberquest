import { BaseAgent } from './base-agent';
import AgentContainer from "../../phaser/agents/agent/agentContainer"
import {isPresent} from '@ember/utils';

export class Agent extends BaseAgent {

  constructor(scene, config) {
    super(scene, config);

    let agentContainer = new AgentContainer(scene, config, this);
    this.container = agentContainer;
    this.playerConfig = config;

    this.loadInventory();
  }

  loadInventory() {
    let inventoryItems = this.ember.inventory.getInventoryItems();
    this.playerConfig.inventory.forEach(bodypart => {
      if (isPresent(bodypart.items)) {
        const item = this.pickRandomItem(bodypart.items);

        const gameInventoryItem = inventoryItems.findBy('id', item.itemId);


        if (gameInventoryItem) {
          // gameInventoryItem.owned = true;
          // if (storedInventoryItem.eq) {
            this.equipItem(gameInventoryItem);
          // }
          this.inventory.pushObject(gameInventoryItem);
        }
      }
    });
  }

  pickRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

}
