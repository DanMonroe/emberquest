import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default class ApplicationRoute extends Route {

  @service metrics
  @service('router')
  routerService;

  constructor() {
    super(...arguments);

    let router = this.routerService
    router.on('routeDidChange', () => {
      const page = router.currentURL;
      const title = router.currentRouteName || 'unknown';

      this.metrics.trackPage({ page, title });
    });
  }
}
