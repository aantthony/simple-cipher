'use strict';

require('should');
var crypto = require('crypto');
var self = require('../');
describe('.createCipher', function () {
  it('should return a Cipher object', function () {
    var cipher = self.createCipher(crypto.pseudoRandomBytes(32));
    cipher.encrypt.should.be.an.instanceOf(Function);
    cipher.decrypt.should.be.an.instanceOf(Function);
  });
});
describe('Cipher', function () {
  var cipher;
  before(function () {
    cipher = self.createCipher(crypto.pseudoRandomBytes(32));
  });
  describe('#encrypt', function () {
    it('should encrypt a JSON object', function () {
      var ciphertext = cipher.encrypt({x: {y: [1,2,'e', null]}});
      ciphertext.should.be.an.instanceOf(String);
    });
    it('should be different each time', function () {
      var a = cipher.encrypt({x: {y: [1,2,'e', null]}});
      var b = cipher.encrypt({x: {y: [1,2,'e', null]}});
      a.should.not.equal(b);
      a.split('|')[0].should.not.equal(b.split('|')[0]);
    });
  });
  describe('#decrypt', function () {
    var ciphertext;
    before(function () {
      ciphertext = cipher.encrypt({x: {y: [1,2,'e', null]}});
    });
    it('should return the same object', function () {
      var obj = cipher.decrypt(ciphertext);
      obj.should.have.property('x');
    });
    it('should return null if null was encrypted', function () {
      var obj = cipher.decrypt(cipher.encrypt(null));
      (null === obj).should.equal(true);
    });
    it('should return a string if a string was encrypted', function () {
      cipher.decrypt(cipher.encrypt('secret')).should.equal('secret');
    });
    it('should not work if the password is wrong', function () {
      var cipher = self.createCipher(crypto.pseudoRandomBytes(32));
      cipher.decrypt.bind(cipher, ciphertext).should.throw();
    });
  });
});
