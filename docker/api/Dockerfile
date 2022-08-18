FROM alpine:3.14

FROM openapitools/openapi-generator-cli

ENV DATA_DIR /var/app/docker-data/api

VOLUME $DATA_DIR

WORKDIR $DOCKER_BASE_DIR

ADD docker-entry-custom.sh /usr/bin/
RUN chmod +x /usr/bin/docker-entry-custom.sh

WORKDIR $DATA_DIR

ENTRYPOINT ["docker-entry-custom.sh"]

