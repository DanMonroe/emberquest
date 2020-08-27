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
  @service storage;

  @tracked currentNavCategory = this.leftNavItems[0];
  @tracked volume = this.gameManager.soundEffectsVolume * 100;
  @tracked musicVolume = this.gameManager.musicEffectsVolume * 100;

  @tracked faqList = [];

  @tracked fixCommand = '';

  constructor() {
    super(...arguments);
    this.buildFAQ();
  }

  buildFAQ() {
    this.faqList = [];
    let faqId = 1;
    this.faqList.push({
      id: faqId++,
      title: 'I have a question that is not covered here. Where can I find the answer?',
      content: 'You may send an email to \'emberquestgeocache@gmail.com\' or a geocaching message to \'teammonroes\' and I will answer as soon as possible.  When common questions are asked, I\'ll add them to this FAQ list.'
    });
    this.faqList.push({
      id: faqId++,
      title: 'My Avatar is stuck and can\'t move!  What can I do?',
      content: 'Try refreshing your browser so the game will reload.  If that doesn\'t help, try following the tips in the \'Self Help\' tab on the left side of this dialog.'
    });
    this.faqList.push({
      id: faqId++,
      title: 'I\'m stuck! Are there any game hints?',
      content: 'In the cache listing dialog, or the trophy icon at the top, each cache is displayed along with the details. If there is a hint available, it will also be listed there but will be encrypted.  Click the decrypt link to read the hint.  If you have discovered the cache in the game, you will see a hint for the physical hide if available.'
    });
    this.faqList.push({
      id: faqId++,
      title: 'The enemies are too easy or too hard!',
      content: 'It is very possible that the gameplay may be a little unbalanced at first.  If you find an area that is too easy or hard, please send an email to \'emberquestgeocache@gmail.com\' and describe what map you are on (from the top of the page), your level, what enemies you are having trouble with, and any other info you may have; your inventory for example.  I\'ll adjust the area if needed.'
    });
    this.faqList.push({
      id: faqId++,
      title: 'I found a cache in the game but I forgot to write down the coordinates.  Where are the coordinates?',
      content: 'The cache listing dialog, or the trophy icon at the top, will show you the real physical coordinates for each cache you have found in the game.'
    });
    this.faqList.push({
      id: faqId++,
      title: 'I think I found a bug.  Where do I report it?',
      content: 'Undoubtedly, there will be bugs I have not discovered as of yet.  Please report them with an email and please add \'EmberQuest BUG\' somewhere in the subject.  Also, include which browser you were using and if you\'re using Windows or a Mac'
    });
    this.faqList.push({
      id: faqId++,
      title: 'How did you build EmberQuest?',
      content: "EmberQuest was written with the EmberJS JavaScript framework.  I did a virtual conference talk for EmberConf 2020 discussing how it was developed. <a href='https://www.youtube.com/watch?v=vObogyci7m8&feature=youtu.be&t=4684' target='_new'>EmberQuest - Building an Octane Role Playing Game</a>.  There is also an <a href='https://danmonroe.dev/' target='_new'>old blog from the early proof of concept</a>."
    });
  }

  setVolume(self, event) {
      self.volume = +event.target.value;
      self.gameManager.soundEffectsVolume = self.volume / 100;
      self.gameManager.soundEffects.setVolume(self.gameManager.soundEffectsVolume);
      self.gameManager.playSound({key:'pop'}, true, self.gameManager.soundEffectsVolume);
      self.saveSettingsData.perform(self);
  }

  setMusicVolume(self, event) {
      self.musicVolume = +event.target.value;
      self.gameManager.musicEffectsVolume = self.musicVolume / 100;
      self.gameManager.musicEffects.setVolume(self.gameManager.musicEffectsVolume);
      self.gameManager.playSound({key:'pop'}, true, self.gameManager.musicEffectsVolume);
      self.saveSettingsData.perform(self);
  }

  @restartableTask
  *saveSettingsData(self) {
    yield timeout(400);
    self.game.saveSettingsData();
  }

  get leftNavItems() {
    let leftNavItems = [
      {
        text: 'Settings',
        clazz: 'settings'
      },
      {
        text: 'Help',
        clazz: 'help'
      },
      {
        text: 'FAQ',
        clazz: 'faq'
      },
      {
        text: 'Credits',
        clazz: 'credits'
      }
    ];

    if (true || this.game.debug.selfhelp) {
      leftNavItems.push(
        {
          text: 'Self Help',
          clazz: 'selfhelp'
        }
      );
    }
    return leftNavItems;
  }

  @action
  async goback() {
    await this.game.gobackTask.perform();
    if (this.args.close) {
      this.args.close();
    }
  }

  @action
  async runfix() {
    await this.game.fixItTask.perform(this.fixCommand);
    if (this.args.close) {
      this.args.close();
    }
  }

  @action
  async castleTeleport() {
    await this.game.fixItTask.perform(this.game.constants.CASTLE_TELEPORT);
    if (this.args.close) {
      this.args.close();
    }
  }

  @action
  pickCategory(category) {
    this.currentNavCategory = category;
  }

}
