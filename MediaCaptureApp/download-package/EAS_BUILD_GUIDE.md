# EAS Build Guide for Media Capture App

This guide will walk you through building a standalone APK for the Media Capture App using Expo's EAS Build service.

## Prerequisites

- Node.js (v14 or newer)
- npm (v6 or newer)
- An Expo account (free to create)
- Internet connection

## Step 1: Set Up Your Environment

1. Install the EAS CLI globally:
   ```
   npm install -g eas-cli
   ```

2. Log in to your Expo account:
   ```
   eas login
   ```

   If you don't have an Expo account, create one at [expo.dev](https://expo.dev).

## Step 2: Configure Your Project

1. In your project directory, install dependencies:
   ```
   npm install
   ```

2. The project already includes an `eas.json` file configured for Android builds.

## Step 3: Build the APK

### Option A: Internal Distribution (fastest)

This creates a development build that can be installed directly on your device:

```
eas build -p android --profile preview
```

### Option B: Production Build

This creates a production-ready APK:

```
eas build -p android --profile production
```

## Step 4: Install the APK

1. After the build completes, EAS will provide a URL where you can download the APK
2. Open the URL on your device or download to your computer and transfer to your device
3. On your Android device, tap the APK file to install (you may need to enable "Install from Unknown Sources" in Settings)

## Build Configurations

The `eas.json` file contains these build profiles:

- **preview**: Faster development build for testing
- **production**: Optimized build for distribution

## Troubleshooting

- **Build fails with credential errors**: Run `eas credentials` to manage your credentials
- **Can't install APK**: Make sure "Install from Unknown Sources" is enabled in your device settings
- **Camera not working**: Check that your app has the proper permissions in the Android manifest

## Additional Resources

- [Expo EAS Documentation](https://docs.expo.dev/build/introduction/)
- [Android App Signing](https://docs.expo.dev/app-signing/app-credentials/)
- [Expo Development Client](https://docs.expo.dev/clients/introduction/)