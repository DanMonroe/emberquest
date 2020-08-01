import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import config from 'emberquest/config/environment';
import localforage from 'localforage';
import { tracked } from '@glimmer/tracking';
import Phaser from "phaser";
import {BootScene} from "../phaser/scenes/boot";
import {GameboardScene} from "../phaser/scenes/gameboard-scene";
import rexBoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';


export default class GameboardComponent extends Component {
  @service('game') emberGameService;
  @service modals;
  @service router;

  @tracked cookieConfirmed = false;
  @tracked cookieDenied = false;

  // @reads ("emberGameService.playerContainer.scene.game.hasFocus") gameHasFocus;

  config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight - 68,
    parent: 'gameContainer',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {y: 0},
        debug: false
      }
    },
    pack: {
      files: [
        { type: 'image', key: 'logo', url: '/images/emberquestlogo.png' }
      ]
    },
    scene: [BootScene, GameboardScene],
    plugins: {
      scene: [
        // {
        //   key: 'rexawaitloaderplugin',
        //   plugin: awaitLoaderPlugin,
        //   start: true
        // },
        {
          key: 'rexBoard',
          plugin: rexBoardPlugin,
          mapping: 'rexBoard'
        }
      ]
    },
    pixelArt: true
  };


  constructor() {
    super(...arguments);

    this.modals.set('modalsDuration', config.game.modalsDuration);

    this.loadSettingsData();

    this.emberGameService.overrideMap = this.args.overrideMap;
    this.emberGameService.debug = this.args.debug;  // debug queryparam

    if (this.emberGameService.debug.phaserDebug) {
      this.config.physics.arcade.debug = true;
    }

  }

  async loadSettingsData() {
    const settingsData = await localforage.getItem('settings')
      .catch((err) => {
        console.error(err);
      });

    if (settingsData && settingsData.cookieConfirmed) {
        this.cookieConfirmed = true;
    } else {
      this.cookieConfirmed = await this.showDialog('gameMessages', 'cookie-confirm-dialog');
      this.cookieDenied = !this.cookieConfirmed;
      if (this.cookieConfirmed) {
        await this.saveGameData('settings', {
          'cookieConfirmed' : true,
        });
      } else {
        this.router.transitionTo('index');
      }
    }

    // return result;
  }

  async saveGameData(key, value) {
    await localforage.setItem(key, value)
      .then(() => {
        // console.log('done saving', value)
      }).catch((err) => {
        console.error(err);
      });
  }

  get volumeCSSClass() {
    return this.emberGameService.gameManager.mutedSoundEffectsVolume ? 'off' : 'up';
    // switch (this.emberGameService.gameManager.volume) {
    //   case 0:
    //     return 'off';
    //   case 1:
    //     return 'down';
    //   case 2:
    //     return 'up';
    //   default:
    //     break;
    // }
    // return 'off';
  }

  @action
  setup(/*element*/) {
    // console.log('gameboard setup', element, element.clientHeight, element.clientWidth);
  }

  @action
  teardown(/*element*/) {
    // console.log('teardown', element);
  }

  async showDialog(epmModalContainerClass, dialogComponent, options) {
    this.emberGameService.gameManager.pauseGame(true);
    this.emberGameService.epmModalContainerClass = epmModalContainerClass;
    let modalResult = await this.modals.open(dialogComponent, options);
    this.emberGameService.gameManager.pauseGame(false);
    return modalResult;
  }

  @action
  async showConfigDialog() {
    await this.showDialog('config', 'config-dialog');
  }

  @action
  async showInventory() {
    await this.showDialog('inventory', 'inventory-dialog');
  }

  @action
  async showGameMessagesDialog() {
    await this.showDialog('gameMessages', 'game-messages-dialog');
  }

  @action
  async showCaches() {
    await this.showDialog('caches', 'caches-dialog');
  }

  @action
  toggleVolume() {
    this.emberGameService.gameManager.toggleMuteVolume();
  }

  @action
  zoomCamera(direction) {
    // this.emberGameService.gameManager.zoomCamera(direction);
      console.log('zoom', direction, 'current', this.emberGameService.gameManager.scene.cameras.main.zoom);
      // this.emberGameService.gameManager.scene.cameras.main.zoom += direction;

      // original zoom: this.ember.cameraMainZoom;

  }

  @task
  *incrementZoomBy(incrementAmount) {
    if (incrementAmount === 0) {
      this.emberGameService.gameManager.scene.cameras.main.zoom = this.emberGameService.gameManager.ember.cameraMainZoom;
      return;
    }

    let speed = 200;
    while (true) {
      let newValue = this.emberGameService.gameManager.scene.cameras.main.zoom + incrementAmount;
      if (newValue >= 0.2 && newValue < 4) {

        this.emberGameService.gameManager.scene.cameras.main.zoom = newValue;
        // console.log('this.emberGameService.gameManager.scene.cameras.main.zoom', this.emberGameService.gameManager.scene.cameras.main.zoom)

      }
      yield timeout(speed);
      speed = Math.max(50, speed * 0.8);
    }
  }

}
