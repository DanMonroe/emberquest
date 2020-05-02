import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';
import { Spawner } from '../objects/spawner'

export default class SpawnerService extends Service {

  constants = constants;

  @service agentPool;

  @tracked spawnLocations;
  @tracked spawnInterval = 30000;

  @tracked spawners = [];

  @tracked transports = [];
  @tracked transportLimit = 1;
  // @tracked objectsCreated = 0;

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

        config = {
        spawnInterval: this.spawnLocations.transports.spawnInterval || 3000,
        // limit: this.spawnLocations.transports.limit || 1,
        spawnerType: this.constants.SPAWNER_TYPE.TRANSPORT
      }
      this.spawnLocations.transports.locations.forEach(locationObj => {
        config.id = `transport-${locationObj.id}`;
        config.locationId = +locationObj.id - 1;
        config.objectConfig = locationObj

        let spawner = new Spawner(
          this,
          config,
          this.spawnLocations.transports.locations,
          this.addTransport.bind(this),
          this.deleteTransport.bind(this)
        );

        this.spawners[spawner.id] = spawner;

      });
    }

    // create agent spawners
    if (this.spawnLocations.agents) {
      this.agentLimit = this.spawnLocations.agents.limit || 1,
      config = {
        spawnInterval: this.spawnLocations.agents.spawnInterval || 3000,
        // limit: this.spawnLocations.agents.limit || 1,
        spawnerType: this.constants.SPAWNER_TYPE.AGENT
      }
      this.spawnLocations.agents.locations.forEach(locationObj => {
      // this.spawnLocations.agents.locations.forEach(locationObj => {
        config.id = `agent-${locationObj.id}`;
        config.locationId = +locationObj.id - 1;
        config.objectConfig = locationObj;
        config.objectConfig.agentPool = locationObj.pool || this.spawnLocations.agents.globalPool || [];
console.log('*** spawner service - new Spawner')
        let spawner = new Spawner(
          this,
          config,
          this.spawnLocations.agents.locations,
          // this.spawnLocations.agents.locations,
          this.addAgent.bind(this),
          this.deleteAgent.bind(this),
          this.agentPool
        );

        this.spawners[spawner.id] = spawner;

      });
    }
  }

  shouldSpawn(spawnerType) {
    switch (spawnerType) {
      case constants.SPAWNER_TYPE.TRANSPORT:
console.log('*** spawner service - shouldSpawn transport');
        if (this.transports.length >= this.transportLimit) {
          return false;
        }
        break;
      case constants.SPAWNER_TYPE.AGENT:
console.log('*** spawner service - shouldSpawn agent - limit', this.agentLimit, 'count', this.agents.length);
        if (this.agents.length >= this.agentLimit) {
          return false;
        }
        break;
      default:
        break;
    }

    return true;
  }

  addTransport(transportId, transport) {
    // this.transports[transportId] = transport;
    this.transports.pushObject(transport);
    this.scene.events.emit('transportSpawned', transport);
  }

  deleteTransport(transportId) {
    delete this.transports[transportId];
  }

  addAgent(agentId, agent) {
    console.log('*** spawner service - add agent', agentId, agent.x, agent.y)
    // agent.objectConfig.id
// console.log('addAgent - deadAgents', this.scene.deadAgents)
    if ( ! (this.scene.deadAgents && this.scene.deadAgents.has(agent.objectConfig.id))) {
      this.agents.pushObject(agent);
console.log('*** spawner service - agent count', this.agents.length)
      this.scene.events.emit('agentSpawned', agent);
    } else {
      console.log('NOT spawning agent', agent.objectConfig.id)
    }
  }

  deleteAgent(agentId) {
    delete this.agents[agentId];
  }
}
