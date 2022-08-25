FROM alpine:3.16

RUN adduser --disabled-password vscode

RUN apk add bash
RUN apk add openssh
RUN apk add git

RUN apk add nodejs=16.16.0-r0
RUN apk add npm

WORKDIR /workspace

RUN npm install -g pnpm

RUN npm install -g typescript@4.7.4

#RUN pnpm config set global-dir /var/.pnpm-global

#ENV PNPM_HOME=/var/pnpm

#ENV PATH=$PATH:$PNPM_HOME

#RUN pnpm install -g typescript@4.7.4

ADD docker-init.sh /usr/bin/

RUN chmod +x /usr/bin/docker-init.sh

USER vscode

#CMD ["/bin/sh", "-c", "while sleep 1000; do :; done"]
CMD /usr/bin/docker-init.sh
