import Model, { attr } from '@ember-data/model';
import { tracked } from '@glimmer/tracking';

export default class InventoryItemModel extends Model {
  // @attr id;
  @attr name;
  @attr type;
  @attr description;
  @attr price;
  @attr img;
  @attr owned;
  @attr locked;
  @attr stats;
  @attr skills;
  @attr sound;
  @attr soundhit;
  @attr owner;
  @attr tileX;
  @attr tileY;
  @attr listorder;
  @attr('number', { defaultValue: 20 }) maxRange;
  @attr('number', { defaultValue: 1 }) damage;
  @attr('number', { defaultValue: 1000 }) weaponSpeed; // time between attacks
  @attr('number', { defaultValue: 200 }) projectileSpeed;
  @attr('number', { defaultValue: 10 }) poweruse;
  @attr('number', { defaultValue: 90 }) accuracy; // percentage

  // EmberConf
  @attr codeimg;
  @attr exampleTitle;
  @attr addonName;

  @tracked confirmUnlock = false;
  get unlockText() {
    // console.log('unlockText', this.name, this.confirmUnlock)
    return this.confirmUnlock ? "Confirm" : "Buy";
  }
}
