import Component from '@glimmer/component';
import {action} from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { constants } from 'emberquest/services/constants';
import Confirmer from 'confirmed';

export default class InventoryDialogComponent extends Component {
  tagName = '';

  @service game;
  @service inventory;
  @service modals;

  @tracked currentNavCategory = this.leftNavItems[0];
  @tracked itemSelected = null;

  @tracked inventoryItems;

  @tracked showToggleablePopover = false;
  @tracked popoverTarget = '';

  @tracked swapEquipmentConfirmer = null;
  @tracked swapEquipmentMessage;
  @tracked swapEquipmentMessage2;

  items = undefined;

  @tracked showDialogTest = false;

  constructor() {
    super(...arguments);
    this.inventoryItems = this.inventory.getInventoryItems();
    // this.inventoryItems = this.modals.top._data;
    this.resetAllToUnlock();
    this.itemSelected = this.filteredItems[0];
  }

  // @computed
  get leftNavItems() {
    return [
      {
        text: 'Weapons',
        img: '/images/icons/item-icon-primary.png',
        category: constants.INVENTORY.TYPE.WEAPON
      },
      {
        text: 'Armor',
        img: '/images/icons/item-icon-armor.png',
        category: constants.INVENTORY.TYPE.ARMOR
      },
      {
        text: 'Other',
        img: '/images/icons/item-icon-accessories.png',
        category: constants.INVENTORY.TYPE.OTHER
      // },
      // {
      //   text: 'Tomes',
      //   img: '/images/icons/item-icon-books.png',
      //   category: constants.INVENTORY.TYPE.
      }
    ];
  }

  resetAllToUnlock() {
    if (this.inventoryItems) {
      this.inventoryItems.forEach(item => {
        item.confirmUnlock = false;
      });
    }
  }

  // @computed('inventoryItems', 'currentNavCategory')
  get filteredItems() {
    const filteredByCategory = this.inventoryItems.filterBy('type', this.currentNavCategory.category);
    return filteredByCategory.sortBy('listorder');
  }

  @action
  pickCategory(category) {
    this.currentNavCategory = category;
    this.resetAllToUnlock();
    this.itemSelected = this.filteredItems[0];
  }

  @action
  selectItem(item) {
    this.itemSelected = item;
  }

  @action
  async equip(item) {
    const equippedSlotItem = this.inventory.getEquippedSlot(this.game.gameManager.player.container.agent, item);
    if ( ! equippedSlotItem) {
      this.game.gameManager.player.container.agent.equipItem(item);
      await this.game.gameManager.saveSceneData();
    } else {

    this.swapEquipmentMessage = `You already have ${equippedSlotItem.name} equipped for your ${this.inventory.getBodyPartDescription(equippedSlotItem.bodypart)}.`;
    this.swapEquipmentMessage2 = `Do you want to exchange it with ${item.name}?`;

      new Confirmer(swapEquipmentConfirmer => this.swapEquipmentConfirmer = swapEquipmentConfirmer)
        .onConfirmed(async () => {
          this.game.gameManager.player.container.agent.unequipItem(equippedSlotItem);
          this.game.gameManager.player.container.agent.equipItem(item);
          await this.game.gameManager.saveSceneData();
        })
        .onDone(() => {
          this.swapEquipmentConfirmer = null
        });
    }
    // item.equipped = true;
  }

  @action
  async unequip(item) {
    this.game.gameManager.player.container.agent.unequipItem(item);
    await this.game.gameManager.saveSceneData();
  }

  @action
  unlockItem(item) {
    if (item.price <= this.game.gameManager.player.gold) {
      if (item.confirmUnlock === true) {
          this.inventory.buyInventory(item);
          item.owned = true;
      } else {
        item.confirmUnlock = true;
      }
    } else {
      console.log('cant buy')
    }
  }

}
