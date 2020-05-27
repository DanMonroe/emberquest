import { helper } from '@ember/component/helper';

export default helper(function inventoryItemName([inventoryService, player, bodyPart]) {
  const item = inventoryService.getEquippedSlot(player, bodyPart);
  return item ? item.name : 'Empty'
});
