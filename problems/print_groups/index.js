"use strict";

exports.problem = `Ex0X: print_groups

Write a command line wich find and print the list of groups of the user specified by the FT_USER environment variable. It has to be comma separated, without space.

Examples

With FT_USER=root:
	$> print_groups.sh
	root

With FT_USER=syslog:
	$> print_groups.sh
	syslog,adm

`;

/*
exports.solution = `
	groups syslog | sed 's/.*: //' | sed 'y/ /,/'
`
*/

exports.verify = (args, cb) => {

};
