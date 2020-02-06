import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import PhaserGame from '../phaser/game'

export default class GameboardComponent extends Component {
  @service game;

  @action
  setup(element) {
    console.log('setup', element, element.clientHeight, element.clientWidth);

    // this.game.loadGame();

    new PhaserGame(this.game, element.clientHeight - 68, element.clientWidth);

    // this.game.saveGame();
  }

  @action
  teardown(element) {
    console.log('teardown', element);
  }
}
