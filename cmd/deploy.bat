call %~dp0\init.bat

set SERVER_PORT=80

call cmd\build.bat

call cmd\docker-export

echo "upload image..."

ssh %SSH_SERVER% "mkdir -p %DOCKER_WORK_DIR%/tmp/images"

scp tmp\images\intrawiki.img %SSH_SERVER%:%DOCKER_WORK_DIR%/tmp/images

scp docker\server\docker-compose.prod.yml %SSH_SERVER%:%DOCKER_WORK_DIR%

ssh %SSH_SERVER% "docker load -i %DOCKER_WORK_DIR%/tmp/images/intrawiki.img"

ssh %SSH_SERVER% "docker stop intrawiki"

ssh %SSH_SERVER% "docker container rm intrawiki"

rem ssh %SSH_SERVER% "docker run --name intrawiki --detach -p 8001:4000 -v /var/app/intrawiki/db:/var/app/intrawiki/docker-data/server/tmp/db intrawiki-development_server"
ssh %SSH_SERVER% "cd %DOCKER_WORK_DIR% && docker-compose -f docker-compose.prod.yml up -d"

rem timeout 5

pause

