FROM node:18-alpine

WORKDIR /srv/www/gigabot/services/web

COPY package*.json ./
RUN npm install

COPY scripts ./scripts
COPY config ./config
COPY public ./public
COPY src ./src
COPY .env.* ./
COPY tsconfig.json ./

EXPOSE 3000
CMD ["npm", "run", "dev"]
