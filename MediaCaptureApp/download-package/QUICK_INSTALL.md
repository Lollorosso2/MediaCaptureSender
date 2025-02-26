# Quick Installation Guide

This is the fastest way to get Media Capture App running on your device.

## Prerequisites

- Node.js (v18 or newer)
- npm (v9 or newer)
- [Expo Go](https://expo.dev/client) app installed on your mobile device

## Steps

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm start
   ```

3. **Scan the QR code**

   - With **Android**: Use the Expo Go app to scan the QR code
   - With **iOS**: Use the Camera app to scan the QR code, then tap the notification

## That's it!

The app will load on your device through Expo Go.

> Note: This method runs the app through the Expo Go client app. The camera and media features will work, but for production use, you should build a standalone app using the EAS build service as described in the other guides.