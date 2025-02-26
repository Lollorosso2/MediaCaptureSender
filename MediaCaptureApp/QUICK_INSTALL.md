# Quick Install Guide for Media Capture App

This guide provides the fastest way to get the Media Capture App running on your Android device without building an APK or creating an Expo account.

## Install via Expo Go (5 minutes)

### Step 1: Install Expo Go on your Android device

1. Open the Google Play Store on your Android device
2. Search for "Expo Go"
3. Install the Expo Go app
4. Open the app when installation completes

### Step 2: Run the Media Capture App on your development machine

1. Open a terminal/command prompt
2. Navigate to the Media Capture App directory
3. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. A QR code will appear in the terminal

### Step 3: Connect your Android device

1. Make sure your Android device and development computer are on the same WiFi network
2. Open the Expo Go app on your Android device
3. Tap "Scan QR Code" at the bottom of the screen
4. Scan the QR code shown in your terminal
5. The app will load and run automatically

### Step 4: Use the app

The Media Capture App will now run within Expo Go. You can:
- Capture photos and videos
- Preview and upload media
- Configure app settings

Each time you want to use the app, simply repeat steps 2-3.

## Notes

- This method runs the app within Expo Go rather than as a standalone app
- No Expo account is required for this quick install method
- Your device must be on the same network as your development computer
- If you want a standalone app, see the [EAS Build Guide](./EAS_BUILD_GUIDE.md)

## Troubleshooting

- **"Can't connect to development server"**: Ensure both devices are on the same network
- **Scanner can't read QR code**: Enter the URL manually by tapping "Enter URL manually"
- **Camera/microphone not working**: Grant all permissions when prompted
- **App loads slowly**: This is normal for the first load; subsequent loads will be faster