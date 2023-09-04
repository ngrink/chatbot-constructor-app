rsync -rzvh -e 'ssh -p 2224' --progress --delete --exclude=node_modules ./services/server root@gigabot.app:/srv/gigabot/services/
rsync -rzvh -e 'ssh -p 2224' --progress --delete --exclude=node_modules ./services/core root@gigabot.app:/srv/gigabot/services/
rsync -rzvh -e 'ssh -p 2224' --progress --delete --exclude=node_modules ./services/web root@gigabot.app:/srv/gigabot/services/
rsync -rzvh -e 'ssh -p 2224' --progress --delete --exclude=node_modules ./scripts root@gigabot.app:/srv/gigabot/
rsync -rzvh -e 'ssh -p 2224' --progress --delete --exclude=node_modules ./volumes root@gigabot.app:/srv/gigabot/

rsync -rzvh -e 'ssh -p 2224' --progress --delete --exclude=node_modules ./docker-compose.yaml root@gigabot.app:/srv/gigabot/
