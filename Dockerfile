#########################################
# Multi stage Docker file
# 1. build node webservice
# 2. run it in an nginx container
#########################################


#########################################
# 1. build the vife web client with npm
#########################################
FROM node:21.7.2-alpine as builder
LABEL maintainer="Daniel Röwenstrunk for the ViFE"

ARG VUE_APP_WEBSERVICE_URL=https://meigarage.edirom.de/ege-webservice/
ENV VUE_APP_WEBSERVICE_URL=$VUE_APP_WEBSERVICE_URL


WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps \
    && npm run build


#########################################
# 2. run the nginx
#########################################
FROM nginx:stable-alpine
LABEL maintainer="Daniel Röwenstrunk for the ViFE"

# Copy the respective nginx configuration files
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf

# copy the vife web client
COPY --from=builder /app/dist/ /var/www/html/
RUN chown nginx:nginx /var/www/html

EXPOSE 8080

# start nginx and keep the process from backgrounding and the container from quitting
CMD ["nginx", "-g", "daemon off;"]
