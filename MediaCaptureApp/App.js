import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [screen, setScreen] = useState('camera'); // 'camera' or 'preview'
  const [mediaUri, setMediaUri] = useState(null);
  const [mediaType, setMediaType] = useState(null); // 'photo' or 'video'
  const [fileInfo, setFileInfo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const fileInputRef = React.useRef(null);

  // Handle returning to camera screen
  const handleReturnToCamera = () => {
    setScreen('camera');
    setMediaUri(null);
    setMediaType(null);
    setFileInfo(null);
    setUploading(false);
    setUploadProgress(0);
  };

  // Handle file selection from web
  const handleFileSelection = (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      // Determine if this is a photo or video based on MIME type
      const type = file.type.startsWith('image') ? 'photo' : 'video';
      const uri = URL.createObjectURL(file);
      
      console.log("File selected:", file.name, "Type:", type);

      // Set media info and navigate to preview
      setMediaUri(uri);
      setMediaType(type);
      setFileInfo({
        name: file.name,
        size: file.size,
        type: file.type
      });
      setScreen('preview');
    } catch (error) {
      console.error("Error selecting file:", error);
      alert("Failed to select media file");
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

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Simulate media upload with progress
  const handleUpload = () => {
    console.log("Uploading file:", fileInfo?.name || "unknown file");
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            alert('Media uploaded successfully!');
            handleReturnToCamera();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  // Camera Screen
  if (screen === 'camera') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        
        <View style={styles.webCameraContainer}>
          <Text style={styles.titleText}>
            Media Capture App
          </Text>
          
          <Text style={styles.messageText}>
            A cross-platform app for capturing and uploading media
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
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.uploadButton} 
              onPress={openVideoPicker}
              accessibilityLabel="Upload a video"
            >
              <Ionicons name="videocam" size={36} color="white" />
              <Text style={styles.buttonText}>Record Video</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  
  // Preview Screen
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Preview</Text>
      </View>
      
      {/* Media Preview */}
      <View style={styles.mediaContainer}>
        {mediaType === 'photo' ? (
          <Image 
            source={{ uri: mediaUri }} 
            style={styles.mediaPreview} 
            resizeMode="contain"
          />
        ) : (
          Platform.OS === 'web' ? (
            <video
              src={mediaUri}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
              controls
            />
          ) : (
            <Text style={styles.errorText}>Video preview not available</Text>
          )
        )}
      </View>
      
      {/* File Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Type: {mediaType === 'photo' ? 'Photo' : 'Video'}
        </Text>
        {fileInfo && (
          <>
            <Text style={styles.infoText}>
              Size: {formatFileSize(fileInfo.size)}
            </Text>
            {fileInfo.name && (
              <Text style={styles.infoText}>
                Name: {fileInfo.name}
              </Text>
            )}
          </>
        )}
      </View>
      
      {/* Upload Progress Indicator */}
      {uploading && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Uploading: {uploadProgress}%</Text>
        </View>
      )}
      
      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.cancelButton]} 
          onPress={handleReturnToCamera}
          disabled={uploading}
          accessibilityLabel="Cancel and return to camera"
        >
          <Ionicons name="close-circle" size={24} color="white" />
          <Text style={styles.actionButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.uploadButton, uploading && styles.disabledButton]} 
          onPress={handleUpload}
          disabled={uploading}
          accessibilityLabel="Upload media"
        >
          <Ionicons name="cloud-upload" size={24} color="white" />
          <Text style={styles.actionButtonText}>
            {uploading ? 'Uploading...' : 'Upload'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webCameraContainer: {
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
  headerContainer: {
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: '#222',
    alignItems: 'center',
  },
  headerText: {
    color: '#4A90E2',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  mediaPreview: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
  },
  infoContainer: {
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  progressText: {
    color: 'white',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 25,
    width: '45%',
  },
  cancelButton: {
    backgroundColor: '#555',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
  },
  disabledButton: {
    opacity: 0.5,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
});