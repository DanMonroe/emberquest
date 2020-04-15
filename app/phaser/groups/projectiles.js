import Phaser from 'phaser';

export default class Projectiles extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, config) {
    super(world, scene);
    this.scene = scene;

    this.createMultiple(config);
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
    // console.log('enemy.takeDamage', projectile)
    enemy.takeDamage(projectile.damage, enemy.agent);
  }

  // playerCollision (projectile, player) {
  playerCollision (player, projectile) {  // why is this reversed?
    projectile.active = false;
    projectile.visible = false;
    projectile.setVelocity(0);
    projectile.disableBody();
    // console.log('player.takeDamage', projectile)
    player.takeDamage(projectile.damage, player.agent);
  }

  fireProjectileBad(attackerXYZ, radian){
    const projectile = this.getFirstDead(false);
      console.log('projectile',projectile);
    if (projectile) {
      projectile.fire(attackerXYZ, radian)

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
