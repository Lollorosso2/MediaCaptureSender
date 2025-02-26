# Quick Installation Guide - Media Capture App

## Install Using Expo Go (5 Minutes)

1. **On your Android device**: Install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) from Google Play Store

2. **On your computer**:
   - Download `MediaCaptureApp-package.zip` from this Replit project
   - Extract the ZIP file
   - Open a terminal in the extracted folder
   - Run:
     ```
     npm install
     npm start
     ```
   - A QR code will appear in your terminal

3. **On your Android device**:
   - Open Expo Go app
   - Tap "Scan QR Code"
   - Scan the QR code from your computer screen
   - The app will load on your device

## Build a Standalone APK (30 Minutes)

1. **Setup** (one-time only):
   - Install Node.js on your computer
   - Create a free account at [expo.dev](https://expo.dev/signup)
   - Run: `npm install -g eas-cli`
   - Run: `eas login` (enter your Expo credentials)

2. **Build**:
   - Extract `MediaCaptureApp-package.zip`
   - Open terminal in the extracted folder
   - Run: `sh build-apk.sh`
   - Follow the prompts
   - EAS will provide a download link when complete

3. **Install**:
   - Download the APK from the provided link
   - Transfer to your Android device
   - Tap the APK file on your device to install

## Need Help?

See the detailed `ANDROID_INSTALLATION_GUIDE.md` for comprehensive instructions.