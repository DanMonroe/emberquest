import { InventoryItem } from 'emberquest/objects/models/inventory-item';
import { Stat } from 'emberquest/objects/models/stat';
import { Resistance } from 'emberquest/objects/models/resistance';
import { constants } from 'emberquest/services/constants';

export class InventoryItems {
  get data() {
    let items = [];

    // Weapons
    let weaponId = 1;
    items.push(
      new InventoryItem({
        id: weaponId++,
        owned: false,
        display: true,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Simple Sword',
        img: '/images/items/weapons/simplesword.png',
        cssClazz: 'sword a',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'sword_miss'}

})
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        owned: false,
        display: true,
        price: 20,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Jagged Sword',
        img: '/images/items/weapons/sword_jagged.png',
        cssClazz: 'sword b',
        description: 'This sword has seen better days.',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 10}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'sword_miss'}

})
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        locked: true,
        owned: false,
        display: true,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Sword',
        img: '/images/items/weapons/sword4.png',
        cssClazz: 'sword c',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'sword_miss'}

})
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        locked: true,
        owned: false,
        display: true,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Claymore',
        img: '/images/items/weapons/claymore.png',
        cssClazz: 'sword d',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'sword_miss'}

})
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        locked: true,
        owned: false,
        display: true,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Katana',
        img: '/images/items/weapons/katana.png',
        cssClazz: 'sword e',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'sword_miss'}

})
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        locked: true,
        owned: false,
        display: true,
        price: 10,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Simple Axe',
        img: '/images/items/weapons/axe.png',
        cssClazz: 'axe a',
        description: 'A simple alternative to a sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 10}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'sword_miss'}
})
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        locked: true,
        owned: false,
        display: true,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Axe',
        img: '/images/items/weapons/axe2.png',
        cssClazz: 'axe b',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'sword_miss'}
})
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        locked: true,
        owned: false,
        display: true,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Battle Axe',
        img: '/images/items/weapons/battleaxe.png',
        cssClazz: 'axe c',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'sword_miss'}

})
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        locked: true,
        owned: false,
        display: true,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Simple Hammer',
        img: '/images/items/weapons/hammer.png',
        cssClazz: 'hammer a',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'sword_miss'}

})
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        locked: true,
        owned: false,
        display: true,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Hammer',
        img: '/images/items/weapons/hammer2.png',
        cssClazz: 'hammer b',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'sword_miss'}

})
    );



    // Monster Weapons
    items.push(
      new InventoryItem({
        id: 5000,
        name: 'Simple Sword',// TODO fix?
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'sword_miss'}
})
    );
    items.push(
      new InventoryItem({
        id: 5001,
        name: 'Spider Fang',// TODO fix?
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'bite'},
        audioMiss: {key: 'sword_miss'}
})
    );
    items.push(
      new InventoryItem({
        id: 5002,
        name: 'Spider Web', // TODO fix?
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        projectileImg: 'ball',
        projectileScale: 0.4,
        stats: [
          new Stat({type: constants.INVENTORY.STATS.RANGEDDAMAGE, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.8})
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'bite'},
        audioMiss: {key: 'sword_miss'}

      })
    );
    items.push(
      new InventoryItem({
        id: 5003,
        name: {key: 'bite'},
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'bite'},
        audioMiss: {key: 'sword_miss'}
})
    );
    items.push(
      new InventoryItem({
        id: 5004,
        name: {key: 'axe'},
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.1})
        ],
        audioMelee: {key: 'bite'},
        audioMiss: {key: 'sword_miss'}
      })
    );
    items.push(
      new InventoryItem({
        id: 5005,
        name: {key: 'monsterfireresistance'},
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.FINGERS,
        stats: [],
        resistance: [new Resistance({type: constants.INVENTORY.RESISTANCE.FIRE, value: 100})],
        // audioMelee: {key: 'bite'},
        // audioMiss: {key: 'sword_miss'}
      })
    );
    items.push(
      new InventoryItem({
        id: 5006,
        name: {key: 'branch'},
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.3})
        ],
        // audioMelee: {key: 'bite'},
        audioMiss: {key: 'sword_miss'}
      })
    );

    items.push(
      new InventoryItem({
        id: 5007,
        name: {key: 'flame'},
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.3})
        ],
        audioMelee: {key: 'flamestrike'},
        audioMiss: {key: 'sword_miss'}
      })
    );

    items.push(
      new InventoryItem({
        id: 5008,
        name: {key: 'punch'},
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.3})
        ],
        audioMelee: {key: 'punch'},
        audioMiss: {key: 'sword_miss'}
      })
    );




    // Monster Ranged
    items.push(
      new InventoryItem({
        id: 5100,
        name: 'Ship Cannon',// TODO fix?
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        projectileImg: 'ball',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.RANGEDDAMAGE, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.9})
        ],
        audioRanged: {key: 'cannon2', config: {volume:.4}},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'sword_miss'}
        // audio: {
        //   attack: {
        //     miss: {
        //       name: 'cannon1'
        //     }
        //   }
        // }
      })
    );
    items.push(
      new InventoryItem({
        id: 5101,
        name: 'Tower',// TODO fix?
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        projectileImg: 'ball',
        projectileScale: 0.3,
        stats: [
          new Stat({type: constants.INVENTORY.STATS.RANGEDDAMAGE, value: 30}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.6})
        ],


        // projectileImg: 'missle',
        // stats: [
        //   new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 3}),
        //   new Stat({type: constants.INVENTORY.STATS.POWER, value: 3}),
        //   new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.9})
        // ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'arrow'}

})
    );

    items.push(
      new InventoryItem({
        id: 5102,
        name: {key: 'flamerange'},
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        projectileImg: 'ball',
        projectileScale: 0.4,

        velocity: 225,
        animeframes: [
          { type: 'range', key: 'bone-skull', config: {prefix: 'missiles/bone-skul-', start: 1, end: 4, rate: 8, repeat: -1} }
        ],

        stats: [
          new Stat({type: constants.INVENTORY.STATS.RANGEDDAMAGE, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.8})
        ],
        audioRanged: {key: 'fireball'},
        audioMiss: {key: 'sword_miss'}
      })
    );
    items.push(
      new InventoryItem({
        id: 5103,
        name: {key: 'bow'},
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        projectileImg: 'ball',
        projectileScale: 0.4,
        stats: [
          new Stat({type: constants.INVENTORY.STATS.RANGEDDAMAGE, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.8})
        ],
        audioRanged: {key: 'arrow'},
        audioMiss: {key: 'sword_miss'}
      })
    );
    items.push(
      new InventoryItem({
        id: 5104,
        name: {key: 'hatchet'},
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        // projectileImg: 'ball',
        // projectileScale: 0.4,

        velocity: 225,
        animeframes: [
          { type: 'range', key: 'hatchet', config: {prefix: 'missiles/hatchet-', start: 1, end: 4, rate: 8, repeat: -1} }
        ],

        stats: [
          new Stat({type: constants.INVENTORY.STATS.RANGEDDAMAGE, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.8})
        ],
        audioRanged: {key: 'fireball'},
        audioMiss: {key: 'sword_miss'}
      })
    );
    items.push(
      new InventoryItem({
        id: 5105,
        name: {key: 'hatchet'},
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        // projectileImg: 'ball',
        // projectileScale: 0.4,

        velocity: 225,
        animeframes: [
          { type: 'range', key: 'spear', config: {prefix: 'missiles/spear', start: 1, end: 1} }
        ],

        stats: [
          new Stat({type: constants.INVENTORY.STATS.RANGEDDAMAGE, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.8})
        ],
        audioRanged: {key: 'fireball'},
        audioMiss: {key: 'sword_miss'}
      })
    );



    // Ranged Weapons
    let rangedWeaponId = 250;
    items.push(
      new InventoryItem({
        id: rangedWeaponId++,
        owned: false,
        display: true,
        price: 10,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        name: 'Bow',
        img: '/images/items/weapons/bow.png',
        // projectileImg: 'missile',
        velocity: 350, // 300 default
        cssClazz: 'ranged a',
        description: 'Modest range and damage; it\'s the beginner bow.',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.RANGEDDAMAGE, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 2}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.5})
        ],
        animeframes: [
          { type: 'range', key: 'missile', config: {prefix: 'missiles/missile', start: 1, end: 1} }
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'arrow'}
      })
    );
    items.push(
      new InventoryItem({
        id: rangedWeaponId++,
        locked: true,
        owned: false,
        display: true,
        price: 10,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        name: 'Enhanced Bow',
        img: '/images/items/weapons/bow2.png',
        // projectileImg: 'missile',
        // velocity: 350, // 300 default
        cssClazz: 'ranged b',
        description: 'Modest range and damage; it\'s the beginner crossbow.',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.RANGEDDAMAGE, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 2}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.5})
        ],
        animeframes: [
          { type: 'range', key: 'missle', config: {prefix: 'missiles/missile', start: 1, end: 1} }
        ],

        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'arrow'}
      })
    );
    items.push(
      new InventoryItem({
        id: rangedWeaponId++,
        locked: true,
        owned: false,
        display: true,
        price: 10,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        name: 'Crossbow',
        img: '/images/items/weapons/crossbow.png',
        // projectileImg: 'missile',
        // velocity: 350, // 300 default
        cssClazz: 'ranged c',
        description: 'Modest range and damage; it\'s the beginner crossbow.',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.RANGEDDAMAGE, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 2}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.5})
        ],
        animeframes: [
          { type: 'range', key: 'missile', config: {prefix: 'missiles/missile', start: 1, end: 1} }
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'arrow'}
      })
    );
    items.push(
      new InventoryItem({
        id: rangedWeaponId++,
        locked: true,
        owned: false,
        display: true,
        price: 10,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        name: 'Triple Bolt',
        img: '/images/items/weapons/boltsplitter.png',
        // projectileImg: 'missile',
        // velocity: 350, // 300 default
        cssClazz: 'ranged d',
        description: 'Modest range and damage; it\'s the beginner crossbow.',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.RANGEDDAMAGE, value: 15}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 2}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.5})
        ],
        animeframes: [
          { type: 'range', key: 'missile', config: {prefix: 'missiles/missile', start: 1, end: 1} }
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'arrow'}
      })
    );


    // Armor
    let armorId = 500;
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        display: true,
        price: 3,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.FEET,
        name: 'Leather Shoes',
        img: '/images/items/armor/boots_simple.png',
        cssClazz: 'hide',
        description: 'Allows your hero to move using simple keyboard commands: Q, W, E, A, S, D',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 3})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        display: true,
        price: 3,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.FEET,
        name: 'Leather Boots',
        img: '/images/items/armor/leather_boots.png',
        cssClazz: 'hide',
        description: 'Slightly more sturdy than leather shoes',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 7})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        locked: true,
        owned: false,
        display: true,
        price: 10,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.FEET,
        name: 'Reinforced Boots',
        img: '/images/items/armor/boots_reinforced.png',
        cssClazz: 'hide',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 8})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        locked: true,
        owned: false,
        display: true,
        price: 550,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.FEET,
        name: 'Steel Toed Boots',
        img: '/images/items/armor/boots_steeltoed.png',
        cssClazz: 'hide',
        description: 'Fine leather boots with steel toe protection',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );

    items.push(
      new InventoryItem({
        id: armorId++,
            locked: true,
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.BODY,
        name: 'Robe',
        img: '/images/items/armor/robe.png',
        cssClazz: 'torso f',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        locked: true,
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.BODY,
        name: 'Tailored Robe',
        img: '/images/items/armor/robe_tailored.png',
        cssClazz: 'torso g',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        locked: true,
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.BODY,
        name: 'Magic Robe',
        img: '/images/items/armor/robe_magic.png',
        cssClazz: 'torso h',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        locked: true,
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.BODY,
        name: 'Leather',
        img: '/images/items/armor/leather_breastplate.png',
        cssClazz: 'torso j',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        locked: true,
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.BODY,
        name: 'Iron Breastplate',
        img: '/images/items/armor/iron_breastplate.png',
        cssClazz: 'torso k',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        locked: true,
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.BODY,
        name: 'Steel Breastplate',
        img: '/images/items/armor/steel_breastplate.png',
        cssClazz: 'torso m',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );

    // HEAD
    items.push(
      new InventoryItem({
        id: armorId++,
        locked: true,
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.HEAD,
        name: 'Fur Hat',
        img: '/images/items/armor/furhat.png',
        cssClazz: 'hide',
        description: 'It will keep your ears warm',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 5})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        locked: true,
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.HEAD,
        name: 'Floppy Hat',
        img: '/images/items/armor/hat_floppy.png',
        cssClazz: 'hide',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        locked: true,
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.HEAD,
        name: 'Magic Hat',
        img: '/images/items/armor/hat_magic.png',
        cssClazz: 'hide',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    // items.push(
    //   new InventoryItem({
    //     id: armorId++,
    //     owned: false,
    //     display: true,
    //     price: 5,
    //     type: constants.INVENTORY.TYPE.ARMOR,
    //     bodypart: constants.INVENTORY.BODYPART.HEAD,
    //     name: 'Helmet',
    //     img: '/images/items/armor/helmet.png',
    //     cssClazz: 'hide',
    //     description: '',
    //     stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
    //   })
    // );
    // items.push(
    //   new InventoryItem({
    //     id: armorId++,
    //     owned: false,
    //     display: true,
    //     price: 5,
    //     type: constants.INVENTORY.TYPE.ARMOR,
    //     bodypart: constants.INVENTORY.BODYPART.HEAD,
    //     name: 'Spiked Helmet',
    //     img: '/images/items/armor/helmet2.png',
    //     cssClazz: 'hide',
    //     description: '',
    //     stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
    //   })
    // );
    items.push(
      new InventoryItem({
        id: armorId++,
        locked: true,
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.HEAD,
        name: 'Iron Helmet',
        img: '/images/items/armor/iron_helmet2.png',
        cssClazz: 'hide',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        locked: true,
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.HEAD,
        name: 'Steel Helmet',
        img: '/images/items/armor/steel_helmet.png',
        cssClazz: 'hide',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );

    // LEFT HAND
    items.push(
      new InventoryItem({
        id: armorId++,
        locked: false,
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.LEFT_HAND,
        name: 'Wooden Shield',
        img: '/images/items/armor/shield_wooden.png',
        cssClazz: 'shield a',
        description: 'Small wooden shield.',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 3})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        locked: true,
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.LEFT_HAND,
        name: 'Crude Spike Shield',
        img: '/images/items/armor/crude_spike_shield.png',
        cssClazz: 'shield b',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        locked: true,
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.LEFT_HAND,
        name: 'Iron Shield',
        img: '/images/items/armor/iron_shield.png',
        cssClazz: 'shield c',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        locked: true,
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.LEFT_HAND,
        name: 'Steel Shield',
        img: '/images/items/armor/steel_shield.png',
        cssClazz: 'shield d',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        locked: true,
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.LEFT_HAND,
        name: 'Royal Shield',
        img: '/images/items/armor/steel_shield_3.png',
        cssClazz: 'shield e',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );


    // Other
    let otherId = 1001;
    items.push(
      new InventoryItem({
        id: otherId++,
        owned: false,
        display: true,
        type: constants.INVENTORY.TYPE.OTHER,
        bodypart: constants.INVENTORY.BODYPART.FINGERS,
        name: 'Tarnished Ring',
        img: '/images/items/other/tarnishedring.png',
        cssClazz: 'hide',
        description: 'Not pretty but helpful.',
        price: 6,
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 2})]
      })
    );

    //       name: 'Tarnished Ring',
    //       price: 50,
    //       owned: true,
    //       img: '/images/items/other/tarnishedring.png',


    // Chest and Agent Inventory
    items.push(
      new InventoryItem({
        id: 2000,
        owned: false,
        display: false,
        locked: false,
        price: 1,
        // price: 550,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.FEET,
        name: 'Dragon Boots',
        img: '/images/items/dragon/boots.png',
        imgDoll: '/images/items/dragon/boots_doll.png',
        cssClazz: 'feet dragon',
        description: 'Exquisite boots made from the scales of a fire dragon.',
        stats: [new Stat({ type: constants.INVENTORY.STATS.HEALTH, value: 50})],
        resistance: [new Resistance({type: constants.INVENTORY.RESISTANCE.FIRE, value: 20})]
      })
    );
    items.push(
      new InventoryItem({
        id: 2001,
        owned: false,
        display: false,
        locked: false,
        price: 1,
        // price: 550,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.HEAD,
        name: 'Dragon Helmet',
        img: '/images/items/dragon/head.png',
        imgDoll: '/images/items/dragon/head_doll.png',
        cssClazz: 'head dragon',
        description: 'Exquisite helmet made from the scales of a fire dragon.',
        stats: [new Stat({ type: constants.INVENTORY.STATS.HEALTH, value: 50})],
        resistance: [new Resistance({type: constants.INVENTORY.RESISTANCE.FIRE, value: 30})]
      })
    );
    items.push(
      new InventoryItem({
        id: 2002,
        owned: false,
        display: false,
        locked: false,
        price: 1,
        // price: 550,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.BODY,
        name: 'Dragon Plate',
        img: '/images/items/dragon/body.png',
        cssClazz: 'torso dragon',
        description: 'Exquisite breastplate made from the scales of a fire dragon.',
        stats: [new Stat({ type: constants.INVENTORY.STATS.HEALTH, value: 50})],
        resistance: [new Resistance({type: constants.INVENTORY.RESISTANCE.FIRE, value: 50})]
      })
    );
    items.push(
      new InventoryItem({
        id: 2003,
        owned: false,
        display: false,
        price: 1,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Runesword',
        img: '/images/items/dragon/sword.png',
        cssClazz: 'sword dragon',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 40}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audioRanged: {key: 'throwknife'},
        audioMelee: {key: 'chink'},
        audioMiss: {key: 'sword_miss'}
      })
    );
    items.push(
      new InventoryItem({
        id: 2004,
        owned: false,
        display: false,
        locked: false,
        price: 1,
        // price: 550,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.GLOVES,
        name: 'Dragon Gloves',
        img: '/images/items/dragon/gloves.png',
        cssClazz: 'hide',
        description: 'TODO',
        stats: [new Stat({ type: constants.INVENTORY.STATS.HEALTH, value: 50})],
        resistance: [new Resistance({type: constants.INVENTORY.RESISTANCE.FIRE, value: 50})]
      })
    );
    items.push(
      new InventoryItem({
        id: 2005,
        owned: false,
        display: false,
        locked: false,
        price: 1,
        // price: 550,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.NECK,
        name: 'Fire Amulet',
        img: '/images/items/dragon/neck.png',
        cssClazz: 'hide',
        description: 'TODO',
        stats: [new Stat({ type: constants.INVENTORY.STATS.HEALTH, value: 50})],
        resistance: [new Resistance({type: constants.INVENTORY.RESISTANCE.FIRE, value: 50})]
      })
    );
    items.push(
      new InventoryItem({
        id: 2006,
        owned: false,
        display: false,
        locked: false,
        price: 1,
        // price: 550,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.FINGERS,
        name: 'Dragonbone Ring',
        img: '/images/items/dragon/ring.png',
        imgDoll: '/images/items/dragon/ring_doll.png',
        cssClazz: 'fingers dragon',
        description: 'TODO',
        stats: [new Stat({ type: constants.INVENTORY.STATS.HEALTH, value: 50})],
        resistance: [new Resistance({type: constants.INVENTORY.RESISTANCE.FIRE, value: 50})]
      })
    );
    items.push(
      new InventoryItem({
        id: 2007,
        owned: false,
        display: false,
        locked: false,
        price: 1,
        // price: 550,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.LEFT_HAND,
        name: 'Dragon Plate',
        img: '/images/items/dragon/shield.png',
        cssClazz: 'shield dragon',
        description: 'TODO',
        stats: [new Stat({ type: constants.INVENTORY.STATS.HEALTH, value: 50})],
        resistance: [new Resistance({type: constants.INVENTORY.RESISTANCE.FIRE, value: 50})]
      })
    );
    items.push(
      new InventoryItem({
        id: 2008,
        owned: false,
        display: false,
        locked: false,
        price: 1,
        // price: 550,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.ARMS,
        name: 'Dragon Bracers',
        img: '/images/items/dragon/arms.png',
        cssClazz: 'hide',
        description: 'TODO',
        stats: [new Stat({ type: constants.INVENTORY.STATS.HEALTH, value: 50})],
        resistance: [new Resistance({type: constants.INVENTORY.RESISTANCE.FIRE, value: 50})]
      })
    );

    // Items not displayed, but shown in chest dialogs, etc.
    items.push(
      new InventoryItem({
        id: 2500,
        display: false,
        showEquipButton: false,
        price: 0,
        type: constants.INVENTORY.TYPE.OTHER,
        cssClazz: 'key',
        name: 'North Gate Key',
        img: '/images/items/key.png',
        description: 'Grants access to the castle via the North entrance'
      })
    );

    items.push(
      new InventoryItem({
        id: 2501,
        display: false,
        showEquipButton: false,
        price: 0,
        type: constants.INVENTORY.TYPE.OTHER,
        cssClazz: 'key',
        name: 'South Gate Key',
        img: '/images/items/key.png',
        description: 'Grants access to the castle via the South entrance'
      })
    );

    items.push(
      new InventoryItem({
        id: 2502,
        display: false,
        showEquipButton: false,
        price: 0,
        type: constants.INVENTORY.TYPE.OTHER,
        cssClazz: 'tome',

        name: 'Marauder Report',
        img: '/images/items/tomes/scroll.png',
        description: '<p>They raided during the night when the Watch was wary.</p><p>Unfortunately, those guarding the Royal Ember were caught by surprise and quickly dispatched.</p><p>They stole the artifact and began raiding the remainder of the castle.</p><p>The thieves with the Ember were last seen riding South toward the volcanic island.</p><p>However, I was able to reach the armory before the rest of their crew could loot the cache of arms.</p><p>Specifically, the Legendary Dragon Armor.</p>I quickly dispatched squires to hide the pieces throughout the land.</p><p>If they were able to control the power of the armor, they would be unstoppable.</p><p>Hopefully, a young Hero will come and recover the pieces.</p><p>Finally, they may be and to rescue the Royal Ember, and save the land!</p>',
        stats: []
      })
    );

    items.push(
      new InventoryItem({
        id: 2503,
        display: false,
        showEquipButton: false,
        price: 0,
        type: constants.INVENTORY.TYPE.OTHER,
        cssClazz: 'tome',

        name: 'Dragon Armor Tome',
        img: '/images/items/tomes/tome.png',
        description: '<h3>Legendary Dragon Armor</h3><p>A set of armor and a magical Sword were forged from the parts of the Ancient Red Dragon that once ruled this land.</p><p>Nine separate pieces form the complete set.</p><p>When worn together, it is rumored that the bearer can withstand the heat of a full force dragon\'s breath without harm to the bearer.</p><p>Anything less than a complete set, and they would surely parish</p>',
        stats: []
      })
    );

    // Specials
    items.push(
      new InventoryItem({
        id: 4050,
        name: {key: 'whirlpool'},
        display: false,
        showEquipButton: false,
        price: 0,
        reportDamage: false,
        type: constants.INVENTORY.TYPE.OTHER,
        cssClazz: 'whirlpool',
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 0}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 0})
        ],
        specialActions: [
          {value: constants.SPECIAL_ACTIONS.WHIRLPOOL_IN.value, data: { target:{ x: 36, y: 36 } } }
        ],
        audioMelee: {key: 'whirlpool'}
      })
    );
    items.push(
      new InventoryItem({
        id: 4051,
        name: {key: 'whirlpoolinner'},
        display: false,
        showEquipButton: false,
        price: 0,
        reportDamage: false,
        type: constants.INVENTORY.TYPE.OTHER,
        cssClazz: 'whirlpool',
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 0}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 0})
        ],
        specialActions: [
          {value: constants.SPECIAL_ACTIONS.WHIRLPOOL_OUT.value, data: { target:{ x: 20, y: 40 } } }
        ],
        audioMelee: {key: 'whirlpool'}
      })
    );

    items.push(
      new InventoryItem({
        id: 4052,
        name: {key: 'waterhelm'},
        display: false,
        showEquipButton: false,
        cssClazz: 'waterhelm',
        type: constants.INVENTORY.TYPE.OTHER,
        bodypart: constants.INVENTORY.BODYPART.HEAD,
        stats: [],
        resistance: [new Resistance({type: constants.INVENTORY.RESISTANCE.WATER, value: 100})],
        // audioMelee: {key: 'bite'},
        // audioMiss: {key: 'sword_miss'}
      })
    );





















    // The final Ember item
    items.push(
      new InventoryItem({
        id: constants.INVENTORY.ROYAL_EMBER_ID,
        owned: true,
        display: true,
        showEquipButton: false,
        type: constants.INVENTORY.TYPE.OTHER,
        cssClazz: 'dragonember',
        name: 'Royal Ember',
        img: '/images/items/other/dragonember.png',
        description: 'TODO',
        stats: []
      })
    );


    return items;

  }
}
