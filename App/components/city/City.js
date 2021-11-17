import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Details from '../../screens/details/Details';


const City = ({item, eliminarCiudad}) => {

    const navigation = useNavigation();

    const dialogoEliminar = ciudad => {
        eliminarCiudad(ciudad);
    };

    //para la API
    const [busqueda, guardarBusqueda] = useState({
        ciudad: '',
        pais: '',
      });

    const {ciudad, pais} = busqueda;
    
    const  [consultar, guardarConsultar] = useState(false);
    const [resultado, guardarResultado] = useState({});

    useEffect(() => {
        const consultarClima = async () => {
          if(consultar) {
            const appId = '319fa4c56018832ed2e37833430f4cca'; 
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${item.ciudad},${item.pais}&appid=${appId}`;
          
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
    

    const consultarClima = () => {
        if(item.ciudad.trim() === '' || item.pais.trim() === '') {
            mostrarAlerta();
            return;
        }

        //consultar la API
        guardarConsultar(true)
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'no existe',
            [{text: 'Entendido'}]
        )
    }

    return (
        <View style={styles.clima}>
            <View>
                <Text
                style={styles.label}>Ciudad: </Text>
                <Text style={styles.texto}>{item.ciudad}</Text>
            </View>
            <View>
                <Text 
                style={styles.label}>Pais: </Text>
                <Text style={styles.texto}>{item.pais}</Text>
            </View>
            <View>
                <TouchableHighlight  onPress={() => {consultarClima(); navigation.navigate('Details', item)}} style={styles.bntVerClima}>
                    <Text style={styles.textoBtn}>Ver Clima </Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={ () => dialogoEliminar(item.ciudad)} style={styles.bntEliminar}>
                    <Text style={styles.textoBtn}>Eliminar &times; </Text>
                  </TouchableHighlight>
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    clima: {
        backgroundColor: "#fff",
        borderBottomColor: "#e1e1e1",
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        marginHorizontal: 10,
    },
    texto: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    bntEliminar: {
        padding: 10,
        backgroundColor: "red",
        marginHorizontal: 10,
  
      },
      bntVerClima: {
        padding: 10,
        backgroundColor: "yellow",
        marginHorizontal: 10,
      },
      textoBtn: {
          fontWeight: 'bold',
          textAlign: 'center',
      },
});

export default City;