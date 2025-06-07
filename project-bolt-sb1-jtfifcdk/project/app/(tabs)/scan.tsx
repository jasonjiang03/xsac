import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Menu as MenuIcon, Camera, X } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function ScanScreen() {
  const { colors } = useTheme();
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  // Check if both permissions are loading
  if (!cameraPermission || !mediaLibraryPermission) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.text }]}>Loading camera...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Check if either permission is not granted
  if (!cameraPermission.granted || !mediaLibraryPermission.granted) {
    const requestAllPermissions = async () => {
      if (!cameraPermission.granted) {
        await requestCameraPermission();
      }
      if (!mediaLibraryPermission.granted) {
        await requestMediaLibraryPermission();
      }
    };

    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.permissionContainer}>
          <View style={[styles.permissionIcon, { backgroundColor: `${colors.primary}20` }]}>
            <Camera size={48} color={colors.primary} strokeWidth={2} />
          </View>
          <Text style={[styles.permissionTitle, { color: colors.text }]}>Camera Access Required</Text>
          <Text style={[styles.permissionText, { color: colors.textSecondary }]}>
            We need access to your camera and media library to scan sewing patterns and convert them to digital format.
          </Text>
          <TouchableOpacity 
            style={[styles.permissionButton, { backgroundColor: colors.primary }]} 
            onPress={requestAllPermissions}
          >
            <Text style={styles.permissionButtonText}>Grant Camera Access</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Text style={[styles.backButtonText, { color: colors.textSecondary }]}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      
      if (Platform.OS === 'web') {
        // Web simulation
        Alert.alert(
          'Pattern Captured!',
          'Your sewing pattern has been successfully scanned and will be processed.',
          [
            {
              text: 'View in Folder',
              onPress: () => router.push('/(tabs)/folder')
            },
            {
              text: 'Scan Another',
              style: 'cancel'
            }
          ]
        );
      } else {
        // Native camera capture
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        
        // Process the captured image
        console.log('Photo captured:', photo.uri);
        
        Alert.alert(
          'Pattern Captured!',
          'Your sewing pattern has been successfully scanned and will be processed.',
          [
            {
              text: 'View in Folder',
              onPress: () => router.push('/(tabs)/folder')
            },
            {
              text: 'Scan Another',
              style: 'cancel'
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to capture image. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  };

  const handleMenuPress = () => {
    // Menu functionality can be added here
  };

  return (
    <View style={styles.container}>
      {/* Camera View - Full Screen */}
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        flash="off"
      >
        {/* Top Controls */}
        <SafeAreaView style={styles.topSafeArea}>
          <View style={styles.topControls}>
            <TouchableOpacity 
              style={styles.topButton}
              onPress={handleMenuPress}
            >
              <MenuIcon size={24} color="#999999" strokeWidth={2} />
            </TouchableOpacity>
            
            <View style={styles.topCenter}>
              <Text style={styles.scanTitle}>Scan Pattern</Text>
              <Text style={styles.scanSubtitle}>Align pattern within view</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.topButton}
              onPress={() => router.back()}
            >
              <X size={24} color="#999999" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          {/* iPhone-style Shutter Button */}
          <TouchableOpacity 
            style={[
              styles.shutterButton,
              isCapturing && styles.shutterButtonCapturing
            ]}
            onPress={takePicture}
            disabled={isCapturing}
            activeOpacity={0.8}
          >
            <View style={styles.shutterInner} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  permissionIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  permissionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
  },
  permissionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  backButton: {
    paddingVertical: 12,
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  camera: {
    flex: 1,
  },
  topSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  topButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topCenter: {
    alignItems: 'center',
  },
  scanTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 2,
  },
  scanSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#999999',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 50,
    zIndex: 10,
  },
  shutterButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  shutterButtonCapturing: {
    transform: [{ scale: 0.9 }],
    backgroundColor: '#F0F0F0',
  },
  shutterInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
  },
});