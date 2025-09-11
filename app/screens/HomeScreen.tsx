import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ResetButton from '../components/ResetButton';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Home</Text>
        {__DEV__ && <ResetButton />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
