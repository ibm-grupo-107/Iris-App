import React,{useState, useEffect} from 'react';
import {StyleSheet, Alert} from 'react-native';
import MapView from "react-native-maps"

import Loading from "../components/Loading"

const Map = ({ciudad, pais, region, cerrarMap}) => {  


    const [resultadoLat, guardarResultadoLat] = useState(0);
    const [resultadoLong, guardarResultadoLong] = useState(0); 
    const [resultadoCity, guardarResultadoCity] = useState('');
    const [resultadoTown, guardarResultadoTown] = useState('');
    const [resultadoLocation, guardarResultadoLocation] = useState('');

    const [state, setState] = useState({});
   
      useEffect(() => {
        const consultarCoord = async () => {
            // api Lucía:
            //const appId = "ee003e9a0d334667a3b7815661343e02"
            // api Priscila
            //const appId = be0d211016ca458197faa98f26cb1963
            //Api Martina:
            //const appId = '61666ed49345480b91961b57aa9b1e30'; 
            const appId = "61666ed49345480b91961b57aa9b1e30";

            const url = `https://api.opencagedata.com/geocode/v1/json?q=${ciudad},${region},${pais}&key=${appId}`;
            
            
             try {
                const respuesta = await fetch(url);
                const data = await respuesta.json();
                const town = data["results"][0].components.village;
                const city = data["results"][0].components.city;
                const location = data["results"][0].components.town;
                const lat = data["results"][0].geometry.lat;
                const long = data["results"][0].geometry.lng;
                guardarResultadoLat(lat);
                guardarResultadoLong(long);
                guardarResultadoCity(city);
                guardarResultadoTown(town);
                guardarResultadoLocation(location);
                

            } catch (error) {
               mostrarAlerta();
               cerrarMap();
            }
        }     
        
        consultarCoord();  
        consultarZona();      
    });



    const consultarZona = () => {
        if (resultadoCity === undefined && resultadoTown === undefined && (resultadoLocation !== ciudad )) {
            mostrarAlerta2();
            cerrarMap();
            return;
        }
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Ciudad no encontrada',
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

    useEffect(() => {
        consultarZona()
        return () => {
          setState({}); // This worked for me
        };
    }, []);


    //Si no se pasan datos de ciudad no carga el loader
    while(ciudad == "" || region == "" || ciudad == "") {
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
                //description={"Description 1"} 
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