import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChuaLanhCamXucScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Chữa Lành Cảm Xúc</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
