import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BattuData } from '../routes/types'; // Adjust the import path as necessary

type RootStackParamList = {
  BattuResult: { battuData: BattuData };
};

type BattuResultRouteProp = RouteProp<RootStackParamList, 'BattuResult'>;

export default function BattuResultScreen() {
  const route = useRoute<BattuResultRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { battuData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thiên Mệnh của {battuData.name}</Text>
      <Text style={styles.label}>Tứ trụ:</Text>
      <Text style={styles.text}>Can: {battuData.stems.join(' - ')}</Text>
      <Text style={styles.text}>Chi: {battuData.branches.join(' - ')}</Text>
      <Button title="Luận giải AI" onPress={() => navigation.navigate('AIInterpretation', { battuData })} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginTop: 10 },
  text: { fontSize: 16 },
});
