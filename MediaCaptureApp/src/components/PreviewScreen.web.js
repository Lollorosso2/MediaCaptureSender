import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, ActivityIndicator, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function PreviewScreen({ route, navigation }) {
  const { mediaUri, mediaType, webFile } = route.params;
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const videoRef = React.useRef(null);
  
  // Clean up object URLs when component unmounts (web only)
  useEffect(() => {
    return () => {
      if (Platform.OS === 'web' && mediaUri && mediaUri.startsWith('blob:')) {
        URL.revokeObjectURL(mediaUri);
      }
    };
  }, [mediaUri]);
  
  // Format file size for display
  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Simulate media upload with progress
  const handleUpload = () => {
    console.log("Uploading file:", webFile?.name || "unknown file");
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
            Alert.alert(
              'Success', 
              'Media uploaded successfully!',
              [{ text: 'OK', onPress: () => navigation.navigate('Camera') }]
            );
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  // Handle returning to camera screen
  const handleRetake = () => {
    navigation.navigate('Camera');
  };

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
              ref={videoRef}
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
        {webFile && (
          <>
            <Text style={styles.infoText}>
              Size: {formatFileSize(webFile.size)}
            </Text>
            {webFile.name && (
              <Text style={styles.infoText}>
                Name: {webFile.name}
              </Text>
            )}
          </>
        )}
      </View>
      
      {/* Upload Progress Indicator */}
      {uploading && (
        <View style={styles.progressContainer}>
          <ActivityIndicator size="small" color="#ffffff" />
          <Text style={styles.progressText}>Uploading: {uploadProgress}%</Text>
        </View>
      )}
      
      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.cancelButton]} 
          onPress={handleRetake}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  progressText: {
    color: 'white',
    marginLeft: 10,
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