#!/usr/bin/env node

var jsing = require('workshopper-adventure')({
	appDir: __dirname,
	languages: ['en'],
	header: require('workshopper-adventure/default/header'),
	footer: require('./lib/footer'),
	help: require('./lib/help.js')
});

jsing.addAll(require('./menu.json').map(function (problem) {
	return {
		name: problem,
		fn: function () {
			var p = problem.toLowerCase().replace(/\s/g, '_');
			var dir = require('path').join(__dirname, 'problems', p);
			return require(dir);
		}
	}
}))

jsing.execute(process.argv.slice(2))
