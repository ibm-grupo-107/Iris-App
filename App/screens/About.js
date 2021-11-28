
  import React from "react";
  import { StyleSheet, Text, View, Button, TouchableHighlight } from "react-native";
  import { Header } from 'react-native-elements';
  import { StatusBar } from 'expo-status-bar';
  import AppLoading from 'expo-app-loading';
  import { useFonts } from 'expo-font';
  import { Video } from 'expo-av';

  
  const About = () => {
            let [ fontsLoaded ] = useFonts({
              'Outfit-Regular': require('../../assets/fonts/Outfit-Regular.ttf'),
              'Outfit-SemiBold': require('../../assets/fonts/Outfit-SemiBold.ttf')
            });

          const video = React.useRef(null);
          const [status, setStatus] = React.useState({});
          
          if (!fontsLoaded) {
            return <AppLoading />;
          } else {  

          return (
              <>
              <Header
                  placement="center"
                  backgroundColor= "plum"
                  centerComponent={{ text: 'Quienes somos', style: { fontFamily: 'Outfit-SemiBold', color: '#fff', fontSize:20 } }}
                  />
              
              <StatusBar style="dark" backgroundColor= "#FFF" />
                
              <View style={styles.container}>
              <Video        //seccion de video
                ref={video}
                style={styles.video}
                source = {require('../../assets/Iris-video.mp4')}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
              />
             

              <View style={styles.buttons}>
                            <TouchableHighlight   
                  onPress={() =>
                    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                  }  style={styles.btn} underlayColor='none' >
                                <Text style={styles.textoBtn}> {status.isPlaying ? 'PAUSAR' : 'REPRODUCIR'}</Text>
                            </TouchableHighlight> 
              </View>
            </View>
              </>

          );
      }
  }
  
  const styles = StyleSheet.create({

      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
    
      },
      video: {
        alignSelf: 'center',
        alignSelf: 'center',
        width: "80%",
        height: 400,
      },
      buttons: {
        fontFamily:'Outfit-SemiBold',
        borderRadius: 100,
        fontSize: 29,
        padding: 55,
        // justifyContent: 'center',
        // alignItems: 'center',
        
      },
     
      textoBtn:{
        paddingVertical:15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "plum",
        borderRadius:20,
        width:150,
        fontSize:14,
        fontFamily: 'Outfit-Regular',
        color:"#fff",
        textAlign: 'center',
        textTransform: 'uppercase',
        fontFamily:'Outfit-Regular',
      
        
        
          
         
        
        
    
    },
  });

  export default About;