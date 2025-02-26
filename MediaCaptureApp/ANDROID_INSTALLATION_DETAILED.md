# Detailed Android Installation Guide for Media Capture App

This comprehensive guide covers all installation methods for the Media Capture App on Android devices.

## Table of Contents

1. [Installation Method 1: Using Expo Go](#method-1-using-expo-go)
2. [Installation Method 2: Standalone APK with EAS Build](#method-2-standalone-apk-with-eas-build)
3. [Installation Method 3: Local Development Build](#method-3-local-development-build)
4. [Installation Method 4: Custom APK Build](#method-4-custom-apk-build)
5. [Troubleshooting](#troubleshooting)

---

## Method 1: Using Expo Go

This is the fastest method to get the app running on your device, ideal for testing and development.

### Prerequisites
- Android device with Google Play Store
- Internet connection
- [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) app installed

### Steps

1. **Install Expo Go**:
   - Download and install "Expo Go" from the Google Play Store

2. **Run the app**:
   - **Option A - Using a developer's QR code**:
     - Open Expo Go app
     - Tap "Scan QR Code"
     - Scan the QR code provided by your developer
   
   - **Option B - Using the source code**:
     - Install Node.js and npm on your computer
     - Clone or download the app source code
     - Open a terminal in the project folder
     - Run:
       ```
       npm install
       npm start
       ```
     - Scan the QR code that appears in your terminal

3. **Configure the app**:
   - Once the app is running, go to Settings
   - Enter your webhook URL and configure other settings

### Pros & Cons

✅ **Pros**:
- Fastest setup (under 5 minutes)
- No build process required
- Immediate updates when code changes

❌ **Cons**:
- Requires Expo Go app
- Some limitations on native features
- Not suitable for distribution to end users

---

## Method 2: Standalone APK with EAS Build

Build a standalone APK that can be installed without Expo Go. This is the recommended method for production deployment.

### Prerequisites
- Expo account (free at [expo.dev](https://expo.dev))
- Node.js and npm installed
- EAS CLI installed (`npm install -g eas-cli`)

### Steps

1. **Set up environment**:
   ```
   npm install -g eas-cli
   eas login
   ```

2. **Configure the project**:
   - The project already includes an `eas.json` file with build profiles
   - If needed, adjust build settings in this file

3. **Build the APK**:
   ```
   eas build -p android --profile preview
   ```
   
   For production:
   ```
   eas build -p android --profile production
   ```

4. **Install the APK**:
   - When the build completes, EAS provides a download URL
   - Download the APK and install on your device

### Pros & Cons

✅ **Pros**:
- Professional, standalone app
- No dependency on Expo Go
- Full access to native features
- Suitable for distribution to end users

❌ **Cons**:
- Requires Expo account
- Build process takes 15-30 minutes
- More complex than using Expo Go

---

## Method 3: Local Development Build

Run the app in development mode with live reloading.

### Prerequisites
- Android SDK installed
- Node.js and npm installed
- Android device with USB debugging enabled or Android emulator

### Steps

1. **Install dependencies**:
   ```
   npm install
   ```

2. **Run in development mode**:
   ```
   npm run android
   ```

3. **Using the dev build**:
   - The app will automatically install and launch on your connected device/emulator
   - Changes to the code will trigger automatic reloads

### Pros & Cons

✅ **Pros**:
- Live reloading of code changes
- Full developer tooling and debugging
- Direct access to logs and device

❌ **Cons**:
- Requires Android SDK setup
- More complex environment configuration
- For development purposes only

---

## Method 4: Custom APK Build

Use the included build scripts to create a custom APK.

### Prerequisites
- Android SDK installed
- Java JDK 17 or newer (required for Expo SDK 50+)
- Node.js and npm installed

### Steps

1. **Prepare the environment**:
   - Install all dependencies: `npm install`
   - Make sure build scripts are executable: `chmod +x build-apk.sh`

2. **Run the build script**:
   ```
   ./build-apk.sh
   ```

3. **Install the APK**:
   - Find the APK in the `android/app/build/outputs/apk/release` directory
   - Transfer to your device and install

### Pros & Cons

✅ **Pros**:
- Full control over build process
- No dependency on external build services
- Can customize Android manifest and settings

❌ **Cons**:
- Most complex setup
- Requires Android development environment
- Manual configuration of signing keys

---

## Troubleshooting

### Camera/Microphone Access Issues
- Go to Android Settings > Apps > Media Capture App > Permissions
- Ensure Camera and Microphone permissions are granted

### Installation "App Not Installed" Error
- If installing an APK fails with "App not installed", try:
  - Uninstall any previous version
  - Enable "Install from Unknown Sources" in settings
  - Check if your device has enough storage space

### Expo Go Connection Issues
- Ensure your phone and computer are on the same WiFi network
- Try using a mobile hotspot if network restrictions are in place
- Use "Tunnel" connection mode in Expo developer tools

### Build Errors
- For EAS build errors, check the logs in the Expo dashboard
- For local build errors, ensure Android SDK and JDK are properly configured
- Try cleaning the project: `cd android && ./gradlew clean`

### APK Size Issues
- Production builds are optimized for size
- If APK is too large, consider using App Bundle format instead

### Need More Help?
For specific issues not covered here, consult the [Expo documentation](https://docs.expo.dev/) or raise an issue in the project repository.

### Google Play Store Compatibility
This app now uses Expo SDK 50+ which targets Android API level 34, meeting Google Play Store requirements effective August 31, 2024. If you're building for Google Play Store submission, no additional configuration is needed for API level compatibility.