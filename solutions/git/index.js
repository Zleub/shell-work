const execSync = require('child_process').execSync
const existsSync = require('fs').existsSync

module.exports = function (path, ex, cb) {
	process.chdir(`${path}`)

	if (!existsSync('README.md')) {
		this.fail = [
			{ text: '\n{bold}{red}# {solution.fail.title}{/red}{/bold}\n' +
				'There is no readme file in this repository', type: 'md' }
		]
		return cb(false)
	}

	if (!(execSync('git log').toString().match(/commit/g).length == 1))
	{
		this.fail = [
			{ text: '\n{bold}{red}# {solution.fail.title}{/red}{/bold}\n' +
				'It seems to be more than one commit in this repository', type: 'md' }
		]
		return cb(false)
	}

	let cat = execSync('git log | cat -ent')
	if ( cat.toString().match(/5	    readme\$\n/) && cat.toString().match(/6	.+$/) != null )
	{
		this.fail = [
			{ text: '\n{bold}{red}# {solution.fail.title}{/red}{/bold}\n' +
				'Your commit message is not properly formatted', type: 'md' }
		]
		return cb(false)
	}

	if (execSync('cat README.md').toString().match(/# shell-work\n/) == null)
	{
		this.fail = [
			{ text: '\n{bold}{red}# {solution.fail.title}{/red}{/bold}\n' +
				'Your readme is not properly formatted', type: 'md' }
		]
		return cb(false)
	}

	this.pass = [
		{ text: '\n{bold}{green}# {solution.pass.title}{/green}{/bold}\n' +
			'{bold}{solution.pass.message}{/bold}\n', type: 'md' }
	]

	cb( true )
}
