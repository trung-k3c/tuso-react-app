import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import TramChanKhongScreen from '../screens/TramChanKhongScreen';
import OnboardingScreen from '../features/onboarding/screens/OnboardingScreen';
import InputInfoScreen from '../features/onboarding/screens/InputInfoScreen'; // tạo sau
import BattuResultScreen from '../screens/BattuResultScreen';
import AIInterpretationScreen from '../screens/AIInterpretationScreen'; // tạo sau  
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="TramChanKhong" component={TramChanKhongScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="InputInfo" component={InputInfoScreen} />
      <Stack.Screen name="BattuResult" component={BattuResultScreen} />
      <Stack.Screen name="AIInterpretation" component={AIInterpretationScreen} />
    </Stack.Navigator>
  );
}
