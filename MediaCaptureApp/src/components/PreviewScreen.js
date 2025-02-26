import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { submitMediaToWebhook, getFileInfo } from '../utils/api';
import { cleanupTempMedia } from '../utils/storage';

export default function PreviewScreen({ route, navigation }) {
  const { mediaUri, mediaType } = route.params;
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileSize, setFileSize] = useState(null);
  
  // Initialize media component reference
  const mediaRef = React.useRef(null);

  // Get file information on component mount
  React.useEffect(() => {
    const getFileDetails = async () => {
      try {
        const info = await getFileInfo(mediaUri);
        setFileSize(info.size);
      } catch (error) {
        console.error('Error getting file details:', error);
      }
    };
    
    getFileDetails();
  }, [mediaUri]);

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Handle media upload
  const handleUpload = async () => {
    setUploading(true);
    setUploadProgress(0);
    
    try {
      await submitMediaToWebhook(
        mediaUri, 
        mediaType,
        (progress) => {
          setUploadProgress(progress);
        }
      );
      
      // Clean up the temporary file after successful upload
      await cleanupTempMedia(mediaUri);
      
      // Show success message
      Alert.alert(
        'Success', 
        'Media uploaded successfully!',
        [{ text: 'OK', onPress: () => navigation.navigate('Camera') }]
      );
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert(
        'Upload Failed', 
        'There was an error uploading your media. Please try again.'
      );
    } finally {
      setUploading(false);
    }
  };

  // Handle retaking/rerecording
  const handleRetake = async () => {
    // Clean up the temporary file
    await cleanupTempMedia(mediaUri);
    
    // Navigate back to camera
    navigation.navigate('Camera');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Media Preview */}
      <View style={styles.mediaContainer}>
        {mediaType === 'photo' ? (
          <Image 
            source={{ uri: mediaUri }} 
            style={styles.mediaPreview} 
            resizeMode="contain"
          />
        ) : (
          <Video
            ref={mediaRef}
            source={{ uri: mediaUri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            isLooping
            style={styles.mediaPreview}
            useNativeControls
          />
        )}
      </View>
      
      {/* File Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Type: {mediaType === 'photo' ? 'Photo' : 'Video'}
        </Text>
        <Text style={styles.infoText}>
          Size: {formatFileSize(fileSize)}
        </Text>
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
        >
          <Ionicons name="close-circle" size={24} color="white" />
          <Text style={styles.actionButtonText}>Retake</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.uploadButton, uploading && styles.disabledButton]} 
          onPress={handleUpload}
          disabled={uploading}
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
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaPreview: {
    width: '100%',
    height: '100%',
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