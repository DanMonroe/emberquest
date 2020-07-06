import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import { timeout } from 'ember-concurrency';
import { restartableTask } from 'ember-concurrency-decorators';


export default class ConfigDialogComponent extends Component {
  tagName = '';

  @service gameManager;
  @service game;

  @tracked currentNavCategory = this.leftNavItems[0];
  @tracked volume = this.gameManager.soundEffectsVolume * 100;

  setVolume(self, event) {
      self.volume = +event.target.value;
      self.gameManager.soundEffectsVolume = self.volume / 100;
      // self.gameManager.playSound({key:'sword_miss'});
      self.gameManager.playSound({key:'pop'});
      self.saveSettingsData.perform(self);
  }

  @restartableTask
  *saveSettingsData(self) {
    yield timeout(400);
    self.game.saveSettingsData();
  }

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
