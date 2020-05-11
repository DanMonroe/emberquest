import { Cache } from 'emberquest/objects/models/cache';
import { constants } from 'emberquest/services/constants';

export class Caches {
  get data() {
    let caches = [];

    caches.push(
      new Cache({
        gccode: 'GC001',
        name: 'Hello EmberQuest Test Cache',
        description: '<p>Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'ca59f4c9af1f324caec3332e622d06ccbd315a9843a21524d42ceaeebb474c533rFih9lEQx5hDEXO8x4d3yZy8p0ZuTQEoxYFkgDChJw='
        // coords: '1234567890'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC002',
        found: false,
        name: 'Hello EmberQuest Test Cache 2',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'ca59f4c9af1f324caec3332e622d06ccbd315a9843a21524d42ceaeebb474c533rFih9lEQx5hDEXO8x4d3yZy8p0ZuTQEoxYFkgDChJw'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC003',
        name: 'Hello EmberQuest Cache 3',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '1234567890'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC004',
        name: 'Hello EmberQuest Cache 3',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '1234567890'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC005',
        name: 'Hello EmberQuest Cache 3',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '1234567890'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC006',
        name: 'Hello EmberQuest Cache 3',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '1234567890'
      })
    );


    return caches;
  }
}
