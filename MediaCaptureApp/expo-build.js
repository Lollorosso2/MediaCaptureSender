const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

console.log('===== Building Android APK with Expo Build System =====');
console.log('This method uses Expo\'s build servers to create your APK.');
console.log('You\'ll need to login to an Expo account.');

try {
  // Create a temporary build configuration
  console.log('Creating build configuration...');
  
  // Update app.json for build
  const appJsonPath = path.join(__dirname, 'app.json');
  const appJson = require(appJsonPath);
  
  // Ensure we have the required Android configuration
  if (!appJson.expo.android) {
    appJson.expo.android = {};
  }
  
  if (!appJson.expo.android.package) {
    appJson.expo.android.package = 'com.mediacapture.app';
  }
  
  // Add required permissions if not already present
  if (!appJson.expo.android.permissions) {
    appJson.expo.android.permissions = [
      'CAMERA',
      'RECORD_AUDIO',
      'READ_EXTERNAL_STORAGE',
      'WRITE_EXTERNAL_STORAGE'
    ];
  }
  
  // Write the updated app.json
  fs.writeFileSync(
    appJsonPath, 
    JSON.stringify(appJson, null, 2)
  );
  
  // Install expo-cli if needed
  console.log('Installing build tools...');
  execSync('npm install -g expo-cli@latest', { stdio: 'inherit' });
  
  // Login to Expo (this will prompt the user)
  console.log('\nYou need to login to your Expo account:');
  execSync('expo login', { stdio: 'inherit' });
  
  // Start the build process
  console.log('\nStarting Android build...');
  console.log('This will take several minutes. The APK will be available for download when complete.');
  execSync('expo build:android -t apk', { stdio: 'inherit' });
  
  console.log('\n===== Build process initiated! =====');
  console.log('Your APK will be available for download from the Expo website');
  console.log('when the build completes. You will receive an email notification.');
  
} catch (error) {
  console.error('Build failed with error:', error.message);
  console.log('\nAlternative methods to get an APK:');
  console.log('1. Use the Expo Go app from the Play Store to run your app directly');
  console.log('2. Visit https://expo.dev/accounts/[your-username]/projects/media-capture-app/builds');
}