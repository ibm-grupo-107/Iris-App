import React, {useState} from 'react';
import {TextInput, Alert, Animated, Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddCity = ({busqueda, guardarBusqueda, guardarConsultar}) => {

    const {ciudad, pais} = busqueda;

    const [animacionboton] = useState(new Animated.Value(1));

    const consultarClima = () => {
        if(ciudad.trim() === '' || pais.trim() === '') {
            mostrarAlerta();
            return;
        }

        //consultar la API
        guardarConsultar(true)
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Agrega una ciudad y pais',
            [{text: 'Entendido'}]
        )
    }

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
        <View style={styles.formulario}>
            <View style={styles.contenido}>
            <View style={styles.contenido}>
                <Picker
                    selectedValue={pais}
                    onValueChange= {pais => guardarBusqueda({...busqueda, pais})}
                    itemStyle={{height: 120, backgroundColor: '#FFF'}}
                >
                    <Picker.Item label="-- Seleccione un país --" value="" />
                    <Picker.Item label="Argentina" value="AR" />
                </Picker>
            </View>

                <TextInput 
                    onChangeText={ciudad => guardarBusqueda({...busqueda, ciudad})}
                    value={ciudad}
                    style={styles.input}
                    placeholder="Ciudad"
                    placeholderTextColor="#666"
                />
            
                <TouchableWithoutFeedback
                    onPressIn={() => animacionEntrada()}
                    onPressOut={() => animacionSalida()}
                    onPress={() => consultarClima()}
                >
                    <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
                        <Text style={styles.textoBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formulario: {
        flex: 1,
        backgroundColor: '#ffb6c1',
        justifyContent: 'center',
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