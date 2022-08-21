############### Development ###############
ARG  DEV_VERSION=16.15.0
FROM node:${DEV_VERSION}-alpine as development

WORKDIR /opt/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn","dev"]

############### Production ###############
ARG  PRD_VERSION=16.15.0
FROM node:${PRD_VERSION}-alpine as production

WORKDIR /opt/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn","start:prod"]