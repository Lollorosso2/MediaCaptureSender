import axios from 'axios';
import * as FileSystem from 'expo-file-system';

// Default webhook URL - should be configurable in a settings screen
const DEFAULT_WEBHOOK_URL = 'https://example.com/api/media-upload';

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
    // Get filename from URI
    const filename = mediaUri.split('/').pop();
    
    // Determine MIME type based on file extension
    const fileExtension = filename.split('.').pop().toLowerCase();
    let mimeType = '';
    
    if (mediaType === 'photo') {
      mimeType = 'image/jpeg';
    } else if (mediaType === 'video') {
      mimeType = fileExtension === 'mp4' ? 'video/mp4' : 'video/quicktime';
    }

    // Get the webhook URL from settings (implementation would depend on how settings are stored)
    // For now, we'll use the default
    const webhookUrl = DEFAULT_WEBHOOK_URL;
    
    // Create FormData object for file upload
    const formData = new FormData();
    formData.append('file', {
      uri: mediaUri,
      name: filename,
      type: mimeType,
    });
    formData.append('mediaType', mediaType);
    
    // Upload progress callback configuration
    const uploadConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (progressCallback) {
          progressCallback(percentCompleted);
        }
      },
    };
    
    // Submit the media file
    const response = await axios.post(webhookUrl, formData, uploadConfig);
    return response.data;
  } catch (error) {
    console.error('Error submitting media:', error);
    throw error;
  }
};

/**
 * Get file info (size, type, etc)
 * 
 * @param {string} uri - URI of the file
 * @returns {Promise<Object>} - File information
 */
export const getFileInfo = async (uri) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri, { size: true });
    return fileInfo;
  } catch (error) {
    console.error('Error getting file info:', error);
    throw error;
  }
};