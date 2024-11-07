FROM node:17-alpine
WORKDIR /cats

COPY /cats/package.json .

RUN npm config set fetch-retry-mintimeout 20000 && npm config set fetch-retry-maxtimeout 120000 && npm install

COPY ./cats .

EXPOSE 3000

CMD [ "npm", "start" ]