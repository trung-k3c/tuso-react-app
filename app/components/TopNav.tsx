import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  title: string;
  onSearchPress?: () => void;
  onBellPress?: () => void;
}

export default function TopNav({ title, onSearchPress, onBellPress }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  const hit = { top: 10, bottom: 10, left: 10, right: 10 };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>

        <View style={styles.actions}>
          <Pressable
            onPress={onSearchPress}
            hitSlop={hit}
            android_ripple={{ borderless: true }}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Search"
          >
            <Ionicons name="search-outline" size={22} color={ICON_COLOR} />
          </Pressable>

          <Pressable
            onPress={onBellPress}
            hitSlop={hit}
            android_ripple={{ borderless: true }}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={22} color={ICON_COLOR} />
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Profile')}
            hitSlop={hit}
            android_ripple={{ borderless: true }}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Open profile"
          >
            <Ionicons name="person-circle-outline" size={24} color={ICON_COLOR} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const HEIGHT = 56;
const ICON_COLOR = '#0B0B0B';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#71F6C8',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 3 },
      default: {}, // web
    }),
    borderBottomColor: 'rgba(0,0,0,0.06)',
    borderBottomWidth: Platform.OS === 'web' ? 1 : StyleSheet.hairlineWidth,
  },
  row: {
    height: HEIGHT,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flexShrink: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#0B0B0B',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 40,
    height: 40,
    marginLeft: 4,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
});
