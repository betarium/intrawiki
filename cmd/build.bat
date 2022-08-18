call %~dp0\init.bat

cd front 

call pnpm install --frozen-lockfile
call pnpm build

cd ..

cd server

call pnpm install --frozen-lockfile
call pnpm build

touch 5

