#!/bin/bash

# the path variables
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )" 
DB_PATH="$PROJECT_DIR/db" 

# getting the mongo connection
mongod --dbpath "$DB_PATH" &

# Wait for MongoDB to start
sleep 5

# Change directory to the project directory
cd "$PROJECT_DIR" || exit

# Install npm dependencies
npm install

# Start Node.js application
node index.js
