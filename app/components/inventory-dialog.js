import Component from '@glimmer/component';
import {action} from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { constants } from 'emberquest/services/constants';
import { alias } from '@ember/object/computed';
import Confirmer from 'confirmed';

export default class InventoryDialogComponent extends Component {
  tagName = '';

  @service game;
  @service inventory;
  @service modals;

  @tracked currentNavCategory = this.leftNavItems[0];
  @tracked itemSelected = null;

  @tracked itemSlots = [];
  @tracked equippedItems = [];

  @tracked inventoryItems;

  @tracked showToggleablePopover = false;
  @tracked popoverTarget = '';

  @tracked swapEquipmentConfirmer = null;
  @tracked confirmClass;
  @tracked confirmHeader;
  @tracked confirmMessage;
  @tracked confirmMessage2;
  @tracked cancelText;
  @tracked confirmText;

  items = undefined;

  constants = constants;

  @tracked showDialogTest = false;

  @alias('game.gameManager.player') player;

  constructor() {
    super(...arguments);
    this.inventoryItems = this.inventory.getInventoryItems().filterBy('display', true);
    // this.inventoryItems = this.modals.top._data;
    this.resetAllToUnlock();
    this.itemSelected = this.filteredItems[0];
    this.setEquippedItems();
    this.setItemSlots();
  }

  // @computed
  get leftNavItems() {
    return [
      {
        text: 'Current Stats',
        // img: '/images/icons/item-icon-primary.png',
        clazz: 'stats',
        category: constants.INVENTORY.TYPE.STATS
      },
      {
        text: 'Weapons',
        img: '/images/icons/item-icon-primary.png',
        clazz: 'weapon',
        category: constants.INVENTORY.TYPE.WEAPON
      },
      {
        text: 'Armor',
        img: '/images/icons/item-icon-armor.png',
        clazz: 'armor',
        category: constants.INVENTORY.TYPE.ARMOR
      },
      {
        text: 'Other',
        img: '/images/icons/item-icon-accessories.png',
        clazz: 'other',
        category: constants.INVENTORY.TYPE.OTHER
      // },
      // {
      //   text: 'Transports',
      //   // img: '/images/icons/item-icon-accessories.png',
      //   clazz: 'transport',
      //   category: constants.INVENTORY.TYPE.TRANSPORT
      // },
      // {
      //   text: 'Tomes',
      //   img: '/images/icons/item-icon-books.png',
      //   category: constants.INVENTORY.TYPE.
      }
    ];
  }

  get fireResistance() {
    return this.game.gameManager.player.container.agent.getResistance(constants.INVENTORY.RESISTANCE.FIRE);
  }

  get coldResistance() {
    return this.game.gameManager.player.container.agent.getResistance(constants.INVENTORY.RESISTANCE.COLD);
  }

  resetAllToUnlock() {
    if (this.inventoryItems) {
      this.inventoryItems.forEach(item => {
        item.confirmUnlock = false;
      });
    }
  }

  get equippedItemsCSSWrapper() {
    let cssWrapper = '';
    this.equippedItems.forEach(item => {
      if (cssWrapper.length > 0) {
        cssWrapper += ' ';
      }
      cssWrapper += item.cssClazz;
    });
    return cssWrapper;
  }

  setEquippedItems() {
    let equippedItems = this.game.gameManager.player.container.agent.equippedInventory.map(item => {
      return { img: item.img, imgDoll: item.imgDoll, cssClazz: item.cssClazz, bodypart: item.bodypart };
    });
    this.equippedItems = equippedItems;
  }

  // @computed('inventoryItems')
  setItemSlots() {
    const itemSlots = [];
    for (let i = 0; i < constants.INVENTORY.BODYPARTS.length; i++) {
      const item = this.inventory.getEquippedSlot(this.game.gameManager.player, constants.INVENTORY.BODYPARTS[i].part);
      const itemObj = {
        equipped: item !== null,
        name: item ? item.name : 'Empty',
        dataSlot: constants.INVENTORY.BODYPARTS[i].name,
        text: constants.INVENTORY.BODYPARTS[i].text,
        img: item ? item.img : null,
        imgDoll: item ? item.imgDoll : null,
        cssClazz: item ? item.cssClazz : null,
        tooltipSide: constants.INVENTORY.BODYPARTS[i].tooltipSide,
        textSide: constants.INVENTORY.BODYPARTS[i].tooltipSide === "left" ? "right" : "left"
      }
      itemSlots.push(itemObj)
    }
    this.itemSlots = itemSlots;
  }

  // @computed('inventoryItems', 'currentNavCategory')
  get filteredItems() {
    const filteredByCategory = this.inventoryItems.filterBy('type', this.currentNavCategory.category);
    const itemsWithLocked = filteredByCategory.map(item => {
      item.locked = item.requiredLevel > this.game.gameManager.player.level;
      // requiredLevel: item ? item.requiredLevel : null,
      return item;
    });
    return itemsWithLocked.sortBy('requiredLevel');
  }

  @action
  pickCategory(category) {
    this.currentNavCategory = category;
    this.resetAllToUnlock();
    this.itemSelected = this.filteredItems[0];
    this.setEquippedItems();
    this.setItemSlots();
  }

  @action
  selectItem(item) {
    this.itemSelected = item;
  }

  @action
  async equip(item) {
    const equippedSlotItem = this.inventory.getEquippedSlot(this.game.gameManager.player.container.agent, item.bodypart);
    if ( ! equippedSlotItem) {
      this.game.gameManager.player.container.agent.equipItem(item);
      await this.game.gameManager.saveSceneData();
    } else {

      this.confirmHeader = "Equipment swap";
      this.confirmMessage = `You already have ${equippedSlotItem.name} equipped for your ${this.inventory.getBodyPartDescription(equippedSlotItem.bodypart)}.`;
      this.confirmMessage2 = `Do you want to exchange it with ${item.name}?`;
      this.confirmText="OK"
      this.cancelText="Cancel"

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

  @action
  worldmap() {
    this.confirmClass = "worldmap-large"
    this.confirmHeader = undefined;
    this.confirmMessage = '<img class="worldmap" src="/images/maps/worldmap_scroll.png" />';
    this.confirmMessage2 = undefined;
    this.confirmText="Close"
    this.cancelText=undefined

    new Confirmer(swapEquipmentConfirmer => this.swapEquipmentConfirmer = swapEquipmentConfirmer)
      .onDone(() => {
        this.swapEquipmentConfirmer = null
      });
  }

}
