// app/routes/index.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import SplashScreen from '../screens/SplashScreen';
import TramChanKhongScreen from '../screens/TramChanKhongScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import LoadingProfileScreen from '../screens/LoadingProfileScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import HomeScreen from '../screens/HomeScreen';
import ExploreSelfScreen from '../screens/ExploreSelfScreen';
import IChingScreen from '../screens/IChingScreen';
import ChuaLanhCamXucScreen from '../screens/ChuaLanhCamXucScreen';
import KhaiMoVanMenhScreen from '../screens/KhaiMoVanMenhScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LaSoBatTuScreen from '../screens/LaSoBatTuScreen';
import LaSoTuViScreen from '../screens/LaSoTuViScreen';
import TongHopScreen from '../screens/TongHopScreen';
import GieoQueScreen from '../screens/GieoQueScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="TramChanKhong" component={TramChanKhongScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="LoadingProfile" component={LoadingProfileScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ExploreSelf" component={ExploreSelfScreen} />
      <Stack.Screen name="IChing" component={IChingScreen} />
      <Stack.Screen name="ChuaLanh" component={ChuaLanhCamXucScreen} />
      <Stack.Screen name="KhaiMo" component={KhaiMoVanMenhScreen} />
      <Stack.Screen
        name="LaSoBatTu"
        component={LaSoBatTuScreen}
        options={{
          presentation: 'transparentModal',
          animation: 'slide_from_bottom',
          contentStyle: { backgroundColor: 'transparent' },
        }}
      />
      <Stack.Screen
        name="LaSoTuVi"
        component={LaSoTuViScreen}
        options={{
          presentation: 'transparentModal',
          animation: 'slide_from_bottom',
          contentStyle: { backgroundColor: 'transparent' },
        }}
      />
      <Stack.Screen
        name="TongHop"
        component={TongHopScreen}
        options={{
          presentation: 'transparentModal',
          animation: 'slide_from_bottom',
          contentStyle: { backgroundColor: 'transparent' },
        }}
      />
      <Stack.Screen
        name="GieoQue"
        component={GieoQueScreen}
        options={{
          presentation: 'transparentModal',
          animation: 'slide_from_top',
          contentStyle: { backgroundColor: 'transparent' },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          presentation: 'transparentModal',
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: 'transparent' },
        }}
      />
    </Stack.Navigator>
  );
}
