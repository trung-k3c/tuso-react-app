// SplashScreen.tsx
import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useAppStore } from '../lib/store';

export default function SplashScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const hasOnboarded = useAppStore(s => s.hasOnboarded);
  const hasProfileSetup = useAppStore(s => s.hasProfileSetup);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('TramChanKhong');
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigation, hasOnboarded, hasProfileSetup]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TUSO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  logo: { fontSize: 48, color: '#fff', fontWeight: '600', letterSpacing: 2 },
});
