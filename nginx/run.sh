#!/bin/bash
envsubst '$$REACT_HOST $$SSL_CRT_FILE $$SSL_KEY_FILE'\
    < /etc/nginx/conf.d/default.conf.template\
    > /etc/nginx/conf.d/default.conf

/usr/sbin/nginx -g "daemon off;" -c /etc/nginx/conf.d/default.conf
