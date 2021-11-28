import React from "react";
import { StyleSheet, Text, View, Image,TouchableWithoutFeedback, ScrollView} from "react-native";
import { Header } from 'react-native-elements';
import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';

//Importar iconos de Material:
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



export default function Home(){
    let [ fontsLoaded ] = useFonts({
        'Outfit-Regular': require('../../assets/fonts/Outfit-Regular.ttf'),
        'Outfit-SemiBold': require('../../assets/fonts/Outfit-SemiBold.ttf')
    });

    const navigation = useNavigation();

 

    if (!fontsLoaded) {
        return <AppLoading />;
      } else {
    return (
        <>
        <Header
            placement="center"
            backgroundColor= "coral"
            centerComponent={{ text: 'Inicio', style: { fontFamily: 'Outfit-SemiBold', color: '#fff', fontSize:20 } }}
            />
        <View style = {styles.container}>
            <Text style = {styles.text }> Iris App </Text>
            <Text style = {styles.textIN }>Instrucciones de uso:</Text>
           
        <ScrollView
            style={styles.scroll}
            horizontal
            
        >
             
        <View style={styles.scrollItem}>
            <Text style = {styles.text2 }>INICIO:</Text>
            <Text style = {styles.text3}> </Text> 
            <Image style={styles.gif}  source={require("../../assets/inicio.gif")}/> 
            <View style={styles.espacio}></View>
        </View>
        <View style={styles.scrollItem}>
            <Text style = {styles.text2 }>Paso 1:</Text>
            <Text style = {styles.text3}>Buscar Ciudad: </Text>  
            <Image style={styles.img} source={require("../../assets/agregar.png")}/>
        
            <TouchableWithoutFeedback
                underlayColor='none'
                 onPress={() => navigation.navigate('Agregar Ciudad') }
            >
                    <View style={styles.btnBuscar} >
                    <Text style={styles.btnTexto}>Ir a "Agregar Ciudad"</Text>
                    </View>
                </TouchableWithoutFeedback>
        </View>
            <View style={styles.scrollItem}>
            <Text style = {styles.text2 }>Paso 2:</Text>
            <Text style = {styles.text3}>Guardar ciudad:</Text>
            <Image style={styles.img} source={require("../../assets/verMapa.png")}/>
            <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Agregar Ciudad') }
                underlayColor='none'
            >
                    <View style={styles.btnBuscar} >
                    <Text style={styles.btnTexto} >Ir a "Agregar Ciudad"</Text>
                    </View>
                </TouchableWithoutFeedback>
        </View>
        <View style={styles.scrollItem}>
            <Text style = {styles.text2 }>Paso 3:</Text>
            <Text style = {styles.text3}>Consultar clima:</Text>
            <Image style={styles.img} source={require("../../assets/verClima.png")}/>
            <TouchableWithoutFeedback
                underlayColor='none'
                onPress={() => navigation.navigate('ListCity') }
            >
                    <View style={styles.btnBuscar} >
                    <Text style={styles.btnTexto}>Ir a "Mis Ciudades"</Text>
                    </View>
                </TouchableWithoutFeedback>
        </View>
            <View style={styles.scrollItem}>
            <Text style = {styles.text2 }> Paso 4:</Text>
            <Text style = {styles.text3}>Ver clima:</Text>
            <Image style={styles.img} source={require("../../assets/mostrarClima.png")}/>
            <TouchableWithoutFeedback
                underlayColor='none'
                onPress={() => navigation.navigate('ListCity') }
            >
                    <View style={styles.btnBuscar} >
                    <Text style={styles.btnTexto}>Ir a "Mis ciudades"</Text>
                    </View>
                </TouchableWithoutFeedback>
        </View>
        </ScrollView>
            

        </View>
        <StatusBar style="dark" backgroundColor= "#FFF" />
        </>
    );
  }  
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor:"linen"
    },
    text:{
        fontSize: 45,
        marginTop:20,
        //fontWeight: "bold",
       fontFamily: 'Outfit-SemiBold',
    },
    textIN:{
        fontSize:20,
        marginTop:10,
       fontFamily: 'Outfit-Regular',
    },
    text2:{
        fontSize: 20,
        marginTop:10,
        //fontWeight: "bold",
        textAlign:"center",
        fontFamily: 'Outfit-Regular',

    },
    text3:{
        textAlign:"center",
        marginTop:10,
    },
    img:{
        marginTop:10,
    },
    viewImg:{
        flexDirection:"row"
    },
    gif:{
        width:250,
        height:250,
    },
  
    btnBuscar: {
        marginHorizontal: '2.5%',
        marginTop: 25,
        backgroundColor: "lightsalmon",
        padding: 10,
        justifyContent: 'center',
        marginBottom:30,
        width: "65%",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 
    },
    espacio:{
        marginHorizontal: '2.5%',
        marginTop: 25,
        padding: 10,
        justifyContent: 'center',
        marginBottom:30,
        width: "65%",
        borderRadius: 20,
    },
    btnTexto:{
        color:"#FFF",
        textAlign:"center",
        //fontWeight: "bold",
        fontFamily: 'Outfit-Regular',
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