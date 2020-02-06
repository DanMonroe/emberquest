import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import {timeout} from 'ember-concurrency';
import {task} from 'ember-concurrency-decorators';


export default class SpawnerService extends Service {

  @tracked objectsCreated = 0;
  @tracked objectLimit = 10;
  @tracked spawnLocations;
  @tracked spawnInterval = 3000;

  @task
  *spawnObjects() {
    while (true) {
      if (this.objectsCreated <= this.objectLimit) {
        this.spawnObject();
      }
      yield timeout(this.spawnInterval);
    }
  }

  spawnObject() {
    console.log('spawn object.  count:', this.objectsCreated)
    this.objectsCreated++;  // temp counter
  }

  removeObject() {
    console.log('remove object')
  }

}
