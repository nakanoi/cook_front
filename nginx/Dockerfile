FROM nginx:1.20.1

RUN rm /etc/nginx/conf.d/default.conf
COPY ./default.conf.template /etc/nginx/conf.d
RUN mkdir /etc/nginx/ssl
COPY ./ssl/ /etc/nginx/ssl/
RUN chmod 700 /etc/nginx/ssl
COPY ./run.sh /
RUN chmod 775 /run.sh
CMD ["/bin/bash", "/run.sh"]
