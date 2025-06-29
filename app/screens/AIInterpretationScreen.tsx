import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../routes/types';

export default function AIInterpretationScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'AIInterpretation'>>();
  const { battuData } = route.params;
  const [result, setResult] = useState('');

  useEffect(() => {
    // Mock fetch GPT luận giải
    setTimeout(() => {
      setResult(`🌿 ${battuData.name}, bạn mang mệnh “Giáp Tý” – người tiên phong, độc lập và giàu nội lực. Sự nghiệp sáng khi biết đi chậm mà chắc, tránh nóng vội...`);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Luận giải AI</Text>
      {result ? <Text style={styles.text}>{result}</Text> : <ActivityIndicator />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16 },
});
