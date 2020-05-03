// import { timeout } from 'ember-concurrency';
// import { task } from 'ember-concurrency-decorators';
// import { tracked } from '@glimmer/tracking';
// import { Agent } from "./models/agent";
// import { Transport } from "./models/transport";
// import { constants } from 'emberquest/services/constants';
//
// export class Spawner {
//
//   @tracked objectsCreated = 0;
//   // @tracked objectLimit = 2;
//   @tracked objectLimit = 1;
//
//   spawnerService = undefined;
//
//   // constants = undefined;
//
//   constructor(spawnerService, config, spawnLocations, addObject, deleteObject, agentPoolService) {
//     this.spawnerService = spawnerService;
//
//     this.id = config.id;
//     this.config = config;
//     this.spawnInterval = config.spawnInterval;
//     this.objectLimit = config.objectLimit || 1;
//     this.objectType = config.spawnerType;
//     this.spawnLocations = spawnLocations;
//     this.addObject = addObject;
//     this.deleteObject = deleteObject;
//
//     this.agentPoolService = agentPoolService;
//     // this.agentPool = config.agentPool || [];
//
//     this.objectsCreated = [];
//
//     this.spawnObjects.perform();
//   }
//
//   @task
//   *spawnObjects() {
//     while (true) {
//       if (this.spawnerService.shouldSpawn(this.objectType)) {
//         console.log('   >> spawner object ' + this.id + ' shouldSpawn')
//         this.spawnObject();
//       } else {
//         console.log('   >> spawner object - NO!! Dont spawn')
//       }
//       // if (this.objectsCreated <= this.objectLimit) {
//       //    this.spawnObject();
//       // }
//       // console.log('   >> spawner object ' + this.id + ' spawning object', this.objectType)
//       yield timeout(this.spawnInterval);
//     }
//     // if (this.objectType === SpawnerType.MONSTER) this.moveMonsters();
//   }
//
//   spawnObject() {
//     // console.log('   >> spawner object ' + this.id + ' - spawnObject', this.objectType)
//     switch (this.objectType) {
//       case constants.SPAWNER_TYPE.TRANSPORT:
//         this.spawnTransport();
//         break;
//       case constants.SPAWNER_TYPE.AGENT:
//         this.spawnAgent();
//         break;
//       default:
//         break;
//     }
//
//     // console.log('spawn object.  count:', this.objectsCreated)
//     // this.objectsCreated++;  // temp counter
//   }
//
//   spawnTransport() {
//     const location = this.pickLocationById();
//
//     const transport = new Transport(location.x, location.y, this.id, this.config.objectConfig);
//
//     // console.log('spawnTransport', transport);
//     this.objectsCreated.push(transport);
//     this.addObject(transport.id, transport);
//   }
//
//   spawnAgent() {
//     const location = this.pickRandomLocation();
// console.log('   >> spawner object - location', location)
//
//     const agentConfigFromPool = this.pickRandomAgentFromPool();
// console.log('   >> spawner object ' + this.id + ' agentConfigFromPool', agentConfigFromPool)
//     if (agentConfigFromPool) {
//
//       const agent = new Agent(location.x, location.y, this.id, Object.assign(this.config.objectConfig, agentConfigFromPool));
//
//       // console.log('spawnMonster', monster);
//       this.objectsCreated.push(agent);
//       this.addObject(agent.id, agent);
//     }
//
//   }
//
//   removeObject(id) {
//     // this.objectsCreated = this.objectsCreated.filter(obj => obj.id !== id);
//     this.deleteObject(id);
//   }
//
//   pickRandomAgentFromPool() {
//     if (!this.config.objectConfig.agentPool) {
//       return undefined;
//     }
//     const agentKey = this.config.objectConfig.agentPool[Math.floor(Math.random() * this.config.objectConfig.agentPool.length)];
//     console.log('   >> spawner object ' + this.id + ' pick random agent', agentKey);
//
//     if (!agentKey) {
//       return undefined;
//     }
//
//     const agentConfig = this.agentPoolService.getAgentConfig(agentKey);
//
//     return agentConfig;
//   }
//
//   pickRandomLocation() {
//     const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];
//     // const invalidLocation = this.objectsCreated.some((obj) => {
//     //   return obj.x === location[0] && obj.y === location[1];
//     // });
//     //
//     // if (invalidLocation) {
//     //   return this.pickRandomLocation();
//     // }
//     return location;
//   }
//
//   pickLocationById() {
//     // id's are in the MapData
//     return this.spawnLocations[this.config.locationId];
//   }
//
// }
