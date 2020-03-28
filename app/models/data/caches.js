import { Cache } from 'emberquest/objects/models/cache';
import { constants } from 'emberquest/services/constants';

export class Caches {
  get data() {
    let caches = [];

    caches.push(
      new Cache({
        gccode: 'GC001',
        name: 'Hello Emberquest Cache',
        description: 'Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description Test description ',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '1234567890'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC002',
        found: true,
        name: 'Hello Emberquest Cache 2',
        description: 'Test description',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '1234567890'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC003',
        name: 'Hello Emberquest Cache 3',
        description: 'Test description',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '1234567890'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC003',
        name: 'Hello Emberquest Cache 3',
        description: 'Test description',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '1234567890'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC003',
        name: 'Hello Emberquest Cache 3',
        description: 'Test description',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '1234567890'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC003',
        name: 'Hello Emberquest Cache 3',
        description: 'Test description',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '1234567890'
      })
    );


    return caches;
  }
}
