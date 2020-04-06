import Service from '@ember/service';
import SimpleCrypto from "simple-crypto-js";

export default class StorageService extends Service {

  secretKey = "somekey";
  simpleCrypto = new SimpleCrypto(this.secretKey);

  encrypt(data) {
    const cipherObject = this.simpleCrypto.encrypt(data);
    // console.log('cipherObject', cipherObject);
    return cipherObject;
  }

  decrypt(data) {
    const decipherObject = this.simpleCrypto.decrypt(data);
    // console.log('decipherObject', decipherObject);
    return decipherObject;
  }
}
