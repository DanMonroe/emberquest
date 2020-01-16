import Service from '@ember/service';
import Phaser from 'phaser';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

let _this = undefined;

export default class PhaserService extends Service {

  config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'gameContainer',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true
      }
    },
    scene: {
      preload: this.preload,
      create: this.create,
      update: this.update
    }
  };


  @service ('map') mapService;

  @tracked game;
  @tracked platforms;
  @tracked cursors;
  @tracked map;

  @tracked player;

  // _this = undefined;

  createNewPhaserGame(height, width) {

    _this = this;

    _this.mapService.test('1');

    this.config.height = height;
    this.config.width = width;
    this.game = new Phaser.Game(this.config);

    _this.mapService.test('2');
  }

  preload() {
    console.log('preload');

    this.load.image('map', '/images/maps/landsea-min.png');
    this.load.image('player', '/images/agents/pirate.png');

    // this.load.setBaseURL('http://labs.phaser.io');
    //
    // this.load.image('sky', 'assets/skies/space3.png');
    // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // this.load.image('red', 'assets/particles/red.png');

  }

  create() {
    // console.log('create');
    this.map = this.add.image(900, 918, 'map');

    // don't go out of the map
    this.physics.world.bounds.width = this.map.width;
    this.physics.world.bounds.height = this.map.height;

    this.player = this.physics.add.sprite(400, 250, 'player');

    this.player.setCollideWorldBounds(true);

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // this.mapService = _this.mapService;

    console.log(this);

    // both the arrow keys and the Q W S A D E keys
    this.cursors = {...this.input.keyboard.createCursorKeys(), ...this.input.keyboard.addKeys('Q,W,S,A,D,E')};


    // if (cursors.left.isDown) {
    //   console.log('left');
    //   this.player.setVelocityX(-160);
    //   // player.anims.play('left', true);
    // } else if (cursors.right.isDown) {
    //   console.log('right');
    //   this.player.setVelocityX(160);
    //   // player.anims.play('right', true);
    // }
    //
    // if (cursors.up.isDown) {
    //   console.log('up');
    //   this.player.setVelocityY(-160);
    //   // player.anims.play('left', true);
    // } else if (cursors.down.isDown) {
    //   console.log('down');
    //   this.player.setVelocityY(160);
    //   // player.anims.play('right', true);
    // }

    // this.add.image(400, 300, 'sky');
    //
    // var particles = this.add.particles('red');
    //
    // var emitter = particles.createEmitter({
    //   speed: 100,
    //   scale: { start: 1, end: 0 },
    //   blendMode: 'ADD'
    // });
    //
    // var logo = this.physics.add.image(400, 100, 'logo');
    //
    // logo.setVelocity(100, 200);
    // logo.setBounce(1, 1);
    // logo.setCollideWorldBounds(true);
    //
    // emitter.startFollow(logo);
  }

  update() {
    // console.log('update');
    const playerSpeed = 300;
    // const playerSpeed = 120;

    this.player.setVelocity(0);

    if (this.cursors.left.isDown || this.cursors.A.isDown) {
      // this.mapService.test('West');
      // _this.mapService.test('West');
      this.player.setVelocityX(-playerSpeed);

    } else if (this.cursors.right.isDown || this.cursors.D.isDown) {

      this.player.setVelocityX(playerSpeed);

    }

    if (this.cursors.up.isDown || this.cursors.W.isDown) {

      this.player.setVelocityY(-playerSpeed);

    } else if (this.cursors.down.isDown || this.cursors.S.isDown) {

      this.player.setVelocityY(playerSpeed);

    }

    // if (this.cursors.left.isDown || this.cursors.A.isDown || this.cursors.Q.isDown) {
    //
    //   this.player.setVelocityX(-160);
    //
    // } else if (this.cursors.right.isDown || this.cursors.D.isDown || this.cursors.E.isDown) {
    //
    //   this.player.setVelocityX(160);
    //
    // }
    //
    // if (this.cursors.up.isDown || this.cursors.W.isDown || this.cursors.Q.isDown || this.cursors.E.isDown) {
    //
    //   this.player.setVelocityY(-160);
    //
    // } else if (this.cursors.down.isDown || this.cursors.S.isDown || this.cursors.A.isDown || this.cursors.D.isDown) {
    //
    //   this.player.setVelocityY(160);
    //
    // }
    //
  }
}
