# Installing Your Android App from an AAB File

You've received an Android App Bundle (.aab) file from Expo's build service. Here's how to handle this situation and install the app on your device.

## Understanding AAB vs APK
- **AAB (Android App Bundle)**: The publishing format for Google Play Store, but not directly installable on devices
- **APK (Android Package)**: The installable format for Android devices

## Option 1: Generate an APK using the preview profile

The easiest way is to build a direct APK instead of an AAB:

1. Download and extract the MediaCaptureApp package
2. In a terminal, navigate to the extracted folder
3. Run:
   ```bash
   npm install
   npx eas-cli login
   npx eas-cli build --platform android --profile preview
   ```
4. This uses the `preview` profile in `eas.json` which is already configured to build an APK
5. When the build completes, Expo will provide a download link for the APK
6. Download the APK to your device and install it

## Option 2: Convert your AAB to APK

If you already have the AAB file and want to convert it:

1. Install the Bundletool utility:
   ```bash
   # Download bundletool
   curl -L https://github.com/google/bundletool/releases/download/1.15.5/bundletool-all-1.15.5.jar -o bundletool.jar
   ```

2. Convert the AAB to a universal APK:
   ```bash
   java -jar bundletool.jar build-apks --bundle=application-87916ffe-3265-4306-9315-648da62fa05d.aab --output=my_app.apks --mode=universal
   ```

3. Extract the APK from the APKS file:
   ```bash
   unzip my_app.apks -d extracted_apks
   # The universal APK will be in the extracted directory
   ```

4. Transfer the extracted universal.apk to your device and install it

## Option 3: Build locally using the provided scripts

The package includes build scripts for creating APKs directly:

1. Extract the MediaCaptureApp package
2. Run the included build script:
   ```bash
   sh build-apk.sh
   ```
3. This will guide you through building an APK locally
4. Transfer the resulting APK to your device and install it

## Important Notes for Installation

1. You may need to enable "Install from Unknown Sources" on your Android device:
   - Go to Settings → Security or Privacy
   - Enable "Install from Unknown Sources" or "Install Unknown Apps"

2. When transferring the APK to your device, you can use:
   - Email attachment
   - USB transfer
   - Cloud storage services (Google Drive, Dropbox, etc.)

3. Once transferred, find the APK on your device using a file manager and tap to install