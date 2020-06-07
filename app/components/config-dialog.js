import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import {action} from '@ember/object';
// import {inject as service} from '@ember/service';

export default class ConfigDialogComponent extends Component {
  tagName = '';

  // @service game;

  @tracked currentNavCategory = this.leftNavItems[0];

  // @computed
  get leftNavItems() {
    return [
      {
        text: 'Settings',
        clazz: 'settings'
      },
      {
        text: 'Help',
        clazz: 'help'
      },
      {
        text: 'Credits',
        clazz: 'credits'
      }
    ];
  }

  @action
  pickCategory(category) {
    this.currentNavCategory = category;
  }

}
