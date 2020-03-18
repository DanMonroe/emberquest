import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import {setupMirage} from 'ember-cli-mirage/test-support';

let service;
module('Unit | Service | inventory', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    service = this.owner.lookup('service:inventory');
  });

  // Replace this with your real tests.
  test('it exists', function(assert) {
    assert.ok(service);
  });

  test('base container has inventory', function(assert) {

  });

});
