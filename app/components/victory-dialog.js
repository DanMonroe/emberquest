import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class VictoryDialogComponent extends Component {
  @service modals;
  @service game;

  @tracked params;
  @tracked player;

  constructor() {
    super(...arguments);

    this.params = this.modals.top._data;

    this.player = this.params.player;

  }

}
