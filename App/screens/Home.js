import React from "react";
import { StyleSheet, Text, View, Image,TouchableWithoutFeedback, ScrollView} from "react-native";
import { Header } from 'react-native-elements';
import AppLoading from "expo-app-loading";
import {useFonts} from "expo-font"
import { StatusBar } from 'expo-status-bar';



import { 
    Raleway_100Thin,
    Raleway_100Thin_Italic,
    Raleway_200ExtraLight,
    Raleway_200ExtraLight_Italic,
    Raleway_300Light,
    Raleway_300Light_Italic,
    Raleway_400Regular,
    Raleway_400Regular_Italic,
    Raleway_500Medium,
    Raleway_500Medium_Italic,
    Raleway_600SemiBold,
    Raleway_600SemiBold_Italic,
    Raleway_700Bold,
    Raleway_700Bold_Italic,
    Raleway_800ExtraBold,
    Raleway_800ExtraBold_Italic,
    Raleway_900Black,
    Raleway_900Black_Italic 
  } from '@expo-google-fonts/raleway'


export default function Home(){

    let [fontsLoaded, error] = useFonts({
        Raleway_100Thin,
        Raleway_100Thin_Italic,
        Raleway_200ExtraLight,
        Raleway_200ExtraLight_Italic,
        Raleway_300Light,
        Raleway_300Light_Italic,
        Raleway_400Regular,
        Raleway_400Regular_Italic,
        Raleway_500Medium,
        Raleway_500Medium_Italic,
        Raleway_600SemiBold,
        Raleway_600SemiBold_Italic,
        Raleway_700Bold,
        Raleway_700Bold_Italic,
        Raleway_800ExtraBold,
        Raleway_800ExtraBold_Italic,
        Raleway_900Black,
        Raleway_900Black_Italic 

    })

    if(!fontsLoaded){
        return <AppLoading/>
    }
    return (
        <>
        <Header
            placement="center"
            backgroundColor= "lightcoral"
            centerComponent={{ text: 'Inicio', style: { color: '#fff', fontSize:20 } }}
            />
        <View style = {styles.container}>
            <Text style = {styles.text }> Iris App </Text>
            <Text>Instrucciones de uso:</Text>
        <ScrollView
            style={styles.scroll}
            horizontal
        >
        <View style={styles.scrollItem}>
            <Text style = {styles.text2 }>Paso 1:</Text>
            <Text style = {styles.text3}>Buscar Ciudad:</Text>
            <Image style={styles.img} source={require("../../assets/agregar.png")}/>
            <TouchableWithoutFeedback>
                    <View style={styles.btnBuscar} >
                    <Text style={styles.btnTexto}>Agregar</Text>
                    </View>
                </TouchableWithoutFeedback>
        </View>
            <View style={styles.scrollItem}>
            <Text style = {styles.text2 }>Paso 2:</Text>
            <Text style = {styles.text3}>Guardar ciudad:</Text>
            <Image style={styles.img} source={require("../../assets/verClima.png")}/>
            <TouchableWithoutFeedback>
                    <View style={styles.btnBuscar} >
                    <Text style={styles.btnTexto} >Ver Lista de Ciudades</Text>
                    </View>
                </TouchableWithoutFeedback>
        </View>
            <View style={styles.scrollItem}>
            <Text style = {styles.text2 }> Paso 3:</Text>
            <Text style = {styles.text3}>consultar clima:</Text>
            <Image style={styles.img} source={require("../../assets/mostrarClima.png")}/>
            <TouchableWithoutFeedback>
                    <View style={styles.btnBuscar} >
                    <Text style={styles.btnTexto}>Ver clima de ciudades</Text>
                    </View>
                </TouchableWithoutFeedback>
        </View>
        </ScrollView>
            

        </View>
        <StatusBar style="dark" backgroundColor= "#FFF" />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor:"mistyrose"
    },
    text:{
        fontSize: 28,
        marginTop:20,
        fontWeight: "bold",
        fontFamily: "Raleway_200ExtraLight",
    },
    text2:{
        fontSize: 20,
        marginTop:20,
        fontWeight: "bold",
        textAlign:"center",
        fontFamily: "Raleway_200ExtraLight",
    
    },
    text3:{
        textAlign:"center",
    },
    img:{
        marginTop:10,
    },
    btnBuscar: {
        marginHorizontal: '2.5%',
        marginTop: 10,
        backgroundColor: "#ff1493",
        padding: 10,
        justifyContent: 'center',
        marginBottom:30,
        width: "70%",
        borderRadius: 20,
    },
    btnTexto:{
        color:"#FFF",
        textAlign:"center",
    },
    pasos: {
        width:180,
        height:100,
        display: 'flex',
        alignItems: 'center',
        margin: 10,
    },
   
    scroll:{
        marginTop: 10,
    },
    btnInstruccion:{
        backgroundColor: "#ff1493",
        padding: 10,
        width:"100%",
        marginTop:10,
        marginRight:10,
        
    },
    scrollItem:{
        marginHorizontal: 80,
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    
    }
})