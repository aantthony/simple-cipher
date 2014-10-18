simple-cipher
=============

Encrypt a JSON object using aes-256-cbc.

### Installation
```bash
npm install --save --from-git git://github.com/aantthony/simple-cipher.git
```

### Usage

```js

var key = require('crypto').pseudoRandomBytes(32);

var cipher = require('simple-cipher').createCipher(key);

console.log(cipher.encrypt({x: 3}));
// "DPudMtV/dBhr86CDPg9qzw==|byQaFTjPe59AbNe3U55ZYw=="

console.log(cipher.encrypt({x: 3}));
// "A/0gRmxP1DsCEGqvFiWmSQ==|dSwRzkfw/A1LDKcbbJ0jcA=="

var ciphertext = cipher.encrypt({x: 3})

var obj = cipher.decrypt(ciphertext);
// {x: 3}

console.log(obj.x);
// "3"
```


# Documentation

### require('simple-cipher').createCipher(key, [algorithm='aes-256-cbc'])

- *key* 32 byte secret Buffer object
- *algorithm* encryption/decryption algorithm passed to Node's `crypto` module.

Returns a `Cipher` object bound to that key.

### Cipher#encrypt(obj)
- *obj* `Object|Number|String|Boolean` to encrypt

Returns: `String` ciphertext


### Cipher#decrypt(ciphertext)
- *ciphertext* `String`

Returns `Object` deserialized and decrypted object.
