import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class MessagesService extends Service {
  @tracked messageList;

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
}
