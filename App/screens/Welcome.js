import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated, Image, View, Text} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';


const Welcome = () => {

    let [ fontsLoaded ] = useFonts({
        'Reey-Regular': require('../../assets/fonts/Reey-Regular.otf')
    });

    
    const [ animacion2 ] = useState( new Animated.Value(1));
    const [ animacion1 ] = useState( new Animated.Value(0));
    

    useEffect(() => {
        Animated.sequence([
            
            Animated.spring( animacion2, {
                toValue: 6,
                duration: 3500,
                useNativeDriver: true,
            }),
            Animated.spring( animacion2, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(animacion1, {
                    toValue: 1,  
                    duration: 2000, 
                    useNativeDriver: true,
            }),
            
            Animated.timing(animacion1, {
                toValue: 1,  
                duration: 1000, 
                useNativeDriver: true,
        }),
            Animated.spring( animacion2, {
                toValue: 6,
                duration: 2000,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);


    const estiloAnimacion = {
        transform: [
            { scale: animacion2 }
        ]
     }

     if (!fontsLoaded) {
        return <AppLoading />;
      } else {
         return ( 
            <Animated.View  style={ styles.container, {opacity: animacion1 }}>
               <Animated.Text style={{fontFamily:'Reey-Regular', fontSize: 70, marginLeft: 35 }} >IRIS</Animated.Text>
                
                <Animated.Image 
                    style={[
                        styles.circulo,
                        estiloAnimacion
                    ]}
                    source={require('../../assets/arco-iriss.png')}
                />            
                <Animated.Text style={ styles.text2} >Lleva el clima{"\n"}  con vos...!!!</Animated.Text>
                                 
             </Animated.View >
         );

     }
    

   
}

const styles = StyleSheet.create({
    text2:{
        fontFamily:'Reey-Regular',
        fontSize: 29,
        marginLeft: 89,
        marginBottom: 50,
    },
     container: {
       
        marginTop: 350,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        

    },
    circulo:{
       width:"100%",
       height: 150,
       marginLeft:80,
       marginBottom:10, 
       borderRadius: 100,
       width: 200,
       height: 200,
       justifyContent: 'center',
       alignItems: 'center',
    },
})
 
export default Welcome;