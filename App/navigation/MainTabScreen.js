import React from "react";

//Importar el bottomNavigations
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//Importar iconos de Material:
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


//Importar rutas de los Screens
import About from "../screens/About";
import AddCity from "../screens/AddCity";
import City from "../screens/City";
import Home from "../screens/Home";
import ListCity from "../screens/ListCity"


const Tab = createMaterialBottomTabNavigator();


const MainTabScreen = () =>{
    return (
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#fff"
          barStyle={{ backgroundColor: 'tomato'}}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Inicio',
              tabBarColor: "lightcoral",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="City"
            component={City}
            options={{
              tabBarLabel: 'Ciudad',
              tabBarColor: "lightsalmon",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="heart" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="AddCity"
            component={AddCity}
            options={{
              tabBarLabel: 'Agregar Ciudad',
              tabBarColor: "mediumaquamarine",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="map-marker-plus" color={color} size={26} />
              ),
            }}
          />
           <Tab.Screen
            name="ListCity"
            component={ListCity}
            options={{
              tabBarLabel: 'Mis ciudades',
              tabBarColor: "skyblue",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home-city" color={color} size={26} />
              ),
            }}
          />
           <Tab.Screen
            name="About"
            component={About}
            options={{
              tabBarLabel: 'Info App',
              tabBarColor: "plum",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cog" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      );
}

export default MainTabScreen;

