import Route from '@ember/routing/route';

export default class PlayRoute extends Route {

  model(params) {
    return {
      overrideMap: {
          map: params.map,
          x: params.x,
          y: params.y
        },
        debug: {
          phaserDebug: params.debug,
          level: params.level,
          gold: params.gold,
          speed: params.speed,
          selfhelp: params.selfhelp,
          resetcache: params.resetcache
        }
      }
    }
}
