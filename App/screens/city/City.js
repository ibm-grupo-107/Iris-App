import React from 'react';
import {Text, View, StyleSheet, Image, Systrace} from 'react-native';
import { Header } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const City = ({resultado}) => {

    const {name, main} = resultado;

    if(!name) return null;

    const kelvin = 273.15;

    return (

        <>
            <Header
                placement="center"
                backgroundColor= "lightsalmon"
                centerComponent={{ text: 'Ciudad Actual', style: { color: '#fff', fontSize:20 } }}
                />
            <StatusBar style="dark" backgroundColor= "#FFF" />
            <View style={styles.clima}>
                <Text style={styles.titulo}> Temperatura actual en {name} </Text>
                <Image
                            style={{width: 100, height: 90}}
                            source={{uri: `http://openweathermap.org/img/w/${resultado.weather[0].icon}.png`}}
                        />
                <Text style={[styles.texto, styles.actual]}> { parseInt( main.temp - kelvin ) }
                        <Text style={styles.temperatura}>
                            &#x2103;
                        </Text>
                        
                </Text>

                <View style={styles.temperaturas}>
                    <Text style={styles.texto}> Min {' '}
                        <Text style={styles.temperatura}>
                            { parseInt(main.temp_min - kelvin) } &#x2103;
                        </Text>
                    </Text>
                    <Text style={styles.texto}> Max {' '}
                        <Text style={styles.temperatura}>
                            { parseInt(main.temp_max - kelvin) } &#x2103;
                        </Text>
                    </Text>
                </View>
            </View>
       </>
    );
};

const styles = StyleSheet.create({
    clima: {
        backgroundColor: '#ffb6c1',
        flex: 1,
        alignItems: 'center'
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
        justifyContent: 'center',
    },
    titulo: {
        textAlign: 'center',
        fontSize: 32,
        color: `#ff1493`,
        marginBottom: 20,
    },
})

export default City;