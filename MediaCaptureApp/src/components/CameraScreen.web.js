import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Simple web implementation of CameraScreen for file upload
export default function CameraScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Handle the file selection
  const handleFileSelection = (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      // Determine if this is a photo or video based on MIME type
      const mediaType = file.type.startsWith('image') ? 'photo' : 'video';
      const fileUri = URL.createObjectURL(file);
      
      console.log("File selected:", file.name, "Type:", mediaType);

      // Navigate to preview screen with file details
      navigation.navigate('Preview', {
        mediaUri: fileUri,
        mediaType: mediaType,
        webFile: {
          name: file.name,
          size: file.size,
          type: file.type
        }
      });
    } catch (error) {
      console.error("Error selecting file:", error);
      Alert.alert("Error", "Failed to select media file");
    }
  };

  // Trigger file selection for images
  const openImagePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = "image/*";
      fileInputRef.current.click();
    }
  };

  // Trigger file selection for videos
  const openVideoPicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = "video/*";
      fileInputRef.current.click();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.webCameraContainer}>
        <Text style={styles.titleText}>
          Media Capture App
        </Text>
        
        <Text style={styles.messageText}>
          Camera functionality is limited on web.
        </Text>
        <Text style={styles.messageText}>
          Please upload a photo or video from your device:
        </Text>
        
        {/* Hidden file input - only available in web environment */}
        {Platform.OS === 'web' && (
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelection}
          />
        )}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.uploadButton} 
            onPress={openImagePicker}
            accessibilityLabel="Upload a photo"
          >
            <Ionicons name="camera" size={36} color="white" />
            <Text style={styles.buttonText}>Upload Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.uploadButton} 
            onPress={openVideoPicker}
            accessibilityLabel="Upload a video"
          >
            <Ionicons name="videocam" size={36} color="white" />
            <Text style={styles.buttonText}>Upload Video</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  webCameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titleText: {
    color: '#4A90E2',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  messageText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
  },
  uploadButton: {
    backgroundColor: '#4A90E2',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
});