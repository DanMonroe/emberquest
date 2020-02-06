import Phaser from 'phaser';

export class GameboardScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'gameboard'
    })
  }

  MapData = undefined;

  lastSeenTiles = new Set();

  preload() {
    this.MapData = this.game.emberGame.getMapData();
    this.load.image('map', this.MapData.mapUrl);
    this.load.image('player', this.game.emberGame.playerImgSrc);

  }

  create() {
    console.log('create gameboard scene');

    this.cameras.main.zoom = this.game.emberGame.cameraMainZoom;

    const playerConfig = {
      playerX: this.MapData.player.startX,
      playerY: this.MapData.player.startY,
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
        travelFlags: this.game.emberGame.constants.FLAGS.TRAVEL.LAND.value
      },

      costCallback:  (tileXY) => {
        return this.game.emberGame.map.getTileAttribute(this.board.scene, tileXY, 'sightCost');
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
    this.board = this.game.emberGame.map.createBoard(this, {
      grid: this.game.emberGame.map.getHexagonGrid(this),
      width: this.MapData.sceneTiles[0].length,
      height: this.MapData.sceneTiles.length,
      sceneTiles: this.MapData.sceneTiles,
      showHexInfo: this.game.emberGame.showHexInfo
    });

    // Player
    this.player = this.game.emberGame.createPlayer(this, playerConfig);
    // this.player = new Player(this, playerConfig);
    console.log('Created Player', this.player);


    // make the camera follow the player
    this.cameras.main.startFollow(this.player);


    this.game.emberGame.map.findFOV(this.player);

    // // The Q W S A D E keys
    // this.cursors = {...this.input.keyboard.addKeys('Q,W,S,A,D,E')};
    // this.cursors = {...this.input.keyboard.createCursorKeys(), ...this.input.keyboard.addKeys('Q,W,S,A,D,E')};

    this.boardExperiments();

    console.log('this gameboard-scene', this)
  }

  boardExperiments() {

    // click end tileXY
    this.board.on('tiledown',  (pointer, tileXY) => {
      const allAttrs = this.game.emberGame.map.getTileAttribute(this, tileXY);

      console.log('tiledown tileXY', tileXY,'allAttrs',allAttrs);
      // this.player.moveToTileXY(tileXY);

      var clickedShape = this.board.tileXYToChessArray(tileXY.x, tileXY.y);
      console.log('clickedShape', clickedShape);
      // clickedShape[0].fillAlpha = 0;
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
