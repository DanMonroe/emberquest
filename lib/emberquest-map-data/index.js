'use strict';
//
// module.exports = {
//   name: require('./package').name,
//
//   isDevelopingAddon() {
//     return true;
//   },
//
//   included(app, parentAddon) {
//     let target = (parentAddon || app);
//     target.options = target.options || {};
//     target.options.babel = target.options.babel || { includePolyfill: true };
//     return this._super.included.apply(this, arguments);
//   }
// };

function foo() {
  console.log('foo')
}

const bar = {
  'yo': 'ho'
}
const coo = {
  'moo': 'ho1'
}
module.exports = foo;
module.exports = bar;
exports.coo = coo;
