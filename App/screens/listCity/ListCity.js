import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const ListCity = ({navigation}) => {

    return (
        <View style={styles.contenedor}>
            <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btnAgregar}
            onPress={() => navigation.navigate('Agregar Ciudad')}>
            <MaterialCommunityIcons name="plus" size={32} color="white" />
            </TouchableOpacity>
        </View>        
    );
};

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#ffb6c1',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',    
    },
    btnAgregar: {
      display: 'flex',
      position: 'absolute',
      backgroundColor: '#ff1493',
      justifyContent: 'center',
      alignItems: 'center',
      width: 57,
      height: 57,
      borderRadius: 100,
      bottom: 30,
      right: 30,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,  
    },
});

export default ListCity;
