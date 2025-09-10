import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Easing } from 'react-native';
import BreathingDot from '../components/BreathingDot';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { $ } from '../lib/store';

const BREATH_PHASE_MS = 5000; // 2s hít / 2s thở
const FULL_CYCLE_MS = BREATH_PHASE_MS * 2;

export default function TramChanKhongScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // 1) Nhịp thở dùng chung cho Dot + text
  const breath = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(breath, {
          toValue: 1,
          duration: BREATH_PHASE_MS,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }),
        Animated.timing(breath, {
          toValue: 0,
          duration: BREATH_PHASE_MS,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }),
      ])
    );
    animation.start();
    return () => {
      animation.stop();
    };
  }, [breath]);

  // 2) Quotes hiển thị theo chu kỳ thở (đổi mỗi FULL_CYCLE_MS)
  const QUOTES = useMemo(
    () => [
      'Hít vào… trở về Trạm Chân Không.',
      'Thở ra… buông mọi vọng tưởng.',
      'Khoảnh khắc này là đủ.',
      'Tĩnh lặng – nơi ta bắt đầu.',
      'Lặng nghe nhịp thở của vũ trụ.',
      'Không – mà tròn đầy.',
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % QUOTES.length);
    }, FULL_CYCLE_MS);
    return () => clearInterval(id);
  }, [QUOTES.length]);

  // 3) Opacity đồng bộ nhịp thở (mềm: 0.4→1→0.4)
  const fade = breath.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.4, 1, 0.4],
  });

  const hasOnboarded = $.use((s) => s.hasOnboarded);
  const hasProfileSetup = $.use((s) => s.hasProfileSetup);
  const handleOpenGate = () => {
    if (hasOnboarded && hasProfileSetup) {
      navigation.navigate('Main', { screen: 'Home' });
    } else if (hasOnboarded) {
      navigation.navigate('ProfileSetup');
    } else {
      navigation.navigate('Onboarding');
    }
  };
  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fade }]}>{QUOTES[idx]}</Animated.Text>

      <View style={styles.dotContainer}>
        <BreathingDot progress={breath} />
      </View>

      <Pressable style={styles.openGate} onPress={handleOpenGate}>
        <Text style={styles.openGateText}>Chạm để mở cổng</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 24,
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 48,
    fontSize: 16,
    fontStyle: 'italic',
  },
  dotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  openGate: {
    paddingVertical: 16,
  },
  openGateText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
