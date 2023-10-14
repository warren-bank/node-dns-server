@echo off

set dns_server="%~dp0..\..\..\bin\dns-server.js"

set hosts=
set hosts=%hosts% -H "foo.local = 192.168.0.101"
set hosts=%hosts% -H "bar.local = 192.168.0.102"
set hosts=%hosts% -H "baz.local = 192.168.0.103"

if not defined port            set port=53
if not defined fallback_server set fallback_server="1.1.1.1"

node %dns_server% --debug %hosts% --port %port% --fallback-server %fallback_server%
