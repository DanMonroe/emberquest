import Service from '@ember/service';

export default class MapService extends Service {

  test(foo) {
    console.log('test in map service', foo);
  }
}
