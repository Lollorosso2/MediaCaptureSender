# Media Capture App - Android Installation Guide

This guide provides detailed instructions on how to install the Media Capture App on your Android device.

## Method 1: Using Expo Go (Quickest Method)

The simplest way to run the app on your device is using Expo Go:

1. **Install Expo Go** on your Android device from the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Download and Extract the Package**:
   - Download the `MediaCaptureApp-package.zip` file from this Replit project
   - Extract the ZIP file to a folder on your computer

3. **Install Dependencies and Start the Development Server**:
   ```bash
   cd MediaCaptureApp
   npm install
   npm start
   ```

4. **Connect Your Device**:
   - A QR code will appear in your terminal
   - Open Expo Go on your Android device
   - Scan the QR code with the Expo Go app
   - The app will load and run on your device

## Method 2: Building a Standalone APK (Full Installation)

To create a standalone APK that can be installed directly on Android:

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- A free Expo account (sign up at https://expo.dev/signup)
- Android Studio (for SDK tools)

### Step 1: Set up Expo Account and EAS CLI
1. Create an Expo account if you don't have one
2. Install EAS CLI globally:
   ```bash
   npm install -g eas-cli
   ```
3. Log in to your Expo account:
   ```bash
   eas login
   ```

### Step 2: Configure and Build
1. Extract the `MediaCaptureApp-package.zip` file
2. Navigate to the project directory:
   ```bash
   cd MediaCaptureApp
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the APK:
   ```bash
   # For development build
   eas build -p android --profile development
   
   # For production build
   eas build -p android --profile production
   ```
5. Wait for the build to complete (this may take several minutes)
6. EAS will provide a download link to your APK file when the build is complete

### Step 3: Install on Device
1. Download the APK file from the link provided by EAS
2. Transfer the APK to your Android device
3. On your Android device, navigate to the APK file and tap to install
   - You may need to enable "Install from Unknown Sources" in your device settings

## Method 3: Using the Included Build Scripts

The package includes convenience scripts to simplify the build process:

1. Extract the `MediaCaptureApp-package.zip` file
2. Navigate to the project directory
3. Run the build script:
   ```bash
   # For a quick development build
   sh build-apk.sh
   
   # For a full production build
   sh build-android.sh
   ```
4. Follow the prompts to complete the build
5. The script will provide a download link to your APK when complete

## Troubleshooting

- **QR Code Scanning Issues**: Ensure your phone and computer are on the same Wi-Fi network
- **Build Errors**: Check that you have the latest Node.js and npm versions
- **Installation Blocked**: Enable "Install from Unknown Sources" in your device settings
- **Expo Account Issues**: Verify your credentials at https://expo.dev/accounts

For additional help, refer to the Expo documentation at https://docs.expo.dev/build/setup/