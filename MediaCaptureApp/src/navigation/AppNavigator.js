import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from '../components/CameraScreen';
import PreviewScreen from '../components/PreviewScreen';
import SettingsScreen from '../components/SettingsScreen';

const Stack = createStackNavigator();

/**
 * Main application navigator
 * Handles navigation between the camera screen, preview screen, and settings
 */
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Camera"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'black' },
          animationEnabled: true,
        }}
      >
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen} 
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="Preview" 
          component={PreviewScreen}
          options={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            presentation: 'modal',
          }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            gestureEnabled: true,
            animationEnabled: true,
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}