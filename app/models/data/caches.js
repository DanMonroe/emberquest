import { Cache } from 'emberquest/objects/models/cache';
import { constants } from 'emberquest/services/constants';

export class Caches {
  get data() {
    let caches = [];

    caches.push(
      new Cache({
        gccode: 'GC8QAYM',
        name: 'EQ #1 - Castle Storeroom',
        description: '<p>Description placeholder</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: '4a2abab3a50e351142d3b2ca6ae8da8fcd3b30da36afa15666033b292ee60705zyuS5/9q4lUL3LCTrbM+kR9sM8qNtLQpdKlKG2j28es=',
        parking: '4a2abab3a50e351142d3b2ca6ae8da8fcd3b30da36afa15666033b292ee60705zyuS5/9q4lUL3LCTrbM+kR9sM8qNtLQpdKlKG2j28es='
        // coords: '1234567890'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB0H',
        found: false,
        name: 'EQ #2 - Ogre Covered Bridge',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'be3c9537cd3f9c0a9a1e0a8a5e10419cae6ab8214aa1ce66b2231192a2368dd5goD3eZl5f0BE0SLO/jTCkmsgc2c8zUbSvCL6Tgu2sHo=',
        parking: 'be3c9537cd3f9c0a9a1e0a8a5e10419cae6ab8214aa1ce66b2231192a2368dd5goD3eZl5f0BE0SLO/jTCkmsgc2c8zUbSvCL6Tgu2sHo='
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB0N',
        name: 'EQ #3',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'c2783cc64f29a9153697b71263b21965b8b56134cfb81edc5107fc1657c6b5bawJ+yik3S9opdThiPP6Tp2N57MP1cHBhYzvxa7QMfopU=',
        parking: 'c2783cc64f29a9153697b71263b21965b8b56134cfb81edc5107fc1657c6b5bawJ+yik3S9opdThiPP6Tp2N57MP1cHBhYzvxa7QMfopU='
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB0T',
        name: 'EQ #4',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB1C',
        name: 'EQ #5',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB1G',
        name: 'EQ #6',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8QB1J',
        name: 'EQ #7',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6V9',
        name: 'EQ #8',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6VC',
        name: 'EQ #9',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6VH',
        name: 'EQ #10',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6VK',
        name: 'EQ #11',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6VN',
        name: 'EQ #12',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6WC',
        name: 'EQ #13',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6WP',
        name: 'EQ #14',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6WQ',
        name: 'EQ #15',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6X0',
        name: 'EQ #16',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6X3',
        name: 'EQ #17',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6X6',
        name: 'EQ #18',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6X7',
        name: 'EQ #19',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XB',
        name: 'EQ #20',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XC',
        name: 'EQ #21',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XD',
        name: 'EQ #22',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XE',
        name: 'EQ #23',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XF',
        name: 'EQ #24',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XJ',
        name: 'EQ #25',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XK',
        name: 'EQ #26',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XP',
        name: 'EQ #27',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XQ',
        name: 'EQ #28',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XT',
        name: 'EQ #29',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XW',
        name: 'EQ #30',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );

    caches.push(
      new Cache({
        gccode: 'GC8V6XZ',
        name: 'EQ #31 - Enchanted Ember',
        description: '<p>Test description</p>',
        difficulty: 1.5,
        terrain: 1.5,
        foundInstructions: 'Congrats.. now do this',
        coords: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        parking: 'bdf5253f45e43a7ba987dadd5d5b7eecceb94bcac4f70c746d5ed7622b065a85BJDrjT2mNEcWLmM3t3rUtw',
        cacheHint: 'test',
        puzzleHint: 'grfg'
      })
    );


    return caches;
  }
}
