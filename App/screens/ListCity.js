import React from "react";
import { Header } from 'react-native-elements';
import { StyleSheet, Text, View} from "react-native";
import { StatusBar } from 'expo-status-bar';


export default function ListCity(){
    return (
        <>
        <Header
            placement="center"
            backgroundColor= "skyblue"
            centerComponent={{ text: 'Lista de Ciudades', style: { color: '#fff', fontSize:20 } }}
            />
        <View style = {styles.container}>
            <Text style = {styles.text }> Lista de Ciudades </Text>
        </View>
        <StatusBar style="dark" backgroundColor= "#FFF" />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 25,
        fontWeight: "bold",
    },
})