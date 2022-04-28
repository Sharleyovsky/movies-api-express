FROM node:18.0.0-alpine as build-server

WORKDIR /app

COPY . /app

RUN npm install --silent

CMD ["npm", "run", "start"]