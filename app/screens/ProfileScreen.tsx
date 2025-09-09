import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={() => navigation.goBack()} />
      <View style={styles.panel}>
        <Text style={styles.title}>My Profile</Text>
        <Pressable style={styles.close} onPress={() => navigation.goBack()}>
          <Text>Close</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  panel: {
    width: '50%',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
  },
  close: {
    marginTop: 24,
    alignSelf: 'flex-start',
  },
});
