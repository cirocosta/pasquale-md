var fs = require('fs')
  , q = require('q')
  , marked = require('marked-wi')
  , Pasquale = require('pasquale');

function PasqualeMD (dictsDir) {
  this.pasquale = new Pasquale();
  this.dictsDir = dictsDir;
}

PasqualeMD.prototype.check = function (filePath, lang) {
  var dfd = q.defer();
  var scope = this;

  this.pasquale.setLanguage(lang, this.dictsDir);

  fs.readFile(filePath, {encoding: 'utf8'}, function (err, data) {
    if (err) dfd.reject(err);

    var results = [];
    var tokens = marked.parseWithoutInline(data);

    for (var i in tokens) {
      var token = tokens[i];
      if (!token.text || token.type === 'code') continue;

      results.push(scope.pasquale.checkLineSpell(token.text, i));
    }

    q.all(results).then(function (res) {
      dfd.resolve(res);
    }, function (err) {
      dfd.reject(err);
    });
  });

  return dfd.promise;
};

module.exports = PasqualeMD;
