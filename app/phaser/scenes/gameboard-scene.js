import Phaser from 'phaser';
import Chest from '../chest';

export class GameboardScene extends Phaser.Scene {

  ember = undefined;
  MapData = undefined;
  lastSeenTiles = new Set();
  allSeenTiles = new Set();
  storedPlayerTile = undefined;
  playerConfig = undefined;
  chests = {};
  monsters = {};

  constructor() {
    super({
      key: 'gameboard'
    });
  }

  init(data){
    this.storedPlayerTile = data.storedPlayerTile;
    this.allSeenTiles = data.allSeenTiles || new Set();
  }

  preload() {
    this.ember = this.game.emberGame;
    this.MapData = this.ember.getMapData();
    this.load.image('map', this.MapData.mapUrl);
  }

  create() {
    this.configureBoard();
    this.createInput();
    this.createBoard();

    this.createGroups();
    this.createASingleChest();

    this.createPlayer();
    this.startSpawnerService();

    this.addCollisions();


    this.boardExperiments();
  }

  boardExperiments() {
    // just a place to try new stuff out

    // click end tileXY to get info in console
    this.board.on('tiledown',  (pointer, tileXY) => {
      const allAttrs = this.ember.map.getTileAttribute(this, tileXY);
      const clickedShape = this.board.tileXYToChessArray(tileXY.x, tileXY.y);
      console.log(tileXY, allAttrs, clickedShape);
    });
  }

  createPlayer() {
    const playerTile = this.storedPlayerTile ? {x: this.storedPlayerTile.x, y: this.storedPlayerTile.y} : {x: this.MapData.player.startX, y: this.MapData.player.startY};

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

      flagAttributes: {
        sightFlags: 0,
        travelFlags: this.ember.constants.FLAGS.TRAVEL.LAND.value
      },

      costCallback:  (tileXY) => {
        return this.ember.map.getTileAttribute(this.board.scene, tileXY, 'sightCost');
      },
      preTestCallback: (tileXYArray) => {

        // Limit sight range tp player's sightRange
        // array includes player hex so add one
        if (tileXYArray.length > (this.player.sightRange + 1)) {
          return false;
        }

        return true;
      },

      debug: {
        // graphics: this.add.graphics().setDepth(10),
        log: false
      }

    };

    this.player = this.ember.createPlayer(this, this.playerConfig);
    // this.player = new Player(this, playerConfig);
    console.log('Created Player', this.player);


    // // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // update field of view
    this.ember.map.findFOV(this.player);

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
    this.board = this.ember.map.createBoard(this, {
      grid: this.ember.map.getHexagonGrid(this),
      width: this.MapData.sceneTiles[0].length,
      height: this.MapData.sceneTiles.length,
      sceneTiles: this.MapData.sceneTiles,
      allSeenTiles: this.allSeenTiles,
      showHexInfo: this.ember.showHexInfo
    });
  }

  createASingleChest() {

    let chest = new Chest(this, 442, 612, 'chests', 1, 100, 'chestFoo');
    chest.setAlpha(0);
    // chest.makeActive();

    this.chests.add(chest);
    this.board.addChess(chest, 3, 11, this.ember.constants.TILEZ_CHESTS);


    chest = new Chest(this, 442, 612, 'chests', 1, 100, 'chestBar');
    chest.setAlpha(0);
    // chest.makeActive();

    this.chests.add(chest);
    this.board.addChess(chest, 5, 9, this.ember.constants.TILEZ_CHESTS);
    // add chest to chests group
  }


  createGroups() {
    // create a chest group
    this.chests = this.physics.add.group();
    // create a monster group
    // this.monsters = this.physics.add.group();
    // this.monsters.runChildUpdate = true;
  }

  startSpawnerService() {
    // spawn objects
    this.ember.spawnerService.spawnObjects.perform();

  }

  createInput() {
    // The Q W S A D E keys
    this.cursors = {...this.input.keyboard.addKeys('Q,W,S,A,D,E')};
  }

  addCollisions() {
    // check for collisions between the player and the tiled blocked layer
    // this.physics.add.collider(this.player, this.map.blockedLayer);

    // check for overlaps between player and chest game objects
    this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);

    // check for collisions between the monster group and the tiled blocked layer
    // this.physics.add.collider(this.monsters, this.map.blockedLayer);

    // check for overlaps between the player's weapon and monster game objects
    // this.physics.add.overlap(this.player.weapon, this.monsters, this.enemyOverlap, null, this);

  }

  collectChest() {
    console.log('collect chest', arguments);
  }

  update() {
    this.player.moveTo(this.cursors);
  }
}

