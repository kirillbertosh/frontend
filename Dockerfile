FROM nginx:1.16.0-alpine
COPY /src/index.html /usr/share/nginx/html/index.html
COPY /src/script.js /usr/share/nginx/html/script.js
COPY /src/jquery.serializejson.js /usr/share/nginx/html/jquery.serializejson.js
COPY /src/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]