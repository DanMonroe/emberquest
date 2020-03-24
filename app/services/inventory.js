import Service from '@ember/service';
import { inject as service } from '@ember/service';
import {InventoryItems} from '../models/data/inventory';
import { tracked } from '@glimmer/tracking';

export default class InventoryService extends Service {

  @service game;
  @service gameManager;

  @tracked inventoryItems = undefined;

  getInventoryItems() {
    if (this.inventoryItems === undefined) {
      this.inventoryItems =  new InventoryItems().data;
    }
    return this.inventoryItems;
  }

  buyInventory(item) {
    console.log('buy inventory', item);
    this.gameManager.player.gold -= item.price;
    this.gameManager.player.container.agent.addInventory(item);
    this.gameManager.saveSceneData();
  }

  // check to see if agent already has something equipped in the items slot
  getEquippedSlot(agent, item) {
    return agent.equippedSlot[item.bodypart];
  }

}
