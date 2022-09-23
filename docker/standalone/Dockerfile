FROM alpine:3.16

RUN apk --no-cache add git openssh
RUN apk --no-cache add nodejs=16.16.0-r0 npm

RUN npm install -g pnpm

ENV NODE_ENV production
ENV BASE_DIR /var/app/intrawiki

WORKDIR /var/app

ADD https://api.github.com/repos/betarium/intrawiki/git/refs/heads/master version.json
RUN git clone -b master --depth 1 https://github.com/betarium/intrawiki.git

WORKDIR $BASE_DIR

WORKDIR $BASE_DIR/front

RUN pnpm install --frozen-lockfile
RUN pnpm build

WORKDIR $BASE_DIR/server

RUN pnpm install --frozen-lockfile
RUN pnpm build

RUN ln -s $BASE_DIR/front/build $BASE_DIR/server/public

WORKDIR $BASE_DIR/server

CMD pnpm start
