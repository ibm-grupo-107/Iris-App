import React, {useState, useEffect} from 'react';
import {TextInput,Animated, Text, View, StyleSheet, TouchableWithoutFeedback, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Header } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import shortid from 'shortid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCity = ({localizaciones, setLocalizacion}) => {

  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');

  //crear ciudad
  const crearCiudad = () => {
    //Validar FALTA VER QUE NO SE AGREGUEN DUPLICADOS
        if(pais.trim() === '' || ciudad.trim() === '') {
        mostrarAlerta();
            return;
        }

        const localizacion = {ciudad, pais};

        localizacion.id = shortid.generate();

        //agregar al state
        const localizacionesNuevo = [...localizaciones, localizacion];
        setLocalizacion(localizacionesNuevo);

        //pasar las localizaciones al storage
        guardarLocalizacionesStorage(JSON.stringify(localizacionesNuevo));
    
    }

    //muestra la alerta si falla la validación
    const mostrarAlerta = () => { 
    Alert.alert(
        'Error', //titulo
        'Todos los campos son obligatorios', //mensaje
        [{
            text: 'OK' // arreglo de botones
        }]
    );
    }

    //Guardar las localizaciones en storage
    const guardarLocalizacionesStorage = async (localizacionesJSON) => {
        try {
          await AsyncStorage.setItem('localizaciones', localizacionesJSON);
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
        backgroundColor: '#ffb6c1',
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
    },
    btnBuscar: {
        marginHorizontal: '2.5%',
        marginTop: 50,
        backgroundColor: '#ff1493',
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