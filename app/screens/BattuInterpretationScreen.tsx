import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useUserContext } from '../../context/UserDataContext';

export default function BattuInterpretationScreen() {
  const { userData, setUserData } = useUserContext();
  const [result, setResult] = useState('');

  useEffect(() => {
    // Mock fetch GPT luận giải
    if (userData) {
      setTimeout(() => {
        setResult(`🌿 ${userData.name}, bạn mang mệnh “Giáp Tý” – người tiên phong, độc lập và giàu nội lực. Sự nghiệp sáng khi biết đi chậm mà chắc, tránh nóng vội...`);
      }, 2000);
    }
  }, []);

  useEffect(() => {
    if (result && userData?.battu) {
      setUserData({
        battu: { ...userData.battu, interpretation: result },
      });
    }
  }, [result]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Luận giải AI - Bát Tự</Text>
      {result ? <Text style={styles.text}>{result}</Text> : <ActivityIndicator />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16 },
});
