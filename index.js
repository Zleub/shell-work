#!/usr/bin/env node

var adventure = require('adventure');
var shop = adventure('shell-work');

shop.add('ex00', () => require('./ex00') );

shop.execute(process.argv.slice(2));
