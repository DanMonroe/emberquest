export class InventoryItems {
  get data() {
    return [
      // weapons
      {
        id: 1,
        type: 'inventory-item',
        attributes: {
          listorder: 1,
          name: 'Crossbow',
          price: 20,
          owned: true,
          img: '/images/items/weapons/crossbow.png',
          locked: false,
          type: 'weapon',
          description: 'Modest range and damage; it\'s the beginner crossbow.',
          stats: [
            {
              title: 'Damage',
              desc: '8'
            },
            {
              title: 'Range',
              desc: '2'
            }
          ]

        },
        relationships: {}
      },
      {
        id: 2,
        type: 'inventory-item',
        attributes: {
          listorder: 10,
          name: 'Bolt Splitter',
          price: 200,
          owned: false,
          img: '/images/items/weapons/boltsplitter.png',
          locked: false,
          type: 'weapon',
          description: ''
        },
        relationships: {}
      },
      {
        id: 3,
        type: 'inventory-item',
        attributes: {
          listorder: 3,
          name: 'Simple Sword',
          price: 10,
          owned: true,
          img: '/images/items/weapons/simplesword.png',
          locked: false,
          type: 'weapon',
          description: 'A simple introductory sword.',
          stats: [
            {
              title: 'Damage',
              desc: '8'
            }
          ]
          // skills: [
          //   {
          //     title: 'attack',
          //     desc: 'The attack method makes the hero attack the target.'
          //   }
          // ]
        },
        relationships: {}
      },
      {
        id: 4,
        type: 'inventory-item',
        attributes: {
          listorder: 15,
          name: 'Katana',
          price: 50,
          owned: false,
          img: '/images/items/weapons/katana.png',
          locked: false,
          type: 'weapon',
          description: ''
        },
        relationships: {}
      },
      {
        id: 5,
        type: 'inventory-item',
        attributes: {
          listorder: 20,
          name: 'Claymore',
          price: 100,
          owned: false,
          img: '/images/items/weapons/claymore.png',
          locked: true,
          type: 'weapon',
          description: ''
        },
        relationships: {}
      },
      {
        id: 6,
        type: 'inventory-item',
        attributes: {
          listorder: 25,
          name: 'Tracked',
          price: 500,
          owned: false,
          img: '/images/items/weapons/ember_sword.png',
          locked: false,
          type: 'weapon',
          description: ''
        },
        relationships: {}
      },
      {
        id: 7,
        type: 'inventory-item',
        attributes: {
          listorder: 7,
          name: 'Hammer',
          price: 50,
          owned: false,
          img: '/images/items/weapons/hammer.png',
          locked: false,
          type: 'weapon',
          description: ''
        },
        relationships: {}
      },
      {
        id: 8,
        type: 'inventory-item',
        attributes: {
          listorder: 35,
          name: 'Jeweled Hammer',
          price: 250,
          owned: false,
          img: '/images/items/weapons/jeweledhammer.png',
          locked: true,
          type: 'weapon',
          description: ''
        },
        relationships: {}
      },
      {
        id: 9,
        type: 'inventory-item',
        attributes: {
          listorder: 40,
          name: 'Gold Staff',
          price: 50000,
          owned: false,
          img: '/images/items/weapons/goldstaff.png',
          locked: false,
          type: 'weapon',
          description: ''
        },
        relationships: {}
      },
      // armor
      {
        id: 10,
        type: 'inventory-item',
        attributes: {
          listorder: 1,
          name: 'Boots',
          price: 50,
          owned: true,
          img: '/images/items/armor/boots_simple.png',
          locked: false,
          type: 'armor',
          description: ''
        },
        relationships: {}
      },
      {
        id: 11,
        type: 'inventory-item',
        attributes: {
          listorder: 11,
          name: 'Reinforced Boots',
          price: 50,
          owned: false,
          img: '/images/items/armor/boots_reinforced.png',
          locked: false,
          type: 'armor',
          description: ''
        },
        relationships: {}
      },
      {
        id: 12,
        type: 'inventory-item',
        attributes: {
          listorder: 13,
          name: 'Steel Toed Boots',
          price: 50,
          owned: false,
          img: '/images/items/armor/boots_steeltoed.png',
          locked: false,
          type: 'armor',
          description: ''
        },
        relationships: {}
      },
      {
        id: 13,
        type: 'inventory-item',
        attributes: {
          listorder: 15,
          name: 'Flying Boots',
          price: 50,
          owned: false,
          img: '/images/items/armor/boots_wings.png',
          locked: false,
          type: 'armor',
          description: ''
        },
        relationships: {}
      },
      {
        id: 14,
        type: 'inventory-item',
        attributes: {
          listorder: 3,
          name: 'Fur Hat',
          price: 50,
          owned: true,
          img: '/images/items/armor/furhat.png',
          locked: false,
          type: 'armor',
          description: ''
        },
        relationships: {}
      },
      {
        id: 15,
        type: 'inventory-item',
        attributes: {
          listorder: 25,
          name: 'Floppy Hat',
          price: 50,
          owned: false,
          img: '/images/items/armor/hat_floppy.png',
          locked: false,
          type: 'armor',
          description: ''
        },
        relationships: {}
      },
      {
        id: 16,
        type: 'inventory-item',
        attributes: {
          listorder: 30,
          name: 'Fire Hat',
          price: 50,
          owned: false,
          img: '/images/items/armor/hat_red.png',
          locked: false,
          type: 'armor',
          description: ''
        },
        relationships: {}
      },
      {
        id: 17,
        type: 'inventory-item',
        attributes: {
          listorder: 35,
          name: 'Magic Hat',
          price: 50,
          owned: false,
          img: '/images/items/armor/hat_magic.png',
          locked: false,
          type: 'armor',
          description: ''
        },
        relationships: {}
      },
      {
        id: 18,
        type: 'inventory-item',
        attributes: {
          listorder: 10,
          name: 'Tomster Glasses',
          price: 50,
          owned: true,
          img: '/images/items/armor/mahagonyglasses.png',
          locked: false,
          type: 'armor',
          description: ''
        },
        relationships: {}
      },
      {
        id: 19,
        type: 'inventory-item',
        attributes: {
          listorder: 7,
          name: 'Robe',
          price: 50,
          owned: false,
          img: '/images/items/armor/robe.png',
          locked: false,
          type: 'armor',
          description: ''
        },
        relationships: {}
      },
      {
        id: 20,
        type: 'inventory-item',
        attributes: {
          listorder: 50,
          name: 'Tailored Robe',
          price: 50,
          owned: false,
          img: '/images/items/armor/robe_tailored.png',
          locked: false,
          type: 'armor',
          description: ''
        },
        relationships: {}
      },
      {
        id: 21,
        type: 'inventory-item',
        attributes: {
          listorder: 55,
          name: 'Embroidered Robe',
          price: 50,
          owned: false,
          img: '/images/items/armor/robe_magic.png',
          locked: false,
          type: 'armor',
          description: ''
        },
        relationships: {}
      },
      {
        id: 22,
        type: 'inventory-item',
        attributes: {
          listorder: 60,
          name: 'Wooden Shield',
          price: 50,
          owned: true,
          img: '/images/items/armor/shield_wooden.png',
          locked: false,
          type: 'armor',
          description: ''
        },
        relationships: {}
      },
      {
        id: 23,
        type: 'inventory-item',
        attributes: {
          listorder: 65,
          name: 'Iron Shield',
          price: 50,
          owned: false,
          img: '/images/items/armor/shield_iron.png',
          locked: false,
          type: 'armor',
          description: ''
        },
        relationships: {}
      },
      {
        id: 24,
        type: 'inventory-item',
        attributes: {
          listorder: 70,
          name: 'Tower Shield',
          price: 50,
          owned: false,
          img: '/images/items/armor/shield_steel.png',
          locked: false,
          type: 'armor',
          description: ''
        },
        relationships: {}
      },


      // Other
      {
        id: 100,
        type: 'inventory-item',
        attributes: {
          listorder: 1,
          name: 'Tarnished Ring',
          price: 50,
          owned: true,
          img: '/images/items/other/tarnishedring.png',
          locked: false,
          type: 'other',
          description: ''
        },
        relationships: {}
      },
      {
        id: 101,
        type: 'inventory-item',
        attributes: {
          listorder: 5,
          name: 'Ring of Concurrency',
          price: 1337,
          owned: false,
          img: '/images/items/other/ring5.png',
          locked: false,
          type: 'other',
          description: '"The solution to so many problems you never knew you had."',

          codeimg: '/code/reloadHealthTask.png',
          'example-title': 'Ember Concurrency Example',
          'addon-name': 'ember-concurrency'

        },
        relationships: {}
      },
      {
        id: 102,
        type: 'inventory-item',
        attributes: {
          listorder: 10,
          name: 'Fire Amulet',
          price: 50,
          owned: false,
          img: '/images/items/other/amuletorange.png',
          locked: false,
          type: 'other',
          description: ''
        },
        relationships: {}
      },
      {
        id: 103,
        type: 'inventory-item',
        attributes: {
          listorder: 15,
          name: 'Ice Amulet',
          price: 50,
          owned: false,
          img: '/images/items/other/amuletblue.png',
          locked: false,
          type: 'other',
          description: ''
        },
        relationships: {}
      },
      {
        id: 104,
        type: 'inventory-item',
        attributes: {
          listorder: 20,
          name: 'Blood Amulet',
          price: 50,
          owned: false,
          img: '/images/items/other/amuletred.png',
          locked: false,
          type: 'other',
          description: ''
        },
        relationships: {}
      },
      {
        id: 105,
        type: 'inventory-item',
        attributes: {
          listorder: 25,
          name: 'Mirage',
          price: 250,
          owned: false,
          img: '/images/items/other/omnioculars.png',
          locked: false,
          type: 'other',
          description: '',
          codeimg: '/code/reloadHealthTask.png',
          'example-title': 'Ember CLI Mirage Example',
          'addon-name': 'ember-cli-mirage'
        },
        relationships: {}
      },
      {
        id: 106,
        type: 'inventory-item',
        attributes: {
          listorder: 30,
          name: 'Healing Potion',
          price: 50,
          owned: true,
          img: '/images/items/other/potion_white.png',
          locked: false,
          type: 'other',
          description: ''
        },
        relationships: {}
      },
      {
        id: 107,
        type: 'inventory-item',
        attributes: {
          listorder: 35,
          name: 'Sleeping Potion',
          price: 150,
          owned: false,
          img: '/images/items/other/potion_blue.png',
          locked: false,
          type: 'other',
          description: ''
        },
        relationships: {}
      },
      {
        id: 108,
        type: 'inventory-item',
        attributes: {
          listorder: 40,
          name: 'Wand of Wishing',
          price: 1200,
          owned: false,
          img: '/images/items/other/wand_of_wishing.png',
          locked: false,
          type: 'other',
          description: '',
          codeimg: '/code/reloadHealthTask.png',
          'example-title': 'Ember Auto Import Example',
          'addon-name': 'ember-auto-import'

        },
        relationships: {}
      },

      // Tomes
      {
        id: 400,
        type: 'inventory-item',
        attributes: {
          listorder: 1,
          name: 'Ember Blog',
          price: 50,
          owned: true,
          img: '/images/items/tomes/tome1.png',
          locked: false,
          type: 'tome',
          description: ''
        },
        relationships: {}
      },
      {
        id: 405,
        type: 'inventory-item',
        attributes: {
          listorder: 5,
          name: 'Discord',
          price: 50,
          owned: true,
          img: '/images/items/tomes/tome2.png',
          locked: false,
          type: 'tome',
          description: ''
        },
        relationships: {}
      },
      {
        id: 410,
        type: 'inventory-item',
        attributes: {
          listorder: 10,
          name: 'Ember Guides',
          price: 400,
          owned: true,
          img: '/images/items/tomes/tome3.png',
          locked: false,
          type: 'tome',
          description: ''
        },
        relationships: {}
      }
    ];
  }
}
