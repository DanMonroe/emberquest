import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import config from 'emberquest/config/environment';

// import PhaserGame from '../phaser/game'
import Phaser from "phaser";
import {BootScene} from "../phaser/scenes/boot";
import {GameboardScene} from "../phaser/scenes/gameboard-scene";
import rexBoardPlugin from "phaser3-rex-plugins/plugins/board-plugin";

export default class GameboardComponent extends Component {
  @service('game') emberGameService;
  @service modals;

  // @tracked epmModalContainerClass = '';

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
      scene: [{
        key: 'rexBoard',
        plugin: rexBoardPlugin,
        mapping: 'rexBoard'
      }]
    },
    pixelArt: true
  };


  constructor() {
    super(...arguments);

    this.modals.set('modalsDuration', config.game.modalsDuration);

  }

  // get inventoryItems() {
  //   return this.args.inventoryItems;
  // }
  @action
  setup(/*element*/) {
    // console.log('gameboard setup', element, element.clientHeight, element.clientWidth);
  }

  @action
  teardown(/*element*/) {
    // console.log('teardown', element);
  }

  @action
  async showConfigDialog() {
    this.emberGameService.epmModalContainerClass = 'config';
    await this.modals.open('config-dialog');
  }

  @action
  async showInventory() {
    this.emberGameService.epmModalContainerClass = 'inventory';
    // debugger;
    await this.modals.open('inventory-dialog', this.args.inventoryItems);
  }

  @action
  async showInstructionsDialog() {
    this.emberGameService.epmModalContainerClass = 'instructions';
    await this.modals.open('instructions-dialog');
  }

  // for use for EmberConf.  item is for code example
  async closeCurrentAndOpenNewModal(item) {
    console.log('closeCurrentAndOpenNewModal', item);
    // debugger;
    await this.modals.top.close();
    this.emberGameService.epmModalContainerClass = 'code-example';
    await this.modals.open('code-example-dialog', item);
  }

  @action
  async clickGems() {
    console.log('click gems');
  }

  @action
  saveGame() {
    console.log('Component Save Game');
    // this.game.saveGame();
  }

}
