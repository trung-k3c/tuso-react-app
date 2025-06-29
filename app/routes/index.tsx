import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import TramChanKhongScreen from '../screens/TramChanKhongScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import InputInfoScreen from '../screens/InputInfoScreen'; // tạo sau
import BattuResultScreen from '../screens/BattuResultScreen';
import BattuInterpretationScreen from '../screens/BattuInterpretationScreen'; // tạo sau  
import TuviResultScreen from '../screens/TuviResultScreen'; // tạo sau
import TuviInterpretationScreen from '../screens/TuviInterpretationScreen'; // tạo sau
import MainScreen from '../screens/MainScreen'; // tạo sau
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
      <Stack.Screen name="TuviResult" component={TuviResultScreen} />
      <Stack.Screen name="BattuInterpretation" component={BattuInterpretationScreen} />
      <Stack.Screen name="TuviInterpretation" component={TuviInterpretationScreen} />
      <Stack.Screen name="Main" component={MainScreen} /> {/* MainScreen sẽ được tạo sau */}
    </Stack.Navigator>
  );
}
