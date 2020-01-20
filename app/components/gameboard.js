import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import PhaserGame from '../phaser/game'

export default class GameboardComponent extends Component {
  @service phaser

  @action
  setup(element) {
    console.log('setup', element, element.clientHeight, element.clientWidth);

    new PhaserGame(element.clientHeight - 68, element.clientWidth);
  }

  @action
  teardown(element) {
    console.log('teardown', element);
  }
}
