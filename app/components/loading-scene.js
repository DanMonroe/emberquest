import Component from '@glimmer/component';
import {inject as service} from '@ember/service';
import {action} from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LoadingSceneComponent extends Component {
  tagName = '';

  @service gameManager;
  @service messages;

  @tracked quote;

  @action
  getQuote() {
    this.quote = this.messages.getRandomQuote();
  }
}
