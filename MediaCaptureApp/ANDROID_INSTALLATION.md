# Getting Media Capture App on Your Android Phone

There are multiple ways to get the Media Capture App on your Android device. Choose the method that works best for you:

## Option 1: Using Expo Go (Easiest, No APK needed)

If you just want to use the app without installing an APK file:

1. Install the "Expo Go" app from the Google Play Store on your Android phone
2. Open the Expo Go app and sign in (or create an account)
3. Scan the QR code provided by the app developer
4. The app will run directly in your Expo Go app

**Pros:** Instant access, no build process required
**Cons:** Requires internet connection, runs within Expo Go app

## Option 2: Download Pre-built APK (Easy)

If the developer has already built an APK for you:

1. Download the APK file to your Android phone
2. Enable "Install from Unknown Sources" in your device settings
3. Open the downloaded APK file and follow the installation prompts

**Pros:** Simple installation, standalone app
**Cons:** Requires APK file from developer

## Option 3: Build APK From Source (Advanced)

If you have access to the source code and want to build your own APK:

1. Clone the repository
2. Navigate to the MediaCaptureApp directory
3. Run one of the following build scripts:

```bash
# Quick APK build (simplest)
npm run build:apk

# Using Expo's build service (requires Expo account)
npm run build:expo
```

4. Transfer the resulting APK to your Android device and install it

**Pros:** Full control, latest version
**Cons:** Requires development knowledge, more complex

## Tips for Installing APKs

* When installing APKs from "unknown sources," you may need to:
  * Go to Settings > Security > Install Unknown Apps
  * Select the app you're using to install the APK (like your file manager or browser)
  * Toggle "Allow from this source" to ON

* After installation, you can find the MediaCaptureApp in your app drawer

* For security reasons, it's best to turn off "Allow from this source" after installation

## Troubleshooting

* **"App not installed" error**: Try clearing cache of Google Play services and Play Store
* **Installation blocked**: Make sure "Install Unknown Apps" permission is enabled
* **App crashes on launch**: Check if your Android version is compatible (requires Android 6.0+)