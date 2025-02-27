import * as FileSystem from 'expo-file-system';

/**
 * Submit captured media to the configured webhook
 * 
 * @param {string} mediaUri - URI of the media file to submit
 * @param {string} mediaType - Type of media ('photo' or 'video')
 * @param {string} webhookUrl - URL of the webhook to submit media to
 * @param {Function} progressCallback - Callback for upload progress
 * @returns {Promise} - Resolves when the upload is complete
 */
export const submitMediaToWebhook = async (mediaUri, mediaType, webhookUrl, progressCallback) => {
  try {
    if (!webhookUrl) {
      throw new Error('No webhook URL provided');
    }
    
    console.log(`Starting upload to ${webhookUrl}`);
    
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
    
    // For development/testing purposes, simulate upload delay 
    // Remove this in production
    if (webhookUrl.includes('example.com')) {
      console.log('Using example.com webhook - simulating upload');
      return await simulateUpload(progressCallback);
    }
    
    // For mobile platforms, use FileSystem.uploadAsync if available
    if (FileSystem.uploadAsync) {
      const uploadResult = await FileSystem.uploadAsync(webhookUrl, mediaUri, {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file',
        mimeType: mimeType,
        parameters: {
          mediaType: mediaType,
          timestamp: new Date().toISOString()
        }
      });
      console.log('Upload successful:', uploadResult.status);
      return JSON.parse(uploadResult.body);
    } 
    
    // For web or fallback
    const formData = new FormData();
    formData.append('file', {
      uri: mediaUri,
      name: filename,
      type: mimeType,
    });
    formData.append('mediaType', mediaType);
    formData.append('timestamp', new Date().toISOString());
    
    // Submit the media file using fetch
    const response = await fetch(webhookUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    
    if (progressCallback) {
      // Since fetch doesn't support progress, simulate it
      for (let i = 0; i <= 100; i += 10) {
        progressCallback(i);
        if (i < 100) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    }
    
    console.log('Upload successful:', response.status);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error submitting media:', error);
    throw error;
  }
};

/**
 * Simulates an upload for testing purposes
 * 
 * @param {Function} progressCallback - Callback for simulated upload progress
 * @returns {Promise} - Resolves with simulated response
 */
const simulateUpload = async (progressCallback) => {
  return new Promise((resolve, reject) => {
    let progress = 0;
    
    // Simulate upload progress
    const interval = setInterval(() => {
      progress += 10;
      if (progressCallback) {
        progressCallback(progress);
      }
      
      if (progress >= 100) {
        clearInterval(interval);
        resolve({ success: true, message: 'Upload simulated successfully' });
      }
    }, 300);
    
    // Simulate occasional failure (10% chance)
    if (Math.random() < 0.1) {
      clearInterval(interval);
      reject(new Error('Simulated upload failure'));
    }
  });
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