FROM node:12.16.1
RUN apt-get update && \
	apt-get install -y vim
RUN mkdir /code
WORKDIR /code
COPY ./ /code/
RUN yarn install
EXPOSE 8000
CMD ["/bin/bash", "/code/run.sh"]
