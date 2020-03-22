import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import config from 'emberquest/config/environment';

import Phaser from "phaser";
import {BootScene} from "../phaser/scenes/boot";
import {GameboardScene} from "../phaser/scenes/gameboard-scene";
import rexBoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";
// import awaitLoaderPlugin from 'phaser3-rex-plugins/plugins/awaitloader-plugin';

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
        gravity: { y: 0 },
        debug: false
      }
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
    let modalResult = await this.showDialog('inventory', 'inventory-dialog', this.args.inventoryItems);
    if (modalResult && modalResult.codeimg) { // emberconf.. show code example
      await this.showDialog('code-example', 'code-example-dialog', modalResult);
    }
  }

  @action
  async showInstructionsDialog() {
    await this.showDialog('instructions', 'instructions-dialog');
  }

  // for use for EmberConf.  item is for code example
  // async closeCurrentAndOpenNewModal(item) {
    // this.emberGameService.gameManager.pauseGame(true);
    // console.log('closeCurrentAndOpenNewModal', item);
    // await this.modals.top.close();
    // await this.showDialog('code', 'code-dialog', item);

    // this.emberGameService.epmModalContainerClass = 'code-example';
    // await this.modals.open('code-example-dialog', item);
    // this.emberGameService.gameManager.pauseGame(false);
  // }

  @action
  async showCaches() {
    console.log('click Caches');
  }


  @action
  adjustVolume() {
    console.log('adjustVolume');
    this.emberGameService.gameManager.adjustVolume();
  }

}
