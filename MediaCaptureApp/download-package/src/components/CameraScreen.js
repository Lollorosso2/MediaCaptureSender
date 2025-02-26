import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveMediaToTemp } from '../utils/storage';

// Settings storage keys
const HIGH_QUALITY_KEY = 'media_capture_high_quality';
const AUTO_UPLOAD_KEY = 'media_capture_auto_upload';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isRecording, setIsRecording] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [isCameraReady, setIsCameraReady] = useState(false);
  
  // Settings state
  const [highQuality, setHighQuality] = useState(false);
  const [autoUpload, setAutoUpload] = useState(false);
  
  const cameraRef = useRef(null);

  // Request camera permissions and load settings
  useEffect(() => {
    const setupCamera = async () => {
      // Request permissions
      const { status } = await Camera.requestCameraPermissionsAsync();
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasPermission(status === 'granted' && audioStatus.status === 'granted');
      
      // Load settings
      try {
        const savedHighQuality = await AsyncStorage.getItem(HIGH_QUALITY_KEY);
        const savedAutoUpload = await AsyncStorage.getItem(AUTO_UPLOAD_KEY);
        
        if (savedHighQuality) setHighQuality(savedHighQuality === 'true');
        if (savedAutoUpload) setAutoUpload(savedAutoUpload === 'true');
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    
    setupCamera();
  }, []);

  // Refresh settings when returning to camera screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        const savedHighQuality = await AsyncStorage.getItem(HIGH_QUALITY_KEY);
        const savedAutoUpload = await AsyncStorage.getItem(AUTO_UPLOAD_KEY);
        
        if (savedHighQuality) setHighQuality(savedHighQuality === 'true');
        if (savedAutoUpload) setAutoUpload(savedAutoUpload === 'true');
      } catch (error) {
        console.error('Error refreshing settings:', error);
      }
    });
    
    return unsubscribe;
  }, [navigation]);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const flipCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const toggleFlash = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        const photoOptions = {
          quality: highQuality ? 1.0 : 0.8,
          skipProcessing: false,
        };
        
        const photo = await cameraRef.current.takePictureAsync(photoOptions);
        
        // Save to temporary storage
        const savedUri = await saveMediaToTemp(photo.uri, 'photo');
        
        // Navigate to preview screen or auto-upload
        if (autoUpload) {
          // In a real implementation, we would upload directly
          // For now, we'll still go to preview but auto-start the upload
          navigation.navigate('Preview', {
            mediaUri: savedUri,
            mediaType: 'photo',
            autoUpload: true
          });
        } else {
          navigation.navigate('Preview', {
            mediaUri: savedUri,
            mediaType: 'photo',
          });
        }
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  const recordVideo = async () => {
    if (cameraRef.current && isCameraReady) {
      if (isRecording) {
        // Stop recording
        cameraRef.current.stopRecording();
        setIsRecording(false);
      } else {
        // Start recording
        setIsRecording(true);
        try {
          const videoOptions = {
            maxDuration: 60, // 1 minute max
            quality: highQuality 
              ? Camera.Constants.VideoQuality['1080p'] 
              : Camera.Constants.VideoQuality['720p'],
            mute: false,
          };
          
          const videoData = await cameraRef.current.recordAsync(videoOptions);
          
          // Save to temporary storage
          const savedUri = await saveMediaToTemp(videoData.uri, 'video');
          
          // Navigate to preview screen or auto-upload
          if (autoUpload) {
            navigation.navigate('Preview', {
              mediaUri: savedUri,
              mediaType: 'video',
              autoUpload: true
            });
          } else {
            navigation.navigate('Preview', {
              mediaUri: savedUri,
              mediaType: 'video',
            });
          }
        } catch (error) {
          console.error('Error recording video:', error);
          Alert.alert('Error', 'Failed to record video. Please try again.');
          setIsRecording(false);
        }
      }
    }
  };
  
  // Navigate to settings screen
  const openSettings = () => {
    navigation.navigate('Settings');
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No access to camera</Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={() => {
            // Try requesting permissions again
            Camera.requestCameraPermissionsAsync();
            Camera.requestMicrophonePermissionsAsync();
          }}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={cameraType}
        flashMode={flashMode}
        onCameraReady={onCameraReady}
        ratio="16:9"
      >
        <View style={styles.topControls}>
          <TouchableOpacity style={styles.controlButton} onPress={flipCamera}>
            <Ionicons name="camera-reverse-outline" size={28} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={openSettings}>
            <Ionicons name="settings-outline" size={28} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
            <Ionicons 
              name={flashMode === Camera.Constants.FlashMode.on ? "flash" : "flash-off"} 
              size={28} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
        
        {/* Quality indicator */}
        <View style={styles.qualityIndicator}>
          <Text style={styles.qualityText}>
            {highQuality ? 'High Quality' : 'Standard Quality'}
          </Text>
        </View>
        
        <View style={styles.bottomControls}>
          <TouchableOpacity 
            style={[styles.captureButton, isRecording && styles.recordingButton]} 
            onPress={isRecording ? recordVideo : takePicture}
          >
            {isRecording ? (
              <Ionicons name="stop" size={36} color="white" />
            ) : (
              <Ionicons name="camera" size={36} color="white" />
            )}
          </TouchableOpacity>
          
          {!isRecording && (
            <TouchableOpacity 
              style={styles.videoButton} 
              onPress={recordVideo}
            >
              <Ionicons name="videocam" size={36} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 40,
  },
  qualityIndicator: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
    padding: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  },
  qualityText: {
    color: 'white',
    fontSize: 12,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  controlButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  recordingButton: {
    backgroundColor: 'red',
  },
  videoButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  permissionButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    margin: 20,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});