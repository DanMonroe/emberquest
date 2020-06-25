'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    babel: {
      plugins: [ require.resolve('ember-auto-import/babel-plugin') ]
    },

    prember: {
      urls: [
        '/'
      ]
    },

    fingerprint: {
      include: [
        'images/help',
        'images/common',
        'images/sprites'
      ],
      exclude: [
        'images',
        'images/agents',
        'images/backgrounds',
        'images/common',
        'images/icons',
        'images/items',
        'images/items/armor',
        'images/items/other',
        'images/items/tomes',
        'images/items/weapons',
        'images/maps',
        'images/monsters',
        'images/transports',
      ]
    }

  });

  app.import('vendor/bootstrap/css/bootstrap.css', {
    destDir: 'assets'
  });
  // app.import('vendor/bootstrap/css/bootstrap-theme.css');
  app.import('vendor/bootstrap/fonts/glyphicons-halflings-regular.eot', {
    destDir: 'fonts'
  });
  app.import('vendor/bootstrap/fonts/glyphicons-halflings-regular.svg', {
    destDir: 'fonts'
  });
  app.import('vendor/bootstrap/fonts/glyphicons-halflings-regular.ttf', {
    destDir: 'fonts'
  });
  app.import('vendor/bootstrap/fonts/glyphicons-halflings-regular.woff', {
    destDir: 'fonts'
  });
  app.import('vendor/bootstrap/fonts/glyphicons-halflings-regular.woff2', {
    destDir: 'fonts'
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
