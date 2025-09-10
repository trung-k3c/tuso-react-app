// app/routes/index.tsx
import { Platform } from 'react-native';
import { RootStackParamList } from '../../types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import TramChanKhongScreen from '../screens/TramChanKhongScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import LoadingProfileScreen from '../screens/LoadingProfileScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

// Modal/overlay screens
import ProfileScreen from '../screens/ProfileScreen';
import LaSoBatTuScreen from '../screens/LaSoBatTuScreen';
import LaSoTuViScreen from '../screens/LaSoTuViScreen';
import TongHopScreen from '../screens/TongHopScreen';
import GieoQueScreen from '../screens/GieoQueScreen';

import MainShell from './MainShell';

const WebStack = createStackNavigator<RootStackParamList>();
const NativeStack = createNativeStackNavigator<RootStackParamList>();
const Stack = Platform.OS === 'web' ? WebStack : NativeStack;

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />

      {/* Onboarding flow */}
      <Stack.Screen name="TramChanKhong" component={TramChanKhongScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="LoadingProfile" component={LoadingProfileScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />

      {/* Shell cố định (Top/BottomNav) + nested stack nội dung */}
      <Stack.Screen name="Main" component={MainShell} />

      {/* Các màn overlay/modal */}
      <Stack.Screen
        name="LaSoBatTu"
        component={LaSoBatTuScreen}
        options={
          Platform.OS === 'web'
            ? {
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                cardStyle: { backgroundColor: 'transparent' },
              }
            : {
                presentation: 'modal',
                animation: 'slide_from_bottom',
                contentStyle: { backgroundColor: '#fff' },
              }
        }
      />
      <Stack.Screen
        name="LaSoTuVi"
        component={LaSoTuViScreen}
        options={
          Platform.OS === 'web'
            ? {
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                cardStyle: { backgroundColor: 'transparent' },
              }
            : {
                presentation: 'modal',
                animation: 'slide_from_bottom',
                contentStyle: { backgroundColor: '#fff' },
              }
        }
      />
      <Stack.Screen
        name="TongHop"
        component={TongHopScreen}
        options={
          Platform.OS === 'web'
            ? {
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                cardStyle: { backgroundColor: 'transparent' },
              }
            : {
                presentation: 'modal',
                animation: 'slide_from_bottom',
                contentStyle: { backgroundColor: '#fff' },
              }
        }
      />
      <Stack.Screen
        name="GieoQue"
        component={GieoQueScreen}
        options={
          Platform.OS === 'web'
            ? {
                gestureDirection: 'vertical',
                cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
                cardStyle: { backgroundColor: 'transparent' },
              }
            : {
                presentation: 'modal',
                animation: 'slide_from_bottom',
                contentStyle: { backgroundColor: '#fff' },
              }
        }
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={
          Platform.OS === 'web'
            ? {
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: { backgroundColor: 'transparent' },
              }
            : {
                presentation: 'modal',
                animation: 'slide_from_bottom',
                contentStyle: { backgroundColor: '#fff' },
              }
        }
      />
    </Stack.Navigator>
  );
}
