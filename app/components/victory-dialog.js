import Component from '@glimmer/component';
import {timeout} from 'ember-concurrency';
import {task} from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class VictoryDialogComponent extends Component {
  @service modals;
  @service game;

  // counterSpeed = 500;
  counterSpeed = 100;

  @tracked params;
  @tracked player;
  @tracked levelStartXP;
  @tracked levelEndXP;
  @tracked levelXPRange;

  @tracked xpGainedCounter = 0;
  @tracked gemsGainedCounter = 0;

  @tracked xpTotal;

  constructor() {
    super(...arguments);

    this.params = this.modals.top._data;

    this.player = this.params.player;

    this.setLevelStartAndEndXP();

    // console.log('levelStartXP', this.levelStartXP, 'levelEndXP', this.levelEndXP, 'levelXPRange', this.levelXPRange, 'currentXP', this.currentXP)
    this.countXP.perform(this.params.xp);
    this.countGems.perform(this.params.gems);

    this.game.gameManager.player.gold += this.params.gems;
  }

  setLevelStartAndEndXP() {
    this.levelStartXP = this.game.gameManager.getExperienceFromLevel(this.params.player.level);
    this.levelEndXP = this.game.gameManager.getExperienceFromLevel(this.params.player.level+1);
    this.levelXPRange = this.levelEndXP - this.levelStartXP;
  }

  levelUp() {
    // show any visual effect?

    this.setLevelStartAndEndXP();
  }

  @task
  *countXP(maxXP) {
    this.xpGainedCounter = 0;

    const xpSinceStartXP = this.player.experience - this.levelStartXP;

    while (this.xpGainedCounter < maxXP) {
      this.xpGainedCounter++;
      this.player.experience++;

      this.xpTotal = Math.min(100, Math.floor(((xpSinceStartXP + this.xpGainedCounter) / this.levelXPRange) * 100));

      if (this.player.experience >= this.levelEndXP) {
        this.levelUp();
      }

      yield timeout(this.counterSpeed);
    }
  }

  @task
  *countGems(maxXP) {
    this.gemsGainedCounter = 0;
    while (this.gemsGainedCounter < maxXP) {
      this.gemsGainedCounter++;
      this.player.gold++;
      yield timeout(this.counterSpeed);
    }
  }
}
