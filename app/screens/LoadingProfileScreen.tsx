import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

export default function LoadingProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hồ Sơ của bạn đang được thiết lập</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.buttonText}>Tạo Tài Khoản Để Lưu Hồ Sơ</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('ExploreSelf')}>
        <Text style={styles.buttonText}>Khám Phá Bản Thân as Guest</Text>
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
    padding: 16,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
