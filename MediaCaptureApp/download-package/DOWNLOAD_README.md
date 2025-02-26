# Media Capture App - Downloaded Package

This is the complete package for building the Media Capture App on your local machine.

## Getting Started

1. Extract all files from this ZIP archive to a folder on your computer
2. Open a terminal/command prompt and navigate to the extracted folder
3. Install dependencies:
   ```
   npm install
   ```

## Building for Android and iOS

Follow the instructions in one of these guides:

- `QUICK_INSTALL.md` - Quickest way to run the app (using Expo Go)
- `EAS_ACCOUNT_SETUP.md` - Set up your Expo account for EAS builds (including iOS)
- `EAS_BUILD_GUIDE.md` - Build a standalone APK/IPA using Expo Application Services (recommended)
- `EAS_GIT_INSTRUCTIONS.md` - Important steps to set up Git for EAS Build
- `GITHUB_EAS_GUIDE.md` - How to build from your GitHub repository
- `ANDROID_INSTALLATION_DETAILED.md` - Comprehensive installation guide with all methods

## Web Version

To build and run the web version:
```
npm run build:simple
npx serve -s dist
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

## Requirements

- Node.js (v18 or newer)
- npm (v9 or newer)
- Git (required for EAS builds)
- For EAS builds: An Expo account (free to create)
- For local Android builds: Android SDK and JDK 17+
