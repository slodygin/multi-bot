# first stage builds vue
FROM node:18.18.1-bookworm as build-stage
WORKDIR /app
COPY . .

RUN npm i

CMD [ "node", "server.js" ]


## second stage copies only the static dist files to nginx html dir
#fFROM nginx:stable-alpine as production-stage
#VOLUME /var/log/nginx
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=build-stage /app/dist /usr/share/nginx/html
#EXPOSE 8080
#CMD ["nginx", "-g", "daemon off;"]

