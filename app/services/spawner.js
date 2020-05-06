import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';
import {Transport} from "../objects/models/transport";
import {Agent} from "../objects/models/agent";

export default class SpawnerService extends Service {


  @service agentPool;

  @tracked spawnLocations;
  // @tracked spawnInterval = 300;
  @tracked spawnInterval = 1000;

  @tracked spawners = [];

  @tracked transports = [];
  @tracked transportLimit = 1;

  @tracked agents = [];
  @tracked agentLimit = 1;


  scene = undefined;

  setup(scene, spawnLocations) {
    this.scene = scene;
    this.spawnLocations = spawnLocations;
    let config = {};

    // create transport spawners
    if (this.spawnLocations.transports) {
      this.transportLimit = this.spawnLocations.transports.limit || 1,

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
    if (this.spawnLocations.agents) {
      this.agentLimit = this.spawnLocations.agents.limit || 1,
      // config = {
      //   spawnInterval: this.spawnLocations.agents.spawnInterval || 3000,
      //   // limit: this.spawnLocations.agents.limit || 1,
      //   spawnerType: constants.SPAWNER_TYPE.AGENT
      // };

      this.spawners.push(constants.SPAWNER_TYPE.AGENT);


      // this.spawnLocations.agents.locations.forEach(locationObj => {
      //   config.id = `agent-${locationObj.id}`;
      //   config.locationId = +locationObj.id - 1;
      //   config.objectConfig = locationObj;
      //   config.objectConfig.agentPool = locationObj.pool || this.spawnLocations.agents.globalPool || [];
      // });
    }

    this.spawnObjects.perform();
  }

  @task
  *spawnObjects() {
    while (true) {

      this.spawners.forEach(spawnerType => {

        if (this.shouldSpawn(spawnerType)) {
          this.spawnObject(spawnerType);
        // } else {
          // console.log('   >> ' + spawnerType + ' - NO!! Dont spawn')
        }
      });

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
// console.log('            || agentConfigFromPool', agentConfigFromPool)


        if (agentConfigFromPool) {
          if (locationClone.patrol) {
            // assign any properties
            Object.assign(agentConfigFromPool.patrol, locationClone.patrol)
          }
console.log('            || agentConfigFromPool', agentConfigFromPool, 'locationClone', locationClone)

          const agent = new Agent(locationClone.x, locationClone.y, Object.assign(locationClone, agentConfigFromPool));
          // console.log('               ++ agent', agent)

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
    console.log('         >>  pick random agent', agentKey);

    if (!agentKey) {
      return undefined;
    }

    const agentConfig = this.agentPool.getAgentConfig(agentKey);

    return agentConfig;
  }


  // spawnTransport() {
  //   const location = this.pickLocationById();
  //
  //   const transport = new Transport(location.x, location.y, this.id, this.config.objectConfig);
  //
  //   // console.log('spawnTransport', transport);
  //   this.objectsCreated.push(transport);
  //   this.addObject(transport.id, transport);
  // }






  addTransport(transportId, transport) {
    // this.transports[transportId] = transport;
    this.transports.pushObject(transport);
    this.scene.events.emit('transportSpawned', transport);
  }

  deleteTransport(transportId) {
    delete this.transports[transportId];
  }

  addAgent(agent) {
    console.log('*** spawner service - add agent', agent.id, agent.x, agent.y)

// console.log('addAgent - deadAgents', this.scene.deadAgents)
//     if ( ! (this.scene.deadAgents && this.scene.deadAgents.has(agent.objectConfig.id))) {
      this.agents.push(agent);
      // this.agents.push(agent.id);

    console.log('*** spawner service - agent count', this.agents.length)

      this.scene.events.emit('agentSpawned', agent);

    // } else {
    //   console.log('NOT spawning agent', agent.objectConfig.id)
    // }
  }

  deleteAgent(agentContainer) {
    console.log('!!! delete agent', agentContainer)

    const index = this.agents.findIndex(agentObj => {
      return agentObj.id === agentContainer.agent.playerConfig.uuid;
    });

    if (index > -1) {
      this.agents.splice(index, 1);
    }
  }
}
