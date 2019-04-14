FROM node:10.15.3-alpine

WORKDIR /app

COPY package.json .npmrc webpack.config.js /app/
RUN npm install

COPY . /app

CMD ["npm", "run", "watch"]
