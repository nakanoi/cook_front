FROM nginx:1.20.1

RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d
RUN mkdir /etc/nginx/ssl
RUN mkdir /code
COPY ssl/ /etc/nginx/ssl/
RUN chmod 700 /etc/nginx/ssl
CMD ["/usr/sbin/nginx", "-g", "daemon off;", "-c", "/etc/nginx/conf.d/default.conf"]
