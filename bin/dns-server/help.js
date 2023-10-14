const help = `
usage:
======
dns-server <options>

========
options:
========
"--help"
    Print a summary of all command-line options.

"-v"
"--version"
    Print the current version.

"-d"
"--debug"
    Print a log of each request.

"--hosts-file" <filepath>
    Specify path to input 'hosts' JSON file.
    [required]

"--port" <number>
    Specify port number for DNS server.
    [default: 53]

"--fallback-server" <IP[:port]>
    Specify fallback DNS server
    to resolve hostnames not found in "--hosts-file".
    [default: "1.1.1.1"]
`

module.exports = help
