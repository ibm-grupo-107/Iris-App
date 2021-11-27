import React, {useEffect, useState} from "react";

//Importar el bottomNavigations
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//Importar iconos de Material:
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';

//Importar rutas de los Screens
import About from "../screens/About";
import AddCity from "../screens/addCity/AddCity";
import Home from "../screens/Home";
import ListCity from "../screens/listCity/ListCity"
//import Details from "../screens/details/Details";



const Tab = createMaterialBottomTabNavigator();

let localizacionesGuardadas = [];

const MainTabScreen = () =>{

  
    const [localizaciones, setLocalizacion] = useState([]);    

    return (
        <Tab.Navigator
          initialRouteName="Agregar Ciudad"
          activeColor="black"
          color="black"
          barStyle={{ backgroundColor: 'tomato'}}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Inicio',
              tabBarColor: "coral",
              tabBarIcon: ({ color }) => (
                <Ionicons name="md-home-sharp" size={26} color={color}/>
               // <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />

          <Tab.Screen name="ListCity"
                options={{
                  tabBarLabel: 'Mis Ciudades',
                  tabBarColor: "skyblue",
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="md-heart" size={26} color={color} />
                    //<MaterialCommunityIcons name="cards-heart" color={color} size={26} />
                  ),
                }}
                >
                {(props) => <ListCity localizaciones={localizaciones} setLocalizacion={setLocalizacion} localizacionesGuardadas={localizacionesGuardadas}/>}
          </Tab.Screen>

          <Tab.Screen name="Agregar Ciudad"
                options={{
                  tabBarLabel: 'Agregar Ciudad',
                  tabBarColor: "mediumaquamarine",
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="md-location-sharp" size={26} color={color} />
                    //<MaterialCommunityIcons name="map-marker-plus" color={color} size={26} />
                  ),
                }}
                >
                {(props) => <AddCity localizaciones={localizaciones} setLocalizacion={setLocalizacion} localizacionesGuardadas={localizacionesGuardadas}/>}
          </Tab.Screen>

          {/* <Tab.Screen name="Details"
                options={{
                  tabBarLabel: 'Clima',
                  tabBarColor: "lightsalmon",
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="weather-cloudy" size={26} color={color} />
                  ),
                }}
                >
                {(props) => <Details/>}
          </Tab.Screen> */}
           <Tab.Screen
            name="About"
            component={About}
            options={{
              tabBarLabel: 'Info App',
              tabBarColor: "plum",
              tabBarIcon: ({ color }) => (
                <Ionicons name="md-people" size={26} color={color} />
                //<MaterialCommunityIcons name="cog" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      );
}

export default MainTabScreen;