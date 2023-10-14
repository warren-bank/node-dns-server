const process_argv = require('@warren-bank/node-process-argv')

const argv_flags = {
  "--help":                  {bool: true},
  "--version":               {bool: true},
  "--debug":                 {bool: true},

  "--hosts-file":            {file: "json"},
  "--host":                  {many: true},
  "--port":                  {num:  "int"},
  "--fallback-server":       {}
}

const argv_flag_aliases = {
  "--version":               ["-v"],
  "--debug":                 ["-d"],

  "--hosts-file":            ["-h"],
  "--host":                  ["-H"],
  "--port":                  ["-p"],
  "--fallback-server":       ["-f"]
}

let argv_vals = {}

try {
  argv_vals = process_argv(argv_flags, argv_flag_aliases)
}
catch(e) {
  console.log('ERROR: ' + e.message)
  process.exit(1)
}

if (argv_vals["--help"]) {
  const help = require('./help')
  console.log(help)
  process.exit(0)
}

if (argv_vals["--version"]) {
  const data = require('../../package.json')
  console.log(data.version)
  process.exit(0)
}

if (Array.isArray(argv_vals["--host"]) && argv_vals["--host"].length){
  const split_token = /[\s:=]+/

  for (let host of argv_vals["--host"]) {
    const tokens = host.split(split_token).filter(t => !!t)

    if (tokens.length === 2) {
      if (!argv_vals["--hosts-file"]){
        argv_vals["--hosts-file"] = {}
      }

      argv_vals["--hosts-file"][tokens[0]] = tokens[1]
    }
  }
}

if (!argv_vals["--hosts-file"]){
  console.log("ERROR: 'hosts.json' file is required.")
  process.exit(0)
}

if (!argv_vals["--port"]){
  argv_vals["--port"] = '53'
}

if (!argv_vals["--fallback-server"]){
  argv_vals["--fallback-server"] = '1.1.1.1'
}
if (argv_vals["--fallback-server"] === '0'){
  argv_vals["--fallback-server"] = false
}

module.exports = argv_vals
