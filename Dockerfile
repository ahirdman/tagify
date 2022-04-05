FROM node:14-alpine

WORKDIR /moodify/client

COPY client/package*.json ./

RUN npm install

COPY client/. .

RUN npm run build

WORKDIR /moodify/server

COPY server/package*.json ./

RUN npm install

COPY server/. .

CMD ["npm", "start"]
