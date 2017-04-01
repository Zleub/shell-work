"use strict";

exports.problem = ` Exercice 0X: About git.

About Git ...

Make a public repository on github.com. It should be named shell-work, under the alias you choose. It has to be initialized with a file named README.md, which will contain at least a line containing the repository name preceded by a '#'.

This repository will be the root folder for your work from now on. Each exercice should be submitted in it's own folder, named after the exercice number (ex02 for example).

	$> git log
	commit 9509b0e6370ebe5d08f7814475fd546432e0fb2c
	Author: Zleub <debray.arnaud@gmail.com>
	Date:   Fri Mar 31 10:30:59 2017 +0200

	    readme


You will validate your solution with \`shell-work verify <your-repository-url>\`.

The "commit", "Author" and "Date" won't be taken into account.
`;

/*
exports.solution = `
	git init
	git remote add origin https:// ...
	echo '# shell-work' > README.md
	git add README.md
	git commit -m 'README'
	git push origin master
`
*/

exports.verify = (args, cb) => {
	const execSync = require('child_process').execSync;

	let stdout = '';
	try {
		execSync(`git clone ${args[0]} clone_correction`);
		stdout = execSync(`cat ./clone_correction/README.md`);
	}
	catch (e) {
		execSync('rm -rf clone_correction');
		return cb(false);
	}

	let verif = [
		() => execSync('cd clone_correction && git log').toString().match(/commit/g).length == 1,
/* ! */ () => execSync('cd clone_correction && git log').toString().match('readme\n'),
		() => stdout.toString().match(/# shell-work/)
	];

	if (verif.reduce( (p, e) => p && e(), true )) {
		execSync('rm -rf clone_correction');
		cb(true);
	}
	else {
		execSync('rm -rf clone_correction');
		cb(false);
	}
};
