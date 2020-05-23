import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import config from 'emberquest/config/environment';

import Phaser from "phaser";
import {BootScene} from "../phaser/scenes/boot";
// import {LoadingScene} from "../phaser/scenes/loading-scene";
import {GameboardScene} from "../phaser/scenes/gameboard-scene";
import rexBoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";

export default class GameboardComponent extends Component {
  @service('game') emberGameService;
  @service modals;

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

    this.emberGameService.overrideMap = this.args.overrideMap;
    this.emberGameService.debug = this.args.debug;  // foo queryparam

    if (this.emberGameService.debug) {
      this.config.physics.arcade.debug = true;
    }
  }

  get volumeCSSClass() {
    switch (this.emberGameService.gameManager.volume) {
      case 0:
        return 'off';
      case 1:
        return 'down';
      case 2:
        return 'up';
      default:
        break;
    }
    return 'off';
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
  async showInstructionsDialog() {
    await this.showDialog('instructions', 'instructions-dialog');
  }

  @action
  async showCaches() {
    await this.showDialog('caches', 'caches-dialog');
  }


  @action
  adjustVolume() {
    console.log('adjustVolume');
    this.emberGameService.gameManager.adjustVolume();
  }

}
