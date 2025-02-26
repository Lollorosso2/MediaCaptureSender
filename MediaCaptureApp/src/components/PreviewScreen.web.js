import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, ActivityIndicator, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import webStorage, { WEBHOOK_URL_KEY } from '../utils/webStorage';

export default function PreviewScreen({ route, navigation }) {
  const { mediaUri, mediaType, webFile, autoUpload } = route.params;
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [webhookUrl, setWebhookUrl] = useState(null);
  
  const videoRef = React.useRef(null);
  
  // Clean up object URLs when component unmounts (web only)
  useEffect(() => {
    return () => {
      if (Platform.OS === 'web' && mediaUri && mediaUri.startsWith('blob:')) {
        URL.revokeObjectURL(mediaUri);
      }
    };
  }, [mediaUri]);
  
  // Load webhook URL and handle auto-upload
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedWebhookUrl = await webStorage.getItem(WEBHOOK_URL_KEY);
        if (savedWebhookUrl) {
          console.log('Loaded webhook URL:', savedWebhookUrl);
          setWebhookUrl(savedWebhookUrl);
          
          // Auto upload if requested and we have a webhook URL
          if (autoUpload === true && !uploading) {
            console.log('Auto-upload requested');
            setTimeout(() => handleUpload(), 500);
          }
        } else {
          console.log('No webhook URL configured');
        }
      } catch (error) {
        console.error('Error loading webhook URL:', error);
      }
    };
    
    loadSettings();
  }, [autoUpload]);
  
  // Format file size for display
  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Simulate media upload with progress
  const handleUpload = () => {
    // Check if webhook URL is configured
    if (!webhookUrl) {
      Alert.alert(
        'Configuration Needed', 
        'Please configure a webhook URL in settings before uploading.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go to Settings', onPress: () => navigation.navigate('Settings') }
        ]
      );
      return;
    }
    
    console.log("Uploading file:", webFile?.name || "unknown file", "to", webhookUrl);
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
    
    // Simulate occasional failure (10% chance)
    if (Math.random() < 0.1) {
      clearInterval(interval);
      setTimeout(() => {
        setUploading(false);
        Alert.alert('Error', 'Upload failed! Please try again.');
      }, 1000);
    }
  };

  // Handle returning to camera screen
  const handleRetake = () => {
    navigation.navigate('Camera');
  };
  
  // Navigate to settings
  const openSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header with back button and settings */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton} 
          onPress={() => navigation.goBack()}
          disabled={uploading}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Preview</Text>
        
        <TouchableOpacity 
          style={styles.headerButton} 
          onPress={openSettings}
          disabled={uploading}
        >
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
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
        
        {webhookUrl ? (
          <Text style={styles.infoText} numberOfLines={1} ellipsizeMode="middle">
            Webhook: {webhookUrl}
          </Text>
        ) : (
          <Text style={styles.warningText}>
            No webhook URL configured
          </Text>
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
          style={[styles.actionButton, styles.cancelButton, uploading && styles.disabledButton]} 
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
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
  warningText: {
    color: '#ffab00',
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