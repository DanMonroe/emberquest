import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class CodeExampleDialogComponent extends Component {
  tagName = '';

  @service modals;

  item = undefined;

  constructor() {
    super(...arguments);

    this.item = this.modals.top._data;
  }
}
