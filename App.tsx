import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Routes from './app/routes';
import SplashScreen from './app/screens/SplashScreen';
import { useAppStore } from './app/lib/store';

export default function App() {
  // Gate cho hydrate của zustand/persist
  const [hydrated, setHydrated] = useState<boolean>(
    (useAppStore as any).persist?.hasHydrated?.() ?? false
  );

  useEffect(() => {
    // Nếu đã hydrate sẵn (hot reload), cập nhật ngay
    if ((useAppStore as any).persist?.hasHydrated?.()) {
      setHydrated(true);
    }
    // Khi hydrate xong (lần đầu), setHydrated(true)
    (useAppStore as any).persist?.onFinishHydration?.(() => {
      setHydrated(true);
    });
  }, []);

  if (!hydrated) {
    // Hiển thị splash trong lúc chờ rehydrate store
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar style="light" />
          <SplashScreen />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Routes />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
