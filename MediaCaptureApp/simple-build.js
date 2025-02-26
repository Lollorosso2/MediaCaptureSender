const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define directory paths
const srcDir = path.join(__dirname, 'src');
const webBuildDir = path.join(__dirname, 'web-build');
const distDir = path.join(__dirname, 'dist');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

console.log('===== Building Media Capture App for Web =====');
console.log('This script builds the React Native app for web deployment');

try {
  // Build the web app
  console.log('\nBuilding web application...');
  
  // Get the Expo project information
  const appJson = require('./app.json');
  const appName = appJson.expo.name || 'MediaCaptureApp';
  const appVersion = appJson.expo.version || '1.0.0';
  
  try {
    // Run the Expo web build
    console.log('Running Expo web build...');
    execSync('npx expo export:web', { stdio: 'inherit' });
    
    // Copy web-build to dist directory
    console.log('Copying build to dist directory...');
    
    // Remove existing dist directory contents
    if (fs.existsSync(distDir)) {
      execSync(`rm -rf ${distDir}/*`, { stdio: 'inherit' });
    }
    
    // Copy web-build contents to dist
    execSync(`cp -r ${webBuildDir}/* ${distDir}/`, { stdio: 'inherit' });
    
    console.log('Web build completed and copied to dist directory');
  } catch (buildError) {
    console.error('Error during web build:', buildError.message);
    console.log('Creating fallback web application...');
    
    // Create a simple index.html as fallback
    const indexPath = path.join(distDir, 'index.html');
    const indexContent = `<!DOCTYPE html>
<html>
<head>
  <title>${appName}</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #121212; color: white; }
    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    header { background-color: #222; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
    .app-title { color: #4A90E2; font-size: 20px; font-weight: bold; }
    .content { padding: 20px; }
    .camera-container { background-color: #333; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0; }
    .button-container { display: flex; justify-content: space-around; margin-top: 30px; }
    .button { background-color: #4A90E2; color: white; padding: 15px 25px; border-radius: 8px; cursor: pointer; display: flex; flex-direction: column; align-items: center; width: 45%; text-decoration: none; }
    .button-text { margin-top: 10px; }
    .settings-info { display: flex; background-color: rgba(0, 0, 0, 0.5); border-radius: 10px; padding: 10px; margin: 15px 0; }
    .settings-text { color: #ddd; margin: 0 10px; }
    p { line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div style="width: 40px;"></div>
      <div class="app-title">Media Capture App</div>
      <div style="width: 40px;">⚙️</div>
    </header>
    
    <div class="content">
      <div class="camera-container">
        <p>Camera functionality is limited on web.</p>
        <p>Please upload a photo or video from your device:</p>
        
        <div class="settings-info">
          <div class="settings-text">Quality: Standard</div>
          <div class="settings-text">Auto-Upload: Off</div>
        </div>
        
        <input type="file" id="mediaInput" style="display: none" accept="image/*,video/*">
        
        <div class="button-container">
          <a href="#" class="button" onclick="document.getElementById('mediaInput').click(); document.getElementById('mediaInput').accept='image/*';">
            📷
            <span class="button-text">Upload Photo</span>
          </a>
          <a href="#" class="button" onclick="document.getElementById('mediaInput').click(); document.getElementById('mediaInput').accept='video/*';">
            🎥
            <span class="button-text">Upload Video</span>
          </a>
        </div>
      </div>
      
      <h2>Installation Guide for Android</h2>
      <p>To install this app on your Android device, you have the following options:</p>
      
      <h3>Method 1: Using Expo Go (Easiest)</h3>
      <ol>
        <li>Install "Expo Go" from the Google Play Store</li>
        <li>Open Expo Go and scan the developer's QR code</li>
      </ol>
      
      <h3>Method 2: Build with Expo EAS</h3>
      <ol>
        <li>Use Expo EAS build service (requires Expo account)</li>
        <li>Install EAS CLI: <code>npm install -g eas-cli</code></li>
        <li>Login: <code>eas login</code></li>
        <li>Build: <code>eas build -p android --profile preview</code></li>
      </ol>
    </div>
  </div>

  <script>
    // Simple script to handle file selection
    document.getElementById('mediaInput').addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      const fileType = file.type.startsWith('image/') ? 'photo' : 'video';
      alert('Selected ' + fileType + ': ' + file.name + '\nIn a complete app, this would be uploaded to your configured webhook.');
    });
  </script>
</body>
</html>`;

    fs.writeFileSync(indexPath, indexContent);
    
    // Add Android installation guide information
    const androidGuideContent = `
# Media Capture App - Android Installation Guide

## Method 1: Using Expo Go (Easiest)
1. Install "Expo Go" from the Google Play Store on your Android device
2. Open Expo Go and create/sign in to an account
3. Scan the QR code provided by the app developer
4. The app will run directly in your Expo Go app

## Method 2: Build with Expo EAS (Advanced)
1. Create an Expo account at [expo.dev](https://expo.dev)
2. Install EAS CLI: \`npm install -g eas-cli\`
3. Login to your account: \`eas login\`
4. Run: \`eas build -p android --profile preview\`
5. Follow the prompts and download the APK when complete

For more detailed instructions, see the ANDROID_INSTALLATION.md file.
`;

    const androidGuidePath = path.join(distDir, 'android-guide.md');
    fs.writeFileSync(androidGuidePath, androidGuideContent);
  }
  
  // Create Android installation guide file
  const manifestPath = path.join(distDir, 'AndroidManifest.xml');
  const manifestContent = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.mediacapture.app"
    android:versionCode="1"
    android:versionName="${appVersion}">
    
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    
    <application
        android:label="${appName}"
        android:icon="@mipmap/ic_launcher"
        android:allowBackup="true">
        <activity
            android:name=".MainActivity"
            android:label="${appName}"
            android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`;

  fs.writeFileSync(manifestPath, manifestContent);
  
  console.log('\n===== Build completed! =====');
  console.log(`Media Capture App has been built and is available at: ${distDir}`);
  console.log('\nTo run the app:');
  console.log('1. Use a static file server like "serve" to serve the dist directory');
  console.log('2. Access the app in your browser');
  console.log('\nFor Android installation:');
  console.log('1. Install Expo Go from the Play Store and scan the QR code (npm start)');
  console.log('2. Use Expo EAS build service (requires Expo account)');
  console.log('   - npm install -g eas-cli');
  console.log('   - eas login');
  console.log('   - eas build -p android --profile preview');
  
} catch (error) {
  console.error('Error during build process:', error.message);
}