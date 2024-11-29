FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json ./

RUN npm install

RUN npm run build

CMD [ "npm", "start" ]