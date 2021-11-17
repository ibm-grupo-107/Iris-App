import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import { Header } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';


const Details = ({resultado}) => {
    

    console.log(resultado);

    return (        

        <>
            <Header
                placement="center"
                backgroundColor= "lightsalmon"
                centerComponent={{ text: 'Ciudad Actual', style: { color: '#fff', fontSize:20 } }}
                />
            <StatusBar style="dark" backgroundColor= "#FFF" />
            
           <Text>Desde detalles.js</Text>

           
       </>
    );
};

const styles = StyleSheet.create({
    clima: {
        backgroundColor: '#ffb6c1',
        flex: 1,
        alignItems: 'center'
    },
    texto: {
        marginTop: 10,
        color: '#000',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',        
    },
    actual: {
        fontSize: 80,
        marginRight: 0,
        fontWeight: 'bold',
    },
    temperatura: {
        fontSize: 24,
        fontWeight: 'normal',
    },
    temperaturas: {
        marginTop: 20,
        justifyContent: 'center',
    },
    titulo: {
        textAlign: 'center',
        fontSize: 32,
        color: `#ff1493`,
        marginBottom: 20,
    },
})

export default Details;