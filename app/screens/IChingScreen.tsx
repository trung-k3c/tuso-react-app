import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';

export default function IChingScreen() {
  return (
    <View style={styles.container}>
      <TopNav title="Soi Đường Quyết Định" />
      <View style={styles.content}>
        <Text>Soi Đường Quyết Định</Text>
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
