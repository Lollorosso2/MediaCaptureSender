import * as FileSystem from 'expo-file-system';

// Define the temporary directory path
const TEMP_DIRECTORY = `${FileSystem.cacheDirectory}media_captures/`;

/**
 * Ensures the temporary directory exists
 * 
 * @returns {Promise<void>}
 */
const ensureTempDirectoryExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(TEMP_DIRECTORY);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(TEMP_DIRECTORY, { intermediates: true });
  }
};

/**
 * Save media to temporary storage with a unique filename
 * 
 * @param {string} uri - URI of the media file
 * @param {string} type - Type of media ('photo' or 'video')
 * @returns {Promise<string>} - URI of the saved file
 */
export const saveMediaToTemp = async (uri, type) => {
  try {
    // Ensure temp directory exists
    await ensureTempDirectoryExists();
    
    // Generate unique filename based on timestamp
    const timestamp = new Date().getTime();
    const extension = type === 'photo' ? 'jpg' : 'mp4';
    const filename = `${timestamp}.${extension}`;
    const destinationUri = `${TEMP_DIRECTORY}${filename}`;
    
    // Copy the file to the temp directory
    await FileSystem.copyAsync({
      from: uri,
      to: destinationUri,
    });
    
    return destinationUri;
  } catch (error) {
    console.error('Error saving media to temp:', error);
    throw error;
  }
};

/**
 * Clean up a temporary media file
 * 
 * @param {string} uri - URI of the file to delete
 * @returns {Promise<void>}
 */
export const cleanupTempMedia = async (uri) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(uri);
    }
  } catch (error) {
    console.error('Error cleaning up temp media:', error);
    // Don't throw here, just log the error
  }
};

/**
 * Clean up all temporary media files
 * 
 * @returns {Promise<void>}
 */
export const cleanupAllTempMedia = async () => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(TEMP_DIRECTORY);
    if (dirInfo.exists) {
      await FileSystem.deleteAsync(TEMP_DIRECTORY, { idempotent: true });
      await ensureTempDirectoryExists();
    }
  } catch (error) {
    console.error('Error cleaning up all temp media:', error);
    // Don't throw here, just log the error
  }
};