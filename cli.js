#!/usr/bin/env node
var pathResolve = require('cli-path-resolve')
var processFolder = require('./')
var args = require('minimist')(process.argv, {
	alias:{
		i:'input',
		o:'output'
	}
})

var proc = processFolder({
	source:pathResolve(args.input),
	dest:pathResolve(args.output)
})

proc.on('file', function(src, dest){
	console.log(src + ' -> ' + dest)
})

proc.run(function(err){
	if(err){
		console.error(err)
		process.exit(1)
	}
	console.log('done')
})