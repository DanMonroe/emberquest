import { BaseAgent } from './base-agent';
import TransportContainer from "../../phaser/agents/transport/transportContainer";
import {isPresent} from '@ember/utils';

export class Transport extends BaseAgent {

  constructor(scene, config) {
    super(scene, config);

    let transportContainer = new TransportContainer(scene, config, this);

    this.container = transportContainer;
    this.playerConfig = config;

    this.loadInventory();
  }

  loadInventory() {
    let inventoryItems = this.ember.inventory.getInventoryItems();
    this.playerConfig?.inventory?.forEach(bodypart => {
      if (isPresent(bodypart.items)) {
        bodypart.items.forEach(item => {
          const gameInventoryItem = inventoryItems.findBy('id', item.itemId);
          if (gameInventoryItem) {
            this.equipItem(gameInventoryItem);
            this.inventory.pushObject(gameInventoryItem);
          }
        });
      }
    });
  }

}
