import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {

  ember = undefined;

  constructor() {
    super({
      key: 'Boot'
    });
  }

  preload() {
    this.ember = this.game.emberGame;

    // load images
    this.loadImages();

    // load spritesheets
    this.loadSpriteSheets();

    // load audio
    this.loadAudio();

  }

  loadImages() {
    this.load.image('player', this.ember.playerImgSrc);
    this.load.image('playership', '/images/transports/ship.svg');
    this.load.image('monsters', '/images/monsters/spider.png');
    this.load.image('galleon', '/images/agents/galleon.svg');

  }

  loadSpriteSheets() {
    this.load.spritesheet('chests', '/images/chest_sprite.png', { frameWidth: 140, frameHeight: 140 });
    // this.load.spritesheet('monsters', '/images/monsters/spider.png', { frameWidth: 140, frameHeight: 140 });
    // this.load.spritesheet('items', 'assets/images/items.png', { frameWidth: 32, frameHeight: 32 });
    // this.load.spritesheet('characters', 'assets/images/characters.png', { frameWidth: 32, frameHeight: 32 });
    // this.load.spritesheet('monsters', 'assets/images/monsters.png', { frameWidth: 32, frameHeight: 32 });
  }

  loadAudio() {
    this.load.audio('pickup', ['/audio/pickup.wav']);
    this.load.audio('music1', ['/audio/warframe_ost.mp3']);
    // this.load.audio('enemyDeath', ['assets/audio/EnemyDeath.wav']);
    // this.load.audio('playerAttack', ['assets/audio/PlayerAttack.wav']);
    // this.load.audio('playerDamage', ['assets/audio/PlayerDamage.wav']);
    // this.load.audio('playerDeath', ['assets/audio/PlayerDeath.wav']);
  }

  create() {

    this.game.emberGame.loadGameData("gameboard")
        .then(gameboardData => {
          // console.log('gameboardData', gameboardData);
          this.scene.start('gameboard',  gameboardData ?
            {
              'storedPlayerTile': gameboardData.playerTile,
              'storedPlayerAttrs': gameboardData.playerAttrs,
              'allSeenTiles': gameboardData.seenTiles,
              'storedTransports': gameboardData.transports,
            } :
            {}
          );
        });
    // this.game.emberGame.loadGameData("playerTile")
    //     .then(storedPlayerTile => {
    //
    //       this.scene.start('gameboard', {
    //           'storedPlayerTile': storedPlayerTile
    //         }
    //       );
    //     });
  }

}
