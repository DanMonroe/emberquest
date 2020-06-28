import BasePhaserAgentContainer from "../base-phaser-agent-container";
import {tracked} from '@glimmer/tracking';

export default class TransportContainer extends BasePhaserAgentContainer {

  @tracked config;

  constructor(scene, config, agent) {

    super(scene, config);
    this.containerType = this.scene.game.ember.constants.SHAPE_TYPE_TRANSPORT;


    // create the tranport
    // this.transport = new TransportPhaserAgent(this.scene, config);
    // this.add(this.transport);

    this.agent = agent;
    this.config = config;
    this.phasertransportSprite = this.transport;

    this.setupSprite();

    this.setData('attrs', config.flagAttributes);

    this.moveToObject = this.scene.rexBoard.add.moveTo(this, {
      speed: config.speed, // 400 default
    });

    this.moveToObject.on('complete', this.moveToComplete);

    this.moveToObject.moveableTestCallback = (curTile, targetTile, pathFinder) => {
      // console.log('transport moveTo testCallback', curTile, targetTile, pathFinder.scene.player.container.rexChess.tileXYZ)

      const canMove = ( (pathFinder.scene.player.container.rexChess.tileXYZ.x === targetTile.x) &&
        (pathFinder.scene.player.container.rexChess.tileXYZ.y === targetTile.y) );

      if (this.ember.map.tileIsDock(pathFinder.scene, targetTile)) {
        return false;
      }
      // console.log('transport canMove', canMove);
      return canMove;

    };


    this.createHealthBar();
    this.reloadHealth.perform();
    this.reloadPower.perform();
  }

  createAnimation(animationConfig) {
    let frameNames = this.scene.anims.generateFrameNames(this.ember.constants.SPRITES_TEXTURE,
      {
        start: animationConfig.start,
        end: animationConfig.end,
        zeroPad: 0,
        prefix: animationConfig.prefix,
        suffix: '.png'
      });
    let thisAnimationConfig = Object.assign({ key: animationConfig.key, frames: frameNames, frameRate: animationConfig.rate, repeat: animationConfig.repeat }, animationConfig || {});
    // console.log('transport thisAnimationConfig', thisAnimationConfig)
    this.scene.anims.create(thisAnimationConfig);
  }


  setupSprite() {
    const transportSprite = this.scene.add.sprite(0, 0, this.config.texture || this.ember.constants.SPRITES_TEXTURE);
    if (this.config.offsets.img) {
      transportSprite.x += this.config.offsets.img.x;
      transportSprite.y += this.config.offsets.img.y;
    }

    // console.log('sprite config', this.config)
    transportSprite.setScale(this.config.scale);

    this.add(transportSprite);

    this.phaserAgentSprite = transportSprite;

    if (this.config.animeframes) {
      if (this.config.animeframes.rest) {
        this.createAnimation(this.config.animeframes.rest);
      }
      if (this.config.animeframes.move) {
        this.createAnimation(this.config.animeframes.move);
      }
    }

    transportSprite.on('animationcomplete',  (anim, frame) => {
      transportSprite.emit('animationcomplete' + anim.key.replace(this.config.texture, ""), anim, frame);
    }, transportSprite);

    if (this.config.animeframes.rest) {
      transportSprite.on('animationcomplete-rest', () => {
      });
    }
    if (this.config.animeframes.move) {
      transportSprite.on('animationcomplete-move', () => {
        this.playAnimation(this.ember.constants.ANIMATION.KEY.REST);
      });
    }

    // start playing the rest animation
    // this.playAnimation(this.ember.constants.ANIMATION.KEY.MOVE);
    this.playAnimation(this.ember.constants.ANIMATION.KEY.REST);
  }

  stopAnimation() {
    this.phaserAgentSprite.anims.stop();
  }

  playAnimation(key) {
    switch (key) {
      case this.ember.constants.ANIMATION.KEY.REST:
        // start playing the rest animation
        if (this.config.animeframes.rest) {
          this.phaserAgentSprite.anims.play(this.config.animeframes.rest.key);
        }
        break;
      case this.ember.constants.ANIMATION.KEY.MOVE:
        if (this.config.animeframes.move) {
          this.phaserAgentSprite.anims.play(this.config.animeframes.move.key);
        }
        break;
      default:
        break;
    }
  }

  moveToComplete(/*transport, moveTo*/) {
    // console.log('moved transport')
  }

}
