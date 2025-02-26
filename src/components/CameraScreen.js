import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { Camera } from 'expo-camera';
import { Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { saveMediaToTemp } from '../utils/storage';

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [captureMode, setCaptureMode] = useState('photo'); // 'photo' or 'video'
  const [isLoading, setIsLoading] = useState(false);
  
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const micStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasPermission(status === 'granted' && micStatus.status === 'granted');
    })();
  }, []);

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  const flipCamera = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const switchCaptureMode = () => {
    setCaptureMode(captureMode === 'photo' ? 'video' : 'photo');
  };

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      setIsLoading(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          skipProcessing: false,
        });
        
        const filePath = await saveMediaToTemp(photo.uri, 'photo');
        setIsLoading(false);
        navigation.navigate('Preview', { 
          mediaUri: filePath, 
          mediaType: 'photo' 
        });
      } catch (error) {
        setIsLoading(false);
        Alert.alert('Error', 'Failed to take photo: ' + error.message);
      }
    }
  };

  const recordVideo = async () => {
    if (cameraRef.current && isCameraReady) {
      if (isRecording) {
        setIsRecording(false);
        cameraRef.current.stopRecording();
      } else {
        setIsRecording(true);
        try {
          const videoRecordPromise = cameraRef.current.recordAsync({
            quality: Camera.Constants.VideoQuality['720p'],
            maxDuration: 60, // 1 minute max
            mute: false,
          });
          
          const data = await videoRecordPromise;
          setIsRecording(false);
          
          const filePath = await saveMediaToTemp(data.uri, 'video');
          navigation.navigate('Preview', { 
            mediaUri: filePath, 
            mediaType: 'video' 
          });
        } catch (error) {
          setIsRecording(false);
          Alert.alert('Error', 'Failed to record video: ' + error.message);
        }
      }
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container}><ActivityIndicator size="large" color="#0000ff" /></View>;
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
        <TouchableOpacity style={styles.button} onPress={() => Camera.requestCameraPermissionsAsync()}>
          <Text style={styles.buttonText}>Grant Permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={cameraType}
          onCameraReady={handleCameraReady}
          ratio="16:9"
        >
          <View style={styles.controlsContainer}>
            <View style={styles.controls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={flipCamera}
                disabled={isRecording}
              >
                <Feather name="refresh-cw" size={24} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.controlButton}
                onPress={switchCaptureMode}
                disabled={isRecording}
              >
                <Feather 
                  name={captureMode === 'photo' ? 'video' : 'camera'} 
                  size={24} 
                  color="white" 
                />
                <Text style={styles.modeText}>{captureMode === 'photo' ? 'Switch to Video' : 'Switch to Photo'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.captureContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <TouchableOpacity
                  style={[
                    styles.captureButton,
                    isRecording && styles.recordingButton
                  ]}
                  onPress={captureMode === 'photo' ? takePicture : recordVideo}
                  disabled={!isCameraReady}
                >
                  <View style={isRecording ? styles.recordingIndicator : null} />
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.modeIndicator}>
              <Text style={styles.modeIndicatorText}>
                {captureMode === 'photo' ? 'PHOTO MODE' : 'VIDEO MODE'}
              </Text>
              {isRecording && (
                <View style={styles.recordingStatus}>
                  <View style={styles.recordingDot} />
                  <Text style={styles.recordingText}>Recording...</Text>
                </View>
              )}
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  controlsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  controlButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    padding: 15,
  },
  modeText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  captureContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  captureButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 40,
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
  recordingButton: {
    backgroundColor: 'red',
  },
  recordingIndicator: {
    backgroundColor: 'white',
    borderRadius: 15,
    height: 30,
    width: 30,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 10,
    marginTop: 20,
    padding: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modeIndicator: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    marginBottom: 10,
    padding: 10,
  },
  modeIndicatorText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  recordingStatus: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  recordingDot: {
    backgroundColor: 'red',
    borderRadius: 5,
    height: 10,
    marginRight: 5,
    width: 10,
  },
  recordingText: {
    color: 'white',
    fontSize: 14,
  },
});

export default CameraScreen;
