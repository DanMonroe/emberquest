export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = 'http://localhost:4400';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '/api';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */

  // console.log('yo')
  // this.get('/inventory-items');
  // this.get('/inventoryItems');
  //
  // this.get('/inventoryitems');

  this.get('/inventoryitems', (schema/*, request*/) => {
    console.log('getting all inventoryitems');
    return schema.inventoryItems.all();
  });

  this.get('/inventory-items', (schema/*, request*/) => {
    console.log('getting all inventoryItems');
    return schema.inventoryItems.all();
  });
  this.get('/inventory-items/:id', (schema, request) => {
    let id = request.params.id;
    console.log('getting inventoryItem', id);

    return schema.inventoryItems.find(id);
  });

  this.passthrough();
}
