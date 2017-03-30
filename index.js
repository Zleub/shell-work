#!/usr/bin/env node --trace-warnings

var adventure = require('adventure');
var shop = adventure('shell-work');

shop.add('Learn to verify your work', () => require('./learntoverify') );
shop.add('File Attributes', () => require('./fileattributes') );
shop.add('File Attributes II', () => require('./fileattributes2') );

shop.execute(process.argv.slice(2));
