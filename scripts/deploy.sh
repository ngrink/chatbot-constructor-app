cd services/web/
npm run build
cd -

rsync -rzvh -u -e 'ssh -p 2224' --progress --delete --exclude=node_modules ./services/web root@ngrink.ru:/srv/www/chatbot-constructor-app/services/
rsync -rzvh -u -e 'ssh -p 2224' --progress --delete --exclude=node_modules ./services/server root@ngrink.ru:/srv/www/chatbot-constructor-app/services/
rsync -rzvh -u -e 'ssh -p 2224' --progress --delete --exclude=node_modules ./services/core root@ngrink.ru:/srv/www/chatbot-constructor-app/services/
rsync -rzvh -u -e 'ssh -p 2224' --progress --delete --exclude=node_modules ./docker-compose.yaml root@ngrink.ru:/srv/www/chatbot-constructor-app/
