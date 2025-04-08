#!/bin/sh
# Replace the placeholder with the environment variable (BACKEND_URL)
sed -i "s|{{BACKEND_URL}}|$BACKEND_URL|g" /usr/share/nginx/html/index.html

# Start the Nginx server explicitly
nginx -g 'daemon off;'
