
  import React from "react";
  import { StyleSheet, Text, View, Button, } from "react-native";
  import { Header } from 'react-native-elements';
  import { StatusBar } from 'expo-status-bar';
  import { Video } from 'expo-av';

  
  const About = () => {
          const video = React.useRef(null);
          const [status, setStatus] = React.useState({});

          return (
              <>
              <Header
                  placement="center"
                  backgroundColor= "plum"
                  centerComponent={{ text: 'Quienes somos', style: { color: '#fff', fontSize:20 } }}
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
                <Button   //reproducción de video
                  title={status.isPlaying ? 'Pausar' : 'Reproducir'}
                  onPress={() =>
                    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                  }
                />
              </View>
            </View>
              </>

          );
     
  }
  
  const styles = StyleSheet.create({

      container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
      },
      video: {
        alignSelf: 'center',
        alignSelf: 'center',
        width: "100%",
        height: 400,
      },
      buttons: {
        paddingBottom: 55,
        justifyContent: 'center',
        alignItems: 'center',
      },
      
  })
  export default About;