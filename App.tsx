// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Routes from './app/routes';
import { UserProvider } from './context/UserDataContext';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <UserProvider>
        <Routes />
      </UserProvider>
    </NavigationContainer>
  );
}



