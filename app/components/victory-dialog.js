import Component from '@glimmer/component';
import {timeout} from 'ember-concurrency';
import {task} from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class VictoryDialogComponent extends Component {
  @service modals;
  @service game;

  counterSpeed = 100;

  @tracked awards;

  xpGained = 25;
  @tracked xpGainedCounter = 0;

  gemsGained = 100;
  @tracked gemsGainedCounter = 0;

  @tracked xpAchieved = 25;
  @tracked xpTotal = 25;


  constructor() {
    super(...arguments);

    this.awards = this.modals.top._data;

    this.countXP.perform(this.awards.xp);
    this.countGems.perform(this.awards.gems);

    this.game.gameManager.player.playerCoins += this.awards.gems;
  }

  @task
  *countXP(maxXP) {
    this.xpGainedCounter = 0;
    while (this.xpGainedCounter < maxXP) {
      this.xpGainedCounter++;
      this.xpTotal++;     // TODO  base this on percentage of what is needed for next level.
      yield timeout(this.counterSpeed);
    }
  }

  @task
  *countGems(maxXP) {
    this.gemsGainedCounter = 0;
    while (this.gemsGainedCounter < maxXP) {
      this.gemsGainedCounter++;
      yield timeout(this.counterSpeed);
    }
  }
}
