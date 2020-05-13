import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';
import { timeout } from 'ember-concurrency';
import { restartableTask } from 'ember-concurrency-decorators';
import {Transport} from "../objects/models/transport";
import {Agent} from "../objects/models/agent";

export default class SpawnerService extends Service {


  @service agentPool;

  @tracked uniques;
  @tracked spawnLocations;
  // @tracked spawnInterval = 300;
  @tracked spawnInterval = 1000;

  @tracked spawners = [];

  @tracked transports = [];
  @tracked transportLimit = 1;

  @tracked agents = [];
  @tracked agentLimit = 1;


  scene = undefined;

  setup(scene) {
    this.scene = scene;
    this.spawnLocations = this.scene.mapData.spawnLocations;
    this.uniques = this.scene.mapData.uniques;
    this.spawners = [];
    this.transports = [];
    this.agents = [];

    // create transport spawners
    if (this.spawnLocations.transports && this.spawnLocations.transports.locations.length > 0) {
      this.transportLimit = this.spawnLocations.transports.limit || 1;

      // config = {
      //   spawnInterval: this.spawnLocations.transports.spawnInterval || 3000,
      //   // limit: this.spawnLocations.transports.limit || 1,
      //   spawnerType: constants.SPAWNER_TYPE.TRANSPORT
      // };

      this.spawners.push(constants.SPAWNER_TYPE.TRANSPORT);


      // this.spawnLocations.transports.locations.forEach(locationObj => {
      //   config.id = `transport-${locationObj.id}`;
      //   config.locationId = +locationObj.id - 1;
      //   config.objectConfig = locationObj
      //
      //   // let spawner = new Spawner(
      //   //   this,
      //   //   config,
      //   //   this.spawnLocations.transports.locations,
      //   //   this.addTransport.bind(this),
      //   //   this.deleteTransport.bind(this)
      //   // );
      //
      //   this.spawners[spawner.id] = spawner;
      //
      // });
    }

    // create agent spawners
    if (this.spawnLocations.agents && this.spawnLocations.agents.locations.length > 0) {
      // console.log('this.spawnLocations.agents.locations', this.spawnLocations.agents.locations)
      this.agentLimit = this.spawnLocations.agents.limit || 1;
      this.spawners.push(constants.SPAWNER_TYPE.AGENT);
    }

    this.spawnObjects.perform();

  }

  // spawn one time objects that won't respawn
  spawnUniques() {
    if (this.uniques && this.uniques.agents && this.uniques.agents.length > 0) {
      this.uniques.agents.forEach(unique => {
        const agentConfig = this.agentPool.getAgentConfig(unique.agentKey);
        // console.log('unique agentConfig ', agentConfig)

        if (agentConfig) {

          // don't spawn uniques that are already dead
          if ( ! (this.scene.deadAgents && this.scene.deadAgents.has(unique.uniqueId))) {

            if (unique.patrol) {
              // assign any properties
              Object.assign(agentConfig.patrol, unique.patrol)
              Object.assign(agentConfig, unique)
            }

            agentConfig.uniqueId = unique.uniqueId;

            const agent = new Agent(unique.x, unique.y, agentConfig);

            this.addAgent(agent);
          }
        }
      })
    }
  }

  @restartableTask
  *spawnObjects() {

    while (this.spawners.length > 0) {
    // while (true) {
      if (!this.scene.ember.gameManager.gamePaused) {
        this.spawners.forEach(spawnerType => {
console.log('spawnerType', spawnerType)
          if (this.shouldSpawn(spawnerType)) {
            this.spawnObject(spawnerType);
          } else {
            // console.log('   >> ' + spawnerType + ' - NO!! Dont spawn')
          }
        });
      } else {
        console.log('no spawn, game paused')
      }

      yield timeout(this.spawnInterval);
    }
  }



  shouldSpawn(spawnerType) {
    switch (spawnerType) {
      case constants.SPAWNER_TYPE.TRANSPORT:
        if (this.spawnLocations.transports.locations.length === 0 || this.transports.length >= this.transportLimit) {
          return false;
        }
        break;
      case constants.SPAWNER_TYPE.AGENT:
        if (this.spawnLocations.agents.locations.length === 0 || this.agents.length >= this.agentLimit) {
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  }

  spawnObject(spawnerType) {
    const location = this.pickRandomLocation(spawnerType);
    let locationClone, agentConfigFromPool;
    switch (spawnerType) {
      case constants.SPAWNER_TYPE.TRANSPORT:
        // this.spawnTransport();
        break;
      case constants.SPAWNER_TYPE.AGENT:
        agentConfigFromPool = Object.assign({}, this.pickRandomAgentFromPool(location));
        locationClone = Object.assign({}, location);

        if (agentConfigFromPool) {
          if (locationClone.patrol) {
            // assign any properties
            Object.assign(agentConfigFromPool.patrol, locationClone.patrol)
          }

          const agent = new Agent(locationClone.x, locationClone.y, Object.assign(locationClone, agentConfigFromPool));

          this.addAgent(agent);
        }

        break;
      default:
        break;
    }

  }

  pickRandomLocation(spawnerType) {
    let location, invalidLocation = false;
    switch (spawnerType) {
      case constants.SPAWNER_TYPE.TRANSPORT:
        location = this.spawnLocations.transports.locations[Math.floor(Math.random() * this.spawnLocations.transports.locations.length)];
        break;
      case constants.SPAWNER_TYPE.AGENT:
        location = this.spawnLocations.agents.locations[Math.floor(Math.random() * this.spawnLocations.agents.locations.length)];
        invalidLocation = this.agents.some((obj) => {
          return obj.x === location.x && obj.y === location.y;
        });
        break;
      default:
        break;
    }

    if (invalidLocation) {
      return this.pickRandomLocation(spawnerType);
    }
    return location;
  }

  pickRandomAgentFromPool(location) {
    const agentPool = location.pool || this.spawnLocations.agents.globalPool || [];
    if (!agentPool) {
      return undefined;
    }
    const agentKey = agentPool[Math.floor(Math.random() * agentPool.length)];
    // console.log('         >>  pick random agent', agentKey);

    if (!agentKey) {
      return undefined;
    }

    const agentConfig = this.agentPool.getAgentConfig(agentKey);

    return agentConfig;
  }


  addTransport(transportId, transport) {
    // this.transports[transportId] = transport;
    this.transports.pushObject(transport);
    this.scene.events.emit('transportSpawned', transport);
  }

  deleteTransport(transportId) {
    delete this.transports[transportId];
  }

  addAgent(agent) {
    // console.log('*** spawner service - add agent', agent.id, agent.x, agent.y)
      this.agents.push(agent);
      this.scene.events.emit('agentSpawned', agent);
  }

  deleteAgent(agentContainer) {
    // console.log('!!! delete agent', agentContainer)

    const index = this.agents.findIndex(agentObj => {
      return agentObj.id === agentContainer.agent.playerConfig.uuid;
    });

    if (index > -1) {
      this.agents.splice(index, 1);
    }
  }
}
