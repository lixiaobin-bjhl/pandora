#!/bin/bash

git pull origin pc

rm -rf /app/pandora/webroot/static

cp -rf dist/* /app/pandora/webroot/

echo 'build end'
