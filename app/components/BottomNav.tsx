import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Alert } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, MainStackParamList } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Nav = NativeStackNavigationProp<RootStackParamList>;
// const rootNav = useNavigation<Nav>();

const TABS = [
  { key: 'Home',        label: 'Trang chủ',  icon: (f:boolean) => (f ? 'home'   : 'home-outline') },
  { key: 'ExploreSelf', label: 'Khám phá',   icon: (f:boolean) => (f ? 'person' : 'person-outline') },
  { key: 'IChing',      label: 'Soi đường',  icon: (f:boolean) => (f ? 'book'   : 'book-outline') },
  { key: 'ChuaLanh',    label: 'Chữa lành',  icon: (f:boolean) => (f ? 'heart'  : 'heart-outline'), disabled: true },
  { key: 'KhaiMo',      label: 'Khai mở',    icon: (f:boolean) => (f ? 'star'   : 'star-outline') },
];

const TAB_HEIGHT = 60;

// Lấy tên route sâu nhất trong nested navigator
function useCurrentMainRouteName() {
  return useNavigationState((state) => {
    // state ở đây là của RootStack (vì BottomNav nằm ngoài ContentStack)
    const currentRoot = state.routes[state.index];

    // Khi đang ở Shell, route hiện tại sẽ là "Main"
    if (currentRoot?.name !== 'Main') return null;

    const getDeepest = (navState: any): string | null => {
      if (!navState || !navState.routes || typeof navState.index !== 'number') return null;
      const r = navState.routes[navState.index];
      // nếu còn lồng nữa thì đi tiếp
      if (r?.state) return getDeepest(r.state);
      return r?.name ?? null;
    };

    // Nested state của route "Main"
    const nested = (currentRoot as any).state;
    return getDeepest(nested) ?? 'Home'; // default nếu state chưa kịp có
  });
}

export default function BottomNav() {
  const rootNav = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const current = useCurrentMainRouteName();
  // const routeName = useNavigationState((state) => state?.routes[state.index]?.name);

  const bottomPad = Math.max(insets.bottom, 8);
  const activeColor = '#0ba8f0ff';
  const inactiveColor = '#6B7280';

  const go = (screen: keyof MainStackParamList) => {
    rootNav.navigate('Main', { screen }); // ← đổi nested screen bên trong Main
  };

  return (
    <View
      style={[
        styles.container,
        Platform.OS === 'web' ? styles.containerWeb : null,
        { paddingBottom: bottomPad },
      ]}
    >
      {TABS.map((tab) => {
        const focused = current === tab.key;
        const color = focused ? activeColor : inactiveColor;

        const onPress = () => {
          if (tab.disabled) {
            Alert.alert('Coming Soon', 'Tính năng đang được phát triển');
            return;
          }
          go(tab.key as keyof MainStackParamList);
        };

        return (
          <Pressable
            key={tab.key}
            onPress={onPress}
            style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
            android_ripple={{ borderless: true }}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name={tab.icon(focused) as any} size={22} color={color} />
            <Text style={[styles.label, { color }]} numberOfLines={1}>
              {tab.label}
            </Text>

            {tab.disabled && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Soon</Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',

    paddingTop: 6,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.08)',

    // shadow/elevation
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: -2 },
      },
      android: { elevation: 8 },
      default: {},
    }),
  },
  // Dính đáy khi chạy web
  containerWeb: {
    position: 'absolute',
  },
  item: {
    height: TAB_HEIGHT,
    minWidth: 64,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  itemPressed: {
    opacity: 0.6,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 8,
    backgroundColor: '#ef4444',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#fff',
  },
});