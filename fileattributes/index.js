"use strict";

exports.problem = `Exercice 01: File Attributes

Turn-in directory : ex01
Files to submit : testDay00

Create the testDay00 in your directory such as:

    $> ls -l testDay00
    -r--r-xr-x 1 login wheel 40 Mar 1 23:42 testDay00

You can validate your solution with \`shell-work verify <your-repository-url>\`.

"login" et "wheel" will be respectively replaced by your name and group.
`;

/*
exports.solution = `
	echo -n '0123456789012345678901234567890123456789' > testDay00
	(UNIX) touch -d '2017-03-01 23:42' testDay00 || (OSX) touch -t 03012342 testDay00
	chmod 455 testDay00
`
*/

exports.verify = (args, cb) => {
	const exec = require('child_process').spawn('ls', [ '-l', args[0] ]);

	exec.stdout.on('data', (data) => {
		let res = data.toString().match(/[\w-:]*/g).filter( (e) => e != '' );

		cb('-r--r-xr-x 1 login wheel 40 Mar 1 23:42 testDay00'.split(' ').reduce( (p, e, i) => {
			if (e == 'login' || e == 'wheel')
				return p;
			else
				return p && e == res[i];
		}, true));
	});

	exec.stderr.on('data', (data) => {
		cb(false);
	});
};
