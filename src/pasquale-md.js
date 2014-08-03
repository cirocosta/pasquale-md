var fs = require('fs')
  , q = require('q')
  , marked = require('marked-wi')
  , Pasquale = require('pasquale');

/**
 * Constructor.
 * @param {string} dictsDir abs path to the dir
 * containing the dictionaries
 */
function PasqualeMD (dictsDir) {
  this.pasquale = new Pasquale();
  this.dictsDir = dictsDir;
}

PasqualeMD.prototype.check = function(data, lang) {
  var dfd = q.defer()
    , scope = this
    , results = []
    , tokens = marked.parseWithoutInline(data.toString('utf8'));

  this.pasquale.setLanguage(lang, this.dictsDir);

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

  return dfd.promise;
};

/**
 * Checks for spelling errors in a markdown file
 * @param  {string} filePath abs path to the
 *                           file
 * @param  {string} lang     lang alias
 * @return {Promise}          a promise that
 * will resolve with an array containing the
 * results
 */
PasqualeMD.prototype.checkFromFile = function (filePath, lang) {
  var dfd = q.defer()
    , scope = this;

  fs.readFile(filePath, function (err, data) {
    if (err) dfd.reject(err);

    scope.check(data, lang).then(function (res) {
      dfd.resolve(res);
    }, function (err) {
      dfd.reject(err);
    });
  });

  return dfd.promise;
};

module.exports = PasqualeMD;
