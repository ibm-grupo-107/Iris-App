import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
//import { Header } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import Loading from "../../components/Loading"


const Details = ({resultado}) => {
    
    //Sólo carga si llegan los datos
    if(!resultado){
       null 
       return <Loading isVisible={true} text={"Cargando Clima..."}/>
    } 

    const{current, location} = resultado;
    if(!current) {
        null 
        return <Loading isVisible={true} text={"Cargando Clima..."}/>

    }
  

    // grados kelvin
    const kelvin =273.15
 
    
    return (        
        <> 
        <Loading isVisible={false} />  
        <StatusBar style="dark" backgroundColor= "#FFF" />
        <View style ={styles.clima}>
            <Text style ={styles.texto, styles.actual}> {current.temp_c} 
                <Text style= {styles.temperatura}>
                    &#x2103;
                </Text>
                <Image
                    style={{width: 66, height: 58}}
                    source = {{ uri: `https:${current.condition.icon}`}}
                />    
            </Text>

        </View> 
       </>
    );
};

const styles = StyleSheet.create({
    clima: {
        marginTop:5,
        backgroundColor: 'skyblue',
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 10,
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