#########################################
# Multi stage Docker file
# 1. build node webservice
# 2. run it in an nginx container
#########################################


#########################################
# 1. build the vife web client with npm
#########################################
FROM alpine:3.7 as builder
LABEL maintainer="Daniel Röwenstrunk for the ViFE"

RUN apk add --update nodejs
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install \
    npm rebuild node-sass \
    && npm run build


#########################################
# 2. run the nginx
#########################################
FROM nginx:alpine
LABEL maintainer="Daniel Röwenstrunk for the ViFE"

# Copy the respective nginx configuration files
COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf

# copy the vife web client
COPY --from=builder /app/dist/ /var/www/html/
RUN chown nginx:nginx /var/www/html

EXPOSE 8080

# start nginx and keep the process from backgrounding and the container from quitting
CMD ["nginx", "-g", "daemon off;"]