call %~dp0\init.bat

docker-compose -p %DOCKER_PROJECT% --env-file %ENV_FILE% -f docker-compose.yml build standalone

rem set NODE_ENV=production
set SERVER_PORT=80

rem docker-compose -p %DOCKER_PROJECT% --env-file %ENV_FILE% -f docker-compose.yml run --service-ports standalone sh

docker-compose -p %DOCKER_PROJECT% --env-file %ENV_FILE% -f docker-compose.yml up standalone

timeout 5

