import {timeout} from 'ember-concurrency';
import {task} from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';
import {Chest} from "./models/chest";

export class Spawner {

  @tracked objectsCreated = 0;
  @tracked objectLimit = 2;

  constants = undefined;

  constructor(config, spawnLocations, addObject, deleteObject, moveObjects, constants) {
    this.id = config.id;
    this.spawnInterval = config.spawnInterval;
    this.limit = config.limit;
    this.objectType = config.spawnerType;
    this.spawnLocations = spawnLocations;
    this.addObject = addObject;
    this.deleteObject = deleteObject;
    this.moveObjects = moveObjects;
    this.constants = constants;

    this.objectsCreated = [];

    this.spawnObjects.perform();


  }

  @task
  *spawnObjects() {
    while (true) {
      if (this.objectsCreated <= this.objectLimit) {
        this.spawnObject();
      }
      yield timeout(this.spawnInterval);
    }
    // if (this.objectType === SpawnerType.MONSTER) this.moveMonsters();
  }

  spawnObject() {
    switch (this.objectType) {
      case this.constants.SPAWNER_TYPE.CHEST:
        this.spawnChest();
        break;
      case this.constants.SPAWNER_TYPE.MONSTER:
        this.spawnMonster();
        break;
      default:
        break;
    }

    console.log('spawn object.  count:', this.objectsCreated)
    this.objectsCreated++;  // temp counter
  }

  spawnChest() {
    const location = this.pickRandomLocation();

    const chest = new Chest(location[0], location[1], 100, this.id);

    this.objectsCreated.push(chest);
    this.addObject(chest.id, chest);
  }

  spawnMonster() {}

  removeObject(id) {
    this.objectsCreated = this.objectsCreated.filter(obj => obj.id !== id);
    this.deleteObject(id);
  }

  pickRandomLocation() {
    const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];
    const invalidLocation = this.objectsCreated.some((obj) => {
      return obj.x === location[0] && obj.y === location[1];
    });

    if (invalidLocation) return this.pickRandomLocation();
    return location;
  }

}
