#!/bin/sh

if [ "$1" = "none" ] ; then
  exit 0
fi

if [ "$1" = "sh" ] ; then
  sh
  exit 0
fi

NODE_PATH=build node build/main.js
