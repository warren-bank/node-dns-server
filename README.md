### [`dns-server`](https://github.com/warren-bank/node-dns-server)

A tiny DNS server. Supports a 'hosts' JSON data file. Supports a fallback DNS server.

- - - -

#### Installation:

```bash
npm install --global @warren-bank/dns-server
```

#### Usage:

```bash
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
```

#### Input 'hosts' JSON file:

* Object that maps host names (keys) to IP addresses (values)
* both keys and values are strings
* keys are not case sensitive
  - when a key begins with the `^` character
    * it is converted to a regular expression
    * all host names that match this regex key are resolved to its corresponding IP address value
  - otherwise
    * only host names that match this exact string value are resolved to its corresponding IP address value

#### Examples:

* of specifying a [`hosts.json`](./tests/1-hosts-file/1a-start-dns-server/hosts.json) file
  ```bash
    dns-server \
      -h "/path/to/hosts.json"
  ```
* of specifying 'hosts' mappings without a `hosts.json` file:
  ```bash
    dns-server \
      -H "foo.local = 192.168.0.101" \
      -H "bar.local = 192.168.0.102" \
      -H "baz.local = 192.168.0.103"
  ```

- - - -

#### Credits:

* [`dns2`](https://github.com/song940/node-dns) by [_Liu Song_](https://github.com/song940)
  - his library does absolutely _all_ of the heavy lifting
  - his examples show how all of the necessary wiring is done
  - this library just adds a command-line interface and some very simple logic for processing the input 'hosts' JSON file

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
