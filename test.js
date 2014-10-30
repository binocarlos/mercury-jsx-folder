#!/usr/bin/env node
var fs = require('fs')
var tape = require('tape')
var processFolder = require('./')
var wrench = require('wrench')
var path = require('path')
var cp = require('child_process')

tape('process some .jsx files', function(t){

	wrench.rmdirSyncRecursive(__dirname + '/fixtures/build', true)

	var processor = processFolder({
		source:__dirname + '/fixtures/src',
		dest:__dirname + '/fixtures/build'
	})

	var hit = {}

	processor.on('file', function(src, target){
		hit[src] = target
	})

	processor.run(function(err){
		if(err) t.fail(err)

		var file1Src = path.join(__dirname, 'fixtures', 'src', 'basic.jsx')
		var file2Src = path.join(__dirname, 'fixtures', 'src', 'subfolder', 'apples.jsx')
		var file1Dest = path.join(__dirname, 'fixtures', 'build', 'basic.js')
		var file2Dest = path.join(__dirname, 'fixtures', 'build', 'subfolder', 'apples.js')

		var file1 = fs.readFileSync(file1Dest, 'utf8')
		var file2 = fs.readFileSync(file2Dest, 'utf8')

		t.ok(hit[file1Src] ? true : false, 'file1 hit')
		t.ok(hit[file2Src] ? true : false, 'file2 hit')

		t.ok(file1.indexOf('h("div", {class:"hello"}, ["This is HTML!"])')>=0, 'file 1 matches')
		t.ok(file2.indexOf('h("div", {class:"red"}, ["apples"])')>=0, 'file 2 matches')

		t.end()
	})
})

tape('cli mode', function(t){
	wrench.rmdirSyncRecursive(__dirname + '/fixtures/build', true)

	var convert = cp.spawn('node', [
		__dirname + '/cli.js',
		'-i',
		__dirname + '/fixtures/src',
		'-o',
		__dirname + '/fixtures/build'
	])

	convert.on('error', function(err){
		t.fail(err)
		t.end()
	})

	convert.on('close', function(){
		var file1Dest = path.join(__dirname, 'fixtures', 'build', 'basic.js')
		var file2Dest = path.join(__dirname, 'fixtures', 'build', 'subfolder', 'apples.js')

		var file1 = fs.readFileSync(file1Dest, 'utf8')
		var file2 = fs.readFileSync(file2Dest, 'utf8')

		t.ok(file1.indexOf('h("div", {class:"hello"}, ["This is HTML!"])')>=0, 'file 1 matches')
		t.ok(file2.indexOf('h("div", {class:"red"}, ["apples"])')>=0, 'file 2 matches')

		t.end()
	})
})