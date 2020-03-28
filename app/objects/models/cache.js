// import { tracked } from '@glimmer/tracking';
import { constants } from 'emberquest/services/constants';

export class Cache {
  gccode;
  found = false;
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
