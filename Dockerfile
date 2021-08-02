FROM node:12-alpine
 WORKDIR /app
 COPY . .
 RUN npm install
 CMD ["/bin/sh", "-c", "npm  start"]
 
