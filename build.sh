#!/bin/bash

npm run build
git add .
git commit -m $1
git push