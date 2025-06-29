import React, { useState } from 'react';
import { Platform } from 'react-native';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/types';
import { useUserContext } from '../../context/UserDataContext';

export default function InputInfoScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setUserData } = useUserContext();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Nam');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthHour, setBirthHour] = useState('Tý (23:00 - 01:00)');

  const canhGio = [
    'Tý (23:00 - 01:00)', 
    'Sửu (01:00 - 03:00)', 
    'Dần (03:00 - 05:00)', 
    'Mão (05:00 - 07:00)', 
    'Thìn (07:00 - 09:00)', 
    'Tỵ (09:00 - 11:00)', 
    'Ngọ (11:00 - 13:00)', 
    'Mùi (13:00 - 15:00)', 
    'Thân (15:00 - 17:00)', 
    'Dậu (17:00 - 19:00)', 
    'Tuất (19:00 - 21:00)', 
    'Hợi (21:00 - 23:00)' 
  ];


  const handleStart = () => {
    setUserData({ name, gender, birthDate, birthHour });
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Họ tên:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Giới tính:</Text>
      <Picker selectedValue={gender} onValueChange={setGender}>
        <Picker.Item label="Nam" value="Nam" />
        <Picker.Item label="Nữ" value="Nữ" />
        <Picker.Item label="Khác" value="Khác" />
      </Picker>

      <Text style={styles.label}>Ngày sinh:</Text>
      {Platform.OS === 'web' ? (
        <input
          type="date"
          value={birthDate.toISOString().slice(0, 10)}
          onChange={(e) => {
            const parsed = new Date(e.target.value);
            if (!isNaN(parsed.getTime())) setBirthDate(parsed);
          }}
          style={{
            fontSize: 16,
            padding: 8,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
            marginBottom: 20,
          }}
        />
      ) : (
        <>
          <Button title={birthDate.toDateString()} onPress={() => setShowDatePicker(true)} />
          {showDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              onChange={(e, date) => {
                setShowDatePicker(false);
                if (date) setBirthDate(date);
              }}
            />
          )}
        </>
      )}

      <Text style={styles.label}>Giờ sinh:</Text>
      <Picker selectedValue={birthHour} onValueChange={setBirthHour}>
        {canhGio.map(g => <Picker.Item key={g} label={g} value={g} />)}
      </Picker>

      {/* <Button title="Xem Thiên Mệnh" onPress={xemBatTu} />
      <Button title="Xem Địa Duyên Mệnh" onPress={xemTuVi} /> */}
      <Button title="Bắt đầu trải nghiệm" onPress={handleStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  label: { marginTop: 20, fontSize: 16 },
  input: { borderBottomWidth: 1, padding: 8, fontSize: 16 },
});
