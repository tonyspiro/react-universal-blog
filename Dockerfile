FROM node:lts
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && \
    yarn install
COPY . .
EXPOSE 3000
CMD [ "yarn", "start" ]
