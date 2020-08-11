import { BaseAgent } from './base-agent';
import PlayerContainer from "../../phaser/agents/player/playerContainer";
import {get,set} from '@ember/object';
import { v4 } from "ember-uuid";
import { constants } from 'emberquest/services/constants';

export class Player extends BaseAgent {

  constructor(scene, config) {
    super(scene, config);

    let uuid = v4();
    this.id = `player-${uuid}`;

    this.container = new PlayerContainer(scene, config, this);
    this.playerConfig = config;

    this.loadInventory();
    this.loadStats();
  }

  loadInventory() {
    let inventoryItems = this.ember.inventory.getInventoryItems();
    if (this.playerConfig.storedPlayerAttrs && this.playerConfig.storedPlayerAttrs.inventory) {
      this.playerConfig.storedPlayerAttrs.inventory.forEach(storedInventoryItem => {
        // console.log('stored item', storedInventoryItem);
        const gameInventoryItem = inventoryItems.findBy('id', storedInventoryItem.id);
// console.log('gameInventoryItem', gameInventoryItem);
        if (gameInventoryItem) {
          gameInventoryItem.owned = true;
          gameInventoryItem.display = true;
          if (storedInventoryItem.eq) {
            this.equipItem(gameInventoryItem);
          }
          this.inventory.pushObject(gameInventoryItem);
        }
      })
    }
  }

  loadStats() {
    if (this.playerConfig.storedPlayerAttrs) {

      constants.STOREDATTRS.forEach(storedObj => {
        try {
// console.log('load ', storedObj.key, storedObj.attr, get(this, storedObj.attr), this.ember.storage.decrypt(get(this, `playerConfig.storedPlayerAttrs.${storedObj.key}`)));
          const storedAttrValue = +(this.ember.storage.decrypt(get(this, `playerConfig.storedPlayerAttrs.${storedObj.key}`)));
          set(this, storedObj.attr, isNaN(storedAttrValue) ? storedObj.default : storedAttrValue);
        } catch (e) {
          console.error(e);
          set(this, storedObj.attr, storedObj.default || 0);
        }
      });
      // console.log('this', this)
    }

    // debug overrides
    if (this.playerConfig.debug.override.gold) {
      set(this, 'gold', this.playerConfig.debug.override.gold);
    }
    if (this.playerConfig.debug.override.level) {
      set(this, 'experience', this.ember.gameManager.getExperienceFromLevel(this.playerConfig.debug.override.level));
      this.health = this.baseHealth + this.armorHealth;
      this.power = this.basePower + this.powerFromInventory;
    }

      // health
      // if(this.playerConfig.storedPlayerAttrs.xp) {
      //   try {
      //     // console.log('load xp', this.playerConfig.storedPlayerAttrs.xp);
      //     // console.log('load xp', this.ember.storage.decrypt(this.playerConfig.storedPlayerAttrs.xp));
      //     this.experience = this.ember.storage.decrypt(this.playerConfig.storedPlayerAttrs.xp);
      //   } catch (e) {
      //     console.error('No XP', e);
      //     this.experience = 0;
      //   }
      // } else {
      //   this.experience = 0;
      // }
    // }
  }

}
