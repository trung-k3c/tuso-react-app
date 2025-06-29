import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/types';
import { useUserContext } from '../../context/UserDataContext';

export default function BattuInterpretationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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

      <Button
        title="🔙 Quay về màn chính"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16 },
});
