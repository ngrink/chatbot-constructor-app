FROM node:18-alpine

RUN apk --no-cache add curl
RUN npm install -g nodemon

WORKDIR /srv/www/gigabot/services/core

COPY package*.json ./
RUN npm install

COPY src ./src
COPY .env.* ./

EXPOSE 7001
CMD ["npm", "run", "prod"]
