import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import {InventoryItems} from '../models/data/inventory';

export default class PlayRoute extends Route {
  async model() {
    // console.log('InventoryItems', InventoryItems)

    this.store.pushPayload({
      data: new InventoryItems().data
    });

    return RSVP.hash({
      inventoryItems: this.store.peekAll('inventory-item'),
    });
  }
}
