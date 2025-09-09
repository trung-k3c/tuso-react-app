import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Animated, Dimensions, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { height } = Dimensions.get('window');
const TOP_GAP = 60;
const SHEET_MAX_HEIGHT = height - TOP_GAP;

export default function ProfileSetupScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const translateY = useRef(new Animated.Value(SHEET_MAX_HEIGHT)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  const close = () => {
    Animated.timing(translateY, {
      toValue: SHEET_MAX_HEIGHT,
      duration: 220,
      useNativeDriver: true,
    }).start(() => nav.goBack());
  };

  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [birthPlace, setBirthPlace] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [noTime, setNoTime] = useState(false);
  const allFilled =
    name &&
    birthPlace &&
    day &&
    month &&
    year &&
    (noTime || (hour && minute));

  return (
    <View style={StyleSheet.absoluteFill}>
      <Pressable style={styles.overlay} onPress={close} />
      <Animated.View
        style={[styles.sheetContainer, { height: SHEET_MAX_HEIGHT, transform: [{ translateY }] }]}
      >
        <KeyboardAvoidingView
          style={styles.sheet}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Profile Setup</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#8a8a8a"
              value={name}
              onChangeText={setName}
            />
            <View style={styles.segment}>
              {(['male', 'female', 'other'] as const).map((opt) => (
                <Pressable
                  key={opt}
                  style={[styles.segmentItem, gender === opt && styles.segmentItemActive]}
                  onPress={() => setGender(opt)}
                >
                  <Text
                    style={[styles.segmentText, gender === opt && styles.segmentTextActive]}
                  >
                    {opt === 'male' ? 'Male' : opt === 'female' ? 'Female' : 'Other'}
                  </Text>
                </Pressable>
              ))}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Place of Birth"
              placeholderTextColor="#8a8a8a"
              value={birthPlace}
              onChangeText={setBirthPlace}
            />
            <View style={styles.dateSection}>
              <Picker
                selectedValue={day}
                onValueChange={(itemValue) => setDay(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Day" value="" />
                {Array.from({ length: 31 }, (_, i) => (
                  <Picker.Item
                    key={i + 1}
                    label={`${i + 1}`.padStart(2, '0')}
                    value={`${i + 1}`.padStart(2, '0')}
                  />
                ))}
              </Picker>
              <Picker
                selectedValue={month}
                onValueChange={(itemValue) => setMonth(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Month" value="" />
                {Array.from({ length: 12 }, (_, i) => (
                  <Picker.Item
                    key={i + 1}
                    label={`${i + 1}`.padStart(2, '0')}
                    value={`${i + 1}`.padStart(2, '0')}
                  />
                ))}
              </Picker>
              <Picker
                selectedValue={year}
                onValueChange={(itemValue) => setYear(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Year" value="" />
                {Array.from({ length: 100 }, (_, i) => {
                  const y = new Date().getFullYear() - i;
                  return <Picker.Item key={y} label={`${y}`} value={`${y}`} />;
                })}
              </Picker>
            </View>
            <View style={styles.row}>
              <Picker
                selectedValue={hour}
                onValueChange={(itemValue) => setHour(itemValue)}
                enabled={!noTime}
                style={[styles.picker, styles.timePicker, noTime && styles.pickerDisabled]}
              >
                <Picker.Item label="Hour" value="" />
                {Array.from({ length: 24 }, (_, i) => (
                  <Picker.Item
                    key={i}
                    label={`${i}`.padStart(2, '0')}
                    value={`${i}`.padStart(2, '0')}
                  />
                ))}
              </Picker>
              <Picker
                selectedValue={minute}
                onValueChange={(itemValue) => setMinute(itemValue)}
                enabled={!noTime}
                style={[styles.picker, styles.timePicker, noTime && styles.pickerDisabled]}
              >
                <Picker.Item label="Minute" value="" />
                {Array.from({ length: 60 }, (_, i) => (
                  <Picker.Item
                    key={i}
                    label={`${i}`.padStart(2, '0')}
                    value={`${i}`.padStart(2, '0')}
                  />
                ))}
              </Picker>
              <Pressable
                style={styles.checkboxRow}
                onPress={() => setNoTime((v) => !v)}
              >
                <View style={[styles.checkboxBox, noTime && styles.checkboxBoxChecked]} />
                <Text style={styles.checkboxLabel}>I don't remember</Text>
              </Pressable>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>Profile Details</Text>
              <Text style={styles.detailText}>Name: {name}</Text>
              <Text style={styles.detailText}>Gender: {gender}</Text>
              <Text style={styles.detailText}>Place: {birthPlace}</Text>
              <Text style={styles.detailText}>Date: {day && month && year ? `${day}/${month}/${year}` : ''}</Text>
              <Text style={styles.detailText}>
                Time: {noTime ? 'Unknown' : hour && minute ? `${hour}:${minute}` : ''}
              </Text>
            </View>
            <Pressable
              style={[styles.ctaButton, !allFilled && styles.ctaButtonDisabled]}
              disabled={!allFilled}
            >
              <Text style={styles.ctaText}>Khám Phá Bản Thân</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)' },
  sheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#111213',
  },
  sheet: {
    flex: 1,
    backgroundColor: '#111213',
  },
  content: {
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F2F2F2',
    textAlign: 'center',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#F2F2F2',
  },
  segment: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    overflow: 'hidden',
  },
  segmentItem: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  segmentItemActive: { backgroundColor: '#5AD1FF' },
  segmentText: { color: '#F2F2F2' },
  segmentTextActive: { color: '#041818', fontWeight: '800' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dateSection: { gap: 8 },
  picker: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    color: '#F2F2F2',
    backgroundColor: '#111213',
  },
  timePicker: { width: 80 },
  pickerDisabled: { color: '#8a8a8a' },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    marginRight: 6,
  },
  checkboxBoxChecked: {
    backgroundColor: '#5AD1FF',
  },
  checkboxLabel: { color: '#F2F2F2' },
  detailCard: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 12,
    gap: 4,
  },
  detailTitle: { color: '#F2F2F2', fontWeight: '800', marginBottom: 4 },
  detailText: { color: '#F2F2F2' },
  ctaButton: {
    marginTop: 20,
    backgroundColor: '#5AD1FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  ctaButtonDisabled: { backgroundColor: '#333' },
  ctaText: { color: '#041818', fontWeight: '800' },
});
