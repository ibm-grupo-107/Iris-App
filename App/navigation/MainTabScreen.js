import React, {useState} from "react";

//Importar el bottomNavigations
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//Importar iconos:
import { Ionicons } from '@expo/vector-icons';

//Importar rutas de los Screens
import About from "../screens/About";
import AddCity from "../screens/addCity/AddCity";
import Home from "../screens/Home";
import ListCity from "../screens/listCity/ListCity"




const Tab = createMaterialBottomTabNavigator();

let localizacionesGuardadas = []; // Lista Auxiliar para guardar las localizaciones cada vez q se abre la app

const MainTabScreen = () =>{

    //state para guardar localizaciones
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
              ),
            }}
          />

          <Tab.Screen name="ListCity"
                options={{
                  tabBarLabel: 'Mis Ciudades',
                  tabBarColor: "skyblue",
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="md-heart" size={26} color={color} />
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
                  ),
                }}
                >
                {(props) => <AddCity localizaciones={localizaciones} setLocalizacion={setLocalizacion} localizacionesGuardadas={localizacionesGuardadas}/>}
          </Tab.Screen>

           <Tab.Screen
            name="About"
            component={About}
            options={{
              tabBarLabel: 'Info App',
              tabBarColor: "plum",
              tabBarIcon: ({ color }) => (
                <Ionicons name="md-people" size={26} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      );
}

export default MainTabScreen;