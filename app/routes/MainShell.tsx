// app/routes/MainShell.tsx
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
import { MainStackParamList } from '../../types';

// Screens “nội dung”
import HomeScreen from '../screens/HomeScreen';
import ExploreSelfScreen from '../screens/ExploreSelfScreen';
import IChingScreen from '../screens/IChingScreen';
import ChuaLanhCamXucScreen from '../screens/ChuaLanhCamXucScreen';
import KhaiMoVanMenhScreen from '../screens/KhaiMoVanMenhScreen';

// Chọn stack theo platform (web dùng stack thường cho animation ổn định)
const WebStack = createStackNavigator<MainStackParamList>();
const NativeStack = createNativeStackNavigator<MainStackParamList>();
const ContentStack = Platform.OS === 'web' ? WebStack : NativeStack;

export default function MainShell() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <TopNav title="TUSO" />
      <View style={[styles.content, { paddingBottom: insets.bottom + 60 }]}>
        <ContentStack.Navigator
          screenOptions={
            Platform.OS === 'web'
              ? {
                  headerShown: false,
                  gestureDirection: 'horizontal',
                  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }
              : { headerShown: false }
          }
        >
          <ContentStack.Screen name="Home" component={HomeScreen} />
          <ContentStack.Screen name="ExploreSelf" component={ExploreSelfScreen} />
          <ContentStack.Screen name="IChing" component={IChingScreen} />
          <ContentStack.Screen name="ChuaLanh" component={ChuaLanhCamXucScreen} />
          <ContentStack.Screen name="KhaiMo" component={KhaiMoVanMenhScreen} />
        </ContentStack.Navigator>
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1 },
});
