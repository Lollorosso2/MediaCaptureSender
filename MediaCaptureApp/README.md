# Media Capture App

A cross-platform application for capturing, previewing, and uploading photos and videos. Built with React Native and Expo for iOS, Android, and web.

## Features

- Photo and video capture with device camera
- Media preview with upload functionality
- Configurable webhook endpoint for uploads
- Settings for quality and auto-upload preferences
- Compatible with Android, iOS, and web browsers

## Building and Installing the Android APK

### Method 1: Using the build script

1. Make sure you have JDK 11 or newer installed
2. Clone the repository and navigate to the project directory
3. Run the build script:
```
cd MediaCaptureApp
./build-android.sh
```
4. Find the APK in the `dist` directory
5. Transfer the APK to your Android device and install it

### Method 2: Using Expo EAS Build

1. Install EAS CLI:
```
npm install -g eas-cli
```

2. Log in to your Expo account:
```
eas login
```

3. Configure the build:
```
eas build:configure
```

4. Build the APK:
```
eas build -p android --profile preview
```

5. Follow the prompts and download the APK when the build completes

### Method 3: Using Expo Development Build

1. Install Expo Go on your Android device from the Play Store
2. Run the development server:
```
npm start
```
3. Scan the QR code with the Expo Go app on your device

## Manually Installing the APK

1. Transfer the APK file to your Android device
2. On your device, open the file manager and navigate to the APK
3. Tap the APK file and follow the prompts to install
4. You might need to enable "Install from Unknown Sources" in your device settings

## Troubleshooting

If you encounter issues:

- Make sure your Android device allows installation from unknown sources
- Check that you have the correct JDK version installed
- For Expo builds, ensure you're logged in to your Expo account
- If using the development build, make sure your device and computer are on the same network

## Development

- `npm start` - Start the development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser