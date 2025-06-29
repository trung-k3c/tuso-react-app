import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { slides } from '../data/slides';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/types'; // sửa lại path cho đúng
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function OnboardingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleDone = () => {
    navigation.navigate('InputInfo'); // sẽ tạo màn này sau
  };

  return (
    <Swiper loop={false} showsButtons>
      {slides.map((slide, index) => (
        <View key={slide.key} style={styles.slide}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.text}>{slide.text}</Text>
          {index === slides.length - 1 && (
            <TouchableOpacity onPress={handleDone}>
              <Text style={styles.continue}>TIẾP TỤC</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 20,
    fontWeight: '600'
  },
  text: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center'
  },
  continue: {
    marginTop: 40,
    color: '#fff',
    fontSize: 18
  }
});
