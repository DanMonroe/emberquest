import Phaser from "phaser";

export default class Projectile extends Phaser.Physics.Arcade.Image {
  constructor (scene, x, y, key) {
    // debugger;
    super(scene, x, y, key || 'bullet');
    // super(scene, x, y, 'bullet');
    // super(scene, x, y, 'projectile');

    this.damage = 1;
  }


  fire(attacker, radians, weapon){
    // console.log('fire attackerXYZ', attackerXYZ)
    const x = Math.cos(radians);
    const y = Math.sin(radians);

    let worldXY = this.scene.board.tileXYToWorldXY(attacker.rexChess.tileXYZ.x, attacker.rexChess.tileXYZ.y);

    console.log('fire projectile:  this', this);
    // console.log('fire projectile:  radians', radians, 'x', x, 'y', y, 'this', this, 'attacker.rexChess.tileXYZ', attacker.rexChess.tileXYZ, 'worldXY', worldXY, 'attacker', attacker);

    this.setRotation(radians);

    // this.setOffset(100, 0)
    // this.setDisplayOrigin(0.1, 0.1)

    this.enableBody();

    this.setActive(true);
    this.setVisible(true);

    this.setPosition(worldXY.x, worldXY.y);
    // this.setPosition(worldXY.x + (attacker.width), worldXY.y + (attacker.height));
    // this.setPosition(worldXY.x + (attacker.width/2), worldXY.y + (attacker.height/2));
// debugger;
    this.setVelocityY(y * (weapon.velocity || 300));
    this.setVelocityX(x * (weapon.velocity || 300));

    // this.scene.time.addEvent({
    //   delay: 3500,
    //   callback: () => {
    //     // this.disableBody();
    //     this.active = false;
    //     this.visible = false;
    //     // this.setVelocity(0);
    //   }
    // });
  }
}
