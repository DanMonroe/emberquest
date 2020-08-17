
export default class Chest {

  defaultSpriteConfig = {
    name: 'chest',
    prefix: 'items/chest',
    animeframes: [
      {key: 'chest-closed', prefix: 'items/chest', start: 1, end: 1},
      {key: 'chest-open', prefix: 'items/chest', start: 2, end: 2}
    ],
    scale: .3
  }


  constructor(scene, chestObj) {
    this.scene = scene; // the scene this game object will be added to

    this.id = chestObj.id;
    this.gold = chestObj.gold; // the amount of coins this chest contains
    this.inventory = chestObj.inventory; // the amount of coins this chest contains
    this.coords = chestObj.coords;
    this.gccode = chestObj.gccode;
    this.specialActions = chestObj.specialActions;
    this.requires = chestObj.requires;    // anything required in order to pick chest up?
    this.mountMessageDisplayed = false;    // keep track if they already tried to get the chest while mounted

    // previously found?
    this.found = this.scene.ember.cache.isCacheFound(this.gccode);

    this.createSprite(chestObj);
  }

  createSprite(chestObj) {
    if (!chestObj.spriteConfig) {
      chestObj.spriteConfig = Object.assign({}, this.defaultSpriteConfig);
    }
    const chest = this.scene.add.sprite(chestObj.x, chestObj.y, this.scene.ember.constants.SPRITES_TEXTURE);
    // const chest = this.scene.add.sprite(chestObj.x, chestObj.y, this.scene.ember.constants.SPRITES_TEXTURE, chestObj.firstFrame);

    // if (chestObj.spriteConfig.offsets && chestObj.spriteConfig.offsets.img) {
    //   chest.x += chestObj.spriteConfig.offsets.img.x;
    //   chest.y += chestObj.spriteConfig.offsets.img.y;
    // }
    chest.setScale(chestObj.spriteConfig.scale);
    chest.type = this.scene.ember.constants.SHAPE_TYPE_CHEST;

    this.animKeys = [];
    let frameNames;
    let animationConfig;
    chestObj.spriteConfig.animeframes.forEach(animation => {
      frameNames = this.scene.anims.generateFrameNames(this.scene.ember.constants.SPRITES_TEXTURE, {
        start: animation.start, end: animation.end, zeroPad: 0,
        prefix: chestObj.spriteConfig.prefix, suffix: '.png'
      });
      animationConfig = Object.assign({ key: animation.key, frames: frameNames, frameRate: animation.rate, repeat: animation.repeat }, animation.config || {});

      this.scene.anims.create(animationConfig);
      // if (animation.playoncreate) {
      //   chest.anims.play(animation.key);
      // }
      this.animKeys.push(animation.key);
    });

    if (chestObj.ignoreFOVUpdate) {
      chest.setData('ignoreFOVUpdate', true);
    }
    if (chestObj.specialActions) {
      chest.setData('specialActions', chestObj.specialActions);
    }
    if (chestObj.clickable) {
      chest.setData('clickable', true);
    }

    if (chestObj.properties) {
      chestObj.properties.forEach(prop => {
        chest.setData(prop.key, prop.value);
      });
    }

    this.sprite = chest;

    this.sprite.setAlpha(0)

    this.sprite.emberObj = this;  // so we can get to base attrs

    this.scene.chests.add(this.sprite);

    chest.setAlpha(chestObj.initialAlpha || 0);
    this.scene.board.addChess(chest, chestObj.x, chestObj.y, this.scene.ember.constants.TILEZ_CHESTS);

    chest.anims.play(this.found ? this.animKeys[1] : this.animKeys[0]);

    this.sprite.body.setSize(20,20);

    this.scene.add.existing(this.sprite);

    this.sprite.setDepth(this.scene.ember.constants.TILEZ_CHESTS);


  }

  playerFoundChest() {
    // console.log('player found chest', this);
    this.scene.ember.foundChest(this);
  }
}
