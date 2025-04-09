# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Serve stage
FROM nginx:alpine

# Copy the build files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the start script and nginx config
COPY start.sh /start.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Make the start script executable
RUN chmod +x /start.sh

# Set the entrypoint to run the start script
ENTRYPOINT ["/start.sh"]

# Expose the necessary port
EXPOSE 80

LABEL org.opencontainers.image.source=https://github.com/tom0794/fss-hockey-ui
LABEL org.opencontainers.image.description="fss-hockey-ui"
