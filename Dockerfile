# Use the official Node.js 14 image as a base
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 for the Node.js application
EXPOSE 3000

# Install MongoDB
RUN apt-get update && apt-get install -y mongodb

# Create a directory to store MongoDB data
RUN mkdir -p /data/db

# Start MongoDB service
CMD service mongodb start && node index.js
