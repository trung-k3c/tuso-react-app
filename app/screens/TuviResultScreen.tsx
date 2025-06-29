import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/types';
import { useUserContext } from '../../context/UserDataContext';

export default function TuviResultScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { userData, setUserData } = useUserContext();

  useEffect(() => {
    if (userData && !userData.tuvi) {
      setUserData({ tuvi: { tuviDetails: { saoChieuMenh: ['Thái Âm', 'Thiên Cơ'] } } });
    }
  }, []);

  if (!userData?.tuvi) return null;
  const tuviData = userData.tuvi;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Địa Duyên – Lá số Tử Vi</Text>
      <Text style={styles.text}>Tên: {userData?.name}</Text>
      <Text style={styles.text}>Ngày Giờ Sinh: {userData?.birthDate.toString()}</Text>
      <Text style={styles.text}>Giờ Sinh: {userData?.birthHour}</Text>
      <Text style={styles.text}>Sao chiếu mệnh: {tuviData.tuviDetails.saoChieuMenh?.join(', ')}</Text>

      <Button title="Luận giải AI" onPress={() => navigation.navigate('TuviInterpretation')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 8 },
});
