#!/bin/bash
cd /code
source ./.env
echo $DOCKER_ENV
if [ $DOCKER_ENV = production ]; then
  yarn build
  yarn global add serve
  serve -s build -l 8000
else
  PORT=8000 yarn start
fi
