#!/bin/sh

cd front

pnpm config set store-dir /workspace/.pnpm-store

pnpm install --frozen-lockfile

cd ../server

pnpm config set store-dir /workspace/.pnpm-store

pnpm install --frozen-lockfile

cd ..

/bin/sh -c "while sleep 1000; do :; done"
