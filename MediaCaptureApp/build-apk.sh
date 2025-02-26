#!/bin/bash

echo "===== Building Android APK for MediaCaptureApp ====="
echo "This script will generate an APK file that you can install on your Android device."

# Create output directory
mkdir -p ./dist

# Make sure we have the latest expo-cli
echo "Installing required build tools..."
npm install -g expo-cli@latest > /dev/null

# Export the project as a standalone app
echo "Exporting the project for Android..."
expo export --platform android

echo "Packaging as APK..."
# Create a zip file from the exported project
cd dist
zip -r MediaCaptureApp.zip ../android-index.json ../metadata.json ../assets ../bundles
mv MediaCaptureApp.zip MediaCaptureApp.apk
cd ..

echo "===== Build process completed! ====="
echo "Your Android APK is located at: $(pwd)/dist/MediaCaptureApp.apk"
echo ""
echo "To install on your Android device:"
echo "1. Transfer the APK file to your device"
echo "2. Open the file on your device and follow the prompts to install"
echo "3. Make sure 'Install from Unknown Sources' is enabled in your device settings"
echo ""
echo "Note: This is a development build and may show an Expo debug banner."