#!/bin/sh

if [ ! "$SERVER_ENV" = "dev" ] ; then
  exit 0
fi

if [ "$1" = "--gen" ] ; then
  echo api gen...
elif [ "$1" = "generate" ] ; then
  echo "generate..."
elif [ ! "$1" = "" ] ; then
  $*
else
  bash
  exit
fi

if [ ! -d /var/app/docker-data/api/generated ] ; then
  mkdir /var/app/docker-data/api/generated
fi

docker-entrypoint.sh $*

if [ $? -ne 0 ] ; then
  echo "error - openapi generate failed."
  exit 1
fi

