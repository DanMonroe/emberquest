import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';
import {Transport} from "../objects/models/transport";
import {Agent} from "../objects/models/agent";
import { v4 } from "ember-uuid";
// import { A as emberArray } from '@ember/array';

class LocationConfig {
  config = {};
  uuid = v4();

  constructor(config) {
    this.config = config;
  }
}

class AgentConfig {
  config = {};
  uuid = v4();

  constructor(config) {
    this.config = config;
  }
}

export default class SpawnerService extends Service {


  @service agentPool;
  @service transportPool;

  @tracked uniques;
  @tracked spawnLocations;
  // @tracked spawnInterval = 300;
  @tracked spawnInterval = 1000;

  @tracked spawners = [];

  @tracked transports = [];
  @tracked transportLimit = 1;

  @tracked agents = [];
  // @tracked agents = emberArray([]);
  @tracked agentLimit = [1];


  scene = undefined;

  setup(scene) {
    this.scene = scene;
    this.spawnLocations = this.scene.mapData.spawnLocations;
    this.uniques = this.scene.mapData.uniques;
    this.spawners = [];
    this.transports = [];
    this.agents = [];
    this.agentLimit = [1];

    // Transports
    let boardedTransportId = 0;
    try {
      boardedTransportId = scene.ember.gameManager.storedData.gameboardData.playerAttrs.boardedTransport;
      // console.log('boardedTransportId', boardedTransportId)
      if (boardedTransportId) {
        const transportConfigFromPool = this.transportPool.findTransportById(boardedTransportId);
        // console.log('found trans obj', transportConfigFromPool);
        if (transportConfigFromPool) {
          const location = {
            x: scene.ember.gameManager.storedData.gameboardData.playerTile.x,
            y: scene.ember.gameManager.storedData.gameboardData.playerTile.y
          };
          const transport = new Transport(location.x, location.y, Object.assign(location, transportConfigFromPool));
          transport.isBoardedTransport = true;
          this.addTransport(transport);
        }
      }
    } catch (e) {
      // console.log('no boarded transport', e)
    }

    // load transports that originated from other scenes but were "parked" on this scene
    try {
      scene.ember.gameData.transports.forEach(sceneTransport => {
        if (boardedTransportId !== sceneTransport.id && sceneTransport.map === scene.mapname) {
          const transportConfigFromPool = this.transportPool.findTransportById(sceneTransport.id);
          // console.log('found scene trans obj', transportConfigFromPool, sceneTransport);
          if (transportConfigFromPool) {
            const location = {x: sceneTransport.tile.x, y: sceneTransport.tile.y};
            const transport = new Transport(location.x, location.y, Object.assign(location, transportConfigFromPool));
            this.addTransport(transport);
          }
        }
      })
    } catch (e) {
      // console.log('no boarded transport', e)
    }

    if (this.spawnLocations.transports && this.spawnLocations.transports.length > 0) {
      this.spawnLocations.transports.forEach(transportObj => {
        // console.log('transport', transportObj);

        this.spawnObject(
          {
            agentSpawnerIndex: 0,
            type: constants.SPAWNER_TYPE.TRANSPORT,
            agentLimit: 1,
            transportObj: transportObj
          }
        );
      });
    }

    // create agent spawner groups
    if (this.spawnLocations.agents && this.spawnLocations.agents.length > 0) {
      let agentSpawnerIndex = 0;
      this.spawnLocations.agents.forEach(agentSpawnerGroup => {
        if (agentSpawnerGroup.locations.length > 0) {
          this.spawners.push({
            agentSpawnerIndex: agentSpawnerIndex++,
            type: constants.SPAWNER_TYPE.AGENT,
            agentLimit: agentSpawnerGroup.locations.length || 1,
            // agentLimit: agentSpawnerGroup.limit || 1,
            spawnInterval: agentSpawnerGroup.spawnInterval || 3000
          });
        }
      })
    }

    // start all the spawners
    this.spawners.forEach(spawnerConfig => {
      this.spawnerTask.perform(spawnerConfig);
    });
  }

  async cancelAllSpawnerTasks() {
    await this.spawnerTask.cancelAll();
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
            }
            if (agentConfig.override) {
              Object.assign(agentConfig, unique.override);
            }


            agentConfig.uniqueId = unique.uniqueId;

            const agent = new Agent(unique.x, unique.y, agentConfig);

