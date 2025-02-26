import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  // A simple function to show we're working
  const showAlert = () => {
    alert('Hello from Media Capture App!');
    console.log('Button pressed');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>
          Media Capture App
        </Text>
        
        <Text style={styles.messageText}>
          A cross-platform app for capturing and uploading media
        </Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={showAlert}
        >
          <Text style={styles.buttonText}>Test Button</Text>
        </TouchableOpacity>
        
        <Text style={styles.platformText}>
          Current Platform: {Platform.OS}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titleText: {
    color: '#4A90E2',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  messageText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  platformText: {
    color: '#aaa',
    fontSize: 14,
  }
});