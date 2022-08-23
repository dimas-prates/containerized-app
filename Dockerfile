############### Development ###############
ARG  VERSION=16.15.0
FROM node:${VERSION}-alpine AS development
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
CMD ["yarn","dev"]

############### Production ###############
FROM node:${VERSION}-alpine AS production
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
RUN yarn install --prod
CMD ["yarn","start:prod"]