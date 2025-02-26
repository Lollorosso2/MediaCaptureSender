import * as FileSystem from 'expo-file-system';

// Directory for temporary media files
const TEMP_DIRECTORY = `${FileSystem.cacheDirectory}temp_media/`;

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
    await ensureTempDirectoryExists();
    
    // Generate a unique filename
    const timestamp = new Date().getTime();
    const extension = type === 'photo' ? 'jpg' : 'mp4';
    const filename = `${timestamp}.${extension}`;
    const destinationUri = `${TEMP_DIRECTORY}${filename}`;
    
    // Copy file to temp directory
    await FileSystem.copyAsync({
      from: uri,
      to: destinationUri
    });
    
    return destinationUri;
  } catch (error) {
    console.error('Error saving media to temp storage:', error);
    throw new Error('Failed to save media temporarily. Please try again.');
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
    // Don't throw, just log the error as this is cleanup
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
      await FileSystem.deleteAsync(TEMP_DIRECTORY);
    }
  } catch (error) {
    console.error('Error cleaning up all temp media:', error);
    // Don't throw, just log the error as this is cleanup
  }
};
