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
  SHAPE_TYPE_CONTAINER = 'Container';
  SHAPE_TYPE_TRANSPORT = 'Transport';
  SHAPE_TYPE_ENEMY = 'Enemy';
  SHAPE_TYPE_AGENT = 'Agent';

  FLAG_TYPE_TRAVEL = 0;
  FLAG_TYPE_VISIBILITY = 1;

  TILEZ_PLAYER  = 1; // "layer" for player
  TILEZ_FOG  = 2;    // "layer" for fog of war
  TILEZ_CHESTS  = 3;    // "layer" for chests
  TILEZ_MONSTERS  = 4;    // "layer" for monsters
  TILEZ_TRANSPORTS  = 5; // "layer" for transports
  TILEZ_AGENTS  = 6; // "layer" for agents

  SPAWNER_TYPE = {
    MONSTER: 'MONSTER',
    CHEST: 'CHEST',
    TRANSPORT: 'TRANSPORT',
    AGENT: 'AGENT'
  };

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

  healthBarOffsetX = -24;
  healthBarOffsetY = -33;
  healthBarWidth = 48;
  healthBarHeight = 5;
  healthBarColorGood = 0x30dd00;
  healthBarColorDanger = 0xff0000;
  healthBarColorTippingPoint = 0.25;

  powerBarOffsetX = -24;
  powerBarOffsetY = -27;
  powerBarWidth = 48;
  powerBarHeight = 5;
  powerBarColor = 0x1E5AFF;

}
