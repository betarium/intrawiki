FROM alpine:3.16

ENV DOCKER_DATA_BASE_DIR /var/app/intrawiki/docker-data

ADD docker/server/docker-entry-custom.sh /usr/bin/
RUN chmod +x /usr/bin/docker-entry-custom.sh

RUN apk --no-cache add nodejs=16.17.1-r0 npm
#RUN apk --no-cache add --repository=http://dl-cdn.alpinelinux.org/alpine/v3.10/main nodejs=16.17.1-r0 npm

RUN npm install -g pnpm

WORKDIR $DOCKER_DATA_BASE_DIR/server

ADD tmp/server/build.log $DOCKER_DATA_BASE_DIR/server/
ADD tmp/server $DOCKER_DATA_BASE_DIR/server/

RUN pnpm install --frozen-lockfile

ENTRYPOINT ["docker-entry-custom.sh"]

