import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
// import { constants } from 'emberquest/services/constants';

export default class GameMessagesDialogComponent extends Component {

  @service game;

  @service messages;

  @tracked messageList;

  constructor() {
    super(...arguments);
    this.messageList = this.messages.getMessageList();
    // console.log('messageList', this.messageList)

  }


}
