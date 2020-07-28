import Phaser from "phaser";

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
// export default class Projectile extends Phaser.Physics.Arcade.Image {
  constructor (scene, x, y, key) {
    // debugger;

    super(scene, x, y, key || 'bullet');
    // const agentSprite = this.scene.add.sprite(0, 0, this.config.texture || this.ember.constants.SPRITES_TEXTURE);

    // super(scene, x, y, 'bullet');
    // super(scene, x, y, 'projectile');

    this.damage = 1;
  }


  fire(attacker, radians, weapon){
// console.log('fire attackerXYZ', attacker, radians, weapon)
    const x = Math.cos(radians);
    const y = Math.sin(radians);

    let worldXY = this.scene.board.tileXYToWorldXY(attacker.rexChess.tileXYZ.x, attacker.rexChess.tileXYZ.y);
    // console.log('worldXY', worldXY)
    // console.log('fire projectile:  this', this);
    // console.log('fire projectile:  radians', radians, 'x', x, 'y', y, 'this', this, 'attacker.rexChess.tileXYZ', attacker.rexChess.tileXYZ, 'worldXY', worldXY, 'attacker', attacker);

    this.originOfProjectile = {x: worldXY.x, y:worldXY.y};

    this.setRotation(radians);

    // this.setOffset(100, 0)
    // this.setDisplayOrigin(0.1, 0.1)

    this.enableBody();

    if (weapon.animeframes && weapon.animeframes.length > 0) {
      let key = `${weapon.animeframes[0].key}-inventory-${weapon.animeframes[0].type}`;
      this.anims.load(key);
      this.play(key);
    }

      this.setActive(true);
    this.setVisible(true);

    this.setPosition(worldXY.x, worldXY.y);
    this.setVelocityY(y * (weapon.velocity || 300));
    this.setVelocityX(x * (weapon.velocity || 300));

  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    const cameraBounds = this.scene.cameras.main;
    if (this.y <= 0 || this.x <= 0 || this.y >= cameraBounds.height || this.x >= cameraBounds.width ||
      (this.projectileDistance(this.originOfProjectile.x, this.x, this.originOfProjectile.y, this.y) > 200)) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  projectileDistance(x2, x1, y2, y1) {
    return Math.hypot(x2-x1, y2-y1);
  }
}
