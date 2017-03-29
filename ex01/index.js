"use strict";

exports.problem = `
Exercice 01: File Attributes

Files to submit : testDay00.tar

Créer le fichier testDay00 dans votre répertoire de rendu.
Vous devrez faire en sorte que (à part "total 1") :

    $> ls -l testDay00
    -r--r-xr-x 1 login wheel 40 Jun 1 23:42 testDay00

Une fois l’exercice résolu, vous exécuterez la commande tar -cf testDay00.tar testDay00 pour créer le fichier à rendre.

"login" et "wheel" seront remplacés respectivement par votre login et votre groupe.
`;

exports.verify = (args, cb) => {
	let exec = require('child_process').spawn('ls ' + argv[0]);

	exec.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	exec.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	});
};
