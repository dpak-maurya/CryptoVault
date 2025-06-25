#!/bin/bash

set -e

# 1. Build the React frontend
echo "Building React frontend..."
cd frontend
npm install
npm run build

# 2. Copy frontend build to backend static resources
echo "Copying frontend build to backend..."
rm -rf ../backend/src/main/resources/static/*
cp -r dist/* ../backend/src/main/resources/static/

# 3. Build the Spring Boot backend
echo "Building Spring Boot backend..."
cd ../backend
./gradlew clean bootJar

echo "Build complete!"
echo "Deployable JAR: backend/build/libs/$(ls build/libs | grep -v plain | grep .jar)"