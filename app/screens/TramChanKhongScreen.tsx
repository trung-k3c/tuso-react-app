import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { $ } from '../lib/store';

// 1 nhịp hít + thở (VD: 4s hít + 4s thở)
const BREATH_PHASE_MS = 4000;
const FULL_CYCLE_MS = BREATH_PHASE_MS * 2;

export default function TramChanKhongScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Nhịp thở 0 → 1 → 0 dùng chung cho dot + (nếu muốn) các hiệu ứng khác
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
    return () => animation.stop();
  }, [breath]);

  // Quotes: đổi mỗi FULL_CYCLE_MS (đồng bộ nhịp thở)
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

  // Typing animation cho quote hiện tại
  const [typed, setTyped] = useState('');
  useEffect(() => {
    const text = QUOTES[idx];
    setTyped('');
    let i = 0;
    const speed = 35; // ms/char (chỉnh nếu muốn nhanh/chậm)
    const t = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [idx, QUOTES]);

  // Dot scale theo nhịp thở (1 → 1.4 → 1)
  const dotScale = breath.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.4, 1],
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
    // Toàn màn hình touchable để mở cổng
    <Pressable style={styles.container} onPress={handleOpenGate}>
      {/* Quote gõ chữ */}
      <Text style={styles.title} numberOfLines={3}>
        {typed}
        <Text style={styles.caret}>|</Text>
      </Text>

      {/* Breathing Dot (đã merge vào màn) */}
      <View style={styles.dotContainer}>
        <Animated.View style={[styles.dot, { transform: [{ scale: dotScale }] }]} />
      </View>

      {/* Không còn nút "Chạm để mở cổng" */}
      <View style={{ height: 24 }} />
    </Pressable>
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
    lineHeight: 22,
  },
  caret: {
    color: '#fff',
    opacity: 0.8,
  },
  dotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  dot: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
});
