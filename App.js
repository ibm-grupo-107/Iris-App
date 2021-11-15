import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';

import AsyncStorage from '@react-native-async-storage/async-storage';
import MainTabScreen from "./App/navigation/MainTabScreen";
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from "./App/screens/Welcome"
import OnBoardingScreen from "./App/screens/OnBoardingScreen";

const AppStack= createStackNavigator();


export default function App() {
  
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  // uso de AsyncStorage para chequear si ya fue lanzada la app.
  useEffect(()=>{
    AsyncStorage.getItem("alreadyLaunched").then(value => {
      if(value == null){
        AsyncStorage.setItem("alreadyLaunched","true");
        setIsFirstLaunch(true);
      } else{
        setIsFirstLaunch(false);
      }
    })
  }, []);

  // Si es la primera vez que se inicia la App: cargar Welcome + Slider
  if ( isFirstLaunch === true){
      return(
        <>
          <Welcome/> ;  
          <StatusBar style="dark" backgroundColor= "#FFF" />
          <NavigationContainer>
            <AppStack.Navigator>
              <AppStack.Screen name = "OnBoarding" component={OnBoardingScreen}
              options={{header: () => null}}
              />
              <AppStack.Screen name = "Main" component = {MainTabScreen}
              options={{header: () => null}}
              />
            </AppStack.Navigator>
          </NavigationContainer>
        </>
      )
  
  //Si ya se inició antes la app: cargar Welcome + menú principal
  }else{
    return (
      <>
      <Welcome/>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
           <MainTabScreen />
        </NavigationContainer>
      </GestureHandlerRootView>
      </>
    );  
  } 

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
