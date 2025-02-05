import Component from '@glimmer/component';
import { action } from '@ember/object';
import { or, reads } from '@ember/object/computed';
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
import {Agent} from "../objects/models/agent";

export default class GameboardComponent extends Component {
  @service('game') emberGameService;
  @service modals;
  @service router;

  @tracked cookieConfirmed = false;
  @tracked cookieDenied = false;

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

  testSpawnerX = 1;
  testSpawnerY = 1;
  @tracked testAgents;
  @reads('config.game.showAgentSelector') configShowAgentSelector;
  @or('configShowAgentSelector', 'thisIsDan') showAgentSelector;
  thisIsDan = false;

  constructor() {
    super(...arguments);

    this.modals.set('modalsDuration', config.game.modalsDuration);

    this.loadSettingsData();
    this.emberGameService.loadPlayerStats();

    this.emberGameService.overrideMap = this.args.overrideMap;
    this.emberGameService.debug = this.args.debug;  // debug queryparam

    if (this.emberGameService.debug.phaserDebug) {
      this.config.physics.arcade.debug = true;
    }

    // if (this.showAgentSelector) {
      this.testAgents = this.emberGameService.agentsToSelect();
    // }
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
  }

  @tracked selectedTestAgent = '';
  @tracked selectedTestMap = '';

  @action
  teleport() {
    console.log('teleporting', this.selectedTestMap, this.testSpawnerX, this.testSpawnerY)
    // targetTile needs .map, .x, .y
    let targetTile = {
      map: this.selectedTestMap,
      x: this.testSpawnerX,
      y: this.testSpawnerY
    }
    this.emberGameService.teleport(this.emberGameService.gameManager.scene.player.container, this.emberGameService.gameManager.scene, targetTile);
    // let fieldOfViewTileXYArray = this.emberGameService.gameManager.scene.player.container.fov.findFOV(this.emberGameService.gameManager.scene.player.container.visiblePoints);
    // this.emberGameService.gameManager.scene.game.ember.map.findAgentFieldOfView(this.emberGameService.gameManager.scene.player.container, fieldOfViewTileXYArray);

  }


  @action
  spawnTestAgent() {
    console.log('spawning', this.selectedTestAgent, this.testSpawnerX, this.testSpawnerY)
    let agentConfig = this.emberGameService.agentPool.getAgentConfig(this.selectedTestAgent);
    agentConfig = Object.assign({}, agentConfig, {
      testAgentId: 1337,
      patrol: {
        method: 'wander',
        tiles: []
      }
    });
    console.log('agentConfig', agentConfig)
    const agent = new Agent(+this.testSpawnerX, +this.testSpawnerY, agentConfig);
    console.log('agent', agent)
    this.emberGameService.gameManager.scene.events.emit('agentSpawned', agent);
  }

  @action
  setTestAgent(evt) {
    this.selectedTestAgent = evt.target.value;
  }

  @action
  setTestMap(evt) {
    this.selectedTestMap = evt.target.value;
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
