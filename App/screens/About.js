import React from "react";
import { StyleSheet, Text, View} from "react-native";
import { Header } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

export default function App(){
    return (
        <>
        <Header
            placement="center"
            backgroundColor= "plum"
            centerComponent={{ text: 'About', style: { color: '#fff', fontSize:20 } }}
            />
        <View style = {styles.container}>
            <Text style = {styles.text }> About </Text>
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
        backgroundColor: "lavender",
    },
    text:{
        fontSize: 25,
        fontWeight: "bold",
    },
    
})