"use strict";

exports.problem = `Exercice 02: File Attributes II

Files to submit : exo2.tar

Create those files and directories. Make sure that the display of an ls -l in your directory looks like this :

	$> ls -l exo2
	drwx--xr-x 2 login wheel XX Mar 1 20:47 test0
	-rwx--xr-- 1 login wheel  4 Mar 1 21:46 test1
	dr-x---r-- 2 login wheel XX Mar 1 22:45 test2
	-r-----r-- 2 login wheel  1 Mar 1 23:44 test3
	-rw-r----x 1 login wheel  2 Mar 1 23:43 test4
	-r-----r-- 2 login wheel  1 Mar 1 23:44 test5
	lrwxr-xr-x 1 login wheel  5 Mar 1 22:20 test6 -> test0

Once your exercice complete, you will run \`tar -cf exo2.tar test*\` to create the file to submit.
You can validate your solution with \`shell-work verify <your-file>\`.

"login" et "wheel" will be respectively replaced by your name and group.
You wont be able to mimic the ligne "total 42".
The XX wont be taken into account
`;

/*
exports.solution = `
	mkdir test0
	chmod g-r test0
	(OSX) touch -t 03012047 test0

	echo 'abc' > test1
	chmod u+x,g+x-r test1
	(OSX) touch -t 03012146 test1

	mkdir test2
	chmod u-w,g-rx,o-x test2
	(OSX) touch -t 03012245 test2

	echo '' > test3
	chmod u-w,g-r test3
	touch -t 03012344 test3

	echo -n '42' > test4
	chmod o-r+x test4
	touch -t 03012343 test4

	ln test3 test5

	ln -s test0 test6
	touch -h -t 03012220 test6
`
*/

exports.verify = (args, cb) => {
	const execSync = require('child_process').execSync

	execSync('mkdir exo2')
	console.log('tar -xf ../' + args[0])
	var code = execSync('tar -xf ../' + args[0], { cwd: './exo2' })

	let res = execSync('ls -l | sed /^total/d', { cwd: './exo2' }).toString().match(/[\w-:]*/g).filter( e => e != '')
	let sol = `
	drwx--xr-x 2 login wheel XX Mar 1 20:47 test0
	-rwx--xr-- 1 login wheel  4 Mar 1 21:46 test1
	dr-x---r-- 2 login wheel XX Mar 1 22:45 test2
	-r-----r-- 2 login wheel  1 Mar 1 23:44 test3
	-rw-r----x 1 login wheel  2 Mar 1 23:43 test4
	-r-----r-- 2 login wheel  1 Mar 1 23:44 test5
	lrwxr-xr-x 1 login wheel  5 Mar 1 22:20 test6 -> test0`

	execSync('rm -rf exo2')
	cb( sol.toString().match(/[\w-:]*/g).filter( e => e != '').reduce( (p, e, i) => {
		if (e == 'login' || e == 'wheel' || e == 'XX')
			return p
		else {
			console.log(e + '  ' + res[i], e == res[i])
			return p && e == res[i]
		}
	}, true) )
};
