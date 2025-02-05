import Service from '@ember/service';
import { inject as service } from '@ember/service';
import {InventoryItems} from '../models/data/inventory';
import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';
import { InventoryItem } from 'emberquest/objects/models/inventory-item';
import { Stat } from 'emberquest/objects/models/stat';

export default class InventoryService extends Service {

  @service game;
  @service gameManager;

  @tracked inventoryItems = undefined;

  constants = constants;

  fists = new InventoryItem({
    id: 8675309,
    type: constants.INVENTORY.TYPE.WEAPON,
    bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
    name: 'Fists',
    stats: [
      new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 1}),
      new Stat({type: constants.INVENTORY.STATS.POWER, value: 2}),
      new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: .5})
    ]
  });

  getInventoryItems() {
    if (this.inventoryItems === undefined) {
      this.inventoryItems =  new InventoryItems().data;
    }
    return this.inventoryItems;
  }

  getInventoryAnimations() {
      let anims = [];
      let itemsWithAnimations = this.getInventoryItems().filter(inventoryItem => {
        return inventoryItem.animeframes && inventoryItem.animeframes.length > 0;
      });
      itemsWithAnimations.forEach(item => {
        item.animeframes.forEach(animConfig => {
          // console.log('animConfig', animConfig)
          anims.push(animConfig);
        })
      })
      return anims;
  }

  getItemById(id) {
    let item = this.getInventoryItems().find(inventoryItem => {
      return inventoryItem.id === id;
    });
    return item;
  }

  addInventoryFromChest(item) {
    item.owned = true;
    item.display = true;
    this.gameManager.player.container.agent.addInventory(item);
  }

  buyInventory(item) {
      // console.log('buy inventory', item);
    this.gameManager.player.gold -= item.price;
    this.gameManager.player.container.agent.addInventory(item);
    this.gameManager.saveSceneData();
  }

  // check to see if agent already has something equipped in the items slot
  getEquippedSlot(agent, bodyPart) {
    return agent.equippedSlot[bodyPart];
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

  hasRoyalEmber(inventoryToCheck) {
    if (inventoryToCheck) {  // used to check inventory before player has been created
      return inventoryToCheck.findBy('id', this.constants.INVENTORY.ROYAL_EMBER_ID)
    } else {
      const royalEmber = this.getItemById(this.constants.INVENTORY.ROYAL_EMBER_ID);
      return royalEmber && royalEmber.owned
    }
  }

}
