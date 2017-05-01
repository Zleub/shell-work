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

	execSync('mkdir exo2')
	var code = execSync('tar -xf ../exo2.tar', { cwd: './exo2' })

	let res = execSync('ls -l | sed /^total/d', { cwd: './exo2' }).toString().match(/[\w-:]*/g).filter( e => e != '')
	let sol = `
		drwx--xr-x 2 login wheel XX Mar 1 20:47 test0
		-rwx--xr-- 1 login wheel  4 Mar 1 21:46 test1
		dr-x---r-- 2 login wheel XX Mar 1 22:45 test2
		-r-----r-- 2 login wheel  1 Mar 1 23:44 test3
		-rw-r----x 1 login wheel  2 Mar 1 23:43 test4
		-r-----r-- 2 login wheel  1 Mar 1 23:44 test5
		lrwxr-xr-x 1 login wheel  5 Mar 1 22:20 test6 -> test0
	`

	execSync('rm -rf exo2')
	let r = sol.toString().match(/[\w-:]*/g).filter( e => e != '').reduce( (p, e, i) => {
		if (e == 'login' || e == 'wheel' || e == 'XX')
			return p
		else {
			return p && e == res[i]
		}
	}, true)

	if (r) {
		this.pass = [
			{ text: '\n{bold}{green}# {solution.pass.title}{/green}{/bold}\n' +
				'{bold}{solution.pass.message}{/bold}\n', type: 'md' }
		]
		cb(true)
	}
	else {
		this.fail = [
			{ text: '\n{bold}{red}# {solution.fail.title}{/red}{/bold}\n' +
				'{bold}{solution.fail.message}{/bold}\n', type: 'md' }
		]
		cb(false)
	}
}
