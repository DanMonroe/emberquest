import Phaser from 'phaser';
import Chest from '../chest';
import Monster from '../monster';
import Projectiles from '../groups/projectiles';
import Projectile from "../groups/projectile";

export class GameboardScene extends Phaser.Scene {

  ember = undefined;
  mapData = undefined;
  lastSeenTiles = new Set();
  allSeenTiles = new Set();

  storedData = undefined;

  storedPlayerTile = undefined;
  storedPlayerAttrs = undefined;
  storedTransports = [];
  playerConfig = undefined;
  chests = {};
  monsters = {};
  enemyships = {};
  transports = {};
  agents = {};

  projectiles = {};
  agentprojectiles = {};  // hard coded extra group for emberconf

  constructor() {
    super({
      key: 'gameboard'
    });

    this.projectiles;
    this.agentprojectiles;
  }

  init(data){
    // console.log('gameboard init', data)
    this.mapname = data.map;
    this.storedData = data;
    this.storedPlayerTile = data.storedPlayerTile;
    this.allSeenTiles = data.allSeenTiles || new Set();
    this.storedTransports = data.storedTransports || [];
    this.storedPlayerAttrs = data.storedPlayerAttrs || {};
  }

  // async preload() {
  preload() {
    this.ember = this.game.ember;
    this.mapData = this.ember.map.getMapData(this.mapname);
    this.textures.remove('map');
    this.load.image('map', this.mapData.mapUrl);
  }

  create() {
    this.configureBoard();
    this.createInput();
    this.createBoard();
    this.createAudio();
    this.createGroups();
    this.createGameManager();
    this.boardExperiments();
    this.ember.saveSceneData(this);


    this.musicAudio.play();
  }

  boardExperiments() {
    // just a place to try new stuff out

    // click end tileXY to get info in console
    this.board.on('tiledown',  (pointer, tileXY) => {
      const allAttrs = this.ember.map.getTileAttribute(this, tileXY);
      const clickedShape = this.board.tileXYToChessArray(tileXY.x, tileXY.y);
      console.log(tileXY, allAttrs, clickedShape, this.ember.describePlayerFlags(this.player.container));
    });
  }

  createGameManager() {

    // this has to be before game manager setup
    this.events.on('spawnPlayer', (playerObject) => {
      this.spawnPlayer(playerObject);

      this.addCollisions();
    });

    this.events.on('chestSpawned', (chestObject) => {
      this.spawnChest(chestObject);
    });

    this.events.on('transportSpawned', (transportObject) => {
      this.spawnTransport(transportObject);
    });

    // this.events.on('monsterSpawned', (monsterObject) => {
    //   this.spawnMonster(monsterObject);
    // });

    this.events.on('agentSpawned', (agentObject) => {
      this.spawnAgent(agentObject);
    });

    this.board.on('tiledown',  async (pointer, tileXY) => {

      // // victory?
      // debugger;
      // this.ember.epmModalContainerClass = 'chest';
      // let chestModal = this.ember.modals.open('chest-dialog', {coords:'N 45 31.641, W 122 39.761'});




      // report tile info for debugging
      // const allAttrs = this.ember.map.getTileAttribute(this, tileXY);
      const clickedShape = this.board.tileXYToChessArray(tileXY.x, tileXY.y);
      // console.log(tileXY, allAttrs, clickedShape, this.ember.describePlayerFlags(this.player.container));

      this.ember.gameManager.attack(tileXY, clickedShape, this.player.container);
    });

    this.game.ember.gameManager.setup(this);
  }

  spawnPlayer(playerObject) {
    this.player = playerObject;

    this.board.addChess(playerObject.container, playerObject.playerConfig.playerX, playerObject.playerConfig.playerY, this.ember.constants.TILEZ_PLAYER);

    playerObject.container.fov = this.rexBoard.add.fieldOfView(playerObject.container, playerObject.playerConfig);
debugger;
    // // make the camera follow the player
    this.cameras.main.startFollow(playerObject.container);

    // update field of view
    this.ember.map.findFOV(playerObject.container);
  }

  spawnChest(chestObj) {
    let chest = new Chest(this, 0, 0, 'chests', 1, chestObj);
    chest.setAlpha(0);

    this.chests.add(chest);
    this.board.addChess(chest, chestObj.x, chestObj.y, this.ember.constants.TILEZ_CHESTS);
  }

  spawnMonster(monsterObj) {
    let monster = new Monster(this, 0, 0, 'monsters', 1, monsterObj.id, monsterObj.objectConfig.health, monsterObj.objectConfig.maxHealth);
    monster.setScale(monsterObj.objectConfig.scale);
    monster.setAlpha(0);

    this.monsters.add(monster);
    this.board.addChess(monster, monsterObj.x, monsterObj.y, this.ember.constants.TILEZ_MONSTERS);
  }

  spawnAgent(agentObj) {
    const agent = this.ember.createAgent(this, agentObj.objectConfig);
    agent.setAlpha(0);
    this.agents.add(agent);
    if (agentObj.objectConfig.patrol) {
      // agent.pushAgentWaypointToMoveQueue();
      agent.populatePatrolMoveQueue();
      agent.patrolTask.perform();
    }
  }

