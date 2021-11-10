import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Header } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const ListCity = ({navigation}) => {

    return (
        <>
            <Header
                placement="center"
                backgroundColor= "skyblue"
                centerComponent={{ text: 'Mis Ciudades', style: { color: '#fff', fontSize:20 } }}
                />
            <StatusBar style="dark" backgroundColor= "#FFF" />
            <View style={styles.contenedor}>
                <TouchableOpacity
                activeOpacity={0.5}
                style={styles.btnIr}
                onPress={() => navigation.navigate('Mi Ciudad')}>
                <MaterialCommunityIcons name="arrow-expand-all" size={34} color="#8a2be2" />
                </TouchableOpacity>
                <Text style={styles.ciudades}>Ciudad</Text>
                <TouchableOpacity
                activeOpacity={0.5}
                style={styles.btnAgregar}
                onPress={() => navigation.navigate('Agregar Ciudad')}>
                <MaterialCommunityIcons name="plus" size={32} color="white" />
                </TouchableOpacity>
            </View>    
        </>    
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
