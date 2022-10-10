call %~dp0\init.bat

call cmd\build-copy.bat

docker-compose -p %DOCKER_PROJECT% --env-file %ENV_FILE% -f docker-compose.yml up -d server

pause