  spawnTransport(transportObj) {
    const storedTransport = this.ember.findTransportFromArrayById(this.storedTransports, transportObj.objectConfig.id);
    if (storedTransport && storedTransport.tile) {
      transportObj.objectConfig.x = storedTransport.tile.x;
      transportObj.objectConfig.y = storedTransport.tile.y;
    }
    transportObj.objectConfig.costCallback = (tileXY) => {
      return this.ember.map.getTileAttribute(this.board.scene, tileXY, 'sightCost');
    };
    transportObj.objectConfig.preTestCallback = (tileXYArray) => {
      return tileXYArray.length <= (this.player.sightRange + 1);
    }
    transportObj.objectConfig.debug = {
      // graphics: this.add.graphics().setDepth(10),
      log: false
    }

    const transport = this.ember.createTransport(this, transportObj.objectConfig);
    transport.setAlpha(0);
    this.transports.add(transport);
  }

  createAudio() {
    this.goldPickupAudio = this.sound.add('pickup', { loop: false, volume: 0.5 });
    this.musicAudio = this.sound.add('music1', { loop: true, volume: 0 });
  }

  configureBoard() {
    this.cameras.main.zoom = this.ember.cameraMainZoom;

    this.map = this.add.image(0, 0, 'map');
    this.map.setOrigin(0,0);

    // don't go out of the map
    this.physics.world.bounds.width = this.map.width;
    this.physics.world.bounds.height = this.map.height;

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
  }

  createBoard() {
    // const mapData = this.ember.getMapData();
    this.board = this.ember.map.createBoard(this, {
      grid: this.ember.map.getHexagonGrid(this),
      width: this.mapData.sceneTiles[0].length,
      height: this.mapData.sceneTiles.length,
      sceneTiles: this.mapData.sceneTiles,
      allSeenTiles: this.allSeenTiles,
      showHexInfo: this.ember.showHexInfo
    });
  }

  createGroups() {
    // create a chest group
    this.chests = this.physics.add.group();

    // create a transport group
    this.transports = this.physics.add.group();

    // create a monster group
    this.monsters = this.physics.add.group();
    // this.monsters.runChildUpdate = true;

    // create an agent group
    this.agents = this.physics.add.group();
    this.agents.runChildUpdate = true;

    // creating the projectiles
    this.projectiles = new Projectiles(this.physics.world, this, {
      frameQuantity: 3,
      key: 'bullet',
      active: false,
      visible: false,
      classType: Projectile
    });
    this.agentprojectiles = new Projectiles(this.physics.world, this, {
      frameQuantity: 3,
      key: 'ball',
      active: false,
      visible: false,
      setScale: { x: 0.1},
      classType: Projectile
    });
  }

  createInput() {
    // The Q W S A D E keys
    this.cursors = {...this.input.keyboard.addKeys('Q,W,S,A,D,E')};
  }

  addCollisions() {
    // check for collisions between the player and the tiled blocked layer
    // this.physics.add.collider(this.player, this.map.blockedLayer);

    // check for overlaps between player and chest game objects
    this.physics.add.overlap(this.player.container, this.chests, this.collectChest, null, this);

    // check for overlaps between player and transport game objects
    this.physics.add.collider(this.player.container, this.transports, this.boardTransport, this.boardTransportProcessCallback, this);
    // this.physics.add.overlap(this.player, this.transports, this.boardTransport, this.boardTransportProcessCallback, this);

    this.physics.add.overlap(this.projectiles, this.agents, this.projectiles.enemyCollision);
    this.physics.add.overlap(this.player.container, this.agentprojectiles, this.agentprojectiles.playerCollision);

    // check for collisions between the monster group and the tiled blocked layer
    // this.physics.add.collider(this.monsters, this.map.blockedLayer);

    // check for overlaps between the player's weapon and monster game objects
    // this.physics.add.overlap(this.player.weapon, this.monsters, this.enemyOverlap, null, this);

  }

  boardTransport(player, transport) {
    if (( ! player.boardedTransport) && ( ! player.embarkTransport)) {
    // if ( ! player.boardedTransport) {
      player.embarkTransport = true;
      player.transportToBoard = transport;
    }
  }

  boardTransportProcessCallback() {
    // console.log('boardTransportProcessCallback', arguments)
  }

  collectChest(player, chest) {
    if ( ! chest.found) {
    console.log('collect chest', arguments);
      this.goldPickupAudio.play();

      chest.playerFound();
    }
  }

  update() {
    // console.log('agents', this.agents)
    if (this.player) this.player.container.update(this.cursors);
    if (this.agents.children) {
      this.agents.getChildren().forEach(agentChild => {
        agentChild.update();
      });
    }
    // if (this.monsters.children) {
    //   this.monsters.children.each(monsterChild => {
    //     monsterChild.update();
    //   })
    // }
  }
}

