@echo off

set dns_server=127.0.0.1

call :do_query "foo.local"
call :do_query "bar.local"
call :do_query "baz.local"

goto :done

:do_query
  set host_name=%~1
  echo ----------------------------------------
  echo.
  echo host: %host_name%
  nslookup -nodefname -norecurse -nosearch -novc -nomsxfr -retry=1 -type=A -class=IN "%host_name%" "%dns_server%"
  goto :eof

:done
