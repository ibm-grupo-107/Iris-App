import React, {useState, useEffect} from "react";

//Importar el bottomNavigations
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//Importar iconos de Material:
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


//Importar rutas de los Screens
import About from "../screens/About";
import AddCity from "../screens/addCity/AddCity";
import City from "../screens/city/City";
import Home from "../screens/Home";
import ListCity from "../screens/listCity/ListCity"


const Tab = createMaterialBottomTabNavigator();


const MainTabScreen = () =>{

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
          <Tab.Screen name="City"
            options={{
              tabBarLabel: 'Ciudad',
              tabBarColor: "lightsalmon",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="heart" color={color} size={26} />
              ),
            }}
                >
                {(props) => <City resultado={resultado}/>}
          </Tab.Screen>

          <Tab.Screen name="Agregar Ciudad"
                options={{
                  tabBarLabel: 'Agregar Ciudad',
                  tabBarColor: "mediumaquamarine",
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="map-marker-plus" color={color} size={26} />
                  ),
                }}
                >
                {(props) => <AddCity busqueda={busqueda} guardarBusqueda={guardarBusqueda} guardarConsultar={guardarConsultar}/>}
          </Tab.Screen>
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

