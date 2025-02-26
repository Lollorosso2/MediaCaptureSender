#!/bin/bash

echo "===== Building Android APK for MediaCaptureApp ====="
echo "1. Cleaning up previous builds..."
rm -rf dist

echo "2. Creating EAS build configuration..."
cat > eas.json << 'EOL'
{
  "cli": {
    "version": ">= 5.9.1",
    "appVersionSource": "remote"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": {
        "APP_ENV": "development"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "env": {
        "APP_ENV": "preview"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      },
      "env": {
        "APP_ENV": "production"
      }
    },
    "local": {
      "android": {
        "buildType": "apk",
        "distribution": "internal",
        "gradleCommand": ":app:assembleRelease",
        "withoutCredentials": true
      },
      "env": {
        "APP_ENV": "preview"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
EOL

echo "3. Installing EAS CLI (if not installed)..."
npm install -g eas-cli

echo "4. Building Android APK (local development build)..."
mkdir -p dist
npx expo prebuild --clean
npx expo export --platform android --output=dist/export
cd android
./gradlew assembleDebug

echo "5. Moving APK to 'dist' folder..."
mkdir -p ../dist
cp app/build/outputs/apk/debug/app-debug.apk ../dist/MediaCaptureApp.apk
cd ..

echo "===== Build completed! ====="
echo "Your APK is located at: dist/MediaCaptureApp.apk"
echo "Install it on your Android device by transferring this file and opening it."
echo "Note: This APK targets Android API Level 34 to comply with Google Play Store requirements effective August 2024."