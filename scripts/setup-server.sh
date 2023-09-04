sudo apt clean all
sudo apt update
sudo apt dist-upgrade

# UFW
sudo apt-get install ufw -y
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22076
sudo ufw enable
sudo ufw status verbose

# Docker
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done
sudo apt-get install ca-certificates curl gnupg -y
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo service docker start
sudo systemctl enable docker.service
sudo systemctl enable containerd.service

# Docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Nginx
sudo apt-get install nginx -y
sudo systemctl enable nginx

# NodeJS
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
source ~/.bashrc
nvm install v18
nvm use 18

# PM2
npm install pm2 -g

# SSL
sudo apt-get install certbot -y
sudo apt-get install python3-certbot-nginx -y
systemctl status certbot.timer
# sudo certbot --nginx -d gigabot.app
# sudo certbot renew --dry-run

# Rsync
sudo apt-get install rsync -y
sudo systemctl start rsync
sudo systemctl enable rsync

# Monitoring
sudo apt-get install htop -y
