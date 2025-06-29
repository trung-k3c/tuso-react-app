import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/types';
import { useUserContext } from '../../context/UserDataContext';

export default function MainScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { battuData, tuviData } = useUserContext();
  const [hasBattuResult, setHasBattuResult] = useState(false);
  const [hasTuviResult, setHasTuviResult] = useState(false);

  const handleTouchTramChanKhong = () => {
    if (!hasBattuResult || !hasTuviResult) {
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
        <Button title="Xem Thiên Mệnh (Bát Tự)" onPress={() => {
          setHasBattuResult(true);
          navigation.navigate('BattuResult', { battuData });
        }} />

        <Button title="Xem Địa Duyên (Tử Vi)" onPress={() => {
          setHasTuviResult(true);
          navigation.navigate('TuviResult', { tuviData });
        }} />
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