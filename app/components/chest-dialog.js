import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';

export default class ChestDialogComponent extends Component {
  @service modals;
  @service game;
  @service inventory;

  @tracked cacheData;
  decryptedCacheCoords = '';
  decryptedParkingCoords = '';

  @computed('chestInventory', 'cacheData.gold')
  get showBonus() {
    return this.chestInventory.length > 0 || +this.cacheData.gold > 0;
  }

  @computed('cacheData.inventory.[]')
  get chestInventory() {
    const chestInventory = [];
    if (this.cacheData.inventory) {
      this.cacheData.inventory.forEach(itemId => {
        const item = this.inventory.getItemById(itemId);
        if (item) {
          chestInventory.push(item);
          this.inventory.addInventoryFromChest(item);
        }
      });
    }
    return chestInventory;
  }

  constructor() {
    super(...arguments);

    this.cacheData = this.modals.top._data;
    console.log('this.cacheData', this.cacheData)
    this.decryptedCacheCoords = this.game.decryptCacheCoordinates(this.cacheData.coords);
    if (this.cacheData.parking) {
      this.decryptedParkingCoords = this.game.decryptCacheCoordinates(this.cacheData.parking);
    }
  }
}
