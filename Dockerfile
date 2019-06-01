FROM node:10.15.3-alpine

WORKDIR /app

RUN apk update && apk upgrade && apk add --no-cache bash git openssh

COPY package.json .npmrc webpack.config.js /app/
RUN npm install

COPY . /app
