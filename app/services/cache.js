import Service from '@ember/service';
import { inject as service } from '@ember/service';
import {Caches} from '../models/data/caches';
import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';

export default class CacheService extends Service {

  @service game;

  @tracked caches = undefined;

  constants = constants;

  getCaches() {
    if (this.caches === undefined) {
      this.caches =  new Caches().data;
    }
    return this.caches;
  }

  findCache(gccode) {
    return this.getCaches().findBy('gccode', gccode);
  }

  isCacheFound(gccode) {
    const geocache = this.findCache(gccode);
    return geocache ? geocache.found : false;
  }

  get allCachesFound() {
    if (!this.caches) {
      return false;
    }
    // return true;
    return this.getCaches().isEvery('found');
  }
}
