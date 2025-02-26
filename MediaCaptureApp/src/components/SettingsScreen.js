import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Switch, 
  ScrollView, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const WEBHOOK_URL_KEY = 'media_capture_webhook_url';
const HIGH_QUALITY_KEY = 'media_capture_high_quality';
const AUTO_UPLOAD_KEY = 'media_capture_auto_upload';

export default function SettingsScreen({ navigation }) {
  // Settings state
  const [webhookUrl, setWebhookUrl] = useState('https://example.com/api/media-upload');
  const [highQuality, setHighQuality] = useState(false);
  const [autoUpload, setAutoUpload] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load saved settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedWebhookUrl = await AsyncStorage.getItem(WEBHOOK_URL_KEY);
        const savedHighQuality = await AsyncStorage.getItem(HIGH_QUALITY_KEY);
        const savedAutoUpload = await AsyncStorage.getItem(AUTO_UPLOAD_KEY);
        
        if (savedWebhookUrl) setWebhookUrl(savedWebhookUrl);
        if (savedHighQuality) setHighQuality(savedHighQuality === 'true');
        if (savedAutoUpload) setAutoUpload(savedAutoUpload === 'true');
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    
    loadSettings();
  }, []);

  // Save settings
  const saveSettings = async () => {
    if (!webhookUrl.trim()) {
      Alert.alert('Error', 'Webhook URL cannot be empty');
      return;
    }
    
    setIsSaving(true);
    
    try {
      await AsyncStorage.setItem(WEBHOOK_URL_KEY, webhookUrl);
      await AsyncStorage.setItem(HIGH_QUALITY_KEY, String(highQuality));
      await AsyncStorage.setItem(AUTO_UPLOAD_KEY, String(autoUpload));
      
      Alert.alert(
        'Success', 
        'Settings saved successfully',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Error', 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  // Reset settings to default
  const resetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default values?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            setWebhookUrl('https://example.com/api/media-upload');
            setHighQuality(false);
            setAutoUpload(false);
          }
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.backButton} />
      </View>
      
      <ScrollView style={styles.settingsContainer}>
        {/* Webhook URL Setting */}
        <View style={styles.settingSection}>
          <Text style={styles.settingLabel}>Webhook URL</Text>
          <TextInput
            style={styles.textInput}
            value={webhookUrl}
            onChangeText={setWebhookUrl}
            placeholder="Enter webhook URL"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.settingDescription}>
            The URL where captured media will be uploaded
          </Text>
        </View>
        
        {/* High Quality Setting */}
        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingLabel}>High Quality</Text>
            <Text style={styles.settingDescription}>
              Capture photos and videos in higher quality
            </Text>
          </View>
          <Switch
            value={highQuality}
            onValueChange={setHighQuality}
            trackColor={{ false: '#767577', true: '#4A90E2' }}
            thumbColor={highQuality ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
        
        {/* Auto Upload Setting */}
        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingLabel}>Auto Upload</Text>
            <Text style={styles.settingDescription}>
              Automatically upload media after capture
            </Text>
          </View>
          <Switch
            value={autoUpload}
            onValueChange={setAutoUpload}
            trackColor={{ false: '#767577', true: '#4A90E2' }}
            thumbColor={autoUpload ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
        
        {/* Reset Button */}
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={resetSettings}
        >
          <Text style={styles.resetButtonText}>Reset to Defaults</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Save Button */}
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={saveSettings}
        disabled={isSaving}
      >
        <Text style={styles.saveButtonText}>
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#333',
  },
  backButton: {
    padding: 10,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  settingsContainer: {
    flex: 1,
    padding: 15,
  },
  settingSection: {
    marginBottom: 25,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  settingDescription: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: '#444',
    color: 'white',
    padding: 12,
    borderRadius: 5,
    fontSize: 16,
    marginVertical: 8,
  },
  resetButton: {
    alignItems: 'center',
    padding: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  resetButtonText: {
    color: '#ff6b6b',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    alignItems: 'center',
    margin: 15,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});