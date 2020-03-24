import Component from '@glimmer/component';
import {action} from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { constants } from 'emberquest/services/constants';

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

  items = undefined;

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
        // item.unlockText = 'Buy';
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
    console.log('equip', item);
    const equippedSlotItem = this.inventory.getEquippedSlot(this.game.gameManager.player.container.agent, item);
    if ( ! equippedSlotItem) {
      this.game.gameManager.player.container.agent.equipItem(item);
      await this.game.gameManager.saveSceneData();
    } else {
      console.log('slot full')
    }
    // item.equipped = true;
  }

  @action
  async unequip(item) {
    console.log('unequip', item);
    this.game.gameManager.player.container.agent.unequipItem(item);
    await this.game.gameManager.saveSceneData();
  }

  @action
  unlockItem(item) {
    if (item.price <= this.game.gameManager.player.gold) {
      if (item.confirmUnlock === true) {
        // console.log('buy')
          this.inventory.buyInventory(item);
          item.owned = true;
      } else {
        // console.log('confirm', item.confirmUnlock)
        // item.unlockText ='Confirm';
        item.confirmUnlock = true;
      }
    } else {
      console.log('cant buy')
    }
  }

  // @action
  // showCodeExample(item) {
  //   console.log('code example', item);
  //   // this.close(item)
  //   this.game.closeCurrentAndOpenNewModal(item);
  // }
}
