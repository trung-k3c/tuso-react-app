import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNav() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home" size={24} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('ExploreSelf')}>
        <Ionicons name="person" size={24} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('IChing')}>
        <Ionicons name="book" size={24} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('ChuaLanh')}>
        <Ionicons name="heart" size={24} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('KhaiMo')}>
        <Ionicons name="star" size={24} />
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
});
