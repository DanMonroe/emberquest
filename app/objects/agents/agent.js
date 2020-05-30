import { BaseAgent } from './base-agent';
import AgentContainer from "../../phaser/agents/agent/agentContainer"
import {isPresent} from '@ember/utils';

export class Agent extends BaseAgent {

  constructor(scene, config) {
    super(scene, config);

    let agentContainer = new AgentContainer(scene, config, this);
    this.container = agentContainer;
    this.playerConfig = config;

    this.loadInventory();
    this.setLevel();
    this.setExperienceBasedFromConfigLevel();
  }

  loadInventory() {
    let inventoryItems = this.ember.inventory.getInventoryItems();
    this.playerConfig.inventory.forEach(bodypart => {
      if (isPresent(bodypart.items)) {
        const item = this.pickRandomItem(bodypart.items);

        const gameInventoryItem = inventoryItems.findBy('id', item.itemId);


        if (gameInventoryItem) {
          // gameInventoryItem.owned = true;
          // if (storedInventoryItem.eq) {
            this.equipItem(gameInventoryItem);
          // }
          this.inventory.pushObject(gameInventoryItem);
        }
      }
    });
  }

  pickRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  setLevel() {
    if (this.playerConfig.levelRange !== 0) {
      let min = Math.max(1, this.ember.playerContainer.agent.level - this.playerConfig.levelRange);
      let max = this.ember.playerContainer.agent.level + this.playerConfig.levelRange;
      if (min !== max) {
        const newLevel = this.ember.randomIntFromInterval(min, max);
        this.level = newLevel;
        this.health = this.baseHealth;
        this.power = this.basePower;

        return;
      }
    }
    this.level = this.playerConfig.level || this.ember.playerContainer.agent.level;
  }

  setExperienceBasedFromConfigLevel() {
    // have to set experience so level will be set on agent
    // so the player will get xp for a victory

    // either a specific level, or a level range relative to the players
    // level: 1,
    // levelRange: 0,

    // let xp = 0;
    if (this.playerConfig.level > 0) {
      this.experience = this.ember.gameManager.getExperienceFromLevel(this.playerConfig.level);
    } else {
      // level range?
      // debugger;
    }

  }

}
