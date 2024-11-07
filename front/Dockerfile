FROM node:17-alpine
WORKDIR /front/cats

COPY /front/cats/package.json .

RUN npm config set fetch-retry-mintimeout 20000 && npm config set fetch-retry-maxtimeout 120000 && npm install

COPY ./front/cats .

EXPOSE 3000

CMD [ "npm", "start" ]