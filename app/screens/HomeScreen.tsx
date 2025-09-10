import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import ResetButton from '../components/ResetButton';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* <TopNav title="TUSO" /> */}
      <View style={styles.content}>
        <Text>Home</Text>
        {__DEV__ && <ResetButton />}
      </View>
      {/* <BottomNav /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
