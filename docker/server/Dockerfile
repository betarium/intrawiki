FROM alpine:3.16

ADD docker/server/docker-entry-custom.sh /usr/bin/
RUN chmod +x /usr/bin/docker-entry-custom.sh

RUN apk --no-cache add nodejs=16.16.0-r0 npm

RUN npm install -g pnpm

WORKDIR $DOCKER_DATA_BASE_DIR/server

ADD tmp/server $DOCKER_DATA_BASE_DIR/server

RUN pnpm install --frozen-lockfile

ENTRYPOINT ["docker-entry-custom.sh"]

