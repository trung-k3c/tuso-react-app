import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

export default function ExploreSelfScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('LaSoBatTu')}
        >
          <Text style={styles.buttonText}>Xem Lá Số Bát Tự</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('LaSoTuVi')}
        >
          <Text style={styles.buttonText}>Xem Lá Số Tử Vi</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('TongHop')}
        >
          <Text style={styles.buttonText}>Tổng Hợp</Text>
        </Pressable>
      </View>
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
