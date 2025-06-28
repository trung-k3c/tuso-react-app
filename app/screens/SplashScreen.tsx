import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('TramChanKhong');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TUSO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    fontSize: 48,
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 2,
  }
});
