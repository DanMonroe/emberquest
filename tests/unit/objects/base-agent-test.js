import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { BaseAgent } from 'emberquest/objects/agents/base-agent';
import { InventoryItem } from 'emberquest/objects/models/inventory-item';
import { constants } from 'emberquest/services/constants';

const scene = {
  board: {},
  ember: null
};

let agent;
let armor1;
let armor2;
let armor3;
let weapon1;
let weapon2;
let ring1;

module('Unit | Object | base-agent', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    agent = new BaseAgent(scene, {});

    armor1 = new InventoryItem({
      type: constants.INVENTORY.TYPE.ARMOR,
      name: 'armor1',
      equipped: true,
      stats: [
        {
          type: constants.INVENTORY.STATS.HEALTH,
          value: 10
        }
      ],
      resistance: [{
        type: constants.INVENTORY.RESISTANCE.FIRE,
        value: 7
      }]
    });
    armor2 = new InventoryItem({
      type: constants.INVENTORY.TYPE.ARMOR,
      name: 'armor2',
      equipped: true,
      stats: [
        {
          type: constants.INVENTORY.STATS.HEALTH,
          value: 3
        }
      ],
      resistance: [{
        type: constants.INVENTORY.RESISTANCE.FIRE,
        value: 95
      }]
    });
    armor3 = new InventoryItem({
      type: constants.INVENTORY.TYPE.ARMOR,
      name: 'armor3',
      equipped: true,
      stats: [
        {
          type: constants.INVENTORY.STATS.HEALTH,
          value: 5
        }
      ],
      resistance: [
        {
          type: constants.INVENTORY.RESISTANCE.FIRE,
          value: 2
        },
        {
          type: constants.INVENTORY.RESISTANCE.COLD,
          value: 42
        }
      ]
    });
    weapon1 = new InventoryItem({
      type: constants.INVENTORY.TYPE.WEAPON,
      name: 'weapon1',
      equipped: true,
      stats: [
        {
          type: constants.INVENTORY.STATS.DAMAGE,
          value: 6
        }
      ],
      resistance: [{
        type: constants.INVENTORY.RESISTANCE.FIRE,
        value: 3
      }]
    });
    weapon2 = new InventoryItem({
      type: constants.INVENTORY.TYPE.WEAPON,
      name: 'weapon2',
      equipped: true,
      stats: [
        {
          type: constants.INVENTORY.STATS.DAMAGE,
          value: 7
        },
        {
          type: constants.INVENTORY.STATS.MOVESPEED,
          value: 0.5
        },
        {
          type: constants.INVENTORY.STATS.ATTACKSPEED,
          value: 1.1 // really big so it is slow
        }
      ],
      // moveSpeed: 0.5,
      // attackSpeed: 1.1, // really big so it is slow
      resistance: [{
        type: constants.INVENTORY.RESISTANCE.FIRE,
        value: 3
      }]
    });
    ring1 = new InventoryItem({
      name: 'ring1',
      equipped: true,
      stats: [
        {
          type: constants.INVENTORY.STATS.DAMAGE,
          value: 7
        },
        {
          type: constants.INVENTORY.STATS.HEALINGSPEEDADJ,
          value: -0.5
        },
        {
          type: constants.INVENTORY.STATS.ATTACKSPEED,
          value: -0.2
        }
      ],
      // attackSpeed: -0.2,
      // healingSpeedAdj: -0.5
    });

  });

  module('Levels', function() {
    test('level 1', function(assert) {
      assert.equal(agent.level, 1, "initial level");
    });
    test('levels based on experience', function(assert) {
      let levelIndex = 0;
      agent.experience = constants.LEVEL_BY_EXPERIENCE[levelIndex++];
      assert.equal(agent.level, 1, 'initial level');
      assert.equal(agent.baseHealth, 20, 'initial health');

      agent.experience = constants.LEVEL_BY_EXPERIENCE[levelIndex++];
      assert.equal(agent.level, 2, 'level 2');
      assert.equal(agent.baseHealth, 44, 'level 2');

      agent.experience = constants.LEVEL_BY_EXPERIENCE[levelIndex++];
      assert.equal(agent.level, 3, 'level 3');
      assert.equal(agent.baseHealth, 72, 'level 3');

      agent.experience = constants.LEVEL_BY_EXPERIENCE[levelIndex++];
      assert.equal(agent.level, 4, 'level 4');

      agent.experience = constants.LEVEL_BY_EXPERIENCE[levelIndex++];
      assert.equal(agent.level, 5, 'level 5');

      agent.experience = constants.LEVEL_BY_EXPERIENCE[levelIndex++];
      assert.equal(agent.level, 6, 'level 6');

      agent.experience = constants.LEVEL_BY_EXPERIENCE[levelIndex++];
      assert.equal(agent.level, 7, 'level 7');

      agent.experience = constants.LEVEL_BY_EXPERIENCE[levelIndex++];
      assert.equal(agent.level, 8, 'level 8');

      agent.experience = constants.LEVEL_BY_EXPERIENCE[levelIndex++];
      assert.equal(agent.level, 9, 'level 9');

      agent.experience = constants.LEVEL_BY_EXPERIENCE[levelIndex++];
      assert.equal(agent.level, 10, 'level 10');

      agent.experience = constants.LEVEL_BY_EXPERIENCE[levelIndex++];
      assert.equal(agent.level, 11, 'level 11');

      agent.experience = constants.LEVEL_BY_EXPERIENCE[levelIndex];
      assert.equal(agent.level, 12, `level 12 [${levelIndex}] ${agent.experience}`);

      agent.experience = constants.LEVEL_BY_EXPERIENCE[levelIndex] + 1;
      assert.equal(agent.level, 12, `level 12 - barely [${levelIndex}] ${agent.experience}`);

      agent.experience = constants.LEVEL_BY_EXPERIENCE[levelIndex] + constants.LEVEL_RANGE_AFTER_12;
      assert.equal(agent.level, 13, `level 13 [${levelIndex}] ${agent.experience}`);

      agent.experience = constants.LEVEL_BY_EXPERIENCE[levelIndex] + constants.LEVEL_RANGE_AFTER_12 + 1;
      assert.equal(agent.level, 13, `level 13 [${levelIndex}] ${agent.experience}`);

      agent.experience = constants.LEVEL_BY_EXPERIENCE[levelIndex] + (constants.LEVEL_RANGE_AFTER_12 * 11);
      assert.equal(agent.level, 23, `level 23 [${levelIndex}] ${agent.experience}`);
    });
  });

  test('Base inventory test', function(assert) {
    assert.ok(new BaseAgent(scene, {}), 'Base Agent');
    assert.equal(agent.inventory.length, 0, 'Empty Inventory');
  });

  module('Speed Adjustments', function() {
    test('attack speed for one item', function (assert) {

      agent.addInventory(ring1);

      assert.equal(agent.attackSpeedAdj, 0.8, 'attack Speed Adj');
    });
    test('attack speed adjustment is cumulative', function (assert) {

      agent.addInventory(ring1);  // -0.2
      agent.addInventory(weapon2);// 1.1

      assert.equal(agent.attackSpeedAdj, 1.9, 'attack Speed Adj - two items');
    });
    test('multiple adjustments', function (assert) {

      agent.addInventory(ring1);
      agent.addInventory(weapon2);

      assert.equal(agent.attackSpeedAdj, 1.9, 'attack Speed Adj');
      assert.equal(agent.moveSpeedAdj, 1.5, 'move Speed Adj');
      assert.equal(agent.healingSpeedAdj, 0.5, 'healing Speed Adj');
    });
  });

  module('Armor Health', function() {
    test('armor has additional health', function (assert) {

      agent.addInventory(armor1);

      assert.equal(agent.armorHealth, 10, 'armor health');
    });
    test('armorHealth and baseHealth combined for maxHealth', function (assert) {

      agent.addInventory(armor1);

      assert.equal(agent.armorHealth, 10, 'armor health');

      agent.experience = constants.LEVEL_BY_EXPERIENCE[2];
      assert.equal(agent.level, 3, 'level 3');
      assert.equal(agent.baseHealth, 72, 'baseHealth');

      assert.equal(agent.maxHealth, 82, 'maxHealth');

    });
  });

  module('Attack Damage', function() {
    test('weapon has damage potential', function (assert) {
      agent.addInventory(weapon1);

      assert.equal(agent.attackDamage, 6, 'Attack damage');
    });
    test('two weapons add damage potential', function (assert) {
      agent.addInventory(weapon1);
      agent.addInventory(weapon2);

      assert.equal(agent.attackDamage, 13, 'Collective Attack damage');
    });
  });

  module('Add to inventory with some fire resistance', function (hooks) {


    test('Add to inventory', function(assert) {

      agent.addInventory(armor1);

      assert.equal(agent.inventory.length, 1);
      const firstItem = agent.inventory[0];
      assert.equal(firstItem.name, 'armor1');
      assert.equal(firstItem.type, constants.INVENTORY.TYPE.ARMOR);
    });

    test('agent has 1 armor and 1 weapon', function(assert) {

      agent.unequipItem(armor1);
      agent.unequipItem(weapon1);

      agent.addInventory(armor1);
      agent.addInventory(weapon1);

      assert.equal(agent.getInventoryByType(constants.INVENTORY.TYPE.ARMOR, false).length, 1, 'Armor type');
      assert.equal(agent.getInventoryByType(constants.INVENTORY.TYPE.WEAPON, false).length, 1, 'Weapon type');

      assert.equal(agent.getInventoryByType(constants.INVENTORY.TYPE.ARMOR).length, 0, 'no Armor equipped');
      assert.equal(agent.getInventoryByType(constants.INVENTORY.TYPE.WEAPON,).length, 0, 'no weapons equipped');

      agent.equipItem(armor1);
      agent.equipItem(weapon1);

      assert.equal(agent.getInventoryByType(constants.INVENTORY.TYPE.ARMOR).length, 1, '1 Armor equipped');
      assert.equal(agent.getInventoryByType(constants.INVENTORY.TYPE.WEAPON,).length, 1, '1 weapon equipped');
    });

    test('agent has some fire resistance; some from armor and some from weapons, but none equipped', function(assert) {

      agent.unequipItem(armor1);
      agent.unequipItem(weapon1);

      agent.addInventory(armor1);
      agent.addInventory(weapon1);

      assert.equal(agent.getResistance(constants.INVENTORY.RESISTANCE.FIRE), 0);
    });

    test('agent has some fire resistance; some from armor and some from weapons', function(assert) {

      agent.addInventory(armor1);
      agent.addInventory(weapon1);

      agent.equipItem(armor1);
      agent.equipItem(weapon1);

      assert.equal(agent.getResistance(constants.INVENTORY.RESISTANCE.FIRE), 10);
    });

    test('cant have over 100 percent resistance', function(assert) {

      agent.addInventory(armor1);
      agent.addInventory(armor2);
      agent.addInventory(weapon1);

      agent.equipItem(armor1);
      agent.equipItem(armor2);
      agent.equipItem(weapon1);

      assert.equal(agent.getResistance(constants.INVENTORY.RESISTANCE.FIRE), 100);
    });

    test('agent has some fire resistance and some cold', function(assert) {

      agent.addInventory(armor1);
      agent.addInventory(armor3);
      agent.addInventory(weapon1);

      agent.equipItem(armor1);
      agent.equipItem(armor3);
      agent.equipItem(weapon1);

      assert.equal(agent.getResistance(constants.INVENTORY.RESISTANCE.FIRE), 12, 'fire');
      assert.equal(agent.getResistance(constants.INVENTORY.RESISTANCE.COLD), 42, 'cold');
    });
    test('agent has some fire resistance and some cold from same item', function(assert) {

      agent.addInventory(armor3);
      agent.equipItem(armor3);

      assert.equal(agent.getResistance(constants.INVENTORY.RESISTANCE.FIRE), 2);
      assert.equal(agent.getResistance(constants.INVENTORY.RESISTANCE.COLD), 42);
    });

    test('unequip reduces resistance', function(assert) {

      agent.addInventory(armor1);
      agent.addInventory(armor3);
      agent.equipItem(armor1);
      agent.equipItem(armor3);

      assert.equal(agent.getResistance(constants.INVENTORY.RESISTANCE.FIRE), 9);
      assert.equal(agent.getResistance(constants.INVENTORY.RESISTANCE.COLD), 42);

      agent.unequipItem(armor1);

      assert.equal(agent.getResistance(constants.INVENTORY.RESISTANCE.FIRE), 2);
      assert.equal(agent.getResistance(constants.INVENTORY.RESISTANCE.COLD), 42);

    });
  });

});
