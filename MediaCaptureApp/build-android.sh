#!/bin/bash

echo "===== Building Android APK for MediaCaptureApp ====="
echo "1. Cleaning up previous builds..."
rm -rf dist

echo "2. Creating EAS build configuration..."
cat > eas.json << 'EOL'
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
EOL

echo "3. Installing EAS CLI (if not installed)..."
npm install -g eas-cli

echo "4. Building Android APK (local development build)..."
mkdir -p dist
npx expo prebuild --clean
npx expo export --platform android
npx expo export:embed --platform android
cd android
./gradlew assembleDebug

echo "5. Moving APK to 'dist' folder..."
mkdir -p ../dist
cp app/build/outputs/apk/debug/app-debug.apk ../dist/MediaCaptureApp.apk
cd ..

echo "===== Build completed! ====="
echo "Your APK is located at: dist/MediaCaptureApp.apk"
echo "Install it on your Android device by transferring this file and opening it."