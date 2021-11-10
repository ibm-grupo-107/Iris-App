import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Alert} from 'react-native';

import ListCity from './App/screens/listCity/ListCity';
import City from './App/screens/city/City';
import AddCity from './App/screens/addCity/AddCity';

import MainTabScreen from "./App/navigation/MainTabScreen";


export default function App() {
  return (
    <>
    <NavigationContainer>
      <MainTabScreen/>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const Stack = createNativeStackNavigator();

export default function App() {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: '',
  });

  const  [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});

  const {ciudad, pais} = busqueda;

  useEffect(() => {
    const consultarClima = async () => {
      if(consultar) {
        const appId = '319fa4c56018832ed2e37833430f4cca'; 
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
      
        try {
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            guardarResultado(resultado);
            guardarConsultar(false);
        } catch (error) {
           mostrarAlerta();
        }
      }
    }
    consultarClima();
  }, [consultar]);

  const mostrarAlerta = () => {
      Alert.alert(
          'Error',
          'Ciudad inválida',
          [{text: 'OK'}]
      )
}

  return (
  <GestureHandlerRootView style={{flex: 1}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Mis Ciudades" component={ListCity} />
        <Stack.Screen name="Mi Ciudad">
            {(props) => <City resultado={resultado}/>}
        </Stack.Screen>
        <Stack.Screen name="Agregar Ciudad">
            {(props) => <AddCity busqueda={busqueda} guardarBusqueda={guardarBusqueda} guardarConsultar={guardarConsultar}/>}
        </Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  </GestureHandlerRootView>
  );    
};

