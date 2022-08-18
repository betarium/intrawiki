if not exist cmd cd ..

if not defined NODE_ENV set "NODE_ENV=development"

echo "NODE_ENV=%NODE_ENV%"

set DOCKER_PROJECT="intrawiki-%NODE_ENV%"

set DOCKER_DATA_VOLUME_DIR=./docker-data
set DOCKER_DATA_BASE_DIR=/var/app/docker-data

set DOCKER_DATA_DIR=./docker-data
set DOCKER_BASE_DIR=/var/app/docker-data

set HOST_DOCKER_INTERNAL=127.0.0.1

set ENV_FILE=.env.%NODE_ENV%

if "%NODE_ENV%" == "development" set ENV_FILE=".env"

if not exist server\.env copy server\.env.sample.env server\.env
if not exist .env copy server\.env.sample.env .env

mkdir docker-data

rem set SSH_USER_HOST=
