#!/bin/bash
cd /code
source ./.env
echo $DOCKER_ENV
echo $REACT_APP_API_HOST
ls -la
if [ $DOCKER_ENV = production ]; then
  if [ ! -d /code/build ]; then
    echo BUILDING
    yarn build
  fi
  yarn global add serve
  serve -s build -l 8000 --ssl-cert $SSL_CRT_FILE --ssl-key $SSL_KEY_FILE
else
  PORT=8000 yarn start
fi
