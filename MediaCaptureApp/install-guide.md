# Installing Media Capture App on Your Android Device

This guide will help you install the Media Capture App on your Android phone.

## Step 1: Download the APK

There are two ways to get the APK file:

### Option A: Download From the Build Server
If the development team has provided you with a direct download link, simply click on it from your Android device to download the APK.

### Option B: Build It Yourself
If you're a developer and want to build the APK yourself:

1. Clone the repository
2. Run `cd MediaCaptureApp && ./build-android.sh`
3. Find the APK at `MediaCaptureApp/dist/MediaCaptureApp.apk`

## Step 2: Enable Installation from Unknown Sources

Before installing the APK, you need to enable installation from unknown sources:

1. Go to your device's **Settings**
2. Navigate to **Security** or **Privacy** (this may vary based on your device)
3. Find and enable **Install unknown apps** or **Unknown sources**
4. If prompted, select the app you'll use to install the APK (e.g., Files, Chrome)

## Step 3: Install the APK

1. Locate the downloaded APK file using your file manager app
2. Tap on the APK file
3. Tap **Install** when prompted
4. Wait for the installation to complete
5. Tap **Open** to launch the app or find it in your app drawer

## Step 4: First-Time Setup

When you first open the app:

1. Allow any requested permissions (camera, storage, etc.)
2. Navigate to the Settings screen by tapping the gear icon
3. Enter your webhook URL and configure your preferences
4. You're now ready to capture and upload media!

## Troubleshooting

- **Cannot install APK**: Make sure unknown sources are enabled for the app you're using to install
- **App crashes on startup**: Ensure you've granted all necessary permissions
- **Camera not working**: Check that camera permissions are enabled for the app
- **Cannot upload media**: Verify your webhook URL and internet connection

For further assistance, contact the development team.