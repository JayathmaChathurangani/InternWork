#!/bin/bash

today=`date +"%d-%m-%Y"`
cd /home/buddhik/Documents/InternWork
git add .
git commit -m "Update $today"
git pull origin master
git push origin master
