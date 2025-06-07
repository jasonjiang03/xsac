import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Chrome, Apple, Phone, LogIn } from 'lucide-react-native';
import { router } from 'expo-router';
import { Platform } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function AuthScreen() {
  const { signIn, isLoading } = useAuth();
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'google' | 'apple' | null>(null);

  const handleEmailSignup = () => {
    router.push('/auth/email-signup');
  };

  const handlePhoneSignup = () => {
    router.push('/auth/phone-signup');
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleSocialSignup = (provider: 'google' | 'apple') => {
    setSelectedProvider(provider);
    setShowPermissionModal(true);
  };

  const handlePermissionAccept = async () => {
    setShowPermissionModal(false);
    
    try {
      // Simulate social login
      const email = selectedProvider === 'google' ? 'user@gmail.com' : 'user@icloud.com';
      await signIn(email, 'social_login');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in with ' + selectedProvider);
    }
    
    setSelectedProvider(null);
  };

  const handlePermissionDecline = () => {
    setShowPermissionModal(false);
    setSelectedProvider(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Image 
              source={require('../../assets/images/logo.jpg')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </View>
        
        <Text style={styles.title}>PatternScanner</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleBlack}>The World First 2D Pattern Scanning app with precision.</Text>
          <Text style={styles.subtitleBold}>Scan Anytime Anywhere.</Text>
        </View>
      </View>

      {/* Features Preview */}
      <View style={styles.featuresContainer}>
        <View style={styles.featureItem}>
          <View style={styles.featureDot} />
          <Text style={styles.featureText}>Scan & digitize patterns instantly</Text>
        </View>
        <View style={styles.featureItem}>
          <View style={styles.featureDot} />
          <Text style={styles.featureText}>Organize your pattern library</Text>
        </View>
        <View style={styles.featureItem}>
          <View style={styles.featureDot} />
          <Text style={styles.featureText}>Create optimized layplans</Text>
        </View>
      </View>

      {/* Auth Options */}
      <View style={styles.authContainer}>
        {/* Primary Sign Up Options */}
        <View style={styles.primaryAuthSection}>
          <View style={styles.signUpButtonsRow}>
            <TouchableOpacity 
              style={styles.emailButton} 
              onPress={handleEmailSignup}
              disabled={isLoading}
            >
              <Mail size={18} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.emailButtonText}>Email</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.phoneButton} 
              onPress={handlePhoneSignup}
              disabled={isLoading}
            >
              <Phone size={18} color="#4CAF50" strokeWidth={2} />
              <Text style={styles.phoneButtonText}>Phone</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Auth Options */}
        <View style={styles.socialSection}>
          <View style={styles.socialButtons}>
            <TouchableOpacity 
              style={styles.socialButton} 
              onPress={() => handleSocialSignup('google')}
              disabled={isLoading}
            >
              <Chrome size={20} color="#4285F4" strokeWidth={2} />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            {Platform.OS === 'ios' && (
              <TouchableOpacity 
                style={styles.socialButton} 
                onPress={() => handleSocialSignup('apple')}
                disabled={isLoading}
              >
                <Apple size={20} color="#000000" strokeWidth={2} />
                <Text style={styles.socialButtonText}>Apple</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Login Option */}
        <View style={styles.loginSection}>
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            <LogIn size={16} color="#4CAF50" strokeWidth={2} />
            <Text style={styles.loginButtonText}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <View style={styles.termsSection}>
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>
      </View>

      {/* Permission Modal */}
      <Modal
        visible={showPermissionModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handlePermissionDecline}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.modalIcon}>
                {selectedProvider === 'google' ? (
                  <Chrome size={32} color="#4285F4" strokeWidth={2} />
                ) : (
                  <Apple size={32} color="#000000" strokeWidth={2} />
                )}
              </View>
              <Text style={styles.modalTitle}>
                {selectedProvider === 'google' ? 'Google' : 'Apple'} wants to use
              </Text>
              <Text style={styles.modalSubtitle}>
                "PatternScanner" to sign you in
              </Text>
            </View>

            <View style={styles.modalContent}>
              <Text style={styles.modalDescription}>
                This allows the app and website to share information about you.
              </Text>
              
              <View style={styles.permissionsList}>
                <View style={styles.permissionItem}>
                  <View style={styles.permissionDot} />
                  <Text style={styles.permissionText}>Your name and email address</Text>
                </View>
                <View style={styles.permissionItem}>
                  <View style={styles.permissionDot} />
                  <Text style={styles.permissionText}>Profile picture (optional)</Text>
                </View>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={handlePermissionDecline}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.continueButton} onPress={handlePermissionAccept}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 32,
    paddingBottom: 20,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  logoImage: {
    width: 60,
    height: 60,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1A1A1A',
    marginBottom: 12,
  },
  subtitleContainer: {
    alignItems: 'center',
    maxWidth: 320,
  },
  subtitleBlack: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 4,
  },
  subtitleBold: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresContainer: {
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 16,
  },
  featureText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333333',
  },
  authContainer: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'flex-end',
    paddingBottom: 32,
  },
  primaryAuthSection: {
    marginBottom: 20,
  },
  signUpButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  emailButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  emailButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  phoneButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#4CAF50',
  },
  phoneButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#999999',
    paddingHorizontal: 16,
  },
  socialSection: {
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  socialButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: '#333333',
    marginLeft: 6,
  },
  loginSection: {
    marginBottom: 20,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8FFF8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8F5E8',
  },
  loginButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#4CAF50',
    marginLeft: 6,
  },
  termsSection: {
    alignItems: 'center',
  },
  termsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 16,
  },
  termsLink: {
    color: '#4CAF50',
    fontFamily: 'Inter-Medium',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666666',
  },
  modalContent: {
    marginBottom: 32,
  },
  modalDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  permissionsList: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  permissionDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4CAF50',
    marginRight: 12,
  },
  permissionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#333333',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#666666',
  },
  continueButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});