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

      projectile.damage = 0;

      let rangedAttackDamage = 0;
      if (attacker.agent?.container?.boardedTransport) {
        rangedAttackDamage = attacker.agent.container.boardedTransport.agent.rangedAttackDamage;
      } else {
        rangedAttackDamage = attacker.agent.rangedAttackDamage;
      }
      if (rangedAttackDamage) {
        projectile.damage = attacker.agent.rangedAttackDamageDuringCombat(rangedAttackDamage);
      }

      if (!didAttackHit) {
        projectile.damage = 0;
      }
      projectile.setData('attacker', attacker);

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
      killedBy: `a ${projectile.getData('attacker').config.name}`
    }

    // console.log('projectile takeDamageOptions', takeDamageOptions);

    player.takeDamage(takeDamageOptions);
  }

}
