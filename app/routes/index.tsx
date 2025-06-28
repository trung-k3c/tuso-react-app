import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import TramChanKhongScreen from '../screens/TramChanKhongScreen';
import OnboardingScreen from '../features/onboarding/screens/OnboardingScreen';
// import InputInfoScreen from '../features/user/screens/InputInfoScreen'; // tạo sau


const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="TramChanKhong" component={TramChanKhongScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        {/* <Stack.Screen name="InputInfo" component={InputInfoScreen} /> */}
    </Stack.Navigator>
  );
}
