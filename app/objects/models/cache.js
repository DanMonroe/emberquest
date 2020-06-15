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
  parking;
  @tracked cacheHint;
  @tracked puzzleHint;
  description;
  foundInstructions;  // show after they have found this cache in game
  hints = [];
  attributes = [];    // maybe can be used for a clue.  'lava' needs fire resistance, 'clouds' needs airship, etc
  map;  // map image?
  inventory = [];   // some chests will award the player with special inventory items
  gold = 0; // give them some gold as well?

  @tracked cacheHintDecrypted = false;
  @tracked puzzleHintDecrypted = false;

  constructor(config) {
    Object.assign(this, config);
  }

  get getCacheHint() {
    return this.cacheHintDecrypted ? this.rot13(this.cacheHint) : this.cacheHint;
  }
  get getPuzzleHint() {
    return this.puzzleHintDecrypted ? this.rot13(this.puzzleHint) : this.puzzleHint;
  }

  rot13(text) {
    const input     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const output    = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
    const index     = x => input.indexOf(x);
    const translate = x => index(x) > -1 ? output[index(x)] : x;
    return text.split('').map(translate).join('');
  }
}
