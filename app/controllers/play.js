import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PlayController extends Controller {

  @service phaser

  @action
  setup(element) {
    console.log('setup', element);
    this.phaser.createNewPhaserGame();
  }

  @action
  teardown(element) {
    console.log('teardown', element);
  }
}
