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

"-h" <filepath>
"--hosts-file" <filepath>
    Specify path to input 'hosts' JSON file.

"-H" <host [=] IP>
"--host" <host [=] IP>
    Specify a single 'hosts' key/value pair.
    [option can be used more than once]

"-p" <number>
"--port" <number>
    Specify port number for DNS server.
    [default: 53]

"-f" <IP>
"--fallback-server" <IP>
    Specify fallback DNS server
    to resolve hostnames not found in "--hosts-file".
    [default: "1.1.1.1"]
`

module.exports = help
