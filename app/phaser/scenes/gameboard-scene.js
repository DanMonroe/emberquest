import Phaser from 'phaser';

export class GameboardScene extends Phaser.Scene {

  ember = undefined;
  MapData = undefined;
  lastSeenTiles = new Set();
  allSeenTiles = new Set();
  storedPlayerTile = undefined;

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
    this.load.image('player', this.ember.playerImgSrc);

  }

  create() {
    console.log('create gameboard scene');

    this.cameras.main.zoom = this.ember.cameraMainZoom;

    const playerTile = this.storedPlayerTile ? {x: this.storedPlayerTile.x, y: this.storedPlayerTile.y} : {x: this.MapData.player.startX, y: this.MapData.player.startY};

    const playerConfig = {
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

    this.map = this.add.image(0, 0, 'map');
    this.map.setOrigin(0,0);

    // don't go out of the map
    this.physics.world.bounds.width = this.map.width;
    this.physics.world.bounds.height = this.map.height;

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);

    // The Q W S A D E keys
    this.cursors = {...this.input.keyboard.addKeys('Q,W,S,A,D,E')};

    // Board
    this.board = this.ember.map.createBoard(this, {
      grid: this.ember.map.getHexagonGrid(this),
      width: this.MapData.sceneTiles[0].length,
      height: this.MapData.sceneTiles.length,
      sceneTiles: this.MapData.sceneTiles,
      allSeenTiles: this.allSeenTiles,
      showHexInfo: this.ember.showHexInfo
    });

    // Player
    this.player = this.ember.createPlayer(this, playerConfig);
    // this.player = new Player(this, playerConfig);
    console.log('Created Player', this.player);


    // make the camera follow the player
    this.cameras.main.startFollow(this.player);


    this.ember.map.findFOV(this.player);

    // // The Q W S A D E keys
    // this.cursors = {...this.input.keyboard.addKeys('Q,W,S,A,D,E')};
    // this.cursors = {...this.input.keyboard.createCursorKeys(), ...this.input.keyboard.addKeys('Q,W,S,A,D,E')};

    this.boardExperiments();


    // spawn objects
    this.ember.spawnerService.spawnObjects.perform();
  }

  boardExperiments() {

    // click end tileXY
    this.board.on('tiledown',  (pointer, tileXY) => {
      const allAttrs = this.ember.map.getTileAttribute(this, tileXY);
      const clickedShape = this.board.tileXYToChessArray(tileXY.x, tileXY.y);
      console.log('tiledown tileXY', tileXY,'allAttrs', allAttrs, clickedShape);
    });
  }


  update() {

    this.player.moveTo(this.cursors);

    // playerMoveTo(this.cursors, this.player.playerMoveTo);


  }
}

// class Blocker extends RexPlugins.Board.Shape {
//   constructor(board, tileXY) {
//     var scene = board.scene;
//     if (tileXY === undefined) {
//       tileXY = board.getRandomEmptyTileXY(0);
//     }
//     // Shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)
//     super(board, tileXY.x, tileXY.y, 0, 0x000000, 0);
//     // super(board, tileXY.x, tileXY.y, 0, 0x555555);
//     scene.add.existing(this);
//   }
// }
