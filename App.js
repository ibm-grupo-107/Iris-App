import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


import MainTabScreen from "./App/navigation/MainTabScreen";


export default function App() {
  return (
    <>
    <Welcome/>
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
