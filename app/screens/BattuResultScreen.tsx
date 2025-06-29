import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/types';
import { useUserContext } from '../../context/UserDataContext';

export default function BattuResultScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { userData, setUserData } = useUserContext();

  useEffect(() => {
    if (userData && !userData.battu) {
      setUserData({ battu: { stems: ['Giáp', 'Tân', 'Canh', 'Mậu'], branches: ['Tý', 'Dần', 'Ngọ', 'Hợi'] } });
    }
  }, []);

  if (!userData?.battu) return null;
  const battuData = userData.battu;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thiên Mệnh của {userData?.name}</Text>
      <Text style={styles.title}>Ngày Sinh: {userData?.birthDate.toString()}</Text>
      <Text style={styles.title}>Giờ Sinh: {userData?.birthHour}</Text>
      <Text style={styles.label}>Tứ trụ:</Text>
      <Text style={styles.text}>Can: {battuData.stems?.join(' - ')}</Text>
      <Text style={styles.text}>Chi: {battuData.branches?.join(' - ')}</Text>

      <Button title="Luận giải AI" onPress={() => navigation.navigate('BattuInterpretation')} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginTop: 10 },
  text: { fontSize: 16 },
});
