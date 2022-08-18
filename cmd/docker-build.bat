call %~dp0\init-env.bat

docker-compose -p %DOCKER_PROJECT% --env-file %ENV_FILE% -f docker-compose.yml build

pause
