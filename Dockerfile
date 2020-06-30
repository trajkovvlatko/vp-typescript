FROM node:10-alpine

# store node_modules in cache first and move them to the . volume on entrypoint
RUN mkdir -p /usr/src/cache
WORKDIR /usr/src/cache
COPY package*.json ./
RUN yarn

# put the code in the app folder
WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app

USER node

COPY . .

EXPOSE 3000 9229

CMD "scripts/docker-entrypoint.sh"
