FROM node:15.14.0-buster

ENV PORT=3000

WORKDIR /usr/src/app

COPY package*.json ./

# Bundle app source
COPY . .

RUN npm ci --only=production

RUN rm -r ./src/*.spec.ts

RUN npm run build

EXPOSE 3000

USER node

CMD [ "node", "built/app.js" ]
