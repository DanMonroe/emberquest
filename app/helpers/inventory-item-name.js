import { helper } from '@ember/component/helper';

export default helper(function inventoryItemName([inventoryService, player, bodyPart, cssClazz]) {
  const item = inventoryService.getEquippedSlot(player, bodyPart);
  if (cssClazz) {
    return item ? item.cssClazz : '';
  }
  return item ? item.name : 'Empty';
});
