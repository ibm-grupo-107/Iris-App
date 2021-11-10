import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler'

import MainTabScreen from "./App/navigation/MainTabScreen";

export default function App() {
  
  return (
  <GestureHandlerRootView style={{flex: 1}}>
    <NavigationContainer>
      <MainTabScreen />
    </NavigationContainer>
  </GestureHandlerRootView>
  );    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
