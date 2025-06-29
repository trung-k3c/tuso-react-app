import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function InputInfoScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Nam');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthHour, setBirthHour] = useState('Tý');

  const canhGio = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

  const handleNext = async () => {
    // MOCK CALL: Sau sẽ gọi API thật
    const battuData = {
      name, gender, birthDate, birthHour,
      stems: ['Giáp', 'Tân', 'Canh', 'Mậu'],
      branches: ['Tý', 'Dần', 'Ngọ', 'Hợi'],
    };
    navigation.navigate('BattuResult', { battuData });
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

      <Text style={styles.label}>Giờ sinh:</Text>
      <Picker selectedValue={birthHour} onValueChange={setBirthHour}>
        {canhGio.map(g => <Picker.Item key={g} label={g} value={g} />)}
      </Picker>

      <Button title="Xem Thiên Mệnh" onPress={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  label: { marginTop: 20, fontSize: 16 },
  input: { borderBottomWidth: 1, padding: 8, fontSize: 16 },
});
