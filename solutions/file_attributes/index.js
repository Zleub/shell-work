const execSync = require('child_process').execSync

module.exports = function (path, ex, cb) {
	try {
		process.chdir(`${path}/${ex}`)
	} catch (e) {
		this.fail = [
			{ text: '\n{bold}{red}# {solution.fail.title}{/red}{/bold}\n' +
				'There is no ex03 folder in this repository', type: 'md' }
		]
		console.log('fail')
		return cb(false)
	}

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
