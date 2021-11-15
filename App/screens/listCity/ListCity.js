import React  from 'react';
import {StyleSheet, View, TouchableOpacity, Text, FlatList} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Header } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';
import City from '../city/City';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ListCity = ({localizaciones, setLocalizacion}) => {

      const navigation = useNavigation();

      //Guardar las localizaciones en storage
      const guardarLocalizacionesStorage = async (localizacionesJSON) => {
        try {
          await AsyncStorage.setItem('localizaciones', localizacionesJSON);
        } catch (error) {
          console.log(error);
        }
    }

      //funcion para eliminar las ciudades
      const eliminarCiudad = ciudad => {

        const ciudadesFiltradas = localizaciones.filter(localizacion => localizacion.ciudad !== ciudad);

        setLocalizacion(ciudadesFiltradas);
        guardarLocalizacionesStorage(JSON.stringify(ciudadesFiltradas));
      }

      return (
          <>
              <Header
                  placement="center"
                  backgroundColor= "skyblue"
                  centerComponent={{ text: 'Mis Ciudades', style: { color: '#fff', fontSize:20 } }}
                  />
              <StatusBar style="dark" backgroundColor= "#FFF" />
              <View style={styles.contenedor}>
                  <FlatList
                      data={localizaciones}
                      renderItem={ ({item}) => <City item={item} eliminarCiudad={eliminarCiudad}  /> }
                      keyExtractor={ localizacion => localizacion.id }
                  />
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