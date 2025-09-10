import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LaSoTuViScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.overlay}>
      <View style={[styles.modal, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Lá Số Tử Vi</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.close}>Đóng</Text>
          </Pressable>
        </View>
        <View style={styles.content}>
          <Text>Nội dung Lá Số Tử Vi</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modal: {
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  close: {
    color: '#007AFF',
  },
  content: {
    flex: 1,
  },
});
