import * as React from 'react';
import { Text, View } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import Main from './screens/Principal';
import Cadastro from './screens/Cadastro';
import Receitas from './screens/AdicionarReceita';
import Despesas from './screens/AdicionarDespesa';
import ListaReceitas from './screens/ListaReceitas';
import ListaDespesas from './screens/ListaDespesas';
import Graficos from './screens/graficos';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} 
          options={{ title: 'Bem Vindo' }}/>
        <Stack.Screen name="Principal" component={Main} 
          options={{ title: 'Tela' }}/>
        <Stack.Screen name="Cadastro" component={Cadastro}
          options={{ title: 'Cadastro' }}/>
        <Stack.Screen name="AdicionarReceita" component={Receitas}
          options={{ title: 'Receita' }}/>
        <Stack.Screen name="AdicionarDespesa" component={Despesas}
          options={{ title: 'Despesa' }}/>
        <Stack.Screen name="ListaReceitas" component={ListaReceitas}
          options={{ title: 'Receitas' }}/>
        <Stack.Screen name="ListaDespesas" component={ListaDespesas}
          options={{ title: 'Despesas' }}/>
        <Stack.Screen name="Graficos" component={Graficos}
            options={{ title: 'Gráficos Financeiros' }} />

     </Stack.Navigator>
    </NavigationContainer>
  );
}