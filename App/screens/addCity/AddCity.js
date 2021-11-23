import React, {useState, useEffect} from 'react';
import {TextInput,Animated, Text, View, StyleSheet, TouchableWithoutFeedback, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Header } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import shortid from 'shortid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

//import Map from "../../components/Map"


let localizacionesGuardadas = [];

const AddCity = ({localizaciones, setLocalizacion}) => {

  const navigation = useNavigation();

  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [region, guardarRegion] = useState("");


  //crear ciudad
  const crearCiudad = () => {

        if(pais.trim() === '' || ciudad.trim() === '') {
        mostrarAlerta();
            return;
        }

        const localizacion = {ciudad, pais, region};

        localizacion.id = shortid.generate();

        //agregar al state si no se repite la ciudad y región
        if(!seRepite()){
             const localizacionesNuevo = [...localizaciones, localizacion];
            setLocalizacion(localizacionesNuevo);

             //pasar las localizaciones al storage
            guardarLocalizacionesStorage(JSON.stringify(localizacionesNuevo));
            navigation.navigate('ListCity'); 

            localizacionesGuardadas.push(localizacionesNuevo)
            //
        }
        
       
        
    }
    //Si se repite la ciudad:
    if(!localizacionesGuardadas)return null
     const seRepite = () => { 
        let seRepite=false;
        localizacionesGuardadas.forEach(element => {
            element.forEach(el => {
                if(el["ciudad"] === ciudad && el["region"] ==region){
                    seRepite = true;
                    mostrarAlerta2();
                }
            });
        }); 
        return seRepite
    } 


    //muestra la alerta si falla la validación
    
    const mostrarAlerta = () => { 
    Alert.alert(
        'Error', //titulo
        'Todos los campos son obligatorios', //mensaje
        [{
            text: 'OK' //boton
        }]
    );
    }

    //muestra la alerta si la ciudad ya existe

    const mostrarAlerta2 = () => { 
        Alert.alert(
            'Error', //titulo
            'La ciudad ya existe', //mensaje
            [{
                text: 'OK' //boton
            }]
        );
        }

    //Guardar las localizaciones en storage
    
    const guardarLocalizacionesStorage = async (localizacionesJSON) => {
        try {
            if(!seRepite()){
                await AsyncStorage.setItem('localizaciones', localizacionesJSON);
           }

        } catch (error) {
          console.log(error);
        }
      }

     useEffect(() => {
        const obtenerLocalizacionesStorage = async () => {
            try {
              const localizacionesStorage = await AsyncStorage.getItem('localizaciones');
                if(localizacionesStorage) {
                    setLocalizacion(JSON.parse(localizacionesStorage))
                }
            } catch (error) {
              console.log(error);
            }
        }
        obtenerLocalizacionesStorage();
      }, []);

      

  //animaciones boton
  const [animacionboton] = useState(new Animated.Value(1));

    const animacionEntrada = () => {
        Animated.spring(animacionboton, {
            toValue: .7,
            useNativeDriver: true
        }).start();
    }

    const animacionSalida = () => {
        Animated.spring(animacionboton, {
            toValue: 1,
            friction: 4,
            tension: 30,
            useNativeDriver: true
        }).start();
    }

    const estiloAnimacion = {
        transform: [{scale: animacionboton }]
    }

    return (

        <>
        <Header
            placement="center"
            backgroundColor= "mediumaquamarine"
            centerComponent={{ text: 'Agregar Ciudad', style: { color: '#fff', fontSize:20 } }}
            />
        <StatusBar style="dark" backgroundColor= "#FFF" />

        <View style={styles.formulario}>
            <View style={styles.contenido}>
            <View style={styles.contenido}>
                <Picker
                    selectedValue={pais}
                    onValueChange={texto => guardarPais(texto)}
                    itemStyle={{height: 120, backgroundColor: '#FFF'}}
                >
                    <Picker.Item label="-- Seleccione un país --" value="" />
                    <Picker.Item label="Argentina" value="AR" />
                </Picker>
                <Picker
                    selectedValue={region}
                    onValueChange={texto => guardarRegion(texto)}
                    itemStyle={{height: 120, backgroundColor: '#FFF'}}
                >
                    <Picker.Item label="-- Seleccione una region --" value="" />
                    <Picker.Item label="Buenos Aires" value="Buenos Aires" />
                    <Picker.Item label="Capital Federal" value="Capital Federal" />
                    <Picker.Item label="Catamarca" value="Catamarca" />
                    <Picker.Item label="Chaco" value="Chaco" />
                    <Picker.Item label="Chubut" value="Chubut" />
                    <Picker.Item label="Córdoba" value="Córdoba" />
                    <Picker.Item label="Corrientes" value="Corrientes" />
                    <Picker.Item label="Entre Ríos" value="Entre Ríos" />
                    <Picker.Item label="Formosa" value="Formosa" />
                    <Picker.Item label="Jujuy" value="Jujuy" />
                    <Picker.Item label="La Pampa" value="La Pampa" />
                    <Picker.Item label="La Rioja" value="La Rioja" />
                    <Picker.Item label="Mendoza" value="Mendoza" />
                    <Picker.Item label="Misiones" value="Misiones" />
                    <Picker.Item label="Neuquén" value="Neuquén" />
                    <Picker.Item label="Partido de la costa" value="Partido de la costa" />
                    <Picker.Item label="Río Negro" value="Río Negro" />
                    <Picker.Item label="Salta" value="Salta" />
                    <Picker.Item label="San Juan" value="San Juan" />
                    <Picker.Item label="San Luis" value="San Luis" />
                    <Picker.Item label="Santa Cruz" value="Santa Cruz" />
                    <Picker.Item label="Santa Fe" value="Santa Fe" />
                    <Picker.Item label="Santiago del Estero" value="Santiago del Estero" />
                    <Picker.Item label="Tierra del Fuego" value="Tierra del Fuego" />
                    <Picker.Item label="Tucumán" value="Tucumán" />

                </Picker>
            </View>

                <TextInput 
                    onChangeText={texto => guardarCiudad(texto)}
                    value={ciudad}
                    style={styles.input}
                    placeholder="Ciudad"
                    placeholderTextColor="#666"
                />
            
                <TouchableWithoutFeedback
                    onPressIn={() => animacionEntrada()}
                    onPressOut={() => animacionSalida()}
                    onPress={() => crearCiudad() }
                >
                    <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
                        <Text style={styles.textoBuscar}>Añadir Ciudad</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>

                
            </View>
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    formulario: {
        flex: 1,
        backgroundColor: 'honeydew',
        justifyContent: 'flex-start',
    },
    contenido: {
        marginHorizontal: '2.5%',
    },
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
        borderColor:"#ff1493",
        borderWidth:4,
    },
    btnBuscar: {
        marginHorizontal: '2.5%',
        marginTop: 50,
        backgroundColor: "#ff1493",
        padding: 10,
        justifyContent: 'center',
    },
    textoBuscar: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

export default AddCity;