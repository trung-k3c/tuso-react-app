import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useUserContext } from '../../context/UserDataContext';

export default function TuviInterpretationScreen() {
  const { userData, setUserData } = useUserContext();
  const [result, setResult] = useState('');

  useEffect(() => {
    // MOCK GPT
    if (userData?.tuvi) {
      setTimeout(() => {
        setResult(`🌙 ${userData.name}, bạn có cung mệnh Cấn và mệnh chủ Thổ. Lá số cho thấy sự ổn định, đáng tin cậy và nội lực mạnh mẽ. Những sao chiếu như ${userData.tuvi?.tuviDetails.saoChieuMenh.join(', ')} cho thấy bạn là người vừa có trí tuệ vừa có tình cảm...`);
      }, 2000);
    }
  }, []);

  useEffect(() => {
    if (result && userData?.tuvi) {
      setUserData({
        tuvi: { ...userData.tuvi, interpretation: result },
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
