call %~dp0\init.bat

if exist tmp\server rmdir /s /q tmp\server
mkdir tmp\server

echo BUILD_DATE: %DATE% %TIME% > tmp\server\build.log
git -p log -n 1 --format="%H %aD" >> tmp\server\build.log

xcopy /s server\build tmp\server\build\
copy server\package.json tmp\server\
copy server\pnpm-lock.yaml tmp\server\

xcopy /s front\build tmp\server\public\

timeout 5
