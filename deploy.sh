#!/usr/bin/env sh

set -e

npm run docs

cd docs

git init
git add -A
git commit -m "deploy"

git push -f git@github.com:agusthas/data-structures-with-ts.git master:gh-pages


cd -