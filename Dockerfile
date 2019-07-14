FROM node:latest

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

CMD PORT=12345 npm start

EXPOSE 12345
