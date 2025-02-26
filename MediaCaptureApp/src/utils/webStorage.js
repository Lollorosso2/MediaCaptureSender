import { Platform } from 'react-native';

// Storage keys for settings
export const WEBHOOK_URL_KEY = 'media_capture_webhook_url';
export const HIGH_QUALITY_KEY = 'media_capture_high_quality';
export const AUTO_UPLOAD_KEY = 'media_capture_auto_upload';

/**
 * A simple localStorage-based storage solution for web platforms
 * Acts as a drop-in replacement for AsyncStorage on web
 */
const webStorage = {
  getItem: (key) => {
    if (Platform.OS === 'web') {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.error('Error reading from localStorage:', e);
        return null;
      }
    }
    return null;
  },
  
  setItem: (key, value) => {
    if (Platform.OS === 'web') {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (e) {
        console.error('Error writing to localStorage:', e);
        return false;
      }
    }
    return false;
  },
  
  removeItem: (key) => {
    if (Platform.OS === 'web') {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error('Error removing from localStorage:', e);
        return false;
      }
    }
    return false;
  },
  
  clear: () => {
    if (Platform.OS === 'web') {
      try {
        localStorage.clear();
        return true;
      } catch (e) {
        console.error('Error clearing localStorage:', e);
        return false;
      }
    }
    return false;
  },
  
  getAllKeys: () => {
    if (Platform.OS === 'web') {
      try {
        return Object.keys(localStorage);
      } catch (e) {
        console.error('Error getting keys from localStorage:', e);
        return [];
      }
    }
    return [];
  }
};

// Default values for settings
const defaultSettings = {
  [WEBHOOK_URL_KEY]: 'https://example.com/api/media-upload',
  [HIGH_QUALITY_KEY]: 'false',
  [AUTO_UPLOAD_KEY]: 'false'
};

/**
 * Get a value from storage with async/await compatibility
 * 
 * @param {string} key - Storage key
 * @returns {Promise<string|null>} - Retrieved value or null
 */
export const getItem = async (key) => {
  if (Platform.OS === 'web') {
    const value = webStorage.getItem(key);
    return value !== null ? value : defaultSettings[key] || null;
  }
  
  // For non-web platforms, we would use AsyncStorage
  // but we're returning defaults for now to avoid import errors
  return defaultSettings[key] || null;
};

/**
 * Set a value in storage with async/await compatibility
 * 
 * @param {string} key - Storage key
 * @param {string} value - Value to store
 * @returns {Promise<boolean>} - Success status
 */
export const setItem = async (key, value) => {
  if (Platform.OS === 'web') {
    return webStorage.setItem(key, value);
  }
  
  // For non-web platforms, we would use AsyncStorage
  console.log(`Setting ${key} to ${value} (web storage only)`);
  return true;
};

/**
 * Remove an item from storage with async/await compatibility
 * 
 * @param {string} key - Storage key to remove
 * @returns {Promise<boolean>} - Success status
 */
export const removeItem = async (key) => {
  if (Platform.OS === 'web') {
    return webStorage.removeItem(key);
  }
  
  // For non-web platforms, we would use AsyncStorage
  console.log(`Removing ${key} (web storage only)`);
  return true;
};

export default {
  getItem,
  setItem,
  removeItem,
  WEBHOOK_URL_KEY,
  HIGH_QUALITY_KEY,
  AUTO_UPLOAD_KEY
};