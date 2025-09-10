import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import Routes from './app/routes';
import { loadOnboardingState, loadProfileState } from './app/lib/persistence';
import { useAppStore } from './app/lib/store';

export default function App() {
  useEffect(() => {
    (async () => {
      const [hasOnboarded, hasProfileSetup] = await Promise.all([
        loadOnboardingState(),
        loadProfileState(),
      ]);
      useAppStore.setState({ hasOnboarded, hasProfileSetup });
    })();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Routes />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

