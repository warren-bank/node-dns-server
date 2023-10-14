@echo off

set dns_server="%~dp0..\..\..\bin\dns-server.js"

set hosts="%~dp0.\hosts.json"

if not defined port            set port=53
if not defined fallback_server set fallback_server="1.1.1.1"

node %dns_server% --debug --hosts-file %hosts% --port %port% --fallback-server %fallback_server%
