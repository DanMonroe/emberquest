import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';

export class BaseAgent {

  @tracked maxHealth;
  @tracked health;
  @tracked maxPower;
  @tracked power;
  @tracked healingSpeed;
  @tracked healingPower;


  @task
  *reloadHealth() {
    while (this.health < this.maxHealth) {
      yield timeout(this.healingSpeed);
      this.health += Math.max(1, this.healingPower);
      this.updateHealthBar();
    }
  }
}
