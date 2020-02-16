import Service from '@ember/service';
import { inject as service } from '@ember/service';
import {Player} from "../objects/agents/player";

export default class GameManagerService extends Service {
  @service('spawner') spawnerService;

  scene = undefined;
  ember = undefined;
  storedData = undefined;

  spawners = {};
  chests = {};
  monsters = {};  // same as agents?
  players = {};
  agents = {};
  transports = {};

  spawnLocations = {
    players : [],
    chests : [],
    monsters : [],  // same as agent?
    agents : [],
    transports : []
  }

  setup(scene) {
    this.scene = scene;
    this.ember = scene.ember;
    this.storedData = scene.storedData;

    this.setupEventListener();
    this.setupSpawners();
    this.spawnPlayer();
  }

  // setupSpawnLocations() {
  //   console.log('setupSpawnLocations')
  //   this.scene.MapData.spawnLocations.players.forEach(spawnerConfig => {
  //     console.log('player location spawnerConfig', spawnerConfig)
  //     this.spawnLocations.players.push(spawnerConfig);
  //   });
  //   if (this.scene.MapData.spawnLocations.transports) {
  //     this.scene.MapData.spawnLocations.transports.forEach(spawnerConfig => {
  //       console.log('transport location spawnerConfig', spawnerConfig)
  //       this.spawnLocations.transports.push(spawnerConfig);
  //     });
  //   }
  //   if (this.scene.MapData.spawnLocations.chests) {
  //     this.scene.MapData.spawnLocations.chests.forEach(spawnerConfig => {
  //       console.log('chest location spawnerConfig', spawnerConfig)
  //       this.spawnLocations.transports.push(spawnerConfig);
  //     });
  //   }
  //   if (this.scene.MapData.spawnLocations.monsters) {
  //     this.scene.MapData.spawnLocations.monsters.forEach(spawnerConfig => {
  //       console.log('monster location spawnerConfig', spawnerConfig)
  //       this.spawnLocations.transports.push(spawnerConfig);
  //     });
  //   }
  //   if (this.scene.MapData.spawnLocations.agents) {
  //     this.scene.MapData.spawnLocations.agents.forEach(spawnerConfig => {
  //       console.log('agent location spawnerConfig', spawnerConfig)
  //       this.spawnLocations.transports.push(spawnerConfig);
  //     });
  //   }
  // }

  setupEventListener() {
    console.log('setupEventListener')
  }

  setupSpawners() {
    console.log('setupSpawners')
    this.spawnerService.setup(this.scene, this.scene.MapData.spawnLocations);

  }

  spawnPlayer() {
    console.log('spawnPlayer');

    const playerTile = this.storedData.storedPlayerTile ? {x: this.storedData.storedPlayerTile.x, y: this.storedData.storedPlayerTile.y} : {x: this.MapData.player.startX, y: this.MapData.player.startY};

    this.playerConfig = {
      playerX: playerTile.x,
      playerY: playerTile.y,
      texture: 'player',
      scale: 1.25,
      face: 0,
      coneMode: 'direction',
      cone: 6,
      speed: 200,
      sightRange: 3,   // this is sight/movement Range
      movingPoints: 3,   // this is sight/movement Range
      visiblePoints: 8,   // this is sight/movement Range

      health: 100,
      maxHealth: 200,
      power: 150,
      maxPower: 200,
      id: 'player1',
      playerAttackAudio: undefined, // when ready, get from Boot scene

      flagAttributes: {
        sightFlags: this.storedData.storedPlayerAttrs.sightFlags || 0,
        travelFlags: this.storedData.storedPlayerAttrs.travelFlags || this.ember.constants.FLAGS.TRAVEL.LAND.value
      },

      costCallback:  (tileXY) => {
        return this.ember.map.getTileAttribute(this.scene, tileXY, 'sightCost');
        // return this.ember.map.getTileAttribute(this.board.scene, tileXY, 'sightCost');
      },
      preTestCallback: (tileXYArray) => {

        // Limit sight range tp player's sightRange
        // array includes player hex so add one
        // return tileXYArray.length <= (this.playerConfig.sightRange + 1);
        return tileXYArray.length <= (this.player.container.sightRange + 1);
        // return tileXYArray.length <= (this.player.sightRange + 1);
      },

      debug: {
        // graphics: this.add.graphics().setDepth(10),
        log: false
      }

    };


    this.player = new Player(this.scene, this.playerConfig);
    this.players[this.player.id] = this.player;

    console.log('emit spawnPlaner', this.player)
    this.scene.events.emit('spawnPlayer', this.player);

  }
}
