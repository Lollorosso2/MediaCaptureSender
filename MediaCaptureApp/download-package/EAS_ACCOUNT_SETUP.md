# Expo Account Setup for iOS and Android Builds

This guide walks you through setting up your Expo account and configuring the Media Capture App for successful builds on both iOS and Android platforms.

## 1. Create an Expo Account

If you don't already have an Expo account:

1. Go to [https://expo.dev/signup](https://expo.dev/signup)
2. Create a new account (or sign in if you already have one)
3. Remember your username - you'll need it for configuration

## 2. Install the EAS CLI

```bash
npm install -g eas-cli
```

## 3. Log in to your Expo account

```bash
eas login
```

## 4. Configure the App.json file

Edit the `app.json` file and replace `"owner": "your-expo-account"` with your actual Expo username:

```json
{
  "expo": {
    "owner": "your-actual-username", 
    // other configurations...
  }
}
```

## 5. Initialize EAS Project and Build

First, initialize your EAS project to get a project ID:

```bash
eas init
```

This command will:
1. Create a project on Expo's servers
2. Generate a unique project ID
3. Update your app.json with this project ID

After initialization, configure your build:

```bash
eas build:configure
```

This command will guide you through setting up the build configuration for both iOS and Android.

> **Important:** After running `eas init`, you must update your app.json file with the correct projectId that was generated. Look for the `"extra": { "eas": { "projectId": "your-project-id" } }` section in app.json and replace "your-project-id" with the actual ID provided by the `eas init` command.

## 6. Configure iOS Specific Settings

For iOS builds, you'll need an Apple Developer account ($99/year). After getting one:

1. Configure your iOS credentials:
   ```bash
   eas credentials
   ```

2. Follow the interactive prompts to set up:
   - App Store Connect API Key (recommended)
   - Or Apple ID authentication
   - Provisioning profiles and certificates

## 7. Building for iOS

To build for iOS simulator (development):
```bash
eas build -p ios --profile simulator
```

To build for iOS devices (internal testing):
```bash
eas build -p ios --profile preview
```

To build for App Store submission:
```bash
eas build -p ios --profile production
```

## 8. Building for Android

To build an APK for testing:
```bash
eas build -p android --profile preview
```

To build an AAB for Play Store:
```bash
eas build -p android --profile production
```

## 9. Common Error Solutions

### Error: "The owner manifest property is required"
- Make sure you've set the correct owner in app.json
- Ensure you're logged in with `eas login`

### Error: "The extra.eas.projectId field is missing from your app config"
- Run `eas init` to generate a project ID
- Make sure the projectId is correctly set in your app.json file
- If you're using a pre-existing project, you can find your project ID in the Expo dashboard

### Error: "EAS project not configured"
- Run `eas init` to initialize your project
- Make sure you're logged in with `eas login`

### Error: "App Version Source not set"
- This is already configured in your app.json with "appVersionSource": "remote"

### Error: "iOS build fails with missing certificates"
- Run `eas credentials` to manage your iOS credentials
- Let EAS manage your credentials automatically (recommended for beginners)

### Error: "Failed to authenticate with Apple"
- Make sure your Apple Developer account is active
- Check that your Apple ID credentials are correct
- Verify that you have appropriate Apple Developer Program membership

## 10. Submitting to App Stores

For iOS:
```bash
eas submit -p ios --latest
```

For Android:
```bash
eas submit -p android --latest
```

## Need Help?

- Expo Documentation: [https://docs.expo.dev/](https://docs.expo.dev/)
- EAS Build Documentation: [https://docs.expo.dev/build/introduction/](https://docs.expo.dev/build/introduction/)
- EAS Submit Documentation: [https://docs.expo.dev/submit/introduction/](https://docs.expo.dev/submit/introduction/)