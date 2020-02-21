// export default function() {
export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('post', 10);

  // console.log('server', server)
  server.db.loadData({
    // 'inventory-items': [
    // inventoryitems: [
    inventoryItems: [
      {
        id:1,
        name: 'Sword',
        price: 100,
        owned: true,
        img: '/images/items/crossbow.png',
        locked: false,
        type: 'weapon',

        description: '',
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

        // codeimg: '',
        // exampleTitle: '',
        // addonName: ''


      }
    ]
  })
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
