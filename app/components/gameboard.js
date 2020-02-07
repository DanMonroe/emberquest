import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import config from 'emberquest/config/environment';

import PhaserGame from '../phaser/game'

export default class GameboardComponent extends Component {
  @service game;
  @service modals;

  @tracked epmModalContainerClass = '';

  constructor() {
    super(...arguments);

    this.modals.set('modalsDuration', config.game.modalsDuration);

  }

  @action
  setup(element) {
    console.log('setup', element, element.clientHeight, element.clientWidth);

    new PhaserGame(this.game, element.clientHeight - 68, element.clientWidth);
  }

  @action
  teardown(element) {
    console.log('teardown', element);
  }

  @action
  async showConfigDialog() {
    this.epmModalContainerClass = 'config';
    await this.modals.open('config-dialog');
  }

  @action
  async showInventory() {
    this.epmModalContainerClass = 'inventory';
    await this.modals.open('inventory-dialog');
  }

  @action
  async clickGems() {
    console.log('click gems');
  }

  @action
  saveGame() {
    console.log('Component Save Game');
    // this.game.saveGame();
  }

}
