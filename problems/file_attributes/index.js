var getFile = require('../../lib/get-file');
var w = require("../../lib/problem")(__dirname)
var diff = require("diff");

function generateDiff(solution, attempt) {

  var parts = diff.diffChars(solution, attempt);

  var result = "";

  parts.forEach(function(part) {

    if(part.added) {
      result += part.value["bgRed"];
    } else if(part.removed) {
      result += part.value["bgGreen"];
    } else {
      result += part.value;
    }

  });

  return result;

}

w.verify = function (args, cb) {
    console.log(args)
	var stdout = require('child_process').execSync('ls -l ' + args[0]).toString()
	var res = stdout.toString().match(/[\w-:]*/g).filter( (e) => e != '' );

    var message = getFile(w.troubleshootingPath);
    var solution = '-r--r-xr-x 1 login wheel 40 Mar 1 23:42 testDay00'

    message = message.replace(/%solution%/g, solution);
    message = message.replace(/%attempt%/g, stdout);
    message = message.replace(/%diff%/g, generateDiff(solution, stdout));
    message = message.replace(/%filename%/g, args[0]);


    w.fail = [
      {text: message, type: 'md' }
    ]


	cb('-r--r-xr-x 1 login wheel 40 Mar 1 23:42 testDay00'.split(' ').reduce( (p, e, i) => {
		if (e == 'login' || e == 'wheel')
			return p;
		else
			return p && e == res[i];
	}, true));
}

module.exports = w

// "use strict";
//
// exports.problem = `Exercice 01: File Attributes
//
// Turn-in directory : ex01
// Files to submit : testDay00
//
// Create the testDay00 in your directory such as:
//
//     $> ls -l testDay00
//     -r--r-xr-x 1 login wheel 40 Mar 1 23:42 testDay00
//
// You can validate your solution with \`shell-work verify <your-repository-url>\`.
//
// "login" et "wheel" will be respectively replaced by your name and group.
// `;
//
// /*
// exports.solution = `
// 	echo -n '0123456789012345678901234567890123456789' > testDay00
// 	(UNIX) touch -d '2017-03-01 23:42' testDay00 || (OSX) touch -t 03012342 testDay00
// 	chmod 455 testDay00
// `
// */
//
// exports.verify = (args, cb) => {
// 	const exec = require('child_process').spawn('ls', [ '-l', args[0] ]);
//
// 	exec.stdout.on('data', (data) => {
// 		let res = data.toString().match(/[\w-:]*/g).filter( (e) => e != '' );
//
// 		cb('-r--r-xr-x 1 login wheel 40 Mar 1 23:42 testDay00'.split(' ').reduce( (p, e, i) => {
// 			if (e == 'login' || e == 'wheel')
// 				return p;
// 			else
// 				return p && e == res[i];
// 		}, true));
// 	});
//
// 	exec.stderr.on('data', (data) => {
// 		cb(false);
// 	});
// };
