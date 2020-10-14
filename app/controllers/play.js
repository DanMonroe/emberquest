import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class PlayController extends Controller {
  queryParams = ['map','x','y','debug','gold','level','speed','selfhelp', 'resetcache', 'dan'];
  // debug is for phaser debug

  @tracked map = null;

}
