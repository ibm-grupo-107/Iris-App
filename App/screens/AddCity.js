import React from "react";
import { Header } from 'react-native-elements';
import { StyleSheet, Text, View} from "react-native";
import { StatusBar } from 'expo-status-bar';



export default function AddCity(){
    return (
        <>
        <Header
            placement="center"
            backgroundColor= "mediumaquamarine"
            centerComponent={{ text: 'Agregar Ciudad', style: { color: '#fff', fontSize:20 } }}
        />
        <View style = {styles.container}>
            <Text style = {styles.text }> Agregar Ciudad </Text>
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