import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ChestDialogComponent extends Component {
  @service modals;
  @service game;

  @tracked cacheData;
  decryptedCacheCoords = '';

  constructor() {
    super(...arguments);

    this.cacheData = this.modals.top._data;

    this.decryptedCacheCoords = this.game.decryptCacheCoordinates(this.cacheData);
  }
}
