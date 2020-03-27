import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
// import { constants } from 'emberquest/services/constants';

export default class InstructionsDialogComponent extends Component {

  @service game;

  constructor() {
    super(...arguments);

  }


}
