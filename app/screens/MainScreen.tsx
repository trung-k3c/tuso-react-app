import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/types';
import { useUserContext } from '../../context/UserDataContext';

export default function MainScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { userData, setUserData } = useUserContext();

  const handleTouchTramChanKhong = () => {
    if (!userData?.battu || !userData?.tuvi) {
      Alert.alert('Thông báo', 'Bạn cần xem Thiên Mệnh và Địa Duyên trước khi gieo quẻ.');
    } else {
    //   navigation.navigate('DivinationScreen');
        Alert.alert('Gieo Quẻ.');
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