import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
//import { Header } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';


const Details = ({resultado}) => {
    
    //Sólo carga si llegan los datos
    if(!resultado)return null
    const {name,main} = resultado;
    if(!main) return null
    if(!name) return null


    // grados kelvin
    const kelvin =273.15

    
    return (        
        <>  
            {/* <Header
                placement="center"
                backgroundColor= "lightsalmon"
                centerComponent={{ text: 'Ciudad Actual', style: { color: '#fff', fontSize:20 } }}
                /> */}
            <StatusBar style="dark" backgroundColor= "#FFF" />
         
          {/*  <Text>Desde detalles.js</Text> */}
            
            <View style ={styles.clima}>
               <Text style ={styles.texto, styles.actual}> {parseInt (main.temp - kelvin)} 
                    <Text style= {styles.temperatura}>
                        &#x2103;
                    </Text>
                    <Image
                        style={{width: 66, height: 58}}
                        source = {{ uri: `http://openweathermap.org/img/w/${resultado.weather[0].icon}.png`}}
                    />
                    <View style={styles.temperaturas}>
                        <Text style={styles.texto}> Min { " "}
                            <Text style={styles.temperatura}>
                                {parseInt(main.temp_min - kelvin)} &#x2103;
                            </Text>
                        </Text>
                        <Text style={styles.texto}> Max {" "}
                            <Text style={styles.temperatura}>
                                {parseInt(main.temp_max - kelvin)} &#x2103;
                            </Text>
                        </Text>
                    </View>
                    
               </Text>

            </View> 

           
       </>
    );
};

const styles = StyleSheet.create({
    clima: {
        marginTop:5,
        backgroundColor: '#ffb6c1',
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    texto: {
        marginTop: 10,
        color: '#000',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',        
    },
    actual: {
        fontSize: 80,
        marginRight: 0,
        fontWeight: 'bold',
    },
    temperatura: {
        fontSize: 24,
        fontWeight: 'normal',
    },
    temperaturas: {
        marginTop: 20,
        //flexDirection: "row"
        justifyContent: 'center',
    },
    titulo: {
        textAlign: 'center',
        fontSize: 32,
        color: `#ff1493`,
        marginBottom: 20,
    },
})

export default Details;