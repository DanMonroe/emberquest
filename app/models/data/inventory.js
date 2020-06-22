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
        display: true,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Jagged Sword',
        img: '/images/items/weapons/sword_jagged.png',
        cssClazz: 'sword b',
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
        display: true,
        price: 2,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        name: 'Simple Axe',
        img: '/images/items/weapons/axe.png',
        cssClazz: 'axe a',
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
        id: 5000,
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
        id: 5001,
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
        id: 5002,
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
        id: 5003,
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

    // Monster Ranged
    items.push(
      new InventoryItem({
        id: 5100,
        name: 'Ship Cannon',
        type: constants.INVENTORY.TYPE.MONSTER,
        bodypart: constants.INVENTORY.BODYPART.RIGHT_HAND,
        projectileImg: 'ball',
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
    items.push(
      new InventoryItem({
        id: 5101,
        name: 'Tower',
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
        display: true,
        price: 10,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        name: 'Bow',
        img: '/images/items/weapons/bow.png',
        projectileImg: 'missile',
        // velocity: 350, // 300 default
        cssClazz: 'ranged a',
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
        display: true,
        price: 10,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        name: 'Enhanced Bow',
        img: '/images/items/weapons/bow2.png',
        projectileImg: 'missile',
        // velocity: 350, // 300 default
        cssClazz: 'ranged b',
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
        display: true,
        price: 10,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        name: 'Crossbow',
        img: '/images/items/weapons/crossbow.png',
        projectileImg: 'missile',
        // velocity: 350, // 300 default
        cssClazz: 'ranged c',
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
        display: true,
        price: 10,
        type: constants.INVENTORY.TYPE.WEAPON,
        bodypart: constants.INVENTORY.BODYPART.RANGED,
        name: 'Triple Bolt',
        img: '/images/items/weapons/boltsplitter.png',
        projectileImg: 'missile',
        // velocity: 350, // 300 default
        cssClazz: 'ranged d',
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
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 3})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
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
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.HEAD,
        name: 'Fur Hat',
        img: '/images/items/armor/furhat.png',
        cssClazz: 'hide',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
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
        owned: false,
        display: true,
        price: 5,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.LEFT_HAND,
        name: 'Wooden Shield',
        img: '/images/items/armor/shield_wooden.png',
        cssClazz: 'shield a',
        description: '',
        stats: [new Stat({type: constants.INVENTORY.STATS.HEALTH, value: 25})]
      })
    );
    items.push(
      new InventoryItem({
        id: armorId++,
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
        type: constants.INVENTORY.TYPE.OTHER,
        name: 'Tarnished Ring',
        img: '/images/items/other/tarnishedring.png',
        cssClazz: 'hide',
        description: '',
        price: 30,
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
        display: true,
        locked: false,
        price: 0,
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
        display: true,
        locked: false,
        price: 0,
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
        display: true,
        locked: false,
        price: 0,
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
        display: true,
        price: 0  ,
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
        id: 2004,
        owned: false,
        display: true,
        locked: false,
        price: 0,
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
        display: true,
        locked: false,
        price: 0,
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
        display: true,
        locked: false,
        price: 0,
        // price: 550,
        type: constants.INVENTORY.TYPE.ARMOR,
        bodypart: constants.INVENTORY.BODYPART.FINGERS,
        name: 'Dragon Ring',
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
        display: true,
        locked: false,
        price: 0,
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
        display: true,
        locked: false,
        price: 0,
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
        price: 0,
        // price: 550,
        type: constants.INVENTORY.TYPE.NONDISPLAY,
        name: 'North Castle Gate Key',
        img: '/images/items/key.png'
      })
    );


    return items;

  }
}
