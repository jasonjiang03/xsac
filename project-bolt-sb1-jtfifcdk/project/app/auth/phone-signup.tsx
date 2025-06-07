import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, MessageSquare, Check } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function PhoneSignupScreen() {
  const { signUp, isLoading } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'phone' | 'verification'>('phone');
  const [error, setError] = useState<string | null>(null);

  const isValidPhoneNumber = (phone: string) => {
    // Basic phone number validation (10+ digits)
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
  };

  const isValidVerificationCode = (code: string) => {
    return code.length === 6 && /^\d+$/.test(code);
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  const handleSendCode = async () => {
    if (!isValidPhoneNumber(phoneNumber)) return;
    
    try {
      setError(null);
      // Simulate sending verification code
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('verification');
    } catch (err) {
      setError('Failed to send verification code. Please try again.');
    }
  };

  const handleVerifyCode = async () => {
    if (!isValidVerificationCode(verificationCode)) return;
    
    try {
      setError(null);
      // Simulate phone verification and account creation
      const email = `${phoneNumber.replace(/\D/g, '')}@phone.local`;
      await signUp(email, 'phone_verification');
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    }
  };

  const handleBack = () => {
    if (step === 'verification') {
      setStep('phone');
      setVerificationCode('');
      setError(null);
    } else {
      router.back();
    }
  };

  const handleResendCode = async () => {
    try {
      setError(null);
      // Simulate resending code
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Code Sent', 'A new verification code has been sent to your phone.');
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <ArrowLeft size={24} color="#333333" strokeWidth={2} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {step === 'phone' ? 'Phone Number' : 'Verification'}
            </Text>
            <View style={styles.placeholder} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {step === 'phone' ? (
              <>
                <Text style={styles.title}>Enter Your Phone Number</Text>
                <Text style={styles.subtitle}>
                  We'll send you a verification code to confirm your phone number
                </Text>

                {/* Error Message */}
                {error && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}

                {/* Phone Number Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Phone Number</Text>
                  <View style={[
                    styles.inputWrapper,
                    phoneNumber.length > 0 && (isValidPhoneNumber(phoneNumber) ? styles.inputValid : styles.inputInvalid)
                  ]}>
                    <Phone size={20} color="#999999" strokeWidth={2} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="(555) 123-4567"
                      placeholderTextColor="#999999"
                      value={formatPhoneNumber(phoneNumber)}
                      onChangeText={(text) => setPhoneNumber(text.replace(/\D/g, ''))}
                      keyboardType="phone-pad"
                      autoCorrect={false}
                      maxLength={14}
                    />
                    {phoneNumber.length > 0 && isValidPhoneNumber(phoneNumber) && (
                      <Check size={20} color="#4CAF50" strokeWidth={2} />
                    )}
                  </View>
                  <Text style={styles.phoneHint}>
                    Standard messaging rates may apply
                  </Text>
                </View>

                {/* Send Code Button */}
                <TouchableOpacity 
                  style={[
                    styles.submitButton,
                    isValidPhoneNumber(phoneNumber) ? styles.submitButtonActive : styles.submitButtonDisabled
                  ]}
                  onPress={handleSendCode}
                  disabled={!isValidPhoneNumber(phoneNumber) || isLoading}
                >
                  <Text style={[
                    styles.submitButtonText,
                    isValidPhoneNumber(phoneNumber) ? styles.submitButtonTextActive : styles.submitButtonTextDisabled
                  ]}>
                    {isLoading ? 'Sending Code...' : 'Send Verification Code'}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.title}>Enter Verification Code</Text>
                <Text style={styles.subtitle}>
                  We sent a 6-digit code to {formatPhoneNumber(phoneNumber)}
                </Text>

                {/* Error Message */}
                {error && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}

                {/* Verification Code Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Verification Code</Text>
                  <View style={[
                    styles.inputWrapper,
                    verificationCode.length > 0 && (isValidVerificationCode(verificationCode) ? styles.inputValid : styles.inputInvalid)
                  ]}>
                    <MessageSquare size={20} color="#999999" strokeWidth={2} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="123456"
                      placeholderTextColor="#999999"
                      value={verificationCode}
                      onChangeText={setVerificationCode}
                      keyboardType="number-pad"
                      autoCorrect={false}
                      maxLength={6}
                    />
                    {verificationCode.length > 0 && isValidVerificationCode(verificationCode) && (
                      <Check size={20} color="#4CAF50" strokeWidth={2} />
                    )}
                  </View>
                </View>

                {/* Verify Button */}
                <TouchableOpacity 
                  style={[
                    styles.submitButton,
                    isValidVerificationCode(verificationCode) ? styles.submitButtonActive : styles.submitButtonDisabled
                  ]}
                  onPress={handleVerifyCode}
                  disabled={!isValidVerificationCode(verificationCode) || isLoading}
                >
                  <Text style={[
                    styles.submitButtonText,
                    isValidVerificationCode(verificationCode) ? styles.submitButtonTextActive : styles.submitButtonTextDisabled
                  ]}>
                    {isLoading ? 'Verifying...' : 'Verify & Create Account'}
                  </Text>
                </TouchableOpacity>

                {/* Resend Code */}
                <TouchableOpacity style={styles.resendButton} onPress={handleResendCode}>
                  <Text style={styles.resendButtonText}>Didn't receive a code? Resend</Text>
                </TouchableOpacity>
              </>
            )}

            {/* Terms */}
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20,
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
    marginBottom: 40,
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
  inputContainer: {
    marginBottom: 24,
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
  textInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  phoneHint: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999999',
    marginTop: 6,
  },
  submitButton: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  submitButtonActive: {
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#F0F0F0',
  },
  submitButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  submitButtonTextActive: {
    color: '#FFFFFF',
  },
  submitButtonTextDisabled: {
    color: '#999999',
  },
  resendButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  resendButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4CAF50',
  },
  termsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 18,
    paddingBottom: 32,
  },
  termsLink: {
    color: '#4CAF50',
    fontFamily: 'Inter-Medium',
  },
});