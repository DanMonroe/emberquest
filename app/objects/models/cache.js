import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';

export class Cache {
  gccode;
  @tracked found = false;
  type = constants.CACHE.TYPE.MYSTERY;
  name;
  difficulty;
  terrain;
  size;
  coords;
  description;
  foundInstructions;  // show after they have found this cache in game
  hints = [];
  attributes = [];    // maybe can be used for a clue.  'lava' needs fire resistance, 'clouds' needs airship, etc
  map;  // map image?
  inventory = [];   // some chests will award the player with special inventory items
  gold = 0; // give them some gold as well?


  constructor(config) {
    Object.assign(this, config);
  }

  // get getTitle() {
  //   return null;
  // }
  //
  // get getDescription() {
  //   return null;
  // }
}
