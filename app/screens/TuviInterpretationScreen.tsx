import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/types';
import { useUserContext } from '../../context/UserDataContext';

export default function TuviInterpretationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
