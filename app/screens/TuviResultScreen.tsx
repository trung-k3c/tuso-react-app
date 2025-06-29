import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/types';

type TuviResultRouteProp = RouteProp<RootStackParamList, 'TuviResult'>;

export default function TuviResultScreen() {
  const route = useRoute<TuviResultRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { tuviData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Địa Duyên – Lá số Tử Vi</Text>
      <Text style={styles.text}>Tên: {tuviData.basic.name}</Text>
      <Text style={styles.text}>Ngày Giờ Sinh: {tuviData.basic.birthDate.toString()}</Text>
      <Text style={styles.text}>Cung Mệnh: {tuviData.basic.birthHour}</Text>
      <Text style={styles.text}>Mệnh Chủ: {tuviData.cungMenh}</Text>
      <Text style={styles.text}>Sao chiếu mệnh: {tuviData.saoChieuMenh?.join(', ')}</Text>

      <Button title="Luận giải AI" onPress={() => navigation.navigate('TuviInterpretation', { tuviData })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 8 },
});
