# EAS Build Guide for Media Capture App

This guide explains how to build the Media Capture App for Android and iOS using Expo Application Services (EAS).

## Prerequisites

- Node.js (v18 or newer)
- npm (v9 or newer)
- An Expo account (see `EAS_ACCOUNT_SETUP.md`)
- Git installed (see `EAS_GIT_INSTRUCTIONS.md`)
- For iOS builds: An Apple Developer account

## Building for Android

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Install EAS CLI**

   ```bash
   npm install -g eas-cli
   ```

3. **Log in to your Expo account**

   ```bash
   eas login
   ```

4. **Build an APK (Preview build)**

   ```bash
   eas build -p android --profile preview
   ```

   This will:
   - Upload your project to EAS Build
   - Build an Android APK
   - Provide a download link when complete

5. **Build an AAB (Production build)**

   ```bash
   eas build -p android --profile production
   ```

   This produces an app bundle suitable for Google Play Store submission.

## Building for iOS

1. **Configure your Apple Developer account**

   ```bash
   eas credentials
   ```

   Follow the prompts to set up your Apple credentials.

2. **Build for iOS simulators**

   ```bash
   eas build -p ios --profile simulator
   ```

   This creates a build for testing in iOS simulator.

3. **Build for iOS devices (Production)**

   ```bash
   eas build -p ios --profile production
   ```

   This process:
   - Requires an Apple Developer account
   - May require registering your app's bundle identifier
   - Creates a signed IPA file for TestFlight or App Store submission

## Troubleshooting

- **Credentials errors**: Run `eas credentials` to manage app credentials
- **Build failures**: Check the build logs in the Expo dashboard or CLI output
- **Git issues**: Ensure your project is in a Git repository with a clean working tree
- **App versioning**: Update the version in app.json before creating production builds

For more detailed information, visit [Expo's EAS Build documentation](https://docs.expo.dev/build/introduction/).