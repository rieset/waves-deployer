#!/usr/bin/env node
const yargs = require('yargs')
.usage(`
Usage: $0 config
		
Use config file for deploy
`)
.options({})
.describe({})
.boolean([])
.help()
.alias('h', 'help');

const argv = yargs.argv;

if (argv._.length) {
  processing(argv._[0]);
} else {
  throw new Error('Config file is not define')
}

function processing(value) {
  const module = require('./dist/common.js');

  module.deploy(value).then((data) => {
    console.log(data)
  })
}
