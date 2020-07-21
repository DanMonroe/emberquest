import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CachesDialogComponent extends Component {
  @service cache;
  @service storage;

  @tracked cacheList;

  constructor() {
    super(...arguments);
    this.cacheList = this.cache.getCaches();
  }

  togglePuzzleHint(cache) {
    cache.puzzleHintDecrypted = !cache.puzzleHintDecrypted;
  }
  toggleCacheHint(cache) {
    cache.cacheHintDecrypted = !cache.cacheHintDecrypted;
  }
}
