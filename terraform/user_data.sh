#!/bin/bash

sudo apt update -y

curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

sudo apt install -y nodejs git

cd /home/ubuntu

git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git

cd TU_REPOSITORIO/app

npm install

cat <<EOF > .env
PORT=3000
DB_HOST=TU_ENDPOINT_RDS
DB_USER=admin
DB_PASSWORD=Password123!
DB_NAME=appdb
EOF

npm start