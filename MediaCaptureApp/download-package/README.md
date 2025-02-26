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

## Building for iOS and Android

Before building, you'll need to set up your Expo account and configure the application. See our [EAS Account Setup Guide](./EAS_ACCOUNT_SETUP.md) for detailed instructions.

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

## Building for iOS

To build the app for iOS, you'll need an Apple Developer account. There are several ways to build for iOS:

### Method 1: Using Expo Go (Development Only)

1. Install Expo Go from the App Store on your iOS device
2. Run the development server:
```bash
npm start
```
3. Scan the QR code with the iOS Camera app
4. The app will open in Expo Go

### Method 2: Using Expo EAS Build (Recommended)

1. Set up your Apple Developer account and Expo account (see [EAS Account Setup Guide](./EAS_ACCOUNT_SETUP.md))
2. Install EAS CLI:
```bash
npm install -g eas-cli
```
3. Log in to your Expo account:
```bash
eas login
```
4. Build for iOS simulator:
```bash
eas build -p ios --profile simulator
```
5. Build for iOS devices:
```bash
eas build -p ios --profile preview
```
6. Build for App Store:
```bash
eas build -p ios --profile production
```

### Method 3: Submit to App Store

When you're ready to publish:
```bash
eas submit -p ios --latest
```

## Detailed Installation Guides

- [EAS Account Setup Guide](./EAS_ACCOUNT_SETUP.md) - Set up your Expo account for iOS and Android builds
- [Android Installation Detailed Guide](./ANDROID_INSTALLATION_DETAILED.md) - Comprehensive instructions for all installation methods
- [EAS Build Guide](./EAS_BUILD_GUIDE.md) - Step-by-step guide for building with Expo Application Services
- [EAS Git Instructions](./EAS_GIT_INSTRUCTIONS.md) - Important steps to set up Git for EAS Build
- [GitHub EAS Guide](./GITHUB_EAS_GUIDE.md) - How to build from your GitHub repository

## Building from GitHub

You can also build this app directly from a GitHub repository using Expo's GitHub integration:

1. Push this code to your GitHub repository
2. Connect your Expo account to GitHub
3. Create a new project in Expo Dashboard from your GitHub repo
4. Start a build from the Expo Dashboard or using the included GitHub Actions workflow

For detailed instructions, see our [GitHub EAS Guide](./GITHUB_EAS_GUIDE.md).

## Project Structure

```
MediaCaptureApp/
├── src/                       # Source code
│   ├── components/            # UI components
│   ├── navigation/            # Navigation config
│   ├── utils/                 # Utility functions
│   └── assets/                # App assets
├── .github/                   # GitHub integration
│   └── workflows/             # GitHub Actions workflows
│       └── eas-build.yml      # EAS build workflow
├── app.json                   # Expo configuration
├── eas.json                   # EAS Build configuration
├── EAS_ACCOUNT_SETUP.md       # Expo account setup guide
├── EAS_BUILD_GUIDE.md         # EAS build guide
├── EAS_GIT_INSTRUCTIONS.md    # Git setup for EAS
├── GITHUB_EAS_GUIDE.md        # GitHub integration guide
├── ANDROID_INSTALLATION_DETAILED.md # Android installation guide
├── build-android.sh           # Android build script
├── build-apk.sh               # APK build script
├── simple-build.js            # Web build script
└── dist/                      # Build output directory
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

## Recent Updates

- Fixed API implementation by replacing axios with native fetch API for better compatibility
- Fixed Android build issue with missing splash screen resource
- Improved error handling in network requests
- Updated dependency management for better build stability

## Troubleshooting

If you encounter issues:

- Make sure your Android device allows installation from unknown sources
- Check that you have the correct JDK version (17+) installed for local builds
- For Expo builds, ensure you're logged in to your Expo account
- If using the development build, make sure your device and computer are on the same network
- For iOS builds, verify your Apple Developer account is active and properly configured
- For errors about "owner" or "appVersionSource", refer to the [EAS Account Setup Guide](./EAS_ACCOUNT_SETUP.md)
- For the "resource splashscreen_background not found" error, ensure the Android colors.xml file exists in values folder

For more detailed troubleshooting:
- Android issues: [Android Installation Guide](./ANDROID_INSTALLATION_DETAILED.md#troubleshooting-common-issues)
- iOS and Expo issues: [EAS Account Setup Guide](./EAS_ACCOUNT_SETUP.md#common-error-solutions)