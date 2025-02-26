import axios from 'axios';
import * as FileSystem from 'expo-file-system';

// Get webhook URL from environment or use a default for development
// In a real app, this would be configured in app settings or environment variables
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://webhook.site/your-test-endpoint';

/**
 * Submit captured media to the configured webhook
 * 
 * @param {string} mediaUri - URI of the media file to submit
 * @param {string} mediaType - Type of media ('photo' or 'video')
 * @param {Function} progressCallback - Callback for upload progress
 * @returns {Promise} - Resolves when the upload is complete
 */
export const submitMediaToWebhook = async (mediaUri, mediaType, progressCallback) => {
  try {
    // Get file info
    const fileInfo = await FileSystem.getInfoAsync(mediaUri);
    if (!fileInfo.exists) {
      throw new Error('File does not exist');
    }

    // Create form data
    const formData = new FormData();
    
    // Get file name from URI
    const fileName = mediaUri.split('/').pop();
    const fileExtension = mediaType === 'photo' ? 'jpg' : 'mp4';
    
    // Add media file to form data
    formData.append('media', {
      uri: mediaUri,
      name: fileName || `capture.${fileExtension}`,
      type: mediaType === 'photo' ? 'image/jpeg' : 'video/mp4',
    });
    
    // Add additional metadata
    formData.append('mediaType', mediaType);
    formData.append('timestamp', new Date().toISOString());
    
    // Upload with progress tracking
    const response = await axios.post(WEBHOOK_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        progressCallback(percentCompleted);
      },
    });
    
    // Check response status
    if (response.status !== 200) {
      throw new Error(`Upload failed with status code: ${response.status}`);
    }
    
    // Return result
    return response.data;
  } catch (error) {
    console.error('Error uploading media:', error);
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to submit media. Please try again.'
    );
  }
};
