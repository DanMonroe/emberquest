import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';
import {Spawner} from '../objects/spawner'

export default class SpawnerService extends Service {

  constants = constants;

  @tracked objectsCreated = 0;
  @tracked objectLimit = 2;
  @tracked spawnLocations;
  @tracked spawnInterval = 30000;

  @tracked spawners = {};
  @tracked transports = {};
  @tracked players = {};
  @tracked agents = {};

  scene = undefined;

  setup(scene, spawnLocations) {
    this.scene = scene;
    this.spawnLocations = spawnLocations;
    let config = {};

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

    // create agent spawners
    if (this.spawnLocations.agents) {
      config = {
        spawnInterval: this.spawnLocations.agents.spawnInterval || 3000,
        limit: this.spawnLocations.agents.limit || 1,
        spawnerType: this.constants.SPAWNER_TYPE.AGENT
      }
      this.spawnLocations.agents.locations.forEach(locationObj => {
        config.id = `agent-${locationObj.id}`;
        config.locationId = +locationObj.id - 1;
        config.objectConfig = locationObj

        let spawner = new Spawner(
          config,
          this.spawnLocations.agents.locations,
          this.addAgent.bind(this),
          this.deleteAgent.bind(this),
          null,
          this.constants
        );

        this.spawners[spawner.id] = spawner;

      });
    }


  }

  addTransport(transportId, transport) {
    this.transports[transportId] = transport;
    this.scene.events.emit('transportSpawned', transport);
  }

  deleteTransport(transportId) {
    delete this.transports[transportId];
  }

  addAgent(agentId, agent) {
    // agent.objectConfig.id
// console.log('addAgent - deadAgents', this.scene.deadAgents)
    if ( ! (this.scene.deadAgents && this.scene.deadAgents.has(agent.objectConfig.id))) {
      this.agents[agentId] = agent;
      this.scene.events.emit('agentSpawned', agent);
    } else {
      console.log('NOT spawning agent', agent.objectConfig.id)
    }
  }

  deleteAgent(agentId) {
    delete this.agents[agentId];
  }
}
