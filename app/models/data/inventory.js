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
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Simple Sword',
        img: '/images/items/weapons/simplesword.png',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        owned: false,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Jagged Sword',
        img: '/images/items/weapons/sword_jagged.png',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        owned: false,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Sword',
        img: '/images/items/weapons/sword4.png',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        owned: false,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Claymore',
        img: '/images/items/weapons/claymore.png',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        owned: false,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Katana',
        img: '/images/items/weapons/katana.png',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        owned: false,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Runesword',
        img: '/images/items/weapons/runesword.png',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 40}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        owned: false,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Simple Axe',
        img: '/images/items/weapons/axe.png',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        owned: false,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Axe',
        img: '/images/items/weapons/axe2.png',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        owned: false,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Battle Axe',
        img: '/images/items/weapons/battleaxe.png',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        owned: false,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Simple Hammer',
        img: '/images/items/weapons/hammer.png',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );

    items.push(
      new InventoryItem({
        id: weaponId++,
        owned: false,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Hammer',
        img: '/images/items/weapons/hammer2.png',
        description: 'A simple introductory sword',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );



    // Monster Weapons
    items.push(
      new InventoryItem({
        id: 2000,
        name: 'Simple Sword',
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );
    items.push(
      new InventoryItem({
        id: 2001,
        name: 'Spider Fang',
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 4}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 1.5})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );
    items.push(
      new InventoryItem({
        id: 2002,
        name: 'Spider Web',
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        projectileImg: 'ball',
        projectileScale: 0.4,
        stats: [
          new Stat({type: constants.INVENTORY.STATS.RANGEDDAMAGE, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 5}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.8})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );
    items.push(
      new InventoryItem({
        id: 2003,
        name: 'Bite',
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        stats: [
          new Stat({type: constants.INVENTORY.STATS.DAMAGE, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.9})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );

    // Ranged Weapons
    let rangedWeaponId = 250;
    items.push(
      new InventoryItem({
        id: rangedWeaponId++,
        owned: false,
        price: 10,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        name: 'Bow',
        img: '/images/items/weapons/bow.png',
        projectileImg: 'missile',
        // velocity: 350, // 300 default
        description: 'Modest range and damage; it\'s the beginner bow.',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.RANGEDDAMAGE, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 2}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.5})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );
    items.push(
      new InventoryItem({
        id: rangedWeaponId++,
        owned: false,
        price: 10,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        name: 'Enhanced Bow',
        img: '/images/items/weapons/bow2.png',
        projectileImg: 'missile',
        // velocity: 350, // 300 default
        description: 'Modest range and damage; it\'s the beginner crossbow.',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.RANGEDDAMAGE, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 2}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.5})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );
    items.push(
      new InventoryItem({
        id: rangedWeaponId++,
        owned: false,
        price: 10,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        name: 'Crossbow',
        img: '/images/items/weapons/crossbow.png',
        projectileImg: 'missile',
        // velocity: 350, // 300 default
        description: 'Modest range and damage; it\'s the beginner crossbow.',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.RANGEDDAMAGE, value: 3}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 2}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.5})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );
    items.push(
      new InventoryItem({
        id: rangedWeaponId++,
        owned: false,
        price: 10,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        name: 'Triple Bolt',
        img: '/images/items/weapons/boltsplitter.png',
        projectileImg: 'missile',
        // velocity: 350, // 300 default
        description: 'Modest range and damage; it\'s the beginner crossbow.',
        stats: [
          new Stat({type: constants.INVENTORY.STATS.RANGEDDAMAGE, value: 15}),
          new Stat({type: constants.INVENTORY.STATS.POWER, value: 2}),
          new Stat({type: constants.INVENTORY.STATS.ATTACKSPEED, value: 0.5})
        ],
        audio: {
          attack: {
            miss: {
              name: 'sword_miss'
            }
          }
        }
      })
    );


    // Armor
    let armorId = 500;
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 3,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.FEET,
        name: 'Leather Shoes',
        img: '/images/items/armor/boots_simple.png',
        description: 'Allows your hero to move using simple keyboard commands: Q, W, E, A, S, D',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 3})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 3,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.FEET,
        name: 'Leather Boots',
        img: '/images/items/armor/leather_boots.png',
        description: 'Slightly more sturdy than leather shoes',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 3})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 10,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.FEET,
        name: 'Reinforced Boots',
        img: '/images/items/armor/boots_reinforced.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 8})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 550,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.FEET,
        name: 'Steel Toed Boots',
        img: '/images/items/armor/boots_steeltoed.png',
        description: 'Fine leather boots with steel toe protection',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );

    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.BODY,
        name: 'Robe',
        img: '/images/items/armor/robe.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.BODY,
        name: 'Tailored Robe',
        img: '/images/items/armor/robe_tailored.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.BODY,
        name: 'Magic Robe',
        img: '/images/items/armor/robe_magic.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.BODY,
        name: 'Leather',
        img: '/images/items/armor/leather.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.BODY,
        name: 'Reinforced Leather',
        img: '/images/items/armor/leather2.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.BODY,
        name: 'Iron Breastplate',
        img: '/images/items/armor/iron_breastplate.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.BODY,
        name: 'Steel Breastplate',
        img: '/images/items/armor/steel_breastplate.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );

    // HEAD
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.HEAD,
        name: 'Fur Hat',
        img: '/images/items/armor/furhat.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.HEAD,
        name: 'Floppy Hat',
        img: '/images/items/armor/hat_floppy.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.HEAD,
        name: 'Magic Hat',
        img: '/images/items/armor/hat_magic.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.HEAD,
        name: 'Helmet',
        img: '/images/items/armor/helmet.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.HEAD,
        name: 'Spiked Helmet',
        img: '/images/items/armor/helmet2.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.HEAD,
        name: 'Iron Helmet',
        img: '/images/items/armor/iron_helmet2.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.HEAD,
        name: 'Steel Helmet',
        img: '/images/items/armor/steel_helmet.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );

    // LEFT HAND
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.LEFT_HAND,
        name: 'Wooden Shield',
        img: '/images/items/armor/shield_wooden.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.LEFT_HAND,
        name: 'Crude Spike Shield',
        img: '/images/items/armor/crude_spike_shield.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.LEFT_HAND,
        name: 'Iron Shield',
        img: '/images/items/armor/iron_shield.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.LEFT_HAND,
        name: 'Steel Shield',
        img: '/images/items/armor/steel_shield.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.LEFT_HAND,
        name: 'Royal Shield',
        img: '/images/items/armor/steel_shield_3.png',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );



    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        locked: false,
        price: 5,
        // price: 550,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.FEET,
        name: 'Dragon Boots',
        img: '/images/items/armor/boots_wings.png',
        description: 'Exquisite boots made from the scales of a fire dragon.',
        stats: [new Stat({ type: constants.INVENTORY.STATS.HEALTH, value: 50})],
        resistance: [new Resistance({type: constants.INVENTORY.RESISTANCE.FIRE, value: 20})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        locked: false,
        price: 5,
        // price: 550,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.HEAD,
        name: 'Dragon Helmet',
        img: '/images/items/armor/red_helmet.png',
        description: 'Exquisite helmet made from the scales of a fire dragon.',
        stats: [new Stat({ type: constants.INVENTORY.STATS.HEALTH, value: 50})],
        resistance: [new Resistance({type: constants.INVENTORY.RESISTANCE.FIRE, value: 30})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
        owned: false,
        locked: false,
        price: 5,
        // price: 550,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.BODY,
        name: 'Dragon Plate',
        img: '/images/items/armor/red_breastplate.png',
        description: 'Exquisite breastplate made from the scales of a fire dragon.',
        stats: [new Stat({ type: constants.INVENTORY.STATS.HEALTH, value: 50})],
        resistance: [new Resistance({type: constants.INVENTORY.RESISTANCE.FIRE, value: 50})]
      })
    );


    // Other
    let otherId = 1001;
    items.push(
      new InventoryItem({
        id: otherId++,
        type: constants.INVENTORY.TYPE.OTHER,
        name: 'Tarnished Ring',
        img: '/images/items/other/tarnishedring.png',
        description: '',
        price: 30,
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 2})]
      })
    );

    //       name: 'Tarnished Ring',
    //       price: 50,
    //       owned: true,
    //       img: '/images/items/other/tarnishedring.png',



    return items;

    // return [
    //   // weapons
    //   {
    //     id: 1,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 1,
    //       name: 'Crossbow',
    //       price: 20,
    //       owned: true,
    //       img: '/images/items/weapons/crossbow.png',
    //       locked: false,
    //       type: 'weapon',
    //       description: 'Modest range and damage; it\'s the beginner crossbow.',
    //       stats: [
    //         {
    //           title: 'Damage',
    //           desc: '8'
    //         },
    //         {
    //           title: 'Range',
    //           desc: '2'
    //         }
    //       ]
    //
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 2,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 17,
    //       name: 'Bolt Splitter',
    //       price: 200,
    //       owned: false,
    //       img: '/images/items/weapons/boltsplitter.png',
    //       locked: false,
    //       type: 'weapon',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 3,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 3,
    //       name: 'Simple Sword',
    //       price: 10,
    //       owned: true,
    //       img: '/images/items/weapons/simplesword.png',
    //       locked: false,
    //       type: 'weapon',
    //       description: 'A simple introductory sword.',
    //       stats: [
    //         {
    //           title: 'Damage',
    //           desc: '8'
    //         }
    //       ]
    //       // skills: [
    //       //   {
    //       //     title: 'attack',
    //       //     desc: 'The attack method makes the hero attack the target.'
    //       //   }
    //       // ]
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 4,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 15,
    //       name: 'Katana',
    //       price: 100,
    //       owned: false,
    //       img: '/images/items/weapons/katana.png',
    //       locked: false,
    //       type: 'weapon',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 5,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 20,
    //       name: 'Claymore',
    //       price: 100,
    //       owned: false,
    //       img: '/images/items/weapons/claymore.png',
    //       locked: true,
    //       type: 'weapon',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 6,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 18,
    //       name: '@Tracked',
    //       price: 500,
    //       owned: false,
    //       img: '/images/items/weapons/ember_sword.png',
    //       locked: false,
    //       type: 'weapon',
    //       description: '@Tracked magically installs native setters that tracks updates to properties allowing you to treat them like any other JavaScript value.',
    //       stats: [
    //         {
    //           title: 'Magic',
    //           desc: '100'
    //         }
    //       ],
    //       codeimg: '/code/example_tracked.png',
    //       'example-title': '@tracked Example'
    //
    //
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 7,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 7,
    //       name: 'Hammer',
    //       price: 50,
    //       owned: false,
    //       img: '/images/items/weapons/hammer.png',
    //       locked: false,
    //       type: 'weapon',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 8,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 35,
    //       name: 'Jeweled Hammer',
    //       price: 250,
    //       owned: false,
    //       img: '/images/items/weapons/jeweledhammer.png',
    //       locked: true,
    //       type: 'weapon',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 9,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 40,
    //       name: 'Gold Staff',
    //       price: 50000,
    //       owned: false,
    //       img: '/images/items/weapons/goldstaff.png',
    //       locked: true,
    //       type: 'weapon',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 17,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 40,
    //       name: 'BFG 9001',
    //       price: 1000,
    //       owned: false,
    //       img: '/images/items/weapons/blaster2.png',
    //       locked: false,
    //       type: 'weapon',
    //       description: 'Makes it easy to inject the Phaser game framework into your Ember application.',
    //       codeimg: '/code/example_ember_phaser_2.png',
    //       'example-title': 'Ember-Phaser Example',
    //       'addon-name': 'ember-phaser'
    //     },
    //     relationships: {}
    //   },
    //   // armor
    //   {
    //     id: 110,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 1,
    //       name: 'Boots',
    //       price: 50,
    //       owned: true,
    //       img: '/images/items/armor/boots_simple.png',
    //       locked: false,
    //       type: 'armor',
    //       description: 'Allows your hero to move using simple keyboard commands: Q, W, E, A, S, D',
    //       stats: [
    //         {
    //           title: 'Movement',
    //           desc: '1 hex'
    //         }
    //       ]
    //
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 120,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 11,
    //       name: 'Reinforced Boots',
    //       price: 50,
    //       owned: false,
    //       img: '/images/items/armor/boots_reinforced.png',
    //       locked: false,
    //       type: 'armor',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 130,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 13,
    //       name: 'Steel Toed Boots',
    //       price: 50,
    //       owned: false,
    //       img: '/images/items/armor/boots_steeltoed.png',
    //       locked: false,
    //       type: 'armor',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 140,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 15,
    //       name: 'Flying Boots',
    //       price: 50,
    //       owned: false,
    //       img: '/images/items/armor/boots_wings.png',
    //       locked: false,
    //       type: 'armor',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 145,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 3,
    //       name: 'Fur Hat',
    //       price: 50,
    //       owned: true,
    //       img: '/images/items/armor/furhat.png',
    //       locked: false,
    //       type: 'armor',
    //       description: 'Keeps our ears warm',
    //       stats: [
    //         {
    //           title: 'Armor',
    //           desc: '1'
    //         }
    //       ]
    //
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 150,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 25,
    //       name: 'Floppy Hat',
    //       price: 50,
    //       owned: false,
    //       img: '/images/items/armor/hat_floppy.png',
    //       locked: false,
    //       type: 'armor',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 160,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 30,
    //       name: 'Fire Hat',
    //       price: 50,
    //       owned: false,
    //       img: '/images/items/armor/hat_red.png',
    //       locked: false,
    //       type: 'armor',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 170,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 35,
    //       name: 'Magic Hat',
    //       price: 50,
    //       owned: false,
    //       img: '/images/items/armor/hat_magic.png',
    //       locked: false,
    //       type: 'armor',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 180,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 7,
    //       name: 'Tomster Glasses',
    //       price: 50,
    //       owned: true,
    //       img: '/images/items/armor/mahagonyglasses.png',
    //       locked: false,
    //       type: 'armor',
    //       description: 'Makes you look cool',
    //       stats: [
    //         {
    //           title: 'Style',
    //           desc: '11'
    //         },
    //         {
    //           title: 'Sight Range',
    //           desc: '3 hexes'
    //         }
    //       ]
    //
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 185,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 8,
    //       name: 'Mirage',
    //       price: 250,
    //       owned: false,
    //       img: '/images/items/other/omnioculars.png',
    //       locked: false,
    //       type: 'armor',
    //       description: 'A client-side server to help you build, test and demo your Ember app.',
    //       codeimg: '/code/example_mirage.png',
    //       'example-title': 'Ember CLI Mirage Example',
    //       'addon-name': 'ember-cli-mirage'
    //     },
    //     relationships: {}
    //   },
    //
    //   {
    //     id: 190,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 10,
    //       name: 'Robe',
    //       price: 50,
    //       owned: false,
    //       img: '/images/items/armor/robe.png',
    //       locked: false,
    //       type: 'armor',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 200,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 50,
    //       name: 'Tailored Robe',
    //       price: 50,
    //       owned: false,
    //       img: '/images/items/armor/robe_tailored.png',
    //       locked: false,
    //       type: 'armor',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 210,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 55,
    //       name: 'Embroidered Robe',
    //       price: 50,
    //       owned: false,
    //       img: '/images/items/armor/robe_magic.png',
    //       locked: false,
    //       type: 'armor',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 220,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 60,
    //       name: 'Wooden Shield',
    //       price: 50,
    //       owned: true,
    //       img: '/images/items/armor/shield_wooden.png',
    //       locked: false,
    //       type: 'armor',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 230,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 65,
    //       name: 'Iron Shield',
    //       price: 50,
    //       owned: false,
    //       img: '/images/items/armor/shield_iron.png',
    //       locked: false,
    //       type: 'armor',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 240,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 70,
    //       name: 'Tower Shield',
    //       price: 50,
    //       owned: false,
    //       img: '/images/items/armor/shield_steel.png',
    //       locked: false,
    //       type: 'armor',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 250,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 7,
    //       name: 'Chromatic Spectacles',
    //       price: 150,
    //       owned: true,
    //       img: '/images/items/armor/multi-colored-glasses.png',
    //       locked: false,
    //       type: 'armor',
    //       description: 'Test with multiple dependencies',
    //       'addon-name': 'ember-try'
    //
    //     },
    //     relationships: {}
    //   },
    //
    //
    //   // Other
    //   {
    //     id: 300,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 2,
    //       name: 'Tarnished Ring',
    //       price: 50,
    //       owned: true,
    //       img: '/images/items/other/tarnishedring.png',
    //       locked: false,
    //       type: 'other',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 310,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 5,
    //       name: 'Ring of Concurrency',
    //       price: 1337,
    //       owned: false,
    //       img: '/images/items/other/ring5.png',
    //       locked: false,
    //       type: 'other',
    //       description: '"The solution to so many problems you never knew you had."',
    //
    //       'addon-name': 'ember-concurrency',
    //       codeimg: '/code/example_concurrency.png',
    //       'example-title': 'Ember Concurrency Example'
    //       // codeimg: '/code/example_sample_tasks.png',
    //       // 'example-title': 'Sample Concurrency Tasks'
    //
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 320,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 10,
    //       name: 'Fire Amulet',
    //       price: 50,
    //       owned: false,
    //       img: '/images/items/other/amuletorange.png',
    //       locked: false,
    //       type: 'other',
    //       description: '',
    //       codeimg: '/code/example_sample_tasks.png',
    //       'example-title': 'Sample Concurrency Tasks',
    //
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 330,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 15,
    //       name: 'Ice Amulet',
    //       price: 75,
    //       owned: false,
    //       img: '/images/items/other/amuletblue.png',
    //       locked: false,
    //       type: 'other',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 340,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 20,
    //       name: 'Blood Amulet',
    //       price: 50,
    //       owned: false,
    //       img: '/images/items/other/amuletred.png',
    //       locked: false,
    //       type: 'other',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 350,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 30,
    //       name: 'Healing Potion',
    //       price: 50,
    //       owned: true,
    //       img: '/images/items/other/potion_white.png',
    //       locked: false,
    //       type: 'other',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 360,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 35,
    //       name: 'Sleeping Potion',
    //       price: 150,
    //       owned: false,
    //       img: '/images/items/other/potion_blue.png',
    //       locked: false,
    //       type: 'other',
    //       description: ''
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 370,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 9,
    //       name: 'Wand of Wishing',
    //       price: 400,
    //       owned: false,
    //       img: '/images/items/other/wand_of_wishing.png',
    //       locked: false,
    //       type: 'other',
    //       description: 'Zero config import from npm packages',
    //       'addon-name': 'ember-auto-import'
    //
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 380,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 1,
    //       name: 'Babel Fish',
    //       price: 1200,
    //       owned: true,
    //       img: '/images/items/other/babelfish.png',
    //       locked: false,
    //       type: 'other',
    //       description: 'Put in next-gen JavaScript. Get browser-compatible JavaScript out.',
    //       'addon-name': 'ember-cli-babel'
    //
    //     },
    //     relationships: {}
    //   },
    //
    //   // Tomes
    //   {
    //     id: 400,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 1,
    //       name: 'Ember Blog',
    //       price: 50,
    //       owned: true,
    //       img: '/images/items/tomes/tome1.png',
    //       locked: false,
    //       type: 'tome',
    //       description: '<div class="nowrap">Happy EmberConf Emberistas!</div><br /><div class="center table emberistas">🐹 🐹 🐹</div>'
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 405,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 5,
    //       name: 'Discord',
    //       price: 50,
    //       owned: true,
    //       img: '/images/items/tomes/tome2.png',
    //       locked: false,
    //       type: 'tome',
    //       description: 'Ask questions and chat with community members in real-time.'
    //     },
    //     relationships: {}
    //   },
    //   {
    //     id: 410,
    //     type: 'inventory-item',
    //     attributes: {
    //       listorder: 10,
    //       name: 'Ember Guides',
    //       price: 400,
    //       owned: true,
    //       img: '/images/items/tomes/tome3.png',
    //       locked: false,
    //       type: 'tome',
    //       description: 'Shout out to the entire Ember Core Learning Team. Thank you!',
    //       stats: [
    //         {
    //           title: 'Knowledge',
    //           desc: '100+'
    //         }
    //       ]
    //     },
    //     relationships: {}
    //   }
    // ];
  }
}
