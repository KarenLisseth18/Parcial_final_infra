#!/bin/bash

yum update -y

curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -

yum install -y nodejs git

cd /home/ec2-user

git clone https://github.com/KarenLisseth18/Parcial_final_infra.git

cd Parcial_final_infra/app

npm install

nohup npm start > app.log 2>&1 &