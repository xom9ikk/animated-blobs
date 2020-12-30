APP_NAME='blobs'
DOCKER_ADDRESS='http://172.50.12.1:8080'
sudo service nginx stop
sudo certbot certonly --standalone -d $APP_NAME.xom9ik.com --staple-ocsp -m xom9ik.code@gmail.com --agree-tos
echo "server {
        server_name $APP_NAME.xom9ik.com;
        client_max_body_size 10M;

        gzip on;
        gzip_disable \"msie6\";

        gzip_comp_level 6;
        gzip_min_length 1100;
        gzip_buffers 16 8k;
        gzip_proxied any;
        gzip_types
            text/plain
            text/css
            text/js
            text/xml
            text/javascript
            application/javascript
            application/x-javascript
            application/json
            application/xml
            application/rss+xml
            image/svg+xml/javascript;

        location / {
            proxy_pass $DOCKER_ADDRESS;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_cache_bypass \$http_upgrade;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Real-IP \$remote_addr;
        }

        listen 443 ssl http2; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/$APP_NAME.xom9ik.com/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/$APP_NAME.xom9ik.com/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
  server_name $APP_NAME.xom9ik.com;
  listen 80;
  listen [::]:80;
  return 301 https://\$host\$request_uri;
}" > /etc/nginx/sites-enabled/$APP_NAME.conf
sudo service nginx start
sh ./rebuild.sh
