# Media Capture App - Android Installation Guide

This guide provides detailed instructions for installing the Media Capture App on your Android device using different methods.

## Method 1: Using Expo Go (Easiest, for Testing)

The quickest way to test the app on your device is through the Expo Go app.

### Steps:

1. **Install Expo Go from Google Play Store**
   - Open Google Play Store on your Android device
   - Search for "Expo Go" and install it
   - Open Expo Go and create a free account (or sign in)

2. **Run the Media Capture App in development mode**
   - On your development computer, navigate to the Media Capture App directory
   - Run: `npm start`
   - A QR code will appear in your terminal

3. **Connect your device**
   - Open Expo Go on your Android device
   - Tap "Scan QR Code" and scan the QR code from your terminal
   - The app will load and run inside Expo Go

### Advantages:
- No build process needed
- Immediate testing
- Easy updates (just restart the development server)

### Limitations:
- Requires internet connection
- Runs within Expo Go rather than as a standalone app
- Some features might have limitations

## Method 2: EAS Build - Standalone APK (Recommended)

This method creates a standalone APK that you can install on your device.

### Steps:

1. **Create an Expo account**
   - Visit [expo.dev](https://expo.dev) and create a free account

2. **Install EAS CLI**
   - On your development computer, run: `npm install -g eas-cli`

3. **Log in to Expo**
   - Run: `eas login`
   - Enter your Expo credentials

4. **Build the APK**
   - Run: `eas build -p android --profile preview`
   - Follow the prompts
   - This will start a build process on Expo's servers

5. **Monitor and download the build**
   - EAS will provide a URL to monitor build progress
   - When complete (10-15 minutes), download the APK

6. **Install on your device**
   - Transfer the APK to your Android device (via email, cloud storage, etc.)
   - On your device, go to Settings > Security
   - Enable "Install from Unknown Sources"
   - Navigate to the APK file and tap to install

### Advantages:
- Professional build process
- Standalone app (no need for Expo Go)
- Properly signed APK
- No local Android development setup required

### Limitations:
- Requires Expo account
- Build process takes time
- Limited builds on free tier

## Method 3: Local Build (Advanced)

For developers with Android SDK installed, you can build locally.

### Prerequisites:
- Android Studio installed
- Android SDK configured
- Java Development Kit (JDK) installed

### Steps:

1. **Configure local environment**
   - Set up ANDROID_HOME environment variable
   - Add platform-tools to your PATH

2. **Run the build script**
   - Execute: `./build-android.sh`
   - This will generate an APK in the android/app/build/outputs/apk directory

3. **Install on device**
   - Transfer and install as described in Method 2, Step 6

### Advantages:
- Full control over build process
- No dependency on external services
- Customize build parameters

### Limitations:
- Complex setup required
- Potential compatibility issues
- Manual certificate management

## Troubleshooting Common Issues

### App Installation Failed
- Make sure "Install from Unknown Sources" is enabled
- Check that your Android version is compatible (Android 5.0+)
- Verify you have enough storage space

### App Crashes on Start
- Check that you've granted all required permissions
- Ensure your device meets minimum requirements
- Try uninstalling and reinstalling

### Can't Connect with Expo Go
- Verify both devices are on the same network
- Check firewall settings
- Try using a tunnel connection: `npm start -- --tunnel`

## Need More Help?

If you encounter issues not covered in this guide, please:
- Check the [Expo documentation](https://docs.expo.dev/)
- Visit [Expo Forums](https://forums.expo.dev/)
- Contact the app developer for specific assistance