FROM node:13.0.1-alpine

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app
RUN npm run build-once

CMD npm start

EXPOSE 3000
