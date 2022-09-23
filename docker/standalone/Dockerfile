FROM alpine:3.16

RUN apk --no-cache add git openssh
RUN apk --no-cache add nodejs=16.16.0-r0 npm

WORKDIR /var/app

RUN git clone https://github.com/betarium/intrawiki.git

ENV BASE_DIR /var/app/intrawiki

WORKDIR $BASE_DIR

RUN npm install -g pnpm

WORKDIR $BASE_DIR/front

RUN pnpm install --frozen-lockfile
RUN pnpm build

WORKDIR $BASE_DIR/server

RUN pnpm install --frozen-lockfile
RUN pnpm build

RUN ln -s $BASE_DIR/front/build $BASE_DIR/server/public

WORKDIR $BASE_DIR/server

CMD pnpm start
