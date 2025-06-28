import { Animated, Easing, View, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';

export default function BreathingDot() {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.4,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad)
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad)
        })
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.dot, { transform: [{ scale }] }]} />
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff'
  }
});
