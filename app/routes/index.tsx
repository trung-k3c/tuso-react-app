// app/routes/index.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import TramChanKhongScreen from '../screens/TramChanKhongScreen';
import OnboardingScreen from '../screens/OnboardingScreen';


const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="TramChanKhong" component={TramChanKhongScreen} />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{
          presentation: 'transparentModal',
          animation: 'slide_from_bottom',
          contentStyle: { backgroundColor: 'transparent' },
          // iOS có blur/transparent tốt; Android cần overlay View trong component
        }}
      />
    </Stack.Navigator>
  );
}
