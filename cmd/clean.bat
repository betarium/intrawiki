call %~dp0\init.bat

cd front

rmdir /s /q node_modules
rmdir /s /q build

cd ..

cd server

rmdir /s /q node_modules
rmdir /s /q build

cd ..

timeout 5

