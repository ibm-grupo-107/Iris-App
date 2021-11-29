import React,{useState, useEffect} from 'react';
import {StyleSheet, Alert} from 'react-native';
import MapView from "react-native-maps"

import Loading from "../components/Loading"

const Map = ({ciudad, pais, cerrarMap}) => {  


    const [resultadoLat, guardarResultadoLat] = useState(0);
    const [resultadoLong, guardarResultadoLong] = useState(0); 

   
      useEffect(() => {
        const consultarCoord = async () => {

            const appId2 = '87508399d70b60062b355ceef66bedf9'; 
            const url2 = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId2}`;

             try {
        
                const response = await fetch(url2);
	            const data2 = await response.json();
                if(data2.cod === "404"){
                    mostrarAlerta2();
                    cerrarMap();
                    return;
                }
                else{
                    
                    const lat = data2.coord.lat
                    const long = data2.coord.lon
                
                    guardarResultadoLat(lat);
                    guardarResultadoLong(long); 

                }


            } catch (error) {
                if(ciudad == "" || pais ==""){
                    mostrarAlerta3()
                    cerrarMap();
                }else{
                    mostrarAlerta();
                    cerrarMap();
                }
            }
        }     
        
        consultarCoord();  
        //consultarClima();      
    });

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Ciudad no encontrada',
            [{text: 'Entendido'}]
        )
        cerrarMap();
        return <Loading isVisible={false}/>
    }

    const mostrarAlerta3 = () => {
        Alert.alert(
            'Error',
            'Debe cargar todos los datos',
            [{text: 'Entendido'}]
        )
        cerrarMap();
        return <Loading isVisible={false}/>
    }
    const mostrarAlerta2 = () => {
        Alert.alert(
            'Error',
            'Ciudad inexistente',
            [{text: 'Entendido'}]
        )
        cerrarMap();
        return <Loading isVisible={false}/>
    }

    //Si no se pasan datos de ciudad no carga el loader
    if(ciudad == "" || pais =="") {
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