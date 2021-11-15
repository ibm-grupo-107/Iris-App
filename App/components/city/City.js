import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import { useNavigation } from '@react-navigation/core';


const City = ({item, eliminarCiudad}) => {

    const navigation = useNavigation();


    const dialogoEliminar = ciudad => {
        eliminarCiudad(ciudad);
    };

    return (
        <View style={styles.clima}>
            <View>
                <Text 
                /* value={ciudad}
                onChangeText={ciudad => guardarBusqueda({...busqueda, ciudad})} */
                style={styles.label}>Ciudad: </Text>
                <Text style={styles.texto}>{item.ciudad}</Text>
            </View>
            <View>
                <Text 
                /* value={pais}
                onChangeText={pais => guardarBusqueda({...busqueda, pais})} */
                style={styles.label}>Pais: </Text>
                <Text style={styles.texto}>{item.pais}</Text>
            </View>
            <View>
                <TouchableHighlight  onPress={() => navigation.navigate('Clima Actual')} style={styles.bntVerClima}>
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