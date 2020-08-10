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

    // this.transportpool.set('gryphon_1',
    //   Object.assign(Object.assign({}, this.baseTransport), {
    //     id: 1308,
    //     speed: 200,
    //     scale: 1.5,
    //     animeframes: {
    //       rest: {key: 'gryphonrest', prefix: 'gryphon/gryphon', start: 1, end: 1},
    //       move: {key: 'gryphonmove', prefix: 'gryphon/gryphon-flying-', start: 1, end: 8, rate: 8, repeat: -1}
    //     },
    //     flagAttributes: {
    //       sF: 0,
    //       tF: 4
    //     },
    //     transferAtDock: false,
    //     transferAtNest: true
    //
    //   })
    // );

    // CUTTER
    // let baseTransportclone = Object.assign({}, this.baseTransport);
    this.transportpool.set('intro3_1',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1,
        // texture: 'cutter',
        scale: 1.2,
        animeframes: {
          rest: {key: 'intro3_1-rest', prefix: 'ships/cutter', start: 1, end: 1}
        }
      })
    );

    this.transportpool.set('m1_1',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 101,
        scale: 1.2,
        animeframes: {
          rest: {key: 'm1_1-rest', prefix: 'ships/frigate', start: 1, end: 1}
        }
      })
    );
    this.transportpool.set('m1_2',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 102,
        scale: 1.2,
        animeframes: {
          rest: {key: 'm1-2-rest', prefix: 'ships/frigate', start: 1, end: 1}
        }
      })
    );



    this.transportpool.set('m2_1',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 201,
        scale: 1.2,
        speed: 200,
        animeframes: {
          rest: {key: 'm2_1-rest', prefix: 'ships/caravel', start: 1, end: 1}
        }
      })
    );
    this.transportpool.set('m2_2',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 202,
        scale: 1.2,
        // speed: 350,
        animeframes: {
          rest: {key: 'm2_2-rest', prefix: 'ships/carrack', start: 1, end: 1}
        }
      })
    );
    this.transportpool.set('m5_1',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 501,
        scale: 1.2,
// speed: 600,
        animeframes: {
          rest: {key: 'm5_1-rest', prefix: 'ships/sailboat', start: 1, end: 1}
        }
      })
    );
    this.transportpool.set('m5_2',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 502,
        scale: 1.2,
        speed: 200,
        animeframes: {
          rest: {key: 'm5_2-rest', prefix: 'ships/corvette', start: 1, end: 1}
        }
      })
    );
    this.transportpool.set('m9_1',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 901,
        scale: 1.2,
        animeframes: {
          rest: {key: 'm9_1-rest', prefix: 'ships/galley', start: 1, end: 1}
        }
      })
    );
    this.transportpool.set('m9_2',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 902,
        scale: 1.2,
        animeframes: {
          rest: {key: 'm9-2-rest', prefix: 'ships/frigate', start: 1, end: 1}
        }
      })
    );

    this.transportpool.set('m10_1',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1001,
        scale: 1.2,
        animeframes: {
          rest: {key: 'm10_1-rest', prefix: 'ships/galley', start: 1, end: 1}
        }
      })
    );
    this.transportpool.set('m10_2',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1002,
        scale: 1.2,
        animeframes: {
          rest: {key: 'm10-2-rest', prefix: 'ships/frigate', start: 1, end: 1}
        }
      })
    );

    this.transportpool.set('m11_1',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1101,
        scale: 1.2,
        animeframes: {
          rest: {key: 'm11_1-rest', prefix: 'ships/gunboat', start: 1, end: 1}
        }
      })
    );
    this.transportpool.set('m11_2',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1102,
        scale: 1.2,
        speed: 90,
        animeframes: {
          rest: {key: 'm11-2-rest', prefix: 'ships/boat', start: 1, end: 1}
        }
      })
    );

    this.transportpool.set('m12_1',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1201,
        scale: 1.2,
        animeframes: {
          rest: {key: 'm12_1-rest', prefix: 'ships/swampboat', start: 1, end: 1}
        }
      })
    );
    this.transportpool.set('m12_2',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1202,
        scale: 1.2,
        animeframes: {
          rest: {key: 'm12_2-rest', prefix: 'ships/frigate', start: 1, end: 1}
        }
      })
    );
    this.transportpool.set('m12_3',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1203,
        scale: 1.2,
        animeframes: {
          rest: {key: 'm12_3-rest', prefix: 'ships/frigate', start: 1, end: 1}
        }
      })
    );


    this.transportpool.set('m13_1',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1301,
        scale: 1.2,
        animeframes: {
          rest: {key: 'm13_1-rest', prefix: 'ships/cutter', start: 1, end: 1}
        }
      })
    );
    this.transportpool.set('m13_2',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1302,
        // texture: 'barque',
        animeframes: {
          rest: {key: 'm13_2-rest', prefix: 'ships/barque', start: 1, end: 1}
        },
        scale: 1.4,
      })
    );
    this.transportpool.set('m13_3',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1303,
        // texture: 'boat',
        animeframes: {
          rest: {key: 'm13_3-rest', prefix: 'ships/boat', start: 1, end: 1}
        },
        scale: 1.2,
      })
    );
    this.transportpool.set('m13_4',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1304,
        // texture: 'barque',
        animeframes: {
          rest: {key: 'm13_4-rest', prefix: 'ships/barque', start: 1, end: 1}
        },
        scale: 1.4,
      })
    );
    this.transportpool.set('m13_5',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1305,
        scale: 1.2,
        animeframes: {
          rest: {key: 'm13_5-rest', prefix: 'ships/cutter', start: 1, end: 1}
        }
      })
    );
    this.transportpool.set('m13_6',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 1306,
        animeframes: {
          rest: {key: 'm13_6-rest', prefix: 'ships/barque', start: 1, end: 1}
        },
        scale: 1.4,
      })
    );

    this.transportpool.set('final_1',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 9901, // don't change this.. used in final map
        // speed: 500,
        speed: 50,
        animeframes: {
          rest: {key: 'final_1-rest', prefix: 'ships/lava_boat', start: 1, end: 1}
        },
        scale: .45,
        hidden: false
      })
    );

    this.transportpool.set('gryphon_1',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 9902,
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

    //Ice Breaker
    this.transportpool.set('m7_1',
      Object.assign(Object.assign({}, this.baseTransport), {
        id: 701,
        scale: 1.2,
        animeframes: {
          rest: {key: 'm7_1-rest', prefix: 'ships/rhinoreme-', start: 1, end: 1},
          move: {key: 'm7_1-move', prefix: 'ships/rhinoreme-', start: 1, end: 3}
        },
        flagAttributes: {
          sF: 0,
          tF: 17  // sea and ice
        }

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
