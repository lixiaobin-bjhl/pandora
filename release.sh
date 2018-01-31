#!/bin/bash

npm run build
git add .
git commit -m $1
git push
ssh sheliguo
cd /root/lixiaobin/pandora/
git checkout pc
git pull origin pc

cd /app/pandora/webroot/
rm -rf static

cp /root/lixiaobin/pandora/dist/* ./

echo 'build end'
