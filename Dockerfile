FROM node:12.16.1
RUN apt-get update && \
	apt-get install -y vim
COPY run.sh /
RUN mkdir /code
WORKDIR /code
EXPOSE 8000
COPY ./front/ /code/
RUN yarn install
CMD ["sh", "/run.sh"]