            // this.addAgent(agent);
            this.scene.events.emit('agentSpawned', agent);
          }
        }
      })
    }
  }

  // Only agents for now ?
  @task
  *spawnerTask(spawnerConfig) {
    while (true) {
      if (!this.scene.ember.gameManager.gamePaused) {
        // should spawn ?
        if ( this.agents.length === 0 || this.agents.length <= spawnerConfig.agentSpawnerIndex || this.agents[spawnerConfig.agentSpawnerIndex].length < spawnerConfig.agentLimit) {
          this.spawnObject(spawnerConfig);
        } else {
          // console.log('   >>  - NO!! Dont spawn')
        }

        yield timeout(spawnerConfig.spawnInterval);
      } else {
        // console.log('no spawn, game paused')
        yield timeout(1000);
      }
    }
  }

  spawnAgent(spawnerConfig) {
    try {
      const location = this.pickRandomLocation(spawnerConfig);

      if (location) {

        const randomAgentFromPoolConfig = this.pickRandomAgentFromPool(location.config, spawnerConfig)

        // check any overriding properties from the map file spawner location and copy over base agent config
        if (location.config.patrol) {
          // assign any properties
          // this object.assign is affecting other agents' patrol values
          // Object.assign(randomAgentFromPoolConfig.config.patrol, location.config.patrol)
          const newPatrolConfig = Object.assign({}, randomAgentFromPoolConfig.config.patrol, location.config.patrol);
          randomAgentFromPoolConfig.config.patrol = newPatrolConfig;
        }

        if (location.config.override) {
          // assign any properties
          const newConfig = Object.assign({}, randomAgentFromPoolConfig.config, location.config.override);
          randomAgentFromPoolConfig.config = newConfig;
          // Object.assign(randomAgentFromPoolConfig.config, location.config.override)
        }

        const agent = new Agent(location.config.x, location.config.y, randomAgentFromPoolConfig.config);
        // const agent = new Agent(location.config.x, location.config.y, Object.assign(locationClone, agentConfigFromPool));

        this.addAgent(agent, spawnerConfig.agentSpawnerIndex);

      } // if we picked random spawn location


    } catch (err) {
      console.error('Error spawning agent', err);
    }
  }

  spawnObject(spawnerConfig) {
    let location, transportConfigFromPool;
    switch (spawnerConfig.type) {

      case constants.SPAWNER_TYPE.TRANSPORT:
        location = {x: spawnerConfig.transportObj.x, y: spawnerConfig.transportObj.y};
        transportConfigFromPool = this.transportPool.getTransportConfig(spawnerConfig.transportObj.poolkey);
        if (transportConfigFromPool) {
          this.addTransport(new Transport(location.x, location.y, Object.assign(location, transportConfigFromPool)));
        }
        break;

      case constants.SPAWNER_TYPE.AGENT:
        this.spawnAgent(spawnerConfig);
        break;
//         location = this.pickRandomLocation(spawnerConfig);
//
//         if (location) {
// console.group('spawner spawnObject', location)
//           // this.agents.forEach(agent => {
//           //   console.log('  0', agent[0].objectConfig.name, agent[0].objectConfig.patrol)
//           // })
//
//           agentConfigFromPool = Object.assign({}, this.pickRandomAgentFromPool(location, spawnerConfig));
//
//
//           // locationClone = new AgentConfig(location);
//           locationClone = Object.assign({}, location);
//
//           console.log('             >>>>>>> - locationClone', locationClone, 'agentConfigFromPool', agentConfigFromPool)
//
//
//           if (agentConfigFromPool) {
//
// this.agents.forEach(agent => {
//   console.log('     0 - 3', agent[0].objectConfig.name, agent[0].objectConfig.patrol)
// })
//
//             // if (locationClone.config.patrol) {
//             if (locationClone.patrol) {
// // console.log('       0 - locationClone.patrol', locationClone.patrol, 'agentConfigFromPool', agentConfigFromPool)
//
//               // assign any properties
//               // Object.assign(agentConfigFromPool.patrol, locationClone.config.patrol)
//               Object.assign(agentConfigFromPool.patrol, locationClone.patrol)
//             }
//
//
// this.agents.forEach(agent => {
//   // console.log('     0 - 4', agent[0].objectConfig.name, agent[0].objectConfig.patrol, locationClone.config.patrol)
//   console.log('     0 - 4', agent[0].objectConfig.name, agent[0].objectConfig.patrol, locationClone.patrol)
// })
//             if (locationClone.override) {
//               // Object.assign(agentConfigFromPool, locationClone.config.override)
//               Object.assign(agentConfigFromPool, locationClone.override)
//             }
//
//             // const agent = new Agent(locationClone.config.x, locationClone.config.y, Object.assign(locationClone.config, agentConfigFromPool));
//             const agent = new Agent(locationClone.x, locationClone.y, Object.assign(locationClone, agentConfigFromPool));
//
//             this.addAgent(agent, spawnerConfig);
//             // this.addAgent(agent, Object.freeze(spawnerConfig));
//
//             console.groupEnd()
//           }
//         } else {
//           console.log('no location!')
//         }
//         break;

      default:
        break;
    }

  }

  pickRandomLocation(spawnerConfig) {
    let location, invalidLocation = false;
    switch (spawnerConfig.type) {
      case constants.SPAWNER_TYPE.AGENT:
        location = this.spawnLocations.agents[spawnerConfig.agentSpawnerIndex].locations[Math.floor(Math.random() * this.spawnLocations.agents[spawnerConfig.agentSpawnerIndex].locations.length)];
        // is there already an agent there?
        invalidLocation = this.agents.length && this.agents.length > spawnerConfig.agentSpawnerIndex && this.agents[spawnerConfig.agentSpawnerIndex].some((obj) => {
          return obj.x === location.x && obj.y === location.y;
        });
        break;
      default:
        break;
    }

    if (invalidLocation) {
      return this.pickRandomLocation(spawnerConfig);
    }
    // console.log('random location', location)
    return new LocationConfig(location);
    // return location;
  }

  pickRandomAgentFromPool(location, spawnerConfig) {
    const agentPool = location.pool || this.spawnLocations.agents[spawnerConfig.agentSpawnerIndex].globalPool || [];
    if (!agentPool) {
      return undefined;
    }
    const agentKey = agentPool[Math.floor(Math.random() * agentPool.length)];
    // console.log('         >>  pick random agent', agentKey);

    if (!agentKey) {
      return undefined;
    }

    const agentConfig = this.agentPool.getAgentConfig(agentKey);

    return new AgentConfig(agentConfig);
    // return agentConfig;
  }

  findTransportByObjectConfigId(id) {
    return this.transports.find(transport => {
      // console.log('find transport by objectConfigId', transport.objectConfig)
      return transport.objectConfig.id === id;
    });
  }
  addTransport(transport) {
    // console.log('addTransport', transport.objectConfig)

    if (!this.findTransportByObjectConfigId(transport.objectConfig.id)) {


      // dont spawn for a transport that is parked on another scene
      let okToSpawn = true;
      if (!transport.isBoardedTransport && this.scene.ember.gameData && this.scene.ember.gameData.transports) {
        const savedTransportInThisSceneIndex = this.scene.ember.gameData.transports.findIndex(savedTransport => {
            return savedTransport.id === transport.objectConfig.id;
        });
        if (savedTransportInThisSceneIndex >= 0) {
          okToSpawn = this.scene.ember.gameData.transports[savedTransportInThisSceneIndex].map === this.scene.mapname;
        }
      }

      // this.scene.ember.gameData.transports

      if (okToSpawn) {
        // console.log('going to spawn transport', transport);
        this.transports.pushObject(transport);
        this.scene.events.emit('transportSpawned', transport);
      }
    } else {
      // console.log('already spawned transport with id', transport.objectConfig.id);
    }
  }

  deleteTransport(transportId) {
    delete this.transports[transportId];
  }

  addAgent(agent, agentSpawnerIndex) {
    // console.log('*** spawner service - add agent', agent.id, agent.x, agent.y, agent);

      if (this.agents.length <= agentSpawnerIndex) {
        // this.agents.pushObject(emberArray([]));
        this.agents.push([]);
      }
      this.agents[agentSpawnerIndex].push(agent);
      this.scene.events.emit('agentSpawned', agent);
  }

  deleteAgent(agentContainer) {
    console.log('!!! delete agent', agentContainer)

    if (this.agents.length === 0) {
      console.error('no agents to delete', agentContainer);
    }

    this.agents.forEach((agentGroup, agentGroupIndex) => {
      const index = agentGroup.findIndex(agentObj => {
        return agentObj.id === agentContainer.agent.playerConfig.uuid;
      });

      if (index > -1) {
        this.agents[agentGroupIndex].splice(index, 1);
      }
    });
  }
}
