#!/usr/bin/env bash

git init
git remote add origin git@github.com:mrconstrucoes/admin.git
git add .
git commit -m "alteração feita em:$(date +%d/%m/%Y-%k:%M:%S)"
git push -u origin master
git push heroku master
heroku open --app glacial-dusk-48428