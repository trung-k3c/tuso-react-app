import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BreathingDot from '../components/BreathingDot';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes/types'; // sửa lại path cho đúng
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export default function TramChanKhongScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trạm Chân Không</Text>
      <View style={styles.dotContainer}>
        <BreathingDot />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
        <Text style={styles.touchText}>0. Chân Không * touch to begin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 24,
    justifyContent: 'space-between'
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 48,
    fontSize: 16,
    fontStyle: 'italic'
  },
  dotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  touchText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32
  }
});
