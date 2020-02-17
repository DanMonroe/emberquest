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

  @tracked epmModalContainerClass = '';

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
    this.epmModalContainerClass = 'config';
    await this.modals.open('config-dialog');
  }

  @action
  async showInventory() {
    this.epmModalContainerClass = 'inventory';
    await this.modals.open('inventory-dialog');
  }

  @action
  async showInstructionsDialog() {
    this.epmModalContainerClass = 'instructions';
    await this.modals.open('instructions-dialog');
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
