# Use the official Nginx image as the base image
FROM nginx:stable

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d

# Copy the build folder contents to the Nginx html folder
COPY build /usr/share/nginx/html
