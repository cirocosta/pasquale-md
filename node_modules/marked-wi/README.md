# marked-wi

> A full-featured markdown parser and compiler, written in JavaScript. Built
> for speed.

This fork of [marked](https://github.com/chjj/marked) is a slower version of the originial as it exposes the inline code stuff to the lexer.

## Install

``` bash
npm install marked-w-inline --save
```

## Usage

```javascript
var marked = require('../')
  , fs = require('fs')
  , path = require('path')
  , Lexer = marked.Lexer
  , Parser = marked.Parser;

fs.readFile(path.resolve(__dirname, 'md.md'),
            {encoding: 'utf8'},
            function (err, data) {

  if (err) throw err;

  console.log(
    JSON.stringify(
      Parser.parse(
        Lexer.lex(data)), undefined, 2));
});
```
`Parser.parse()` returns an object just like `Lexer.lex()` but with the inline stuff that it found with the `InlineLexer` (notice that the `Parser` in the [original marked](https://github.com/chjj/marked) would return the rendered text, which is completly different from what we are doing here).
