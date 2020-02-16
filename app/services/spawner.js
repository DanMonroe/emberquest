import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
// import {timeout} from 'ember-concurrency';
// import {task} from 'ember-concurrency-decorators';
import {Spawner} from '../objects/spawner'

export default class SpawnerService extends Service {

  @service constants;

  @tracked objectsCreated = 0;
  @tracked objectLimit = 2;
  @tracked spawnLocations;
  @tracked spawnInterval = 30000;

  @tracked spawners = {};
  @tracked chests = {};
  @tracked transports = {};
  @tracked monsters = {};
  @tracked players = {};

  scene = undefined;

  setup(scene, spawnLocations) {
    this.scene = scene;
    this.spawnLocations = spawnLocations;
    let config = {};

    // create chest spawners
    if (this.spawnLocations.chests) {
      config = {
        spawnInterval: this.spawnLocations.chests.spawnInterval || 3000,
        limit: this.spawnLocations.chests.limit || 1,
        spawnerType: this.constants.SPAWNER_TYPE.CHEST
      }
      this.spawnLocations.chests.locations.forEach(locationObj => {
        config.id = `chest-${locationObj.id}`;
        config.objectConfig = locationObj;

        let spawner = new Spawner(
          config,
          this.spawnLocations.chests.locations,
          this.addChest.bind(this),
          this.deleteChest.bind(this),
          null,
          this.constants
        );

        this.spawners[spawner.id] = spawner;

        // console.log('chest location spawnerConfig', spawnerConfig)
        // this.spawnLocations.transports.push(spawnerConfig);
      });
    }

    // create transport spawners
    if (this.spawnLocations.transports) {
      config = {
        spawnInterval: this.spawnLocations.transports.spawnInterval || 3000,
        limit: this.spawnLocations.transports.limit || 1,
        spawnerType: this.constants.SPAWNER_TYPE.TRANSPORT
      }
      this.spawnLocations.transports.locations.forEach(locationObj => {
        config.id = `transport-${locationObj.id}`;
        config.locationId = +locationObj.id - 1;
        config.objectConfig = locationObj

        let spawner = new Spawner(
          config,
          this.spawnLocations.transports.locations,
          this.addTransport.bind(this),
          this.deleteTransport.bind(this),
          null,
          this.constants
        );

        this.spawners[spawner.id] = spawner;

      });
    }

    // create monster spawners
    if (this.spawnLocations.monsters) {
      config = {
        spawnInterval: this.spawnLocations.monsters.spawnInterval || 3000,
        limit: this.spawnLocations.monsters.limit || 1,
        spawnerType: this.constants.SPAWNER_TYPE.MONSTER
      }
      this.spawnLocations.monsters.locations.forEach(locationObj => {
        config.id = `monster-${locationObj.id}`;
        config.locationId = +locationObj.id - 1;
        config.objectConfig = locationObj

        let spawner = new Spawner(
          config,
          this.spawnLocations.monsters.locations,
          this.addMonster.bind(this),
          this.deleteMonster.bind(this),
          null,
          this.constants
        );

        this.spawners[spawner.id] = spawner;

      });
    }


    // console.log('setupSpawnLocations')
    // this.scene.MapData.spawnLocations.players.forEach(spawnerConfig => {
    //   console.log('player location spawnerConfig', spawnerConfig)
    //   this.spawnLocations.players.push(spawnerConfig);
    // });
    // if (this.scene.MapData.spawnLocations.transports) {
    //   this.scene.MapData.spawnLocations.transports.forEach(spawnerConfig => {
    //     console.log('transport location spawnerConfig', spawnerConfig)
    //     this.spawnLocations.transports.push(spawnerConfig);
    //   });
    // }
    // if (this.scene.MapData.spawnLocations.chests) {
    //   this.scene.MapData.spawnLocations.chests.forEach(spawnerConfig => {
    //     console.log('chest location spawnerConfig', spawnerConfig)
    //     this.spawnLocations.transports.push(spawnerConfig);
    //   });
    // }
    // if (this.scene.MapData.spawnLocations.monsters) {
    //   this.scene.MapData.spawnLocations.monsters.forEach(spawnerConfig => {
    //     console.log('monster location spawnerConfig', spawnerConfig)
    //     this.spawnLocations.transports.push(spawnerConfig);
    //   });
    // }
    // if (this.scene.MapData.spawnLocations.agents) {
    //   this.scene.MapData.spawnLocations.agents.forEach(spawnerConfig => {
    //     console.log('agent location spawnerConfig', spawnerConfig)
    //     this.spawnLocations.transports.push(spawnerConfig);
    //   });
    // }
  }

  addChest(chestId, chest) {
    this.chests[chestId] = chest;
    this.scene.events.emit('chestSpawned', chest);
  }

  deleteChest(chestId) {
    delete this.chests[chestId];
  }

  addTransport(transportId, transport) {
    this.transports[transportId] = transport;
    this.scene.events.emit('transportSpawned', transport);
  }

  deleteTransport(transportId) {
    delete this.transports[transportId];
  }

  addMonster(monstertId, monster) {
    this.monsters[monstertId] = monster;
    this.scene.events.emit('monsterSpawned', monster);
  }

  deleteMonster(monsterId) {
    delete this.monsters[monsterId];
  }

  // @task
  // *spawnObjects() {
  //   while (true) {
  //     if (this.objectsCreated <= this.objectLimit) {
  //       this.spawnObject();
  //     }
  //     yield timeout(this.spawnInterval);
  //   }
  // }
  //
  // spawnObject() {
  //   console.log('spawn object.  count:', this.objectsCreated)
  //   this.objectsCreated++;  // temp counter
  // }
  //
  // removeObject() {
  //   console.log('remove object')
  // }
  //
}
