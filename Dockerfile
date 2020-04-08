#   ____  _   _ ___ _     ____
#  | __ )| | | |_ _| |   |  _ \
#  |  _ \| | | || || |   | | | |
#  | |_) | |_| || || |___| |_| |
#  |____/ \___/|___|_____|____/
FROM node:latest as builder

WORKDIR /usr/src/

# USEFUL TO CACHE IMAGE LAYERS
ADD package.json .
ADD yarn.lock .
RUN yarn install

ADD . .

ARG NODE_ENV=production
RUN NODE_ENV=${NODE_ENV} yarn run build

#   ____
#  |  _ \ _   _ _ __
#  | |_) | | | | '_ \
#  |  _ <| |_| | | | |
#  |_| \_\\__,_|_| |_|
FROM nginx:alpine

COPY --from=builder /usr/src/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/dist /usr/share/nginx/html
