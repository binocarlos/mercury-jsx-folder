var path = require('path')
var processFolder = require('process-folder')

module.exports = function(opts){
	opts = opts || {}

	opts.command = 'node'
	opts.args = [
		path.join(__dirname, 'node_modules', 'mercury-jsx', 'bin', 'msx')
	]
	opts.filter = function(file){
		return file.match(/\.jsx/)
	}
	opts.rename = function(file){
		return file.replace(/\.jsx/, '.js')
	}

	return processFolder(opts)
}