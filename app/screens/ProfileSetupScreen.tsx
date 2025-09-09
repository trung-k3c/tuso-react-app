import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Animated, Dimensions, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
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
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.dateInput]}
                placeholder="DD"
                placeholderTextColor="#8a8a8a"
                keyboardType="numeric"
                value={day}
                onChangeText={setDay}
              />
              <TextInput
                style={[styles.input, styles.dateInput]}
                placeholder="MM"
                placeholderTextColor="#8a8a8a"
                keyboardType="numeric"
                value={month}
                onChangeText={setMonth}
              />
              <TextInput
                style={[styles.input, styles.dateInput]}
                placeholder="YYYY"
                placeholderTextColor="#8a8a8a"
                keyboardType="numeric"
                value={year}
                onChangeText={setYear}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.timeInput]}
                placeholder="HH"
                placeholderTextColor="#8a8a8a"
                keyboardType="numeric"
                value={hour}
                onChangeText={setHour}
                editable={!noTime}
              />
              <TextInput
                style={[styles.input, styles.timeInput]}
                placeholder="MM"
                placeholderTextColor="#8a8a8a"
                keyboardType="numeric"
                value={minute}
                onChangeText={setMinute}
                editable={!noTime}
              />
              <Pressable
                style={styles.checkboxRow}
                onPress={() => setNoTime((v) => !v)}
              >
                <View style={[styles.checkboxBox, noTime && styles.checkboxBoxChecked]} />
                <Text style={styles.checkboxLabel}>I don't remember</Text>
              </Pressable>
            </View>
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
  dateInput: { flex: 1 },
  timeInput: { width: 60 },
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
});
