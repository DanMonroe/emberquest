import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import {inject as service} from '@ember/service';

export default class MessagesService extends Service {
  @tracked messageList;
  @service intl;

  addMessage(msgId, message) {
    if (this.messageList === undefined) {
      this.messageList = new Map();
    }
    this.messageList.delete(msgId);
    this.messageList.set(msgId, message);
  }

  getMessageList() {
    if (this.messageList === undefined) {
      this.messageList =  new Map();
    }
    return Array.from(this.messageList.values()).reverse();
  }


  numQuotes = 30;

  getRandomQuote() {
    return this.intl.t(`quotes.q${Math.floor(Math.random() * this.numQuotes)}`);
  }

}
