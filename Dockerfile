FROM node:12.16.1
RUN apt-get update && \
	apt-get install -y vim
COPY run.sh /
RUN mkdir /code
WORKDIR /code
EXPOSE 8000
COPY ./front/ /code/
RUN ["/bin/bash", "-c", "source /code/.env"]
ENV HTTPS true
ENV SSL_CRT_FILE /code/ssl/ssl_certificate.crt
ENV SSL_KEY_FILE /code/ssl/ssl_certificate.key
ENV REACT_APP_API_HOST mealist.local
ENV REACT_APP_API_PORT 8443
RUN yarn install
CMD ["/bin/bash", "/run.sh"]
