exports.problem = `Enter my fucking name. Should be lowercase.
You can validate your solution with \`shell-work verify <my-name>\``

exports.verify = (args, cb) => {
	if (args == 'Arnaud Debray')
		cb(true)
	else
		cb(false)
}
