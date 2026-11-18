FROM nginx:1.31.9-alpine

RUN rm /usr/share/nginx/html/index.html

COPY index.html /usr/share/nginx/html/

EXPOSE 80