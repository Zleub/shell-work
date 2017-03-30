"use strict";

exports.problem = `
Exercice 01: File Attributes

Files to submit : testDay00

Create the testDay00 in your directory such as:

    $> ls -l testDay00
    -r--r-xr-x 1 login wheel 40 Jun 1 23:42 testDay00

You can validate your solution with \`shell-work verify <your-file>\`.

"login" et "wheel" will be respectively replaced by your name and group.
`;

/*
 exports.solution = `
touch -d '2017-03-01 23:42' testDay00
`
*/

exports.verify = (args, cb) => {
	const exec = require('child_process').spawn('ls', [ '-l', args[0] ]);

	exec.stdout.on('data', (data) => {
		let res = data.toString();

		console.log('-r--r-xr-x 1 login wheel 40 Jun 1 23:42 testDay00');
		console.log(res.split(' '));

		cb('-r--r-xr-x 1 login wheel 40 Jun 1 23:42 testDay00' == res);
	});

	exec.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	});
};
