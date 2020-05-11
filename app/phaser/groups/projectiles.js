import Phaser from 'phaser';

export default class Projectiles extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, config) {
    super(world, scene);
    this.scene = scene;

    this.createMultiple(config);
  }

  fireProjectile(scene, attacker, targetTile, weapon){
  // fireProjectile(attackerXYZ, radian){
    const projectile = this.getFirstDead(false);
    if (projectile) {

      const radians = scene.board.angleBetween(attacker.rexChess.tileXYZ, targetTile);

      // change the image
      if (weapon.projectileImg && projectile.texture.key !== weapon.projectileImg) {
        projectile.setTexture(weapon.projectileImg);
        if (weapon.projectileScale) {
          // projectile.setTexture(weapon.projectileScale);
        }
      }

      if (attacker.agent.rangedAttackDamage) {
        projectile.damage = attacker.agent.rangedAttackDamage;
      }

      // projectile.setScale(0.4);
      projectile.fire(attacker, radians, weapon);
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
    enemy.takeDamage(projectile.damage, enemy.agent, projectile.scene.player);
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

}
