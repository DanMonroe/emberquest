export default function(server) {

  // mirage/scenarios/default.js
  server.db.loadData({
    inventoryItems: [{
        name: 'Crossbow',
        price: 20,
        owned: true,
        img: '/images/items/weapons/crossbow.png',
        locked: false,
        type: 'weapon',
        description: 'Modest range and damage; it\'s the beginner crossbow.',
      },
      {
        name: 'Simple Sword',
        price: 20,
        owned: true,
        img: '/images/items/weapons/crossbow.png',
        locked: false,
        type: 'weapon',
        description: 'Modest range and damage; it\'s the beginner crossbow.',
      }
      ]
  });
}

// id: '',
// name: '',
// type: '',
// description: '',
// price: '',
// img: '',
// locked: '',
// stats: '',
// skills: '',
// sound: '',
// soundhit: '',
// owner: '',
// tileX: '',
// tileY: '',
// maxRange: 1,
// damage: 1,
// weaponSpeed: 1,
// projectileSpeed: 1,
// poweruse: 1,
// accuracy: 1,
//
// codeimg: '',
// exampleTitle: '',
// addonName: ''
