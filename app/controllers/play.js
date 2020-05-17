import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
// import { action } from '@ember/object';
// import { inject as service } from '@ember/service';

export default class PlayController extends Controller {
  queryParams = ['map'];

  @tracked map = null;

}
