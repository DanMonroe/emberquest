import Component from '@glimmer/component';
import { inject as service } from '@ember/service';


export default class DeathDialogComponent extends Component {
  @service modals;
  @service game;

  constructor() {
    super(...arguments);

    this.params = this.modals.top._data;

    this.deathDetails = this.params.deathDetails;
  }
}
