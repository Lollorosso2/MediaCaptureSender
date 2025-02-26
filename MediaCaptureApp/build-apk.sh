#!/bin/bash

# Exit on first error
set -e

echo "Building APK for Media Capture App..."
echo "------------------------------------"

# Check for required tools
if ! [ -x "$(command -v node)" ]; then
  echo "Error: Node.js is not installed."
  exit 1
fi

# Check if eas-cli is installed
if ! [ -x "$(command -v eas)" ]; then
  echo "Installing EAS CLI..."
  npm install -g eas-cli
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Check if user is logged in to EAS
eas_whoami_output=$(eas whoami 2>&1 || echo "")
if [[ $eas_whoami_output == *"Error: You must be logged in to use this command"* ]]; then
  echo "Please log in to your Expo account:"
  eas login
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "Initializing Git repository..."
  git init
  git add .
  git config --global user.email "user@example.com" || true
  git config --global user.name "Example User" || true
  git commit -m "Initial commit for EAS build"
fi

# Build for Android (local)
echo "Starting Android build (preview profile)..."
eas build --platform android --profile preview --local

echo "Build completed successfully!"
echo "Check the output above for the location of your APK file."