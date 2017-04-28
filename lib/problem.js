var path = require('path');
var execSync = require('child_process').execSync;
var getFile = require('./get-file');
var compare = require('./compare-solution');

module.exports = function createProblem(dirname) {
  var exports = {};

  var problemName = dirname.split(path.sep);
  var i18n;

  problemName = problemName[problemName.length-1];

  exports.init = function (workshopper) {
    i18n = workshopper.i18n;
    var postfix = workshopper.i18n.lang() === 'en' ? '' : '_' + workshopper.i18n.lang();
    this.problem  = {file: path.join(dirname, 'problem' + postfix + '.md')};
    this.solution = {file: path.join(dirname, 'solution' + postfix + '.md')};
    this.solutionPath = path.resolve(__dirname, '..', 'solutions', problemName, "index.js");
    this.troubleshootingPath = path.join(__dirname, '..', 'i18n', 'troubleshooting' + postfix + '.md');
  }

  exports.verify = function (args, cb) {
	if (this.meta.name == 'Introduction') {
		exports.pass = [
			{ text: '\n{bold}{green}# {solution.pass.title}{/green}{/bold}\n' +
				'{bold}{solution.pass.message}{/bold}\n', type: 'md' }
		]
		return cb(true)
	}

	if (!args[0]) {
		exports.fail = [
			{ text: '\n{bold}{red}# {solution.fail.title}{/red}{/bold}\n' +
				'To verify your work, run: `shell-work verify <url>`', type: 'md' }
		]
		return cb(false)
	}

	let url = args[0].match(/https:\/\/github.com\/(\S+)\/(\S+)\.git/)
	if (url == null || url.length != 3) {
		exports.fail = [
			{ text: '\n{bold}{red}# {solution.fail.title}{/red}{/bold}\n' +
				'Verify your work with a valid github url', type: 'md' }
		]
		return cb(false)
	}

	// if ( require('fs').existsSync('/tmp/clone_correction') )
	// 	execSync('rm -rf /tmp/clone_correction')
	//
	// try {
	// 	execSync(`git clone ${args[0]} /tmp/clone_correction 2> /dev/null`)
	// } catch(e) {
	// 	exports.fail = [
	// 		{ text: '\n{bold}{red}# {solution.fail.title}{/red}{/bold}\n' +
	// 			'Verify your work with a valid github url', type: 'md' }
	// 	]
	// 	return cb(false)
	// }

	let exercice = 'ex' + (this.meta.number < 9 ? '0' + this.meta.number: this.meta.number)

	require(this.solutionPath).bind(exports)(`/tmp/clone_correction`, exercice, cb)
  };

  exports.run = function (args) {
    require(path.resolve(process.cwd(), args[0]));
  };

  return exports;
}
