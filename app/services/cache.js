import Service from '@ember/service';
// import { inject as service } from '@ember/service';
import {Caches} from '../models/data/caches';
import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';

export default class CacheService extends Service {

  @tracked caches = undefined;

  constants = constants;

  getCaches() {
    if (this.caches === undefined) {
      this.caches =  new Caches().data;
    }
    return this.caches;
  }

}
