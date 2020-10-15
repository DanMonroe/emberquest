import Service from '@ember/service';
import SimpleCrypto from "simple-crypto-js";

export default class StorageService extends Service {

  secretKey = "somekey";
  simpleCrypto = new SimpleCrypto(this.secretKey);

  encrypt(data) {
    return this.simpleCrypto.encrypt(data);
  }

  decrypt(data) {
    return this.simpleCrypto.decrypt(data);
  }
}
