'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'emberquest',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    game: {
      modalsDuration: 600,  // transition time for drop down modals
      pauseOnBlur: true,
      showAgentSelector: false,

      playerConfig: {
        // playerX: playerTile.x,
        // playerY: playerTile.y,
        texture: 'player',
        spriteTexture: 'avatar',
        textureSize: { width: 42, height: 42},
        scale: .15,
        face: 0,
        coneMode: 'direction',
        cone: 6,
        speed: 125,
        sightRange: 3,   // this is sight/movement Range
        movingPoints: 3,   // this is sight/movement Range
        visiblePoints: 5,   // this is sight/movement Range

        gold: 15,
        health: 20,
        baseHealingPower: 2,
        baseHealingSpeed: 2500,
        baseEnergizeSpeed : 2000,
        baseEnergizePower: 2,
        // energizeSpeed : 2000,
        // energizePower: 2,
        power: 102,
        id: 'player1',
        // playerAttackAudio: undefined, // when ready, get from Boot scene  --- actually should get from the weapon the player is using.

        // flagAttributes: {
        //   sF: (this.storedData.storedPlayerAttrs && this.storedData.storedPlayerAttrs.sF) || 0,
        //   tF: (this.storedData.storedPlayerAttrs && this.storedData.storedPlayerAttrs.tF) || this.ember.constants.FLAGS.TRAVEL.LAND.value
        // },
        offsets: {
          img: { x: 0, y: 0 },
          healthbar: { x: 0, y: -10 },
          powerbar: { x: 0, y: -10 },
          name: { x: 0, y: 0 },
          damage: { x: 0, y: -35 }
        },
        // storedPlayerAttrs: this.storedData.storedPlayerAttrs,

        // debug: {
        //   // graphics: this.add.graphics().setDepth(10),
        //   log: false,
        //   override: this.ember.debug || {level:null,gold:null}
        // }
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV['ember-cli-mirage'] = {
      enabled: false
    };

    ENV.game.pauseOnBlur = false;
    ENV.game.playerConfig.speed = 300;

    ENV.game.showAgentSelector = true;

  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // ENV['ember-cli-mirage'] = {
    //   enabled: false
    // };
  }

  return ENV;
};
