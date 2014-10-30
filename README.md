mercury-jsx-folder
==================

Convert a folder of .jsx files into standard .js files - uses [mercury-jsx](https://github.com/Raynos/mercury-jsx)

[![Travis](http://img.shields.io/travis/binocarlos/mercury-jsx-folder.svg?style=flat)](https://travis-ci.org/binocarlos/mercury-jsx-folder)

## install

```
$ npm install mercury-jsx-folder
```

## usage

```js
var processFolder = require('mercury-jsx-folder')

var processor = processFolder({
	source:__dirname + '/fixtures/src',
	dest:__dirname + '/fixtures/build'
})

processor.on('file', function(source, target){
	console.log('processing: ' + path)
})

processor.run(function(err){
	console.log('all .jsx have been processed into .js')	
})
```

The above example will load all `.jsx` files from `__dirname + '/fixtures/src'` and pipe them via a `mercury-jsx`.

The results of each file will be written to `__dirname + '/fixtures/build'` with the .jsx suffix replaced with .js


## license

MIT