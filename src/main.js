var fs = require('fs')
  , path = require('path')
  , q = require('q')
  , marked = require('marked-wi')
  , Pasquale = require('pasquale')
  , dictsDir = path.resolve(__dirname, '../node_modules/pasquale/dicts');

var filePath = path.resolve(__dirname, './md.md');
var pasquale = new Pasquale();
pasquale.setLanguage('pt-br', dictsDir);

function checkMarkdownSpell(filePath) {
  var dfd = q.defer();

  fs.readFile(filePath, {encoding: 'utf8'}, function (err, data) {
    if (err) dfd.reject(err);

    var results = [];
    var tokens = marked.parseWithoutInline(data);

    for (var i in tokens) {
      var token = tokens[i];
      if (!token.text || token.type === 'code') continue;

      results.push(pasquale.checkLineSpell(token.text, i));
    }

    q.all(results).then(function (res) {
      dfd.resolve(res);
    }, function (err) {
      dfd.reject(err);
    });
  });

  return dfd.promise;
}

checkMarkdownSpell(filePath).then(function (rs) {
  console.log(rs);
});
