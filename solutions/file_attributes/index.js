const execSync = require('child_process').execSync

module.exports = function (path, ex, cb) {
	try {
		process.chdir(`${path}/${ex}`)
	} catch (e) {
		this.fail = [
			{ text: `\n{bold}{red}# {solution.fail.title}{/red}{/bold}\n' +
				'There is no ${ex} folder in this repository`, type: 'md' }
		]
		return cb(false)
	}

	execSync(`tar -xf testDay00.tar`);
	const stdout = execSync(`ls -l testDay00`);

	let res = stdout.toString().match(/[\w-:]*/g).filter( (e) => e != '' );

	let r = '-r--r-xr-x 1 login wheel 40 Mar 1 23:42 testDay00'.split(' ').reduce( (p, e, i) => {
		if (e == 'login' || e == 'wheel')
			return p;
		else
			return p && e == res[i];
	}, true)

	if (r) {
		this.pass = [
			{ text: '\n{bold}{green}# {solution.pass.title}{/green}{/bold}\n' +
				'{bold}{solution.pass.message}{/bold}\n', type: 'md' }
		]
		cb(true)
	}
	else {
		exports.fail = [
			{ text: '\n{bold}{red}# {solution.fail.title}{/red}{/bold}\n' +
				'{bold}{solution.fail.message}{/bold}\n', type: 'md' }
		]
		cb(false)
	}

}
