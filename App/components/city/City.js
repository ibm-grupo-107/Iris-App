import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
//import { useNavigation } from '@react-navigation/core';
import Details from "../../screens/details/Details"
import Map from "../Map"


const City = ({item, eliminarCiudad}) => {

    //const navigation = useNavigation();

    const dialogoEliminar = (ciudad,region) => {
        eliminarCiudad(ciudad,region);
    };

    //Consultar la API
    
    const  [consultar, guardarConsultar] = useState(false);
    const [resultado, guardarResultado] = useState({});

    // Desplegable

    const[mostrar, guardarMostrar]= useState(false)


    useEffect(() => {
        const consultarClima = async () => {
          if(consultar) {
            const appId = '319fa4c56018832ed2e37833430f4cca'; 
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${item.ciudad},${item.pais}&appid=${appId}`;
           
            /* const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${item.ciudad},${item.pais}&appid=${appId}`);
	        const data = await response.json();
	        console.log(data); */
            
            try {
                const respuesta = await fetch(url);
                const data = await respuesta.json();
                //console.log(data)
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
        if(item.ciudad.trim() === '' || item.pais.trim() === '' ) {
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


    return (
        <View style={styles.clima}>
                {mostrar 
                    ? (
                        <>
                        <View>
                        <Text
                        style={styles.label}>Ciudad: </Text>
                        <Text style={styles.texto}>{item.ciudad}</Text>
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
                        <Details
                            resultado ={resultado}
                         />
                        <Map
                            resultado ={resultado}
                            ciudad = {item.ciudad}
                            pais ={item.pais}
                            region={item.region}
                        />
                        <TouchableHighlight  onPress={() => {consultarClima()}} /* navigation.navigate('Details', item)}} */ style={styles.bntActualizar}>
                        <Text style={styles.textoBtn}>Actualizar </Text>
                      </TouchableHighlight>
                      <TouchableHighlight  onPress={() => {mostrarClima()}} /* navigation.navigate('Details', item)}} */ style={styles.bntVerClima}>
                            <Text style={styles.textoBtn}> {!mostrar ? "VerClima" : "Cerrar"}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={ () => dialogoEliminar(item.ciudad)} style={styles.bntEliminar}>
                                <Text style={styles.textoBtn}>Eliminar &times; </Text>
                            </TouchableHighlight>

                      </>
                    ) 
                    
                    : 
                    (<>
                     <View>
                        <Text
                        style={styles.label}>Ciudad: </Text>
                        <Text style={styles.texto}>{item.ciudad}</Text>
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
                    <View>
                        <TouchableHighlight  onPress={() => {mostrarClima()}} /* navigation.navigate('Details', item)}} */ style={styles.bntVerClima}>
                            <Text style={styles.textoBtn}> {!mostrar ? "VerClima" : "Cerrar"}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight 
                            onPress={ () => dialogoEliminar(item.ciudad)} 
                            style={styles.bntEliminar}>
                            <Text style={styles.textoBtn}>Eliminar &times; </Text>
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
        marginBottom:15,
  
      },
      bntVerClima: {
        padding: 10,
        backgroundColor: "lightblue",
        marginHorizontal: 10,
        marginTop:10,
      },
      bntActualizar:{
        paddingVertical: 10,
        backgroundColor: "pink",
        marginHorizontal: 10,
        marginBottom: 10,
      },
      textoBtn: {
          fontWeight: 'bold',
          textAlign: 'center',
      },
});

export default City;