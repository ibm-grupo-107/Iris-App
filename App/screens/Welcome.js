import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated, Image, View, Text, Dimensions} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

const width = Dimensions.get("window").width;

const Welcome = () => {

    let [ fontsLoaded ] = useFonts({
        'Reey-Regular': require('../../assets/fonts/Dominique.otf')
    });

    const [animated, setAnimated] = useState(false);

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
                duration: 2500,
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
        ]).start(()=> setAnimated(true));
    }, []);


    const estiloAnimacion = {
        transform: [
            { scale: animacion2 }
        ]
     }

     if(!animated)
     if (!fontsLoaded) {
        return <AppLoading />;
      } else {
         return ( 
            <Animated.View  style={ styles.container, {opacity: animacion1 }}>
               <Animated.Text style={{fontFamily:'Reey-Regular', fontSize: 70, textAlign: 'center', marginTop: 100}} >IRIS</Animated.Text>
                
                <Animated.Image 
                    style={[
                        styles.circulo,
                        estiloAnimacion
                    ]}
                    source={require('../../assets/arco-iriss.png')}
                />            
                <Animated.Text style={ styles.text2} >Lleva el clima{"\n"}  con vos...!!!</Animated.Text>
                                 
             </Animated.View >
         );

     }
    
     return <Text></Text>
   
}

const styles = StyleSheet.create({
    text2:{
        
        fontFamily:'Reey-Regular',
        fontSize: 29,
        textAlign: 'center',
        marginTop: 100,
        width: width,

    },
     container: {
        
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    circulo:{
        // marginVertical: 50,
        marginLeft:80,
        marginTop:90, 
        borderRadius: 100,
        width: 200,
        height: 200,
      
    },
})
 
export default Welcome;