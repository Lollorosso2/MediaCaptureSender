const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Creating downloadable package for Media Capture App...');

// Define paths
const rootDir = __dirname;
const packageDir = path.join(rootDir, 'download-package');
const zipFile = path.join(rootDir, 'dist', 'MediaCaptureApp-package.zip');

// Create package directory
if (fs.existsSync(packageDir)) {
  execSync(`rm -rf ${packageDir}`);
}
fs.mkdirSync(packageDir, { recursive: true });

// List of files/directories to include in the package
const filesToInclude = [
  'src',
  'app.json',
  'eas.json',
  'package.json',
  'build-android.sh',
  'build-apk.sh',
  'simple-build.js',
  'expo-build.js',
  'ANDROID_INSTALLATION_DETAILED.md',
  'EAS_BUILD_GUIDE.md',
  'EAS_GIT_INSTRUCTIONS.md',
  'QUICK_INSTALL.md',
  'README.md',
  'index.js',
  'index.web.js',
  'App.js',
  'webpack.config.js'
];

// Copy files to package directory
for (const file of filesToInclude) {
  const sourcePath = path.join(rootDir, file);
  const destPath = path.join(packageDir, file);
  
  if (fs.existsSync(sourcePath)) {
    if (fs.lstatSync(sourcePath).isDirectory()) {
      // For directories, use recursive copy
      execSync(`cp -r "${sourcePath}" "${destPath}"`);
      console.log(`Copied directory: ${file}`);
    } else {
      // Create parent directories if needed
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      // Copy the file
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied file: ${file}`);
    }
  } else {
    console.warn(`Warning: File not found: ${file}`);
  }
}

// Create a README specifically for the downloadable package
const downloadReadmePath = path.join(packageDir, 'DOWNLOAD_README.md');
const downloadReadmeContent = `# Media Capture App - Downloaded Package

This is the complete package for building the Media Capture App on your local machine.

## Getting Started

1. Extract all files from this ZIP archive to a folder on your computer
2. Open a terminal/command prompt and navigate to the extracted folder
3. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

## Building for Android

Follow the instructions in one of these guides:

- \`QUICK_INSTALL.md\` - Quickest way to run the app (using Expo Go)
- \`EAS_BUILD_GUIDE.md\` - Build a standalone APK using Expo Application Services (recommended)
- \`EAS_GIT_INSTRUCTIONS.md\` - Important steps to set up Git for EAS Build
- \`ANDROID_INSTALLATION_DETAILED.md\` - Comprehensive installation guide with all methods

## Web Version

To build and run the web version:
\`\`\`
npm run build:simple
npx serve -s dist
\`\`\`

## Available Scripts

- \`npm start\` - Start the development server
- \`npm run android\` - Run on Android emulator/device
- \`npm run ios\` - Run on iOS simulator/device
- \`npm run web\` - Run in web browser
- \`npm run build:android\` - Build for Android using local script
- \`npm run build:apk\` - Build APK using simplified script
- \`npm run build:expo\` - Build using Expo's build service
- \`npm run build:simple\` - Build for web deployment

## Requirements

- Node.js (v18 or newer)
- npm (v9 or newer)
- Git (required for EAS builds)
- For EAS builds: An Expo account (free to create)
- For local Android builds: Android SDK and JDK 17+
`;

fs.writeFileSync(downloadReadmePath, downloadReadmeContent);
console.log('Created download package README');

// Make scripts executable
execSync(`chmod +x "${path.join(packageDir, 'build-android.sh')}"`);
execSync(`chmod +x "${path.join(packageDir, 'build-apk.sh')}"`);

// Create a dist directory if it doesn't exist
const distDir = path.join(rootDir, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create ZIP archive
console.log('Creating ZIP archive...');
execSync(`cd "${rootDir}" && zip -r "${zipFile}" download-package`);

console.log('\nPackage created successfully!');
console.log(`You can download the complete package from: ${zipFile}`);
console.log('This ZIP contains everything you need to build the app on your local machine.');