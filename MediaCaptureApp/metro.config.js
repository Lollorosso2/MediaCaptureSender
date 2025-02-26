// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Exclude download-package directory from Metro bundling
defaultConfig.resolver.blockList = [
  /download-package\/.*/
];
defaultConfig.watchFolders = [__dirname];

module.exports = defaultConfig;