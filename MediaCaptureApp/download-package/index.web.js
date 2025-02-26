import { registerRootComponent } from 'expo';
import App from './App';
import { Platform } from 'react-native';

// This will be used when running on web
if (Platform.OS === 'web') {
  // We can add web-specific setup here if needed
  console.log('Running on web platform');
}

// Register the root component
registerRootComponent(App);