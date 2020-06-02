import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {

  ember = undefined;

  width = 1;
  height = 1;

  scaleX = 1;
  offsetX = 1;
  offsetY = 1;
  barWidth = 1;
  barHeight = 1;

  constructor() {
    super({
      key: 'Boot',
      pack: {
        files: [ { type: 'image', key: 'loading', url: '/images/loading_background.png' } ]
      }
    });
  }

  preload() {
    this.ember = this.game.ember;

    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    const loading = this.add.image(0, 0, 'loading').setOrigin(0,0);
    loading.displayWidth = this.width;
    loading.scaleY = loading.scaleX;
    this.scaleX = loading.scaleX;

    this.offsetX = (loading.displayWidth / 2) - (123.886989553656212 * this.scaleX);
    this.offsetY = (loading.displayHeight / 2) - (43 * this.scaleX);
    this.barWidth = (246.476733143399793 * this.scaleX);
    this.barHeight = (20 * this.scaleX);
    // console.log('this.offsetX = ', this.offsetX)
    // console.log('this.offsetY = ', this.offsetY)
    // console.log('this.barWidth = ', this.barWidth)
    // console.log('this.barHeight = ', this.barHeight)
    // console.log('loading.displayWidth = ', loading.displayWidth)
    // console.log('loading.displayHeight = ', loading.displayHeight)


    // https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/

    this.newGraphics = this.add.graphics();
    const progressBarFill = new Phaser.Geom.Rectangle(this.width/2, this.height/2, 190, 15);

    this.newGraphics.fillStyle(0xff0000, 1);
    this.newGraphics.fillRectShape(progressBarFill);

    const fontSize = `${(26 * this.scaleX)}px`;

    const loadingText = this.add.text(this.offsetX - (35 * this.scaleX),this.offsetY + (60 * this.scaleX),"Loading: ", { fontSize: fontSize, fill: '#222' });

    // load images
    this.loadImages();

    // load spritesheets
    this.loadSpriteSheets();

    // load audio
    this.loadAudio();

    this.load.on('progress', this.updateBar, {
      newGraphics:this.newGraphics,
      loadingText:loadingText,
      x:this.offsetX,
      y:this.offsetY,
      barWidth: this.barWidth,
      barHeight: this.barHeight
    });
    this.load.on('fileprogress', this.updateFileProgress, {loadingText:loadingText});
    this.load.on('complete', this.complete,{loadingText:loadingText});

  }

  updateFileProgress(file) {
    // console.log(file);
    this.loadingText.setText('Loading: ' + file.key);
  }

  updateBar(percentage) {
    this.newGraphics.clear();
    this.newGraphics.fillStyle(0xfab328, 1);
    // console.log('x', this.x, 'y', this.y, 'barWidth', this.barWidth, 'barHeight', this.barHeight)

    this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(this.x, this.y, percentage*this.barWidth, this.barHeight));

    percentage = percentage * 100;
  }

  complete() {
    this.loadingText.setText('Enjoy!');
  }

  loadImages() {
    this.load.image('player', this.ember.playerImgSrc);
    this.load.image('cutter', '/images/transports/cutter.png');

    // this.load.image('pirategalleon', '/images/agents/pirate-galleon.png');

    // portals
    this.load.image('signpost', '/images/maps/signpost.png');

    // portals
    this.load.image('door_wooden_n', '/images/maps/portals/door-wooden-n.png');

    this.load.image('ball', '/images/items/ballBlack_04.png');
    this.load.image('bullet', '/images/items/bullet7.png');

    this.load.image('missile', '/images/items/missile-n.png');

  }

  loadSpriteSheets() {
    this.load.spritesheet('chests', '/images/chest_sprite.png', { frameWidth: 140, frameHeight: 140 });

    this.load.spritesheet('young-ogre', '/images/monsters/young-ogre.png', { frameWidth: 72, frameHeight: 72 });
    this.load.spritesheet('spider', '/images/monsters/spider.png', { frameWidth: 72, frameHeight: 72 });
    this.load.spritesheet('dog', '/images/monsters/dog.png', { frameWidth: 72, frameHeight: 72 });


    // this.load.multiatlas('brazier', '/images/brazier.json', '/images');
  }

  loadAudio() {
    this.load.audio('open_door_1', ['/audio/sounds/open_door_1.mp3']);
    this.load.audio('pickup', ['/audio/sounds/pickup.wav']);

    this.load.audio('sword_hit', ['/audio/sounds/chink.mp3']);
    this.load.audio('sword_miss', ['/audio/sounds/sword_miss.mp3']);
    this.load.audio('arrow', ['/audio/sounds/arrow.mp3']);


    // this.load.audio('music1', ['/audio/music/uncharted_territory_justin_monroe.mp3']);

    // this.load.audio('music1', ['/audio/warframe_ost.mp3']);

    // this.load.audio('enemyDeath', ['assets/audio/EnemyDeath.wav']);
    // this.load.audio('playerAttack', ['assets/audio/PlayerAttack.wav']);
    // this.load.audio('playerDamage', ['assets/audio/PlayerDamage.wav']);
    // this.load.audio('playerDeath', ['assets/audio/PlayerDeath.wav']);
  }

  create() {

    this.game.ember.initializeCachesAlreadyFound();


    this.game.ember.loadGameData("gameboard")
      .then(gameboardData => {
        // console.log('gameboardData', gameboardData);

        // TODO:  If you update what is loaded here, also update checkForPortal in game.js

        const overrideMapImage = (this.game.ember.overrideMap && this.game.ember.overrideMap.map) ? this.game.ember.overrideMap.map : undefined;

        // let data = {'map': overrideMapImage || 'arena'};
        // let data = {'map': overrideMapImage || 'intro3'};

        // let data = {'map': 'intro3'} // cutter ship
        let data = {'map': overrideMapImage || 'intro'}  // default initial map

        if (gameboardData) {

          this.game.ember.gameData.transports = gameboardData.transports;

          gameboardData.currentMap = overrideMapImage || gameboardData.currentMap
          const sceneData =   gameboardData.sceneData[gameboardData.currentMap] || { allSeenTiles: [], storedTransports: [], boarded: 0};
// console.log('sceneData', sceneData)
          data = {
            'map': gameboardData.currentMap,
            'overrideMap': this.game.ember.overrideMap,
            'gameboardData': gameboardData,
            'sceneData': sceneData,

            'storedPlayerTile': gameboardData.playerTile,
            'storedPlayerAttrs': gameboardData.playerAttrs,
            'allSeenTiles': sceneData.seenTiles,
            'storedTransports': sceneData.transports, // keeps track of transports in one scene
            'boarded': gameboardData.playerAttrs.boardedTransport  // the id of the transport the player is on
            // 'boarded': this.playerContainer.boardedTransport ? this.playerContainer.boardedTransport.agent.id : 0

          }
        }

        // console.log('data', data);

        this.game.ember.map.getDynamicMapData(data.map).then(mapData => {
          // console.log('mapData', mapData);
          data.mapData = mapData;

          this.scene.start('gameboard',  data);
        });



        // this.scene.start('gameboard',  data);
      });
  }

}
