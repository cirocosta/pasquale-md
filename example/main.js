'use strict';

var PasqualeMD = require('../src/pasquale-md')
  , path = require('path')
  , dictsDir = path.resolve(__dirname, '../node_modules/pasquale/dicts')
  , filePath = path.resolve(__dirname, './md.md');

var pasqualeMd = new PasqualeMD(dictsDir);

pasqualeMd.check(filePath, 'pt-br').then(function (rs) {
  console.log(rs);
});
