call %~dp0\init.bat

docker-compose -p %DOCKER_PROJECT% --env-file %ENV_FILE% -f docker-compose.yml build

pause
