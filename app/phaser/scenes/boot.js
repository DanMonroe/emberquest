import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {

  ember = undefined;

  constructor() {
    super({
      key: 'Boot'
    });
  }

  preload() {
    this.ember = this.game.ember;

    // load images
    this.loadImages();

    // load spritesheets
    this.loadSpriteSheets();

    // load audio
    this.loadAudio();

  }

  loadImages() {
    this.load.image('player', this.ember.playerImgSrc);
    this.load.image('playerboat', '/images/transports/boat.png');
    // this.load.image('playership', '/images/transports/ship.svg');
    this.load.image('monsters', '/images/monsters/spider.png');
    this.load.image('pirategalleon', '/images/agents/pirate-galleon.png');
    // this.load.image('galleon', '/images/agents/galleon.svg');
    this.load.image('vue', '/images/agents/vue.png');

    this.load.image('ball', '/images/items/ballBlack_04.png');
    this.load.image('bullet', '/images/items/bullet7.png');
  }

  loadSpriteSheets() {
    this.load.spritesheet('chests', '/images/chest_sprite.png', { frameWidth: 140, frameHeight: 140 });
  }

  loadAudio() {
    this.load.audio('pickup', ['/audio/pickup.wav']);
    this.load.audio('music1', ['/audio/uncharted_territory_justin_monroe.mp3']);
    // this.load.audio('music1', ['/audio/warframe_ost.mp3']);

    // this.load.audio('enemyDeath', ['assets/audio/EnemyDeath.wav']);
    // this.load.audio('playerAttack', ['assets/audio/PlayerAttack.wav']);
    // this.load.audio('playerDamage', ['assets/audio/PlayerDamage.wav']);
    // this.load.audio('playerDeath', ['assets/audio/PlayerDeath.wav']);
  }

  create() {

    this.game.ember.loadGameData("gameboard")
      .then(gameboardData => {
        // console.log('gameboardData', gameboardData);

        let data = {'map': 'landsea'}  // default initial map
        if (gameboardData) {
          const sceneData =   gameboardData.sceneData[gameboardData.currentMap] || { allSeenTiles: [], storedTransports: []};

          data = {
            'map': gameboardData.currentMap,
            'storedPlayerTile': gameboardData.playerTile,
            'storedPlayerAttrs': gameboardData.playerAttrs,
            'allSeenTiles': sceneData.seenTiles,
            'storedTransports': sceneData.transports,
          }
        }

        this.scene.start('gameboard',  data);
      });
  }

}
