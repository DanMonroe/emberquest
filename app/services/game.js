import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class GameService extends Service {

  @service map;

  @tracked currentMapData = "foo";
}
