'use strict';

exports.createCipher = function (passwordBase64, ALGORITHM) {
  ALGORITHM = ALGORITHM || 'aes-256-cbc';
  var password = new Buffer(passwordBase64, 'base64');

  function enc (obj) {
    var plaintext = JSON.stringify(obj);
    var iv = require('crypto').pseudoRandomBytes(16);
    var cipher = require('crypto').createCipheriv(ALGORITHM, password, iv);
    return [Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]).toString('base64'), iv.toString('base64')].join('|');
  }

  function dec (ciphertext) {
    var s = ciphertext.split('|');
    var iv = new Buffer(s[1], 'base64');
    var decipher = require('crypto').createDecipheriv(ALGORITHM, password, iv);
    var plaintext = Buffer.concat([decipher.update(s[0], 'base64'), decipher.final()]).toString('utf8');
    return JSON.parse(plaintext);
  }
  return {
    encrypt: enc,
    decrypt: dec
  };
};