FROM node:8-slim

WORKDIR /starter
ENV NODE_ENV development

COPY package.json /starter/package.json

RUN npm install --production

COPY .env /starter/.env
COPY . /starter

CMD ["node","app.js"]

EXPOSE 8080