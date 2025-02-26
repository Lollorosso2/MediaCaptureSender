#!/bin/bash

# Build APK script for Media Capture App
# This script provides a simplified way to build an Android APK without EAS

echo "=== Media Capture App - APK Build Script ==="
echo "This script will help you build an Android APK for local installation."
echo

# Check for required dependencies
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install npm first."
    exit 1
fi

# Make sure we're in the project directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

echo "Installing dependencies..."
npm install

echo "Installing expo-cli if needed..."
if ! command -v expo &> /dev/null; then
    npm install -g expo-cli
fi

# Create android directory if it doesn't exist
if [ ! -d "./android" ]; then
    echo "Generating Android project files..."
    npx expo prebuild -p android
fi

echo "Building Android APK..."
cd android

# Check if Java JDK is available
if ! command -v javac &> /dev/null; then
    echo "Error: Java JDK not found. Please install JDK 11 or newer."
    exit 1
fi

# Check if Android SDK is available via ANDROID_HOME or ANDROID_SDK_ROOT
if [ -z "$ANDROID_HOME" ] && [ -z "$ANDROID_SDK_ROOT" ]; then
    echo "Warning: ANDROID_HOME or ANDROID_SDK_ROOT environment variable not set."
    echo "You may need to set this to point to your Android SDK location."
    echo
fi

# Build the APK
if [ -f "./gradlew" ]; then
    chmod +x ./gradlew
    ./gradlew assembleRelease
else
    echo "Error: Gradle wrapper not found. Please run 'npx expo prebuild -p android' first."
    exit 1
fi

# Check if build was successful
if [ $? -eq 0 ]; then
    APK_PATH="./app/build/outputs/apk/release/app-release.apk"
    if [ -f "$APK_PATH" ]; then
        echo
        echo "Build Successful! APK is located at:"
        echo "$PWD/$APK_PATH"
        echo
        echo "To install on your device:"
        echo "1. Connect your Android device via USB with USB debugging enabled"
        echo "2. Run: adb install $APK_PATH"
        echo
        echo "Or transfer the APK to your device and install it directly."
    else
        echo "Build completed but APK not found at expected location."
    fi
else
    echo "Build failed. See error messages above."
fi

cd ..
echo "Build process complete."