import React from 'react';
import { Platform, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Import the main app navigator
import AppNavigator from './src/navigation/AppNavigator';

// Check if we're running on web
const isWeb = Platform.OS === 'web';

export default function App() {
  // Log platform information for debugging
  console.log(`Running on platform: ${Platform.OS}`);
  
  // Return the main app navigator
  return <AppNavigator />;
}