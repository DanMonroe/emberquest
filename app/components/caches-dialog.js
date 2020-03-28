import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CachesDialogComponent extends Component {
  @service cache;

  @tracked cacheList;

  constructor() {
    super(...arguments);
    this.cacheList = this.cache.getCaches();
console.log('cacheList', this.cacheList)
  }

}
