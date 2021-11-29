import React, {useState, useEffect} from 'react';
import {TextInput,Animated, Text, View, StyleSheet, TouchableWithoutFeedback, Alert, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Header } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import shortid from 'shortid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';

import Map from "../../components/Map"


const AddCity = ({localizaciones, setLocalizacion, localizacionesGuardadas}) => {
    let [ fontsLoaded ] = useFonts({
        'Outfit-Regular': require('../../../assets/fonts/Outfit-Regular.ttf'),
        'Outfit-SemiBold': require('../../../assets/fonts/Outfit-SemiBold.ttf')
    });

    const navigation = useNavigation();
    //guardar states
    const [ciudad, guardarCiudad] = useState('');
    const [pais, guardarPais] = useState('');



    // Desplegable mapa
    const[mostrar, guardarMostrar]= useState(false)

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

     //obtener localizaciones guardadas
     useEffect(() => {
        const obtenerLocalizacionesStorage = async () => {
            try {
              const localizacionesStorage = await AsyncStorage.getItem('localizaciones');
                if(localizacionesStorage) {
                    setLocalizacion(JSON.parse(localizacionesStorage));
                    localizacionesGuardadas.push(JSON.parse(localizacionesStorage));
                }
            } catch (error) {
              console.log(error);
            }
        }
        obtenerLocalizacionesStorage();
      }, []);


    //crear ciudad
    const crearCiudad = () => {
    
        if(pais.trim() === '' || ciudad.trim() === '' ) {
            mostrarAlerta();
                return;
        }

        const localizacion = {ciudad, pais};

        localizacion.id = shortid.generate();

        //agregar al state si no se repite la ciudad y región
        if(!seRepite()){
            const localizacionesNuevo = [...localizaciones, localizacion];
            setLocalizacion(localizacionesNuevo);

             //pasar las localizaciones al storage
            guardarLocalizacionesStorage(JSON.stringify(localizacionesNuevo));
            navigation.navigate('ListCity'); 

            localizacionesGuardadas.push(localizacionesNuevo)
        }
        
    }
    
    //Si se repite la ciudad:
    if(!localizacionesGuardadas)return null
     const seRepite = () => { 
        let seRepite=false;
        localizacionesGuardadas.forEach(element => {
            element.forEach(el => {
                if(eliminarTildes(el["ciudad"]).toUpperCase() === eliminarTildes(ciudad).toUpperCase()){
                    seRepite = true;
                    mostrarAlerta2();
                }
            });
        }); 
        return seRepite
    } 

    
    // quita Acentos

    function eliminarTildes(texto) {
        return texto
                .trim()
               .normalize('NFD')
               .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
               .normalize();
    }




    //muestra la alerta si la ciudad ya existe

    const mostrarAlerta2 = () => { 
        Alert.alert(
            'Error', 
            'La ciudad ya existe', 
            [{
                text: 'OK' 
            }]
        );
        }

    //muestra la alerta si faltan datos

    const mostrarAlerta = () => { 
        Alert.alert(
            'Error', 
            'Debe cargar todos los datos', 
            [{
                text: 'OK' 
            }]
        );
        }

    //Muestra u oculta info del mapa

    const mostrarMapa = () =>{
        if (ciudad.trim() === '' || pais.trim() === '') {
            mostrarAlerta();
            return;
        }
        guardarMostrar(!mostrar);
    }

    //Borrar Ciudad de input :
    const borrarCiudad = () => { 
        guardarCiudad("") 
     }

     //Borrar País de Picker :
    const borrarPais = () => { 
        guardarPais("")
     }



    //Lleva a listCity, agrega ciudad y cierra el mapa en AddCity
    const cerrarMapa = () =>{
        guardarMostrar(!mostrar);
        crearCiudad()
        borrarCiudad()
        borrarPais()
        return
        //consultarClima()
    }
    //sólo cierra el mapa
    const cerrarMap = () =>{
        guardarMostrar(!mostrar);
        borrarCiudad()
        return
    } 

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
    
    if (!fontsLoaded) {
        return <AppLoading />;
      } else {
    return (    

        <>
        <Header
            placement="center"
            backgroundColor= "mediumaquamarine"
            centerComponent={{ text: 'Agregar Ciudad', style: {fontFamily: 'Outfit-SemiBold', color: '#fff', fontSize:20 } }}
        />
        <ScrollView style={styles.container} >
        
            
            {mostrar 
                ?( 
            <View style={styles.miniContainer}>
                
                        <StatusBar style="dark" backgroundColor= "#FFF" />
                
                        <View style={styles.formulario}>
                            
                            <View style={styles.contenido}>
                                <Text style={styles.textoAñadir}>País: </Text>
                                <Picker
                                    selectedValue={pais}
                                    onValueChange={texto => guardarPais(texto)}
                                    itemStyle={{height: 120, backgroundColor: '#FFF'}}
                                >
                                    <Picker.Item label="-- Seleccione un país --" value="" />
                                    <Picker.Item label="Argentina" value="AR" />
                                    <Picker.Item label="Bolivia" value="BO" />
                                    <Picker.Item label="Brasil" value="BR" />
                                    <Picker.Item label="Chile" value="CL" />
                                    <Picker.Item label="Colombia" value="CO" />
                                    <Picker.Item label="Ecuador" value="EC" />
                                    <Picker.Item label="Paraguay" value="PY" />
                                    <Picker.Item label="Perú" value="PE" />
                                    <Picker.Item label="Uruguay" value="UY" />
                                    <Picker.Item label="Venezuela" value="VE" />
                                    

                                </Picker>
                
                            </View>
                
                                <TextInput 
                                    onChangeText={texto => guardarCiudad(texto)}
                                    value={ciudad}
                                    style={styles.input}
                                    placeholder="Ciudad"
                                    placeholderTextColor="#666"
                   
                                />
                                <View style={styles.mapa}>
                                    <Map
                                    cerrarMap={cerrarMap}
                                    ciudad = {ciudad}
                                    pais ={pais}
                                    />
                                </View>
                
                                <TouchableWithoutFeedback
                                    underlayColor='none'
                                    onPress={() => {mostrarMapa()}}
                                    onPressIn={() => animacionEntrada()}
                                    onPressOut={() => animacionSalida()}
                                    onPress={() => crearCiudad() }
                                    onPress={() => {cerrarMapa()} }
                                >
                                    <View style={styles.containerBuscar}>
                                        <Animated.View style={[styles.btnAgregar, estiloAnimacion]}>
                                            <Text style={styles.textoBuscar}> Añadir</Text>
                                        </Animated.View>
                                    </View>
                                </TouchableWithoutFeedback>
                            
                        
                    
            
                            </View>
                        
                    </View>
            )
            
            :(
                <View style={styles.miniContainer2}>
                
                    <StatusBar style="dark" backgroundColor= "#FFF" />
            
                    <View style={styles.formulario}>
                        
                        <View style={styles.contenido}>
                            <Text style={styles.textoAñadir}>País: </Text>
                            <Picker
                                selectedValue={pais}
                                onValueChange={texto => guardarPais(texto)}
                                itemStyle={{height: 120, backgroundColor: '#FFF'}}
                            >
                                <Picker.Item label="-- Seleccione un país --" value="" />
                                <Picker.Item label="Argentina" value="AR" />
                                <Picker.Item label="Bolivia" value="BO" />
                                <Picker.Item label="Brasil" value="BR" />
                                <Picker.Item label="Chile" value="CL" />
                                <Picker.Item label="Colombia" value="CO" />
                                <Picker.Item label="Ecuador" value="EC" />
                                <Picker.Item label="Paraguay" value="PY" />
                                <Picker.Item label="Perú" value="PE" />
                                <Picker.Item label="Uruguay" value="UY" />
                                <Picker.Item label="Venezuela" value="VE" />

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
                                onPress={() => {mostrarMapa()}}
                                onPressIn={() => animacionEntrada()}
                                onPressOut={() => animacionSalida()}
                                underlayColor='none'
                            >
                                <View style={styles.containerBuscar}>
                                    <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
                                        <Text style={styles.textoBuscar} > Ver Mapa</Text>
                                    </Animated.View>
                                </View>
                            </TouchableWithoutFeedback>
                        
                        </View>
               </View>
            )}
        </ScrollView>
        </>
    )

  }


};



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'honeydew',
    },
    miniContainer:{
        backgroundColor: '#FFF',
        margin:25,
        borderBottomColor: "mediumaquamarine",
        borderStyle: 'solid',
        borderBottomWidth: 10,
        borderRadius:20,
        //shadow
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 10,
    },

    miniContainer2:{
        backgroundColor: '#FFF',
        margin:25,
        borderBottomColor: "mediumaquamarine",
        borderStyle: 'solid',
        borderBottomWidth: 10,
        paddingBottom:30,
        borderRadius:20,
        //shadow
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 10,
    },
    formulario: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    contenido: {
        marginHorizontal: '10%',
        marginTop: 20,
    },
    input: {
        padding: 5,
        height: 40,
        backgroundColor: '#FFF',
        fontSize: 18,
        marginBottom: 5,
        marginTop:15,
        textAlign: 'center',
        borderColor:"mediumaquamarine",
        borderWidth:4,
        marginHorizontal: '10%',
        borderRadius: 5,
        fontFamily: 'Outfit-Regular',

        },
    btnBuscar: {
     
        marginTop: 30,
        backgroundColor: "mediumaquamarine",
        padding: 10,
        justifyContent: 'center',
        borderRadius: 50,
        width: "50%",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 


    },
    btnAgregar:{
        marginVertical: 35,
        backgroundColor: "mediumaquamarine",
        padding: 10,
        justifyContent: 'center',
        borderRadius: 50,
        width: "50%",
         shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 
    },
    textoBuscar: {
        color: '#FFF',
        textAlign: 'center',
        //fontSize: 15,
        //fontWeight: 'bold',
        textTransform: 'uppercase',
        fontFamily:'Outfit-Regular',
    
    },
    textoAñadir:{
        marginTop:18,
        color: '#000000',
        fontSize: 20,
        marginLeft:8,
        //fontWeight: 'bold',
        //textTransform: 'uppercase',
        fontFamily: 'Outfit-Regular',
    },
    containerBuscar:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapa:{
        justifyContent: 'center',
        alignItems: 'center',
    }

});

export default AddCity;