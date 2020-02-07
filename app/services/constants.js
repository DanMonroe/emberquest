import Service from '@ember/service';

export default class ConstantsService extends Service {

  COLORS = {
    DARK: 0x007ac1
  };

  DIRECTIONS = {
    SE: 0,
    S: 1,
    SW: 2,
    NW: 3,
    N: 4,
    NE: 5
  };

  // COLOR_PRIMARY = 0x43a047;
  // COLOR_LIGHT = 0x76d275;
  // COLOR_DARK = 0x00701a;
  //
  // COLOR2_PRIMARY = 0xd81b60;
  // COLOR2_LIGHT = 0xff5c8d;
  // COLOR2_DARK = 0xa00037;
  //
  // COLOR_VISIBLE  = 0xc49000;

  COLOR_HIDDEN = 0x000000;
  // COLOR_HIDDEN = 0x333333;

  ALPHA_POLYGON_VISIBLE_TO_PLAYER = 0;
  ALPHA_POLYGON_HIDDEN_TO_PLAYER = 1;
  ALPHA_OBJECT_VISIBLE_TO_PLAYER = 1;
  ALPHA_OBJECT_HIDDEN_TO_PLAYER = 0;

  // ALPHA_VISIBLE_TO_PLAYER = 0;
  // ALPHA_HIDDEN_FROM_PLAYER = 1;
  ALPHA_PREVIOUSLY_SEEN = 0.4;

  SHAPE_TYPE_PLAYER = 'Player';
  SHAPE_TYPE_POLYGON = 'Polygon';

  FLAG_TYPE_TRAVEL = 0;
  FLAG_TYPE_VISIBILITY = 1;

  TILEZ_PLAYER  = 1; // "layer" for player
  TILEZ_FOG  = 2;    // "layer" for fog of war
  TILEZ_CHESTS  = 3;    // "layer" for chests

  FLAGS = {
    TRAVEL: {
      SEA: {value: 1, description: 'Travel by Sea'},
      LAND: {value: 2, description: 'Travel by Land'},
      AIR: {value: 4, description: 'Travel by Air'},
      IMPASSABLE: {value: 8, description: 'Impassable'}
    },
    SIGHT: {
      IMPASSABLE: {value: 1, description: 'Impassable'}
    },
    SPECIAL: {
      DOCK: {value: 1, description: 'Dock'}
    }
  };
}
