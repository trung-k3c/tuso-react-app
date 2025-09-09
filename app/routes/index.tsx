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
