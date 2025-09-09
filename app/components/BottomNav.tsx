import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

export default function BottomNav() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Text style={styles.text}>Home</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('ExploreSelf')}>
        <Text style={styles.text}>Khám Phá Bản Thân</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('IChing')}>
        <Text style={styles.text}>Soi Đường Quyết Định</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('ChuaLanh')}>
        <Text style={styles.text}>Chữa Lành Cảm Xúc</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('KhaiMo')}>
        <Text style={styles.text}>Khai Mở Vận Mệnh</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 12,
  },
});
