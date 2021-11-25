import React, {useState, useEffect} from 'react';
import {TextInput,Animated, Text, View, StyleSheet, TouchableWithoutFeedback, Alert, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Header } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import shortid from 'shortid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

import Map from "../../components/Map"




const AddCity = ({localizaciones, setLocalizacion, localizacionesGuardadas}) => {

  const navigation = useNavigation();

  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [region, guardarRegion] = useState("");



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
    
        if(pais.trim() === '' || ciudad.trim() === '' || region.trim() === "") {
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
        }
       
        
    }
    //Si se repite la ciudad:
    if(!localizacionesGuardadas)return null
     const seRepite = () => { 
        let seRepite=false;
        localizacionesGuardadas.forEach(element => {
            element.forEach(el => {
                if(eliminarTildes(el["ciudad"]).toUpperCase() === eliminarTildes(ciudad).toUpperCase() && eliminarTildes(el["region"]).toUpperCase() == eliminarTildes(region).toUpperCase()){
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

    //muestra la alerta si la ciudad ya existe

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
        guardarMostrar(!mostrar);
        //consultarClima()
    }

    //Lleva a listCity, agrega ciudad y cierra el mapa en AddCity
    const cerrarMapa = () =>{
        guardarMostrar(!mostrar);
        crearCiudad()
        return
        //consultarClima()
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


    return (

        <ScrollView style={styles.container} >
            {mostrar 
                ?( 
                    <>
                    <Header
                        placement="center"
                        backgroundColor= "mediumaquamarine"
                        centerComponent={{ text: 'Agregar Ciudad', style: { color: '#fff', fontSize:20 } }}
                    />
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
                        </Picker>
        
                        <Text style={styles.textoAñadir}>Región:</Text>
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
                        <View style={styles.mapa}>
                            <Map
                            ciudad = {ciudad}
                            pais ={pais}
                            region={region}
                            />
                        </View>
        
                        <TouchableWithoutFeedback
                            onPress={() => {mostrarMapa()}}
                            onPressIn={() => animacionEntrada()}
                            onPressOut={() => animacionSalida()}
                            onPress={() => crearCiudad() }
                            onPress={() => {cerrarMapa()} }
                        >
                            <View style={styles.containerBuscar}>
                                <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
                                    <Text style={styles.textoBuscar}> Añadir</Text>
                                </Animated.View>
                            </View>
                        </TouchableWithoutFeedback>
                    
            
                    </View>
                    </>
            )
            
            :(
                <>
                    <Header
                        placement="center"
                        backgroundColor= "mediumaquamarine"
                        centerComponent={{ text: 'Agregar Ciudad', style: { color: '#fff', fontSize:20 } }}
                    />
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
                        </Picker>
        
                        <Text style={styles.textoAñadir}>Región:</Text>
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
                        {/* <View style={styles.mapa}>
                            <Map
                            ciudad = {ciudad}
                            pais ={pais}
                            region={region}
                            />
                        </View> */}
        
                        <TouchableWithoutFeedback
                            onPress={() => {mostrarMapa()}}
                            onPressIn={() => animacionEntrada()}
                            onPressOut={() => animacionSalida()}
                            //onPress={() => crearCiudad() }
                        >
                            <View style={styles.containerBuscar}>
                                <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
                                    <Text style={styles.textoBuscar} > Ver Mapa</Text>
                                </Animated.View>
                            </View>
                        </TouchableWithoutFeedback>
                    
            
                    </View>
                    </>
            )
        
        
        
            }
        </ScrollView>
    );




};



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'honeydew',
    },
    formulario: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    contenido: {
        marginHorizontal: '10%',
    },
    input: {
        padding: 5,
        height: 40,
        backgroundColor: '#FFF',
        fontSize: 18,
        marginBottom: 5,
        marginTop:15,
        textAlign: 'center',
        borderColor:"#ff1493",
        borderWidth:4,
        marginHorizontal: '10%',
        borderRadius: 5
    },
    btnBuscar: {
     
        marginTop: 15,
        backgroundColor: "#ff1493",
        padding: 10,
        justifyContent: 'center',
        borderRadius: 50,
        width: "50%",


    },
    textoBuscar: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    
    },
    textoAñadir:{
        marginTop:18,
        color: '#000000',
        fontSize: 15,
        marginLeft:8,
        fontWeight: 'bold',
        textTransform: 'uppercase',
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