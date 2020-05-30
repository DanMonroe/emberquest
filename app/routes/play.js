import Route from '@ember/routing/route';
// import RSVP from 'rsvp';
// import {InventoryItems} from '../models/data/inventory';

export default class PlayRoute extends Route {
  model(params) {
    return {
      overrideMap: {
          map: params.map,
          x: params.x,
          y: params.y
        },
        debug: {
          phaserDebug: params.debug,
          level: params.level,
          gold: params.gold
        }
      }
    }
  //   return { inventoryItems: new InventoryItems().data };

    // this.store.pushPayload({
    //   data: new InventoryItems().data
    // });

    // return RSVP.hash({
    //   inventoryItems: this.store.peekAll('inventory-item'),
    // });
  // }
}
