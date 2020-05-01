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

    // this.experience = xp;
    // get level() {
    //   if (this.experience < constants.LEVEL_2) { return 1; }
    //   if (this.experience < constants.LEVEL_3) { return 2; }
    //   if (this.experience < constants.LEVEL_4) { return 3; }
    //   if (this.experience < constants.LEVEL_5) { return 4; }
    //   if (this.experience < constants.LEVEL_6) { return 5; }
    //   if (this.experience < constants.LEVEL_7) { return 6; }
    //   if (this.experience < constants.LEVEL_8) { return 7; }
    //   if (this.experience < constants.LEVEL_9) { return 8; }
    //   if (this.experience < constants.LEVEL_10) { return 9; }
    //   if (this.experience < constants.LEVEL_11) { return 10; }
    //   if (this.experience < constants.LEVEL_12) { return 11; }
    //
    //   // after level 11, experience between levels is a constant.
    //   return 12 + Math.floor((this.experience - constants.LEVEL_12)/constants.LEVEL_RANGE_AFTER_12);
    // }

  }

}
