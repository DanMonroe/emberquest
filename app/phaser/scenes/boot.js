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

    console.log('height', this.height, 'width', this.width, 'loading.scaleX', this.scaleX)

    this.newGraphics.fillStyle(0xff0000, 1);
    this.newGraphics.fillRectShape(progressBarFill);

    const fontSize = `${(26 * this.scaleX)}px`;
    console.log('fontSize', fontSize)

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
    // debugger;
  }

  loadImages() {
    this.load.image('player', this.ember.playerImgSrc);
    this.load.image('playerboat', '/images/transports/boat.png');
    // this.load.image('playership', '/images/transports/ship.svg');
    // this.load.image('monsters', '/images/monsters/spider.png');
    this.load.image('pirategalleon', '/images/agents/pirate-galleon.png');

    // portals
    this.load.image('door_wooden_n', '/images/maps/portals/door-wooden-n.png');

    this.load.image('ball', '/images/items/ballBlack_04.png');
    this.load.image('bullet', '/images/items/bullet7.png');

    this.load.image('missile', '/images/items/missile-n.png');

    // this.load.image('vue', '/images/agents/vue.png');
  }

  loadSpriteSheets() {
    this.load.spritesheet('chests', '/images/chest_sprite.png', { frameWidth: 140, frameHeight: 140 });

    this.load.spritesheet('young-ogre', '/images/monsters/young-ogre.png', { frameWidth: 72, frameHeight: 72 });
    this.load.spritesheet('spider', '/images/monsters/spider.png', { frameWidth: 72, frameHeight: 72 });

  }

  loadAudio() {
    this.load.audio('open_door_1', ['/audio/sounds/open_door_1.mp3']);
    this.load.audio('pickup', ['/audio/sounds/pickup.wav']);

    this.load.audio('sword_miss', ['/audio/sounds/sword_miss.mp3']);
    this.load.audio('arrow', ['/audio/sounds/arrow.mp3']);


    this.load.audio('music1', ['/audio/music/uncharted_territory_justin_monroe.mp3']);
    // this.load.audio('music1', ['/audio/warframe_ost.mp3']);

    // this.load.audio('enemyDeath', ['assets/audio/EnemyDeath.wav']);
    // this.load.audio('playerAttack', ['assets/audio/PlayerAttack.wav']);
    // this.load.audio('playerDamage', ['assets/audio/PlayerDamage.wav']);
    // this.load.audio('playerDeath', ['assets/audio/PlayerDeath.wav']);
  }

  create() {
    // this.add.image(10, 30, 'emberquestlogo');


    this.game.ember.initializeCachesAlreadyFound();

    // let data = {};

    this.game.ember.loadGameData("gameboard")
      .then(gameboardData => {
        console.log('gameboardData', gameboardData);

// let data = {'map': 'play'}  // default initial map
        let data = {'map': 'intro'}  // default initial map
        if (gameboardData) {
          const sceneData =   gameboardData.sceneData[gameboardData.currentMap] || { allSeenTiles: [], storedTransports: [], boarded: 0};
// console.log('sceneData', sceneData)
          data = {
            'map': gameboardData.currentMap,

            'gameboardData': gameboardData,
            'sceneData': sceneData,

            'storedPlayerTile': gameboardData.playerTile,
            'storedPlayerAttrs': gameboardData.playerAttrs,
            'allSeenTiles': sceneData.seenTiles,
            'storedTransports': sceneData.transports,
            'boarded': sceneData.boarded
          }
        }
// console.log('boot 1 - data', data)
//         this.ember.map.getDynamicMapData(data.map)
//           .then((mapData) => {
// console.log('boot 2', mapData)
//             debugger;
//             data.mapData = mapData;

            // this.scene.start('gameboard',  data);
          // })

        this.scene.start('gameboard',  data);
      });
  }

}
