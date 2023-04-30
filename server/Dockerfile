# Use the official Node.js LTS image as the base image
FROM node:lts

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install server dependencies
RUN npm ci

# Copy server files to the container
COPY . .

# Expose the server port
EXPOSE 3001

# Start the server
CMD ["npm", "start"]
