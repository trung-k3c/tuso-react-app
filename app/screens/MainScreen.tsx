import React from 'react';
import { View, Text, Button, StyleSheet, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/types';
import { useUserContext } from '../../context/UserDataContext';

export default function MainScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { userData, setUserData } = useUserContext();

  const handleTouchTramChanKhong = () => {
    const showAlert = (title: string, message: string) => {
      if (Platform.OS === 'web') {
        window.alert(`${title}\n\n${message}`);
      } else {
        Alert.alert(title, message);
      }
    };
    if (!userData?.battu || !userData?.tuvi) {
      showAlert('Thông báo', 'Bạn cần xem Thiên Mệnh và Địa Duyên trước khi gieo quẻ.');
    } else {
    //   navigation.navigate('DivinationScreen');
        showAlert('Gieo Quẻ.', "Bạn đã gieo quẻ thành công tại Trạm Chân Không. Hãy xem kết quả trong phần Thiên Mệnh và Địa Duyên.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trạm Chân Không</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Xem Thiên Mệnh (Bát Tự)"
          onPress={() => navigation.navigate('BattuResult')}
        />

        <Button
          title="Xem Địa Duyên (Tử Vi)"
          onPress={() => navigation.navigate('TuviResult')}
        />
      </View>

      <Button title="Gieo tại Trạm Chân Không" onPress={handleTouchTramChanKhong} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  buttonContainer: { marginBottom: 40, gap: 10 },
});