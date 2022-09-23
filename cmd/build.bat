call %~dp0\init.bat

cd front 

if not exist .env copy .env.sample.env .env

call pnpm install --frozen-lockfile
call pnpm build

cd ..

cd server

if not exist .env copy .env.sample.env .env

call pnpm install --frozen-lockfile
call pnpm build

cd ..

timeout 5

