import React,{useState, useEffect} from 'react';
import {StyleSheet, Alert} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView from "react-native-maps"

import Loading from "../components/Loading"
//const height = Dimensions.get("window").height;

const Map = ({ciudad, pais, region}) => {

    //En caso de que no llegue el dato, que no cargue.
   /*  if(!resultado)return null
    const {coord} = resultado;
    if(!coord) return null */

    const [resultadoLat, guardarResultadoLat] = useState(0);
    const [resultadoLong, guardarResultadoLong] = useState(0); 
   


   /*  useEffect(() => {
        const consultarCoord =  () => {
                 const opencage = require('opencage-api-client'); 
                 opencage
                .geocode({ q: "Mar del Plata, Argentina", key: '61666ed49345480b91961b57aa9b1e30' }) 
             
                .then((data) => {
                    const lat = data["results"][0].geometry.lat;
                    const long = data["results"][0].geometry.lng;
                    guardarResultadoLat(lat);
                    guardarResultadoLong(long);
            })
            .catch((error) => {
                console.log('Error caught:', error.message);
            });
            
            }
         
        consultarCoord();
      },);  */

      
      //Api de Open Cage-- Obtiene lat y long, según ciudad, región y pais
      useEffect(() => {
        const consultarCoord = async () => {
          
            const appId = '61666ed49345480b91961b57aa9b1e30'; 
            const url = `https://api.opencagedata.com/geocode/v1/json?q=${ciudad},${region},${pais}&key=${appId}`;
           
            /* const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${item.ciudad},${item.pais}&appid=${appId}`);
	        const data = await response.json();
	        console.log(data); */
            
            try {
                const respuesta = await fetch(url);
                const data = await respuesta.json();
                const lat = data["results"][0].geometry.lat;
                const long = data["results"][0].geometry.lng;
                //console.log(data);
                guardarResultadoLat(lat);
                guardarResultadoLong(long); 

            } catch (error) {
               mostrarAlerta();
            }
          
        }
        consultarCoord();
      });


    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'La ciudad no existe',
            [{text: 'Entendido'}]
        )
    }


   
   /*  let longYLat = 0;
    let latitud = 0;
    let longitud= 0;
    
    const opencage = require('opencage-api-client'); 
    opencage
     .geocode({ q: "Buenos Aires, Argentina", key: '61666ed49345480b91961b57aa9b1e30' })
    .then((data) => {
        //console.log(JSON.stringify(data["results"][0].geometry.lat));
        longYLat = data;
        longitud = longYLat["results"][0].geometry.lng;
        console.log(longitud);
        latitud = longYLat["results"][0].geometry.lat;
  
    })
  .catch((error) => {
    console.log('Error caught:', error.message);
    }); 
 */
    //(guardarResultadoLat != null && guardarResultadoLong != null)

        //resultadoLat = 125457;         
        //resultadoLong = 87282;
    
    
    //if(!resultadoLat && !!resultadoLong) return null

   
    //Aparece el loader si no hay datos
    if(resultadoLat ==0 && resultadoLong == 0) return     <Loading isVisible={true} text={"Cargando Mapa..."}/>
    
    
    return (
        <>
        <Loading isVisible={false} />
        <MapView
            style={styles.map}
            loadingEnabled={true}
            region={{
                latitude: resultadoLat,
                longitude: resultadoLong,
                latitudeDelta:1.500,
                longitudeDelta: 1.500, 
            }}
        >
            <MapView.Marker
               coordinate ={{
                    latitude: resultadoLat,
                    longitude:resultadoLong 
               }}
                title ={"Title 1"}
                description={"Description 1"} 
            />
        </MapView>
        </>
    )
    
    
}

const styles = StyleSheet.create({
    map:{
        height: 220,
        width: 370,
        marginHorizontal: 10,
        marginTop: 15,
    }
})

export default Map;