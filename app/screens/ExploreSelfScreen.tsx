import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';

export default function ExploreSelfScreen() {
  return (
    <View style={styles.container}>
      <TopNav title="Khám Phá Bản Thân" />
      <View style={styles.content}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Xem Lá Số Bát Tự</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Xem Lá Số Tử Vi</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Tổng Hợp</Text>
        </Pressable>
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
