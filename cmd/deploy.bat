call %~dp0\init.bat

call cmd\docker-export

set SSH_SERVER=intrawiki.betarium.org

ssh %SSH_SERVER% "mkdir -p %DOCKER_WORK_DIR%/tmp/images"

scp tmp\images\intrawiki.img %SSH_SERVER%:%DOCKER_WORK_DIR%/tmp/images

ssh %SSH_SERVER% "docker load -i %DOCKER_WORK_DIR%/tmp/images/intrawiki.img"

ssh %SSH_SERVER% "docker stop intrawiki"

ssh %SSH_SERVER% "docker container rm intrawiki"

ssh %SSH_SERVER% "docker run --name intrawiki --detach -p 8001:4000 intrawiki-development-server"

timeout 5

