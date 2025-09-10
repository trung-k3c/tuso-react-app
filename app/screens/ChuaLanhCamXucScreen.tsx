import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';

export default function ChuaLanhCamXucScreen() {
  return (
    <View style={styles.container}>
      {/* <TopNav title="Chữa Lành Cảm Xúc" /> */}
      <View style={styles.content}>
        <Text>Chữa Lành Cảm Xúc</Text>
      </View>
      {/* <BottomNav /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
