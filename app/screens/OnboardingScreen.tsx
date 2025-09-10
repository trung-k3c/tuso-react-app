import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useAppStore } from '../lib/store';

export default function OnboardingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const completeOnboarding = useAppStore((s) => s.setOnboarded);
  const handleNext = () => {
    completeOnboarding(true);
    navigation.replace('ProfileSetup');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào Mừng đến với TUSO</Text>
      <Pressable style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Bắt Đầu Trải Nghiệm</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
