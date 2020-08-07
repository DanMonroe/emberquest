import Phaser from 'phaser';

export default class Projectiles extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, config) {
    super(world, scene);
    this.scene = scene;

    this.createMultiple(config);
  }

  fireProjectile(scene, attacker, targetTile, weapon, didAttackHit){
    const projectile = this.getFirstDead(false);
    if (projectile) {

      const radians = scene.board.angleBetween(attacker.rexChess.tileXYZ, targetTile);

      if (attacker.agent.rangedAttackDamage) {
        projectile.damage = attacker.agent.rangedAttackDamageDuringCombat;
      }
      if (!didAttackHit) {
        projectile.damage = 0;
      }

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
    const takeDamageOptions = {
      baseDamage: projectile.damage,
      agentTakingDamage: enemy.agent,
      agentAttacking: projectile.scene.player
    }

    enemy.takeDamage(takeDamageOptions);
  }

  // playerCollision (projectile, player) {
  playerCollision (player, projectile) {  // why is this reversed?
    projectile.active = false;
    projectile.visible = false;
    projectile.setVelocity(0);
    projectile.disableBody();
    // console.log('player.takeDamage', projectile)
    const takeDamageOptions = {
      baseDamage: projectile.damage,
      agentTakingDamage: player.agent,
      killedBy: projectile.name
    }

    player.takeDamage(takeDamageOptions);
  }

}
