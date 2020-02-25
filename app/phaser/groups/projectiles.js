import Phaser from 'phaser';
import Projectile from './projectile';

  // constructor (world, scene, children) {
    // super(world, scene, children);

export default class Projectiles extends Phaser.Physics.Arcade.Group {
  constructor (world, scene) {
    super(world, scene);
    this.scene = scene;

    this.createMultiple({
      frameQuantity: 3,
      key: 'bullet',
      active: false,
      visible: false,
      classType: Projectile
    });
  }

  fireProjectile(attackerXYZ, radian){
    const projectile = this.getFirstDead(false);
    if (projectile) {
      // projectile.setScale(0.1);
      projectile.fire(attackerXYZ, radian);
    } else {
      console.warn('No projectiles!')
    }
  }

  enemyCollision (projectile, enemy) {
    // console.log('enemyCollision', projectile, enemy)
    projectile.active = false;
    projectile.visible = false;
    projectile.setVelocity(0);
    projectile.disableBody();
    console.log('enemy.takeDamage', projectile)
    enemy.takeDamage(projectile);
  }

  fireProjectileBad(attackerXYZ, radian){
    // const x = Math.cos(radian);
    // const y = Math.sin(radian);
    // console.log('fire projectile:  radian', radian, 'x', x, 'y', y, 'this', this);
    const projectile = this.getFirstDead(false);
      console.log('projectile',projectile);
    if (projectile) {
      projectile.fire(attackerXYZ, radian)

      // projectile.enableBody(true);
      // projectile.active = true;
      // projectile.visible = true;
      // projectile.setPosition(attackerXYZ.x, attackerXYZ.y);
      // projectile.setScale(0.1);
      // projectile.setVelocityY(y * -300);
      // projectile.setVelocityX(x * -300);

      this.scene.time.addEvent({
        delay: 1500,
        callback: () => {
          console.log('yo... done')
          projectile.disableBody();
          projectile.active = false;
          projectile.visible = false;
          projectile.setVelocity(0);
        }
      });
    }
  }

  fireProjectileOriginal (x, y, direction) {
    const projectile = this.getFirstDead(false);
    if (projectile) {
      projectile.enableBody(true);
      projectile.active = true;
      projectile.visible = true;
      projectile.setPosition(x, y);
      projectile.setScale(0.1);

      switch (direction) {
        case 'up':
          projectile.setVelocityY(-300);
          break;
        case 'down':
          projectile.setVelocityY(300);
          break;
        case 'left':
          projectile.setVelocityX(-300);
          break;
        case 'right':
          projectile.setVelocityX(300);
          break;
        default:
          projectile.setVelocityY(-300);
      }

      this.scene.time.addEvent({
        delay: 1500,
        callback: () => {
          projectile.disableBody();
          projectile.active = false;
          projectile.visible = false;
          projectile.setVelocity(0);
        }
      });
    }
  }
}
