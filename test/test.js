'use strict';

var PasqualeMD = require('../src/pasquale-md')
  , path = require('path')
  , fs = require('fs')
  , dictmanager = require('dictmanager')
  , assert = require('assert')
  , dictsDir = path.resolve(__dirname, '../dicts')
  , filesPath = path.resolve(__dirname, './files');

describe('PasqualeMD', function() {
  this.timeout(30000);

  it('be sane', function() {
    assert(!!PasqualeMD);
  });

  var pasqualeMd = new PasqualeMD(dictsDir);

  it('should have the dict', function (done) {
    var dict = dictmanager.resolve('pt-br');
    var p = path.resolve(__dirname, '../dicts');

    dictmanager.download(dict.url, dict.name, p).then(function () {
      setTimeout(function () {
        try {
          done();
        } catch (err) {
          done(err);
        }
      }, 1000);
    }, function (er) {
      done(er);
    });
  });

  describe('checkFromFile', function() {
    it('should spell check from file', function(done) {
      var fileName = path.join(filesPath, 'general.md');

      pasqualeMd.checkFromFile(fileName, 'pt-br').then(function (rs) {
        console.log(rs);
        assert(true);
        done();
      }, function (err) {
        done(err);
      });
    });
  });

  describe('check', function() {
    it('should spell check from string', function(done) {
      var fileName = path.join(filesPath, 'general.md');
      var content = fs.readFileSync(fileName, {encoding: 'utf8'});

      pasqualeMd.check(content, 'pt-br').then(function (rs) {
        console.log(rs);
        assert(true);
        done();
      }, function (err) {
        done(err);
      });
    });

    // it('should spell check from buffer', function() {

    // });

    // it('should spell check from stream', function() {

    // });
  });


});
