import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import {InventoryItems} from '../models/data/inventory';

export default class PlayRoute extends Route {
  async model() {
    // console.log('InventoryItems', InventoryItems)

    this.store.pushPayload({
      data: new InventoryItems().data
      // data: [
      //   {
      //     id: 1,
      //     type: 'inventory-item',
      //     attributes: {
      //       name: 'Sword',
      //       price: 100,
      //       owned: true,
      //       img: '/images/items/crossbow.png',
      //       locked: false,
      //       type: 'weapon',
      //       description: ''
      //     },
      //     relationships: {}
      //     // stats: '',
      //     // skills: '',
      //     // sound: '',
      //     // soundhit: '',
      //     // owner: '',
      //     // tileX: '',
      //     // tileY: '',
      //     // maxRange: 1,
      //     // damage: 1,
      //     // weaponSpeed: 1,
      //     // projectileSpeed: 1,
      //     // poweruse: 1,
      //     // accuracy: 1,
      //
      //     // codeimg: '',
      //     // exampleTitle: '',
      //     // addonName: ''
      //   },
      //   {
      //     id: 2,
      //     type: 'inventory-item',
      //     attributes: {
      //       name: 'Ring of Concurrency',
      //       price: 1337,
      //       owned: false,
      //       img: '/images/items/ring5.png',
      //       locked: false,
      //       type: 'other',
      //       description: '"The solution to so many problems you never knew you had."',
      //
      //       codeimg: '/code/reloadHealthTask.png',
      //       'example-title': 'Ember Concurrency Example',
      //       'addon-name': 'ember-concurrency'
      //
      //     },
      //     relationships: {}
      //     // stats: '',
      //     // skills: '',
      //     // sound: '',
      //     // soundhit: '',
      //     // owner: '',
      //     // tileX: '',
      //     // tileY: '',
      //     // maxRange: 1,
      //     // damage: 1,
      //     // weaponSpeed: 1,
      //     // projectileSpeed: 1,
      //     // poweruse: 1,
      //     // accuracy: 1,
      //
      //     // codeimg: '',
      //     // exampleTitle: '',
      //     // addonName: ''
      //   }
      // ]
    });

    return RSVP.hash({
      inventoryItems: this.store.peekAll('inventory-item'),
    });
  }
}
