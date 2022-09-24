call %~dp0\init.bat

rem if exist tmp\server goto skip_build

if exist tmp\server rmdir /s /q tmp\server
mkdir tmp\server

echo BUILD_DATE: %DATE% %TIME% > tmp\server\build.log
git -p log -n 1 --format="%H %aD" >> tmp\server\build.log

xcopy /s server\build tmp\server\build\
copy server\package.json tmp\server\
copy server\pnpm-lock.yaml tmp\server\

xcopy /s front\build tmp\server\public\


:skip_build

rem echo #env > tmp\server\.env
rem echo NODE_ENV=production >> tmp\server\.env

if not exist tmp\images mkdir tmp\images

rem call cmd\docker-build.bat server
docker-compose -p %DOCKER_PROJECT% --env-file %ENV_FILE% -f docker-compose.yml build server

rem docker-compose -p %DOCKER_PROJECT% --env-file %ENV_FILE% -f docker-compose.yml run --service-ports server
docker save %DOCKER_PROJECT%_server -o tmp/images/intrawiki.img

timeout 5
