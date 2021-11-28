import React,{useState, useEffect} from 'react';
import {StyleSheet, Alert} from 'react-native';
import MapView from "react-native-maps"

import Loading from "../components/Loading"

const Map = ({ciudad, pais, cerrarMap}) => {  


    const [resultadoLat, guardarResultadoLat] = useState(0);
    const [resultadoLong, guardarResultadoLong] = useState(0); 

    //Busca la ciudad ingresada
    useEffect(() => {
        const consultarCoord = async () => {

            const appId = '20a8b2301f4640e37946ef27389183d7'; //inserta tu API Key aquí
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

             try {
        
                const response = await fetch(url);
	            const data = await response.json();
                if(data.cod === "404"){ //validar la ciudad antes de agregarla a la lista
                    mostrarAlerta();
                    cerrarMap();
                    return;
                }
                else{
                    
                    const lat = data.coord.lat
                    const long = data.coord.lon
                
                    guardarResultadoLat(lat);
                    guardarResultadoLong(long); 

                }
            } catch (error) {
               mostrarAlerta();
               cerrarMap();
            }
        }    
        consultarCoord();      
    });

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Ciudad inexistente',
            [{text: 'Entendido'}]
        )
        cerrarMap();
        return <Loading isVisible={false}/>
    }

    //Si no se pasan datos de ciudad no carga el loader
    if(ciudad == "" ) {
        return <Loading isVisible={false}/>
    }

    //Aparece el loader si no hay datos
    while(resultadoLat ==0 && resultadoLong == 0) return <Loading isVisible={true} text={"Cargando Mapa..."}/>

    
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
                title ={`${ciudad}`}
            />
        </MapView>
        </>
    )
    
            
}

const styles = StyleSheet.create({
    map:{
        height: 240,
        width: 300,
        marginHorizontal: 40,
        marginTop: 30,
    }
})

export default Map;