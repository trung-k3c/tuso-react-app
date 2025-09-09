import { Animated, Easing, View, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';

type Props = {
  /** Progress 0→1→0 đồng bộ nhịp thở; nếu không truyền, component tự animate */
  progress?: Animated.Value;
};

export default function BreathingDot({ progress }: Props) {
  const local = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (progress) return; // dùng progress từ parent, không tự animate
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(local, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }),
        Animated.timing(local, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [progress, local]);

  const p = progress ?? local;

  const scale = p.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.4, 1],
  });

  return <Animated.View style={[styles.dot, { transform: [{ scale }] }]} />;
}

const styles = StyleSheet.create({
  dot: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
});
