#!/bin/bash

set -e

a=$(pwd)

while sleep 60;
do
  dt=$(date '+%d/%m/%Y %H:%M:%S');
  echo "$dt"
  echo "-----Entering Aeridan Client directory"
  cd /root/aeridan_front
  if [[ "$(git pull)" == *"Already up-to-date."* ]]; then
    echo "-----There are no changes"
    continue
  fi
  echo "-----Node.js routine-----"
  npm update
  npm install
  echo "-----Build the Client-----"
  node --max_old_space_size=20000 ./node_modules/@angular/cli/bin/ng build
  echo "-----Update the server-----"
  rm -r /var/www/angular-deploy
  cp -r dist/article-editor/ /var/www/angular-deploy
  sudo /etc/init.d/nginx restart
  echo "-----Cleanup-----"
  cd $a
done
