import Phaser from "phaser";

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, key) {

    super(scene, x, y, key || 'bullet');

    this.damage = 1;
  }


  fire(attacker, radians, weapon){
    const x = Math.cos(radians);
    const y = Math.sin(radians);

    let worldXY = this.scene.board.tileXYToWorldXY(attacker.rexChess.tileXYZ.x, attacker.rexChess.tileXYZ.y);

    this.originOfProjectile = {x: worldXY.x, y:worldXY.y};

    this.setRotation(radians);

    this.enableBody();
    this.body.setSize(20,20);

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

    // const cameraBounds = this.scene.cameras.main;
    // if (this.y <= 0 || this.x <= 0 || this.y >= cameraBounds.height || this.x >= cameraBounds.width ||
    //   (this.projectileDistance(this.originOfProjectile.x, this.x, this.originOfProjectile.y, this.y) > 200)) {

    if (this.projectileDistance(this.originOfProjectile.x, this.x, this.originOfProjectile.y, this.y) > 200) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  projectileDistance(x2, x1, y2, y1) {
    return Math.hypot(x2-x1, y2-y1);
  }
}
