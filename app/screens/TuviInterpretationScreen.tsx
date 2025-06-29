import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../routes/types';
import { useUserContext } from '../../context/UserDataContext';

export default function TuviInterpretationScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'TuviInterpretation'>>();
  const { tuviData } = route.params;
  const { setTuviData } = useUserContext();
  const [result, setResult] = useState('');

  useEffect(() => {
    // MOCK GPT
    setTimeout(() => {
      setResult(`🌙 ${tuviData.basic.name}, bạn có cung mệnh Cấn và mệnh chủ Thổ. Lá số cho thấy sự ổn định, đáng tin cậy và nội lực mạnh mẽ. Những sao chiếu như ${tuviData.saoChieuMenh?.join(', ')} cho thấy bạn là người vừa có trí tuệ vừa có tình cảm...`);
    }, 2000);
  }, []);

  useEffect(() => {
    if (result) {
      setTuviData({
        basic: tuviData.basic,
        tuviDetails: tuviData.tuviDetails ?? { saoChieuMenh: tuviData.saoChieuMenh || [] },
        interpretation: result,
      });
    }
  }, [result]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Luận giải AI – Tử Vi</Text>
      {result ? <Text style={styles.text}>{result}</Text> : <ActivityIndicator />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16 },
});
