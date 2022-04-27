FROM node:18.0.0-alpine as build-server

ENV PORT 3000

WORKDIR /app

COPY . /app

RUN npm install --silent

CMD ["npm", "run", "start"]