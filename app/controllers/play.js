import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class PlayController extends Controller {
  queryParams = ['map','x','y','debug','gold','level','speed'];
  // debug is for phaser debug

  @tracked map = null;

}
