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

    // signs
    this.load.image('signpost', '/images/maps/signpost.png');

    // portals
    this.load.image('door_wooden_n', '/images/maps/portals/door-wooden-n.png');
    this.load.image('door_iron_n', '/images/maps/portals/iron_gate_closed_n.png');
    this.load.image('door_iron_se', '/images/maps/portals/iron_gate_closed_se.png');
    this.load.image('door_iron_sw', '/images/maps/portals/iron_gate_closed_sw.png');

  }

  loadSpriteSheets() {
    // this.load.spritesheet('chests', '/images/chest_sprite.png', { frameWidth: 140, frameHeight: 140 });

    this.load.multiatlas('eq_sprites', '/images/sprites/eq_sprites.json', '/images/sprites');
  }

  loadAudio() {
    // TODO two separate sprites?   sound effects and scene music
    this.load.audioSprite('eq_audio', '/audio/sounds/eq_audio.json');
    this.load.audioSprite('eq_music', '/audio/music/eq_music.json');
  }

  async create() {

    this.game.ember.loadSettingsData();
    this.game.ember.loadPlayerStats();
    this.game.ember.initializeCachesAlreadyFound();
    this.game.ember.initializeRoyalEmberPlaced();


    let currentMap = await this.game.ember.loadGameData('currentMap');
    let playerAttrs = await this.game.ember.loadGameData('playerAttrs');
    let transports = await this.game.ember.loadGameData('transports');
    let sceneData = await this.game.ember.loadGameData('sceneData');
    let playerTile = await this.game.ember.loadGameData('playerTile');

    const overrideMapImage = (this.game.ember.overrideMap && this.game.ember.overrideMap.map) ? this.game.ember.overrideMap.map : undefined;

    if (overrideMapImage) {
      currentMap = overrideMapImage;
    }
    let newData = {
      map: overrideMapImage || 'castle',        // default initial map
      overrideMap: this.game.ember.overrideMap
    };

    this.game.ember.gameData.transports = transports || [];

    if (playerAttrs) {
      this.game.ember.placedBrazier = playerAttrs.re;  // Royal Ember
      newData.storedPlayerAttrs = playerAttrs;
      // newData.playerAttrs = playerAttrs;
      newData.boarded = playerAttrs.boardedTransport;
    }
    if (currentMap) {
      newData.map = currentMap;
    }
    if (playerTile) {
      newData.storedPlayerTile = currentMap ? playerTile : undefined;
    }

    if (sceneData) {
      let sceneDataForMap;
      if (currentMap) {
        sceneDataForMap = sceneData[currentMap] || { allSeenTiles: [], storedTransports: [], boarded: 0};
      } else {
        sceneDataForMap = { allSeenTiles: [], storedTransports: [], boarded: 0};
      }
      newData.sceneData = sceneDataForMap;
      newData.allSeenTiles = sceneDataForMap.seenTiles;
      newData.storedTransports = sceneDataForMap.transports;  // keeps track of transports in one scene
      newData.spawnTile = sceneDataForMap.spawnTile?.x ? {x: sceneDataForMap.spawnTile.x, y: sceneDataForMap.spawnTile.y, sF: playerAttrs.sF, tF: playerAttrs.tF } : {};
    }

    // console.log('newData', newData);

    //         // TODO:  If you update what is loaded here, also update checkForPortal in game.js

    try {
      this.game.ember.map.getDynamicMapData(newData.map).then(mapData => {
        // console.log('mapData (boot)', mapData);
        newData.mapData = mapData;
        newData.mapData.mapKey = newData.map;

        this.scene.start('gameboard', newData);
      });
    } catch (error) {
      console.error(error)
      debugger;
    }


  }

}
