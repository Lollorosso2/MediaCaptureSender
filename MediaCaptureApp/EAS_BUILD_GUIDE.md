# Building a Standalone APK with EAS

This guide will walk you through the process of building a standalone APK for your Android device using Expo Application Services (EAS).

## Prerequisites

1. An Expo account (free to create at [expo.dev](https://expo.dev))
2. Node.js and npm installed on your computer
3. Your Android device (for testing the APK)

## Step 1: Install EAS CLI

The EAS CLI (Command Line Interface) is a tool that helps you build and submit your app.

```bash
npm install -g eas-cli
```

## Step 2: Log in to your Expo account

```bash
eas login
```

Enter your Expo account credentials when prompted.

## Step 3: Configure your build

Our project already has the necessary configuration in `eas.json` and `app.json`, but here's what those configurations mean:

- **eas.json**: Defines build profiles (development, preview, production)
- **app.json**: Contains app metadata and platform-specific settings

## Step 4: Build your APK

To build a preview APK (good for testing):

```bash
eas build -p android --profile preview
```

This will:
1. Upload your project to the EAS servers
2. Build your APK in the cloud
3. Provide a link to download the APK when complete

## Step 5: Monitor the build

After starting the build, you'll see a URL to monitor its progress. The build typically takes 10-15 minutes.

## Step 6: Download and install the APK

When the build completes:

1. Download the APK from the provided link
2. Transfer it to your Android device
3. On your Android device, enable "Install from Unknown Sources" in Settings
4. Open the APK file to install

## Troubleshooting

- **Build Errors**: Check logs on the EAS build page for specific errors
- **Installation Issues**: Make sure "Install from Unknown Sources" is enabled
- **App Crashes**: Check for issues with dependencies and permissions

## Additional Options

### Building for Production

For a production-ready AAB (Android App Bundle):

```bash
eas build -p android --profile production
```

### Updating Your App

When you make changes:

1. Update the version in app.json
2. Run the build command again

## EAS Build Advantages

- No need to set up Android SDK tools locally
- Consistent build environment
- Automated certificate and keystore management
- Simple versioning and updates

For more information, visit [Expo's EAS documentation](https://docs.expo.dev/build/introduction/).