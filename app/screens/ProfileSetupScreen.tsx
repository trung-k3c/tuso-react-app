import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useAppStore } from '../lib/store';

export default function ProfileSetupScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const completeProfileSetup = useAppStore((s) => s.completeProfileSetup);
  const handleNext = () => {
    completeProfileSetup();
    navigation.navigate('Main', { screen: 'Home' });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thiết Lập Hồ Sơ</Text>
      <Pressable style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Khám Phá Bản Thân</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
