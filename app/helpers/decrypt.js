import { helper } from '@ember/component/helper';

export default helper(function decrypt([storageService, encryptedText]) {
  return storageService.decrypt(encryptedText);
});
