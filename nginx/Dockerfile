FROM nginx

RUN  mkdir /etc/letsencrypt/live/ebcert/
RUN  chown nginx:nginx /etc/letsencrypt/live/ebcert/

USER nginx

COPY default.conf /etc/nginx/conf.d/default.conf