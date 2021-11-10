import React from "react";
import { StyleSheet, Text, View} from "react-native";
import { Header } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

export default function Home(){
    return (
        <>
        <Header
            placement="center"
            backgroundColor= "lightcoral"
            centerComponent={{ text: 'Inicio', style: { color: '#fff', fontSize:20 } }}
            />
        <View style = {styles.container}>
            <Text style = {styles.text }> Inicio </Text>
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