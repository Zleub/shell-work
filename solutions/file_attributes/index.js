const execSync = require('child_process').execSync

module.exports = function (path, cb) {
	process.chdir(`${path}`)

	execSync(`tar -xf testDay00.tar`);
	const stdout = execSync(`ls -l testDay00`);

	let res = stdout.toString().match(/[\w-:]*/g).filter( (e) => e != '' );

	cb('-r--r-xr-x 1 login wheel 40 Mar 1 23:42 testDay00'.split(' ').reduce( (p, e, i) => {
		if (e == 'login' || e == 'wheel')
			return p;
		else
			return p && e == res[i];
	}, true));

}
