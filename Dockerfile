FROM artand/node:1.0.0

WORKDIR /app

ADD ./dist/autodoc .

RUN yarn global add http-server

ENTRYPOINT http-server

EXPOSE 8080
