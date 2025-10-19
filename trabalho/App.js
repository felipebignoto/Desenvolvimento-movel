import * as React from 'react';
import { Text, View } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import SecondScreen from './screens/SecondScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
 <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} 
             options={{ title: 'Bem Vindo' }}/>
        <Stack.Screen name="SecondScreen" component={SecondScreen} 
             options={{ title: 'Tela' }}/>
             </Stack.Navigator>
    </NavigationContainer>
  );
}

