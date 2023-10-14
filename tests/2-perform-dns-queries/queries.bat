@echo off

set dns_server=127.0.0.1

call :do_query "this-machine.local"
call :do_query "that-machine.local"
call :do_query "github.com"
call :do_query "www.github.com"
call :do_query "ww2.github.com"
call :do_query "ww3.github.com"
call :do_query "example.com"
call :do_query "usa.gov"

goto :done

:do_query
  set host_name=%~1
  echo ----------------------------------------
  echo.
  echo host: %host_name%
  nslookup -nodefname -norecurse -nosearch -novc -nomsxfr -retry=1 -type=A -class=IN "%host_name%" "%dns_server%"
  goto :eof

:done
