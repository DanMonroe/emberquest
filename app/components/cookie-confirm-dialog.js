import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class CookieConfirmDialogComponent extends Component {

  @service game;

  constructor() {
    super(...arguments);
  }


}
