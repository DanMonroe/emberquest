import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
// import { setupMirage } from 'ember-cli-mirage/test-support';
import { BaseAgent } from 'emberquest/objects/agents/base-agent';
import { constants } from 'emberquest/services/constant';
import { InventoryItem } from 'emberquest/objects/models/inventory-item';

const scene = {
  board: {},
  ember: null
};

let agent;
let armor1;
let armor2;
let armor3;
let weapon1;

module('Unit | Object | base-agent', function(hooks) {
  setupTest(hooks);
  // setupMirage(hooks);

  hooks.beforeEach(function() {
    agent = new BaseAgent(scene, {});
  });

  test('Base inventory test', function(assert) {
    assert.ok(new BaseAgent(scene, {}), 'Base Agent');
    assert.equal(agent.inventory.length, 0, 'Empty Inventory');
  });

  module('Add to inventory with some fire resistance', function (hooks) {
    hooks.beforeEach(function() {
      armor1 = new InventoryItem({
        type: constants.TYPE_ARMOR,
        name: 'armor1',
        equipped: false,
        resistance: [{
          type: constants.RESISTANCE_FIRE,
          value: 7
        }]
      });
      armor2 = new InventoryItem({
        type: constants.TYPE_ARMOR,
        name: 'armor2',
        equipped: false,
        resistance: [{
          type: constants.RESISTANCE_FIRE,
          value: 95
        }]
      });
      armor3 = new InventoryItem({
        type: constants.TYPE_ARMOR,
        name: 'armor3',
        equipped: false,
        resistance: [
          {
            type: constants.RESISTANCE_FIRE,
            value: 2
          },
          {
            type: constants.RESISTANCE_COLD,
            value: 42
          }
        ]
      });
      weapon1 = new InventoryItem({
        type: constants.TYPE_WEAPON,
        name: 'weapon1',
        equipped: false,
        resistance: [{
          type: constants.RESISTANCE_FIRE,
          value: 3
        }]
      });
    });

    test('Add to inventory', function(assert) {

      agent.addInventory(armor1);

      assert.equal(agent.inventory.length, 1);
      const firstItem = agent.inventory[0];
      assert.equal(firstItem.name, 'armor1');
      assert.equal(firstItem.type, constants.TYPE_ARMOR);
    });

    test('agent has 1 armor and 1 weapon', function(assert) {

      agent.addInventory(armor1);
      agent.addInventory(weapon1);

      assert.equal(agent.getInventoryByType(constants.TYPE_ARMOR, false).length, 1, 'Armor type');
      assert.equal(agent.getInventoryByType(constants.TYPE_WEAPON, false).length, 1, 'Weapon type');

      assert.equal(agent.getInventoryByType(constants.TYPE_ARMOR).length, 0, 'no Armor equipped');
      assert.equal(agent.getInventoryByType(constants.TYPE_WEAPON,).length, 0, 'no weapons equipped');

      agent.equipItem(armor1);
      agent.equipItem(weapon1);

      assert.equal(agent.getInventoryByType(constants.TYPE_ARMOR).length, 1, '1 Armor equipped');
      assert.equal(agent.getInventoryByType(constants.TYPE_WEAPON,).length, 1, '1 weapon equipped');
    });

    test('agent has some fire resistance; some from armor and some from weapons, but none equipped', function(assert) {

      agent.addInventory(armor1);
      agent.addInventory(weapon1);

      assert.equal(agent.getResistance(constants.RESISTANCE_FIRE), 0);
    });

    test('agent has some fire resistance; some from armor and some from weapons', function(assert) {

      agent.addInventory(armor1);
      agent.addInventory(weapon1);

      agent.equipItem(armor1);
      agent.equipItem(weapon1);

      assert.equal(agent.getResistance(constants.RESISTANCE_FIRE), 10);
    });

    test('cant have over 100 percent resistance', function(assert) {

      agent.addInventory(armor1);
      agent.addInventory(armor2);
      agent.addInventory(weapon1);

      agent.equipItem(armor1);
      agent.equipItem(armor2);
      agent.equipItem(weapon1);

      assert.equal(agent.getResistance(constants.RESISTANCE_FIRE), 100);
    });

    test('agent has some fire resistance and some cold', function(assert) {

      agent.addInventory(armor1);
      agent.addInventory(armor3);
      agent.addInventory(weapon1);

      agent.equipItem(armor1);
      agent.equipItem(armor3);
      agent.equipItem(weapon1);

      assert.equal(agent.getResistance(constants.RESISTANCE_FIRE), 12, 'fire');
      assert.equal(agent.getResistance(constants.RESISTANCE_COLD), 42, 'cold');
    });
    test('agent has some fire resistance and some cold from same item', function(assert) {

      agent.addInventory(armor3);
      agent.equipItem(armor3);

      assert.equal(agent.getResistance(constants.RESISTANCE_FIRE), 2);
      assert.equal(agent.getResistance(constants.RESISTANCE_COLD), 42);
    });

    test('unequip reduces resistance', function(assert) {

      agent.addInventory(armor1);
      agent.addInventory(armor3);
      agent.equipItem(armor1);
      agent.equipItem(armor3);

      assert.equal(agent.getResistance(constants.RESISTANCE_FIRE), 9);
      assert.equal(agent.getResistance(constants.RESISTANCE_COLD), 42);

      agent.unequipItem(armor1);

      assert.equal(agent.getResistance(constants.RESISTANCE_FIRE), 2);
      assert.equal(agent.getResistance(constants.RESISTANCE_COLD), 42);

    });
  });

});
