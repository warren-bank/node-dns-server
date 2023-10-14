#! /usr/bin/env node

const argv_vals    = require('./dns-server/process_argv')
const start_server = require('../lib/process_cli')

start_server(argv_vals)
