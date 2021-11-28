import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Loading from "../../components/Loading"


const Details = ({resultado}) => {
    
    const {name,main} = resultado;

    //loaders
    if(!resultado){
        null 
        return <Loading isVisible={true} text={"Cargando Clima..."}/>
     } 

    
    if(!main) {
        null 
        return <Loading isVisible={true} text={"Cargando Clima..."}/>
    }

    if(!name) {
        null 
        return <Loading isVisible={true} text={"Cargando Clima..."}/>
    }


    // grados kelvin
    const kelvin =273.15

    
    return (        
        <>  
            <StatusBar style="dark" backgroundColor= "#FFF" />
            
            <View style ={styles.clima}>
               <Text style ={styles.texto, styles.actual}> {parseInt (main.temp - kelvin)} 
                    <Text style= {styles.temperatura}>
                        &#x2103;
                    </Text>
               </Text>
               <Image
                    style={{width: 66, height: 58}}
                    source = {{ uri: `http://openweathermap.org/img/w/${resultado.weather[0].icon}.png`}}
                />  

            </View> 

           
       </>
    );
};

const styles = StyleSheet.create({
    clima: {
        marginTop:15,
        backgroundColor: 'skyblue',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius:25,
        width:250,
        justifyContent: "space-evenly",
    },
    texto: {
        marginTop: 10,
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',        
    },
    actual: {
        fontSize: 70,
        marginRight: 0,
        fontWeight: 'bold',
    },
    temperatura: {
        fontSize: 15,
        fontWeight: 'normal',
    },
    titulo: {
        textAlign: 'center',
        fontSize: 32,
        color: `skyblue`,
        marginBottom: 20,
    },
})

export default Details;