import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
//import { useNavigation } from '@react-navigation/core';
import Details from "../../screens/details/Details"
//import Map from "../Map"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const City = ({item, eliminarCiudad}) => {

    //const navigation = useNavigation();

    const dialogoEliminar = (ciudad) => {
        eliminarCiudad(ciudad);
    };

    //Consultar la API
    
    const  [consultar, guardarConsultar] = useState(false);
    const [resultado, guardarResultado] = useState({});

    // Desplegable

    const[mostrar, guardarMostrar]= useState(false)


    useEffect(() => {
        const consultarClima = async () => {
          if(consultar) {
            //const appId = '319fa4c56018832ed2e37833430f4cca'; 
            //const url = `http://api.openweathermap.org/data/2.5/weather?q=${item.ciudad},${item.pais}&appid=${appId}`;
           
            /* const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${item.ciudad},${item.pais}&appid=${appId}`);
	        const data = await response.json();
	        console.log(data); */

            const appId2= "f4f962f79e5e479191d04451212611"
            const url2=`http://api.weatherapi.com/v1/current.json?key=${appId2}&q=${item.ciudad},${item.region},${item.pais}`
            
            try {
                const respuesta = await fetch(url2);
                const data = await respuesta.json();
                if(data.cod === "404"){
                    mostrarAlerta()
                }else{
                    guardarResultado(data);
                    guardarConsultar(false); 
                }
            } catch (error) {
               mostrarAlerta();
            }
          }
        }
        consultarClima();
      }, [consultar]);

    //console.log(resultado)

    const consultarClima = () => {
        if(item.ciudad.trim() === '' || item.pais.trim() === '' || item.region.trim() === "" ) {
            mostrarAlerta();
            return;
        }
        //consultar la API
        guardarConsultar(true)
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'La ciudad no existe',
            [{text: 'Entendido'}]
        )
    }


    //Muestra u oculta info del clima

    const mostrarClima = () =>{
        guardarMostrar(!mostrar);
        consultarClima()
    }

    // Cambiar primera letra a Mayúscula
    const capitalizar = s => (s && s[0].toUpperCase() + s.slice(1).toLowerCase()) 
   
    return (
        <View style={styles.clima}>
                {mostrar 
                    ? (
                        <>
                        <View style={styles.minContainer}>
                            <View>
                                <View>
                                    <Text
                                    style={styles.label}>Ciudad: </Text>
                                    <Text style={styles.texto}>{capitalizar(item.ciudad)}</Text>
                                </View>
                                <View>
                                    <Text 
                                    style={styles.label}>Región: </Text>
                                    <Text style={styles.texto}>{item.region}</Text>
                                </View>
                                <View>
                                    <Text 
                                    style={styles.label}>Pais: </Text>
                                    <Text style={styles.texto}>{item.pais}</Text>
                                </View>
                            </View>
                            <TouchableHighlight 
                                    onPress={ () => dialogoEliminar(item.ciudad)} 
                                    style={styles.bntEliminar}>
                                    <Text style={styles.textoBtn2}><MaterialCommunityIcons name="delete-forever"  size={26} /> </Text>
                            </TouchableHighlight>
                        </View>
                        <Details
                            resultado ={resultado}
                         />
                        <TouchableHighlight  onPress={() => {consultarClima()}} /* navigation.navigate('Details', item)}} */ style={styles.bntActualizar}>
                        <Text style={styles.textoBtn2}>Actualizar </Text>
                      </TouchableHighlight>
                      <View style= {styles.cerrado}>
                        <TouchableHighlight  onPress={() => {mostrarClima()}} /* navigation.navigate('Details', item)}} */ style={styles.bntVerClima}>
                            <Text style={styles.textoBtn}> {!mostrar ? "VerClima" : "Cerrar"}</Text>
                        </TouchableHighlight>
                        
                    </View>

                      </>
                    ) 
                    
                    : 
                    (<>
                     <View style={styles.minContainer}>
                            <View>
                                <View>
                                    <Text
                                    style={styles.label}>Ciudad: </Text>
                                    <Text style={styles.texto}>{capitalizar(item.ciudad)}</Text>
                                </View>
                                <View>
                                    <Text 
                                    style={styles.label}>Región: </Text>
                                    <Text style={styles.texto}>{item.region}</Text>
                                </View>
                                <View>
                                    <Text 
                                    style={styles.label}>Pais: </Text>
                                    <Text style={styles.texto}>{item.pais}</Text>
                                </View>
                            </View>
                            <TouchableHighlight 
                                    onPress={ () => dialogoEliminar(item.ciudad)} 
                                    style={styles.bntEliminar}>
                                    <Text style={styles.textoBtn2}><MaterialCommunityIcons name="delete-forever"  size={26} /> </Text>
                            </TouchableHighlight>
                        </View>
                    <View style= {styles.cerrado}>
                        <TouchableHighlight  onPress={() => {mostrarClima()}} /* navigation.navigate('Details', item)}} */ style={styles.bntVerClima}>
                            <Text style={styles.textoBtn}> {!mostrar ? "VerClima" : "Cerrar"}</Text>
                        </TouchableHighlight>
                        
                    </View>
                    </>

                    ) }
               
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
        borderBottomWidth: 20,
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
        backgroundColor: "lightgray",
        marginHorizontal: 10,
        width:50,
        marginTop:15,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:20,
  
      },
      bntVerClima: {
        padding: 10,
        backgroundColor: "lightskyblue",
        marginHorizontal: 10,
        borderRadius:20,
        width:150,
      },
      bntActualizar:{
        paddingVertical: 10,
        backgroundColor: "lightblue",
        marginHorizontal: 10,
        marginBottom: 10,
      },
      textoBtn: {
          fontWeight: 'bold',
          textAlign: 'center',
          color: "#FFF"
      },
      textoBtn2: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#000000"
    },
      cerrado:{
          justifyContent: 'center',
          marginTop:10,
          alignItems: 'center',
          flexDirection: 'row',
      },
      minContainer:{
          flexDirection: 'row',
          justifyContent: "space-between",
      }
});

export default City;