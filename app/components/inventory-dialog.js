import Component from '@glimmer/component';
import {action} from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

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

    this.inventoryItems = this.modals.top._data;
    this.resetAllToUnlock();
    this.itemSelected = this.filteredItems[0];
  }

  // @computed
  get leftNavItems() {
    return [
      {
        text: 'Weapons',
        img: '/images/icons/item-icon-primary.png',
        category: 'weapon'
      },
      {
        text: 'Armor',
        img: '/images/icons/item-icon-armor.png',
        category: 'armor'
      },
      {
        text: 'Other',
        img: '/images/icons/item-icon-accessories.png',
        category: 'other'
      },
      {
        text: 'Tomes',
        img: '/images/icons/item-icon-books.png',
        category: 'tome'
      }
    ];
  }

  resetAllToUnlock() {
    if (this.items) {
      this.items.forEach(item => {
        item.unlockText = 'Buy';
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
    // console.log(item);
    if(this.itemSelected) {
      this.itemSelected.confirmUnlock = false;
      // this.itemSelected.set('unlockText','Unlock');
    };
    this.itemSelected = item;
  }

  @action
  unlockItem(item) {
    if (item.price <= this.game.gameManager.player.playerCoins) {
      if (item.confirmUnlock) {
          this.inventory.buyInventory(item);
          item.owned = true;
      } else {
        item.unlockText ='Confirm';
        item.confirmUnlock = true;
      }
    } else {
      console.log('cant buy')
    }
  }

  @action
  showCodeExample(item) {
    console.log('code example', item);
    // this.close()
    this.game.closeCurrentAndOpenNewModal(item);
  }
}
