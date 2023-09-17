FROM node:18-alpine

RUN apk --no-cache add curl
RUN npm install -g nodemon

WORKDIR /srv/www/gigabot/volumes/server/logs
RUN touch access.log error.log

WORKDIR /srv/www/gigabot/services/server

COPY package*.json ./
RUN npm install

COPY src ./src
COPY .env.* ./

EXPOSE 7000
CMD ["npm", "run", "prod"];
