// app/components/ResetButton.tsx
import React from 'react';
import { Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppStore } from '../lib/store';

export default function ResetButton() {
  const resetApp = async () => {
    try {
      await AsyncStorage.clear();
      useAppStore.setState({
        hasOnboarded: false,
        hasProfileSetup: false,
      });
      Alert.alert('App reset', 'AsyncStorage cleared. Restart the app for a fresh start.');
    } catch (e) {
      console.error('Failed to clear storage:', e);
      Alert.alert('Error', 'Failed to clear AsyncStorage.');
    }
  };

  return <Button title="Reset App (Dev)" onPress={resetApp} color="red" />;
}
