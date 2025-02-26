# Media Capture App

A cross-platform application for capturing, previewing, and uploading photos and videos. Built with React Native and Expo for iOS, Android, and web.

## Features

- Photo and video capture with device camera
- Media preview with upload functionality
- Configurable webhook endpoint for uploads
- Settings for quality and auto-upload preferences
- Compatible with Android, iOS, and web browsers

## Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Build for web
npm run build:simple

# Start the web server
npx serve -s dist
```

## Building and Installing the Android APK

We provide multiple methods to build and install the app on your Android device, with detailed guides for each approach.

### Method 1: Using Expo Go (Easiest, for Testing)

1. Install Expo Go from the Google Play Store on your Android device
2. Run the development server:
```bash
npm start
```
3. Scan the QR code with the Expo Go app
4. The app will run directly within Expo Go

### Method 2: Using Expo EAS Build (Recommended)

This is the most reliable method for generating a standalone APK without complex setup.

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Log in to your Expo account:
```bash
eas login
```

3. Build the APK:
```bash
eas build -p android --profile preview
```

4. Follow the prompts and download the APK when the build completes

For a detailed walkthrough, see our [EAS Build Guide](./EAS_BUILD_GUIDE.md).

### Method 3: Using Local Build Scripts

For developers with Android SDK installed, you can build locally.

```bash
# Build using the standard Android build process
./build-android.sh

# Alternative simplified build method
./build-apk.sh
```

## Web Version

The app is also available as a web application, which can be built and deployed.

```bash
# Build the web version
npm run build:simple

# Serve the web version
npx serve -s dist
```

## Detailed Installation Guides

- [Android Installation Detailed Guide](./ANDROID_INSTALLATION_DETAILED.md) - Comprehensive instructions for all installation methods
- [EAS Build Guide](./EAS_BUILD_GUIDE.md) - Step-by-step guide for building with Expo Application Services

## Project Structure

```
MediaCaptureApp/
├── src/                   # Source code
│   ├── components/        # UI components
│   ├── navigation/        # Navigation config
│   ├── utils/             # Utility functions
│   └── assets/            # App assets
├── app.json               # Expo configuration
├── eas.json               # EAS Build configuration
├── build-android.sh       # Android build script
├── build-apk.sh           # APK build script
├── simple-build.js        # Web build script
└── dist/                  # Build output directory
```

## Available Scripts

- `npm start` - Start the development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser
- `npm run build:android` - Build for Android using local script
- `npm run build:apk` - Build APK using simplified script
- `npm run build:expo` - Build using Expo's build service
- `npm run build:simple` - Build for web deployment

## Troubleshooting

If you encounter issues:

- Make sure your Android device allows installation from unknown sources
- Check that you have the correct JDK version (11+) installed for local builds
- For Expo builds, ensure you're logged in to your Expo account
- If using the development build, make sure your device and computer are on the same network

For more detailed troubleshooting, see our [Android Installation Guide](./ANDROID_INSTALLATION_DETAILED.md#troubleshooting-common-issues).