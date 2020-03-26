import Service from '@ember/service';
import { inject as service } from '@ember/service';
import {InventoryItems} from '../models/data/inventory';
import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';

export default class InventoryService extends Service {

  @service game;
  @service gameManager;

  @tracked inventoryItems = undefined;

  constants = constants;

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

  getBodyPartDescription(bodyPart) {
    switch (bodyPart) {
      case this.constants.INVENTORY.BODYPART.BODY:
        return 'torso';
      case this.constants.INVENTORY.BODYPART.FEET:
        return 'feet';
      case this.constants.INVENTORY.BODYPART.HEAD:
        return 'head';
      case this.constants.INVENTORY.BODYPART.ARMS:
        return 'arms';
      case this.constants.INVENTORY.BODYPART.LEFT_HAND:
        return 'left hand';
      case this.constants.INVENTORY.BODYPART.RIGHT_HAND:
        return 'right hand';
      case this.constants.INVENTORY.BODYPART.NECK:
        return 'neck';
      case this.constants.INVENTORY.BODYPART.FINGERS:
        return 'fingers';
      case this.constants.INVENTORY.BODYPART.GLOVES:
        return 'gloves';
      default:
        return '';
    }
  }

}
