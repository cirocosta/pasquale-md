# pasquale-md

> Searches for typos in markdown files with [pasquale](https://github.com/cirocosta/pasquale) and [marked-wi](https://github.com/cirocosta/marked-wi).

## Usage

`$ npm install --save pasquale-md`

#### PasqualeMD (dictsDir)
```
/**
 * Constructor.
 * @param {string} dictsDir abs path to the dir
 * containing the dictionaries
 */
```

#### .check(filePath, lang)
```
/**
 * Checks for spelling errors in a markdown file
 * @param  {string} filePath abs path to the
 *                           file
 * @param  {string} lang     lang alias
 * @return {Promise}          a promise that
 * will resolve with an array containing the
 * results
 */
```
