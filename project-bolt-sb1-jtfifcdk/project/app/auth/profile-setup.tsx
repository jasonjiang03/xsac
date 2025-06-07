import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, User, Check, Upload } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileSetupScreen() {
  const { updateProfile, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isValidUsername = (username: string) => {
    return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
  };

  const canContinue = isValidUsername(username);

  const pickImage = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Photo Upload', 'Photo upload is not available in web preview. This feature works on mobile devices.');
      return;
    }

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access photo library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleContinue = async () => {
    if (!canContinue) return;
    
    try {
      setError(null);
      await updateProfile(username, profileImage || undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Set up your username and profile picture to personalize your experience
          </Text>
        </View>

        {/* Error Message */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Profile Picture Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profilePlaceholder}>
                <User size={32} color="#999999" strokeWidth={2} />
              </View>
            )}
            <View style={styles.cameraButton}>
              <Camera size={16} color="#FFFFFF" strokeWidth={2} />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Upload size={16} color="#4CAF50" strokeWidth={2} />
            <Text style={styles.uploadButtonText}>
              {profileImage ? 'Change Photo' : 'Upload Photo'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Username Section */}
        <View style={styles.usernameSection}>
          <Text style={styles.inputLabel}>Username</Text>
          <View style={[
            styles.inputWrapper,
            username.length > 0 && (isValidUsername(username) ? styles.inputValid : styles.inputInvalid)
          ]}>
            <Text style={styles.atSymbol}>@</Text>
            <TextInput
              style={styles.textInput}
              placeholder="your_username"
              placeholderTextColor="#999999"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={20}
            />
            {username.length > 0 && isValidUsername(username) && (
              <Check size={20} color="#4CAF50" strokeWidth={2} />
            )}
          </View>
          
          <View style={styles.usernameHints}>
            <Text style={styles.usernameHint}>
              • Must be at least 3 characters
            </Text>
            <Text style={styles.usernameHint}>
              • Only letters, numbers, and underscores
            </Text>
          </View>
          
          {username.length > 0 && !isValidUsername(username) && (
            <Text style={styles.inputErrorText}>
              Username must be at least 3 characters and contain only letters, numbers, and underscores
            </Text>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              canContinue ? styles.continueButtonActive : styles.continueButtonDisabled
            ]}
            onPress={handleContinue}
            disabled={!canContinue || isLoading}
          >
            <Text style={[
              styles.continueButtonText,
              canContinue ? styles.continueButtonTextActive : styles.continueButtonTextDisabled
            ]}>
              {isLoading ? 'Setting up...' : 'Continue'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>Step 2 of 2</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 40,
  },
  header: {
    marginBottom: 48,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  errorContainer: {
    backgroundColor: '#FFF8F8',
    borderWidth: 1,
    borderColor: '#FF5252',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FF5252',
    textAlign: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8FFF8',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  uploadButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 6,
  },
  usernameSection: {
    marginBottom: 48,
  },
  inputLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputValid: {
    borderColor: '#4CAF50',
    backgroundColor: '#F8FFF8',
  },
  inputInvalid: {
    borderColor: '#FF5252',
    backgroundColor: '#FFF8F8',
  },
  atSymbol: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#666666',
  },
  textInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333333',
    marginLeft: 4,
  },
  usernameHints: {
    marginTop: 8,
  },
  usernameHint: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999999',
    marginBottom: 2,
  },
  inputErrorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#FF5252',
    marginTop: 6,
  },
  actionButtons: {
    marginBottom: 32,
  },
  continueButton: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueButtonActive: {
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonDisabled: {
    backgroundColor: '#F0F0F0',
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  continueButtonTextActive: {
    color: '#FFFFFF',
  },
  continueButtonTextDisabled: {
    color: '#999999',
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666666',
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: 120,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#999999',
  },
});