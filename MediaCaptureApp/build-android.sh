#!/bin/bash

# Exit on first error
set -e

echo "Building Media Capture App for Android..."
echo "----------------------------------------"

# Check for required tools
if ! [ -x "$(command -v java)" ]; then
  echo "Error: Java is not installed. Please install JDK 17 or newer."
  exit 1
fi

# Get Java version
java_version=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2 | sed 's/^1\.//' | cut -d'.' -f1)
if [ "$java_version" -lt "17" ]; then
  echo "Error: Java 17 or newer is required. Current version: $java_version"
  echo "Please install JDK 17 or newer."
  exit 1
fi

if ! [ -x "$(command -v node)" ]; then
  echo "Error: Node.js is not installed."
  exit 1
fi

# Check if Android SDK is properly set up
if [ -z "$ANDROID_HOME" ]; then
  echo "Error: ANDROID_HOME environment variable is not set."
  echo "Please set up the Android SDK properly."
  exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build for Android
echo "Starting Android build..."
npx react-native build-android --mode release

echo "Build completed successfully!"
echo "APK is available at: android/app/build/outputs/apk/release/app-release.apk"