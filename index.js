#!/usr/bin/env node

var adventure = require('adventure');
var shop = adventure('shell-work');

var shops = [
	[ 'Introduction', './introduction' ],
	// [ 'Learn to verify your work', './learntoverify' ],
	[ 'Git', './git' ],
	// [ 'Git II', './git2' ],
	[ 'File Attributes', './fileattributes' ],
	[ 'File Attributes II', './fileattributes2' ],
	[ 'Print Groups', './print_groups' ]
];

shops.forEach( (e, i) => {
	if (i < 10)
		shop.add(`ex0${i}: ${e[0]}`, () => require(e[1]));
	else
		shop.add(`ex${i}: ${e[0]}`, () => require(e[1]));
});

shop.execute(process.argv.slice(2));
