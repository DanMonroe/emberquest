import Phaser from "phaser";

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, key) {
    // debugger;
    super(scene, x, y, key || 'bullet');
    // super(scene, x, y, 'bullet');
    // super(scene, x, y, 'projectile');

    this.damage = 10;
  }

  // preUpdate (time, delta)
  // {
  //   super.preUpdate(time, delta);
  //
  //   console.log('preupdate',time, delta, this)
  //   if (this.y <= -32)
  //   {
  //     console.log('setting inactive')
  //     this.setActive(false);
  //     this.setVisible(false);
  //   }
  // }

  fire(attackerXYZ, radian){
    // console.log('fire attackerXYZ', attackerXYZ)
    const x = Math.cos(radian);
    const y = Math.sin(radian);
    // console.log('fire projectile:  radian', radian, 'x', x, 'y', y, 'this', this);

    let worldXY = this.scene.board.tileXYToWorldXY(attackerXYZ.x, attackerXYZ.y);

    this.enableBody();
      // this.body.reset(x, y);

      this.setActive(true);
      this.setVisible(true);
    // console.log('setting position', worldXY.x, worldXY.y)
      this.setPosition(worldXY.x, worldXY.y);
      // this.setVelocityY(-300);
    this.setVelocityY(y * 300);
    this.setVelocityX(x * 300);

    this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        // this.disableBody();
        this.active = false;
        this.visible = false;
        // this.setVelocity(0);
      }
    });
  }

  // fire (x, y) {
  //   this.body.reset(x, y);
  //
  //   this.setActive(true);
  //   this.setVisible(true);
  //
  //   this.setVelocityY(-300);
  //
  //   // Hook into Ember
  //   this.scene.game.emberGame.bulletFired(this);
  // }

  // preUpdate (time, delta) {
  //   super.preUpdate(time, delta);
  //
  //   if (this.y <= -32)
  //   {
  //     this.setActive(false);
  //     this.setVisible(false);
  //   }
  // }
}
