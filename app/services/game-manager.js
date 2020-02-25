import Service from '@ember/service';
import { inject as service } from '@ember/service';
import {Player} from "../objects/agents/player";
import { tracked } from '@glimmer/tracking';

export default class GameManagerService extends Service {
  @service('spawner') spawnerService;

  @tracked player;
  @tracked volume = 1;

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

  adjustVolume() {
    this.volume++;
    if (this.volume > 2) {
      this.volume = 0;
    }
    switch (this.volume) {
      case 0:
        this.scene.musicAudio.setVolume(0);
        break;
      case 1:
        this.scene.musicAudio.setVolume(0.4);
        break;
      case 2:
        this.scene.musicAudio.setVolume(1);
        break;
      default:
        break;
    }
  }


  setupEventListener() {
    this.scene.events.on('pickUpChest', (chestId, playerId) => {
      console.log('pickUpChest', chestId, playerId);
      // // update the spawner
      // if (this.chests[chestId]) {
      //   const { gold } = this.chests[chestId];
      //
      //   // updating the players gold
      //   this.players[playerId].updateGold(gold);
      //   this.scene.events.emit('updateScore', this.players[playerId].gold);
      //
      //   // removing the chest
      //   this.spawners[this.chests[chestId].spawnerId].removeObject(chestId);
      //   this.scene.events.emit('chestRemoved', chestId);
      // }
    });
  }

  setupSpawners() {
    this.spawnerService.setup(this.scene, this.scene.MapData.spawnLocations);
  }

  spawnPlayer() {
    const playerTile = this.storedData.storedPlayerTile ? {x: this.storedData.storedPlayerTile.x, y: this.storedData.storedPlayerTile.y} : {x: this.scene.MapData.player.startX, y: this.scene.MapData.player.startY};

    this.playerConfig = {
      playerX: playerTile.x,
      playerY: playerTile.y,
      texture: 'player',
      textureSize: { width: 42, height: 42},
      // scale: 0.1,
      scale: 0.4,
      face: 0,
      coneMode: 'direction',
      cone: 6,
      speed: 200,
      sightRange: 3,   // this is sight/movement Range
      movingPoints: 3,   // this is sight/movement Range
      // visiblePoints: 60,   // this is sight/movement Range
      visiblePoints: 6,   // this is sight/movement Range

      playerCoins: 1337,

      health: 200,
      maxHealth: 200,
      power: 200,
      maxPower: 200,
      id: 'player1',
      playerAttackAudio: undefined, // when ready, get from Boot scene

      flagAttributes: {
        sightFlags: (this.storedData.storedPlayerAttrs && this.storedData.storedPlayerAttrs.sightFlags) || 0,
        travelFlags: (this.storedData.storedPlayerAttrs && this.storedData.storedPlayerAttrs.travelFlags) || this.ember.constants.FLAGS.TRAVEL.LAND.value
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

    this.scene.events.emit('spawnPlayer', this.player);

  }

  findAgentAtTile(tileXY) {
    const agentShapes = this.ember.map.getGameObjectsAtTileXY(this.scene.board, tileXY, this.ember.constants.SHAPE_TYPE_AGENT);
    // console.log('agentShapes at tile', agentShapes)
    return agentShapes.length > 0 ? agentShapes[0] : null;
  }

  attack(clickedTile, clickedShape, attacker) {
    // console.log('attack', clickedTile, clickedShape, 'by', attacker);

    // const playerTileXYZ = this.scene.player.container.rexChess.tileXYZ;
    // console.log('player tile:', playerTileXYZ);
    // console.log('this.scene', this.scene);


    const agentToAttack = this.findAgentAtTile(clickedTile);
    if (agentToAttack) {
      const radian = this.scene.board.angleBetween(attacker.rexChess.tileXYZ, clickedTile);
      // const x = Math.cos(radian);
      // const y = Math.sin(radian);
      // console.log('radian', radian, 'x', x, 'y', y);

        // debugger;
      const isNeighbor = this.scene.board.areNeighbors(attacker.rexChess.tileXYZ, agentToAttack.rexChess.tileXYZ);
      // console.log('isNeighbor', isNeighbor)

      if (true) {
        this.scene.projectiles.fireProjectile(attacker.rexChess.tileXYZ, radian);
      } else {

      if (isNeighbor) {
        // Melee
        console.log('Melee Attack!');
      } else {
                            // Ranged attack
                            console.log('Ranged Attack!');

                            const isInLOS = attacker.ember.playerContainer.fov.isInLOS(agentToAttack.rexChess.tileXYZ);
                            console.log('in LOS', isInLOS);
                            if (isInLOS) {
                              // ok to fire projectile
                              this.scene.projectiles.fireProjectile(attacker.rexChess.tileXYZ, radian);
                            }
                          }
      }
    }
  }



}
