#!/usr/bin/env node

// var adventure = require('adventure');
// var shop = adventure('shell-work');
//
// var shops = [
// 	[ 'Introduction', './introduction' ],
// 	// [ 'Learn to verify your work', './learntoverify' ],
// 	[ 'Git', './git' ],
// 	// [ 'Git II', './git2' ],
// 	[ 'File Attributes', './fileattributes' ],
// 	[ 'File Attributes II', './fileattributes2' ],
// 	[ 'Print Groups', './print_groups' ]
// ];
//
// shops.forEach( (e, i) => {
// 	if (i < 10)
// 		shop.add(`ex0${i}: ${e[0]}`, () => require(e[1]));
// 	else
// 		shop.add(`ex${i}: ${e[0]}`, () => require(e[1]));
// });
//
// shop.execute(process.argv.slice(2));

console.log( process.cwd() )
console.log( require('fs').readdirSync('./') )

var jsing = require('workshopper-adventure')({
	appDir: __dirname,
	languages: ['en'],
	header: require('workshopper-adventure/default/header'),
	footer: require('./lib/footer')
});

jsing.addAll(require('./menu.json').map(function (problem) {
	console.log('problem: ', problem)
	return {
		name: problem,
		fn: function () {
			var p = problem.toLowerCase().replace(/\s/g, '-');
			var dir = require('path').join(__dirname, 'problems', p);
			return require(dir);
		}
	}
}))

jsing.execute(process.argv.slice(2))
