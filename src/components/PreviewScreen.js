import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { Video } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { submitMediaToWebhook } from '../utils/api';
import { cleanupTempMedia } from '../utils/storage';

const PreviewScreen = ({ route, navigation }) => {
  const { mediaUri, mediaType } = route.params;
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const handleBack = async () => {
    try {
      // Clean up temporary media file when going back without submitting
      await cleanupTempMedia(mediaUri);
      navigation.goBack();
    } catch (error) {
      console.error('Error cleaning up media:', error);
      navigation.goBack();
    }
  };

  const handleSubmit = async () => {
    setUploading(true);
    setProgress(0);

    try {
      await submitMediaToWebhook(
        mediaUri, 
        mediaType, 
        (progressPercentage) => {
          setProgress(progressPercentage);
        }
      );
      setUploading(false);
      
      Alert.alert(
        'Success',
        'Media successfully submitted!',
        [
          { 
            text: 'OK', 
            onPress: () => {
              cleanupTempMedia(mediaUri);
              navigation.navigate('Camera');
            }
          }
        ]
      );
    } catch (error) {
      setUploading(false);
      Alert.alert(
        'Upload Failed',
        error.message,
        [
          { text: 'Try Again', style: 'cancel' },
          { 
            text: 'Go Back', 
            onPress: () => {
              cleanupTempMedia(mediaUri);
              navigation.navigate('Camera');
            }
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          disabled={uploading}
        >
          <Feather name="arrow-left" size={24} color="white" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preview</Text>
        <View style={styles.spacer} />
      </View>
      
      <View style={styles.previewContainer}>
        {mediaType === 'photo' ? (
          <Image source={{ uri: mediaUri }} style={styles.previewMedia} resizeMode="contain" />
        ) : (
          <Video
            ref={videoRef}
            source={{ uri: mediaUri }}
            style={styles.previewMedia}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        )}
      </View>
      
      <View style={styles.bottomContainer}>
        {uploading ? (
          <View style={styles.progressContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.progressText}>{`Uploading: ${Math.round(progress)}%`}</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Feather name="upload-cloud" size={24} color="white" />
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  spacer: {
    width: 60,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewMedia: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    padding: 20,
  },
  submitButton: {
    backgroundColor: '#0066CC',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  progressText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
});

export default PreviewScreen;
