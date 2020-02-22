import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class InventoryService extends Service {

  @service game;
  @service gameManager;

  buyInventory(item) {
    console.log('buy inventory', item);
    this.gameManager.player.playerCoins -= item.price;
  }


}
