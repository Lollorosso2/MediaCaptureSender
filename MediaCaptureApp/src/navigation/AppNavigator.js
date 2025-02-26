import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from '../components/CameraScreen';
import PreviewScreen from '../components/PreviewScreen';

const Stack = createStackNavigator();

/**
 * Main application navigator
 * Handles navigation between the camera screen and the preview screen
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
          presentation: 'modal',
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
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}