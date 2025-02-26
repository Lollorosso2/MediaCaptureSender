import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import webStorage, { HIGH_QUALITY_KEY, AUTO_UPLOAD_KEY } from '../utils/webStorage';

// Simple web implementation of CameraScreen for file upload
export default function CameraScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [highQuality, setHighQuality] = useState(false);
  const [autoUpload, setAutoUpload] = useState(false);
  const fileInputRef = useRef(null);

  // Load settings on component mount and when returning to screen
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedHighQuality = await webStorage.getItem(HIGH_QUALITY_KEY);
        const savedAutoUpload = await webStorage.getItem(AUTO_UPLOAD_KEY);
        
        if (savedHighQuality) setHighQuality(savedHighQuality === 'true');
        if (savedAutoUpload) setAutoUpload(savedAutoUpload === 'true');
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    
    loadSettings();
    
    // Also refresh when screen comes into focus
    const unsubscribe = navigation.addListener('focus', loadSettings);
    return unsubscribe;
  }, [navigation]);

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
        autoUpload: autoUpload, // Pass auto-upload setting
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
  
  // Open settings screen
  const openSettings = () => {
    navigation.navigate('Settings');
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
      
      {/* Header with settings button */}
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <Text style={styles.headerTitle}>Media Capture App</Text>
        <TouchableOpacity 
          style={styles.settingsButton} 
          onPress={openSettings}
        >
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.webCameraContainer}>
        <Text style={styles.messageText}>
          Camera functionality is limited on web.
        </Text>
        <Text style={styles.messageText}>
          Please upload a photo or video from your device:
        </Text>
        
        {/* Settings info */}
        <View style={styles.settingsInfo}>
          <Text style={styles.settingsInfoText}>
            Quality: {highQuality ? 'High' : 'Standard'}
          </Text>
          <Text style={styles.settingsInfoText}>
            Auto-Upload: {autoUpload ? 'On' : 'Off'}
          </Text>
        </View>
        
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#222',
  },
  headerLeft: {
    width: 40,
  },
  headerTitle: {
    color: '#4A90E2',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  webCameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  messageText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  settingsInfo: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 10,
    marginVertical: 15,
  },
  settingsInfoText: {
    color: '#ddd',
    fontSize: 14,
    marginHorizontal: 10,
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