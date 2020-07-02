import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
// import { constants } from 'emberquest/services/constants';

export default class TransportPoolService extends Service {

  @tracked transportpool;

  getTransportConfig(key) {
    const pool = this.getTransportPool();
    const transportConfig = pool.get(key);
    return transportConfig;
  }

  findTransportById(id) {
    const pool = this.getTransportPool();
    return [...pool.values()].find(transport => {
      return transport.id === id;
    });
  }

  findTransportByTexture(texture) {
    const pool = this.getTransportPool();
    return [...pool.values()].find(transport => {
      return transport.texture === texture;
    });
  }

  getTransportPool() {
    if (this.transportpool === undefined) {
      this.populateTransportPool();
    }
    return this.transportpool;
  }

  populateTransportPool() {
    // console.log('populate transport pool');

    this.transportpool = new Map();

    // keys are originmapname_transportNumber

    // CUTTER
    // let baseTransportclone = Object.assign({}, this.baseTransport);
    this.transportpool.set('intro3_1',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1,
        texture: 'cutter',
        scale: 1.4,
      })
    );
    this.transportpool.set('m13_1',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1301,
        texture: 'cutter',
        scale: 1.4,
      })
    );
    this.transportpool.set('m13_2',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1302,
        texture: 'barque',
        scale: 1.4,
      })
    );
    this.transportpool.set('m13_3',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1303,
        texture: 'boat',
        scale: 1.4,
      })
    );
    this.transportpool.set('m13_4',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1304,
        texture: 'barque',
        scale: 1.4,
      })
    );
    this.transportpool.set('m13_5',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1305,
        texture: 'cutter',
        scale: 1.4,
      })
    );
    this.transportpool.set('m13_6',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1306,
        texture: 'barque',
        scale: 1.4,
      })
    );
    this.transportpool.set('m5_1',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1307,
        texture: 'cutter',
        scale: 1.4,
      })
    );
    this.transportpool.set('final_1',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1308,
        texture: 'boat',  // TODO draw new boat
        scale: 1.4,
      })
    );

    this.transportpool.set('gryphon_1',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1308,
        speed: 200,
        scale: 1.5,
        animeframes: {
          rest: {key: 'gryphonrest', prefix: 'gryphon/gryphon', start: 1, end: 1},
          move: {key: 'gryphonmove', prefix: 'gryphon/gryphon-flying-', start: 1, end: 8, rate: 8, repeat: -1}
        },
        flagAttributes: {
          sF: 0,
          tF: 4
        },
        transferAtDock: false,
        transferAtNest: true

      })
    );

  }

  baseTransport = {
    id: 1,
    // texture: 'cutter',
    textureSize: { width: 42, height: 42},
    scale: 1,
    speed: 125,
    sightRange: 3,   // this is sight/movement Range
    movingPoints: 3,   // this is sight/movement Range
    visiblePoints: 8,   // this is sight/movement Range
    health: 20,
    maxHealth: 20,
    power: 25,
    healingPower: 1,
    flagAttributes: {
      sF: 0,
      tF: 1
    },
    transferAtDock: true,
    transferAtNest: false,

    animeframes: {},
    audio: [{ die: '' }],

    // level: 1

  }
}
