set -e

echo "----- COPY NODE_MODULES -----"

cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/

yarn start
