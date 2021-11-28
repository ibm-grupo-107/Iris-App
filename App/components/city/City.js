import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert, Animated} from 'react-native';
import Details from "../../screens/details/Details"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const City = ({item, eliminarCiudad}) => {

    const dialogoEliminar = (ciudad) => {
        eliminarCiudad(ciudad);
    };


    //Consultar la API
    
    const [consultar, guardarConsultar] = useState(false);
    const [resultado, guardarResultado] = useState({});

    // Desplegable

    const[mostrar, guardarMostrar]= useState(false)

    //Busca el clima de la ciudad
    useEffect(() => {
        const consultarClima = async () => {
          if(consultar) {
           
            const appId = '319fa4c56018832ed2e37833430f4cca'; //inserta tu API Key aquí
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${item.ciudad},${item.pais}&appid=${appId}`;
            try {
                const response = await fetch(url);
	            const data = await response.json(); 
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
            'Debe Cargar Todos los datos',
            [{text: 'Entendido'}]
        )
    }


    //Muestra u oculta info del clima

    const mostrarClima = () =>{
        guardarMostrar(!mostrar);
        consultarClima()
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
                                        style={styles.label}>Pais: </Text>
                                        <Text style={styles.texto}>{item.pais}</Text>
                                    </View>
                                </View>
                                <TouchableHighlight 
                                        onPress={ () => dialogoEliminar(item.ciudad)} 
                                        underlayColor='none'
                                        onPressIn={() => animacionEntrada()}
                                        onPressOut={() => animacionSalida()}
                                        style={styles.bntEliminar}>
                                        <Text style={styles.textoBtn2}><MaterialCommunityIcons name="delete-forever"  size={24} /> </Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.detailsContainer}>
                            <Details resultado ={resultado}/>
                            <Animated.View style={ estiloAnimacion}>
                            <TouchableHighlight  onPress={() => {consultarClima()}} style={styles.bntActualizar} underlayColor='none'
                                 onPressIn={() => animacionEntrada()}
                                 onPressOut={() => animacionSalida()}
                            >
                                
                                    <Text style={styles.textoBtn2}><MaterialCommunityIcons name="reload"  size={24} />  </Text>
                                
                            </TouchableHighlight>
                            </Animated.View>
                            
                            </View>
                            <View style= {styles.cerrado}>
                                <TouchableHighlight  onPress={() => {mostrarClima()}} style={styles.bntVerClima} underlayColor='none' >
                                    <Text style={styles.textoBtn} > {!mostrar ? "VER CLIMA" : "CERRAR"}</Text>
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
                                        style={styles.label}>Pais: </Text>
                                        <Text style={styles.texto}>{item.pais}</Text>
                                    </View>
                                </View>
                                <TouchableHighlight 
                                        onPress={ () => dialogoEliminar(item.ciudad)} 
                                        style={styles.bntEliminar}
                                        underlayColor='none'>
        
                                        <Text style={styles.textoBtn2}><MaterialCommunityIcons name="delete-forever"  size={24} /> </Text>
                                </TouchableHighlight>
                        </View>
                        <View style= {styles.cerrado}>
                            <TouchableHighlight  onPress={() => {mostrarClima()}} style={styles.bntVerClima} underlayColor='none' >
                                <Text style={styles.textoBtn}> {!mostrar ? "VER CLIMA" : "CERRAR"}</Text>
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
        borderBottomColor: "lightskyblue",
        borderStyle: 'solid',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius:12,
        margin:25,
        borderBottomWidth: 10,
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
        backgroundColor: "lightgray",
        marginTop:10,
        marginRight:10,
        width:45,
        height:45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:15,
  
      },
      bntVerClima: {
        padding: 10,
        backgroundColor: "lightskyblue",
        marginHorizontal: 10,
        borderRadius:20,
        marginBottom: 10,
        width:150,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 
      },
      bntActualizar:{
        backgroundColor: "lightblue",
        marginBottom: 10,
        marginTop: 15,
        paddingLeft: 15,
        padding:5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius:25,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 
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
      },
      detailsContainer:{
          alignItems: 'center',
          justifyContent: "center",
      }
     
});

export default City;