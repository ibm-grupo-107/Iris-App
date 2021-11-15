import { Image, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';

import Onboarding from 'react-native-onboarding-swiper';


const Square = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
  } else {
    backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
  }
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor
      }}
    />
  );
};




const Done = ({...props}) => (
  <Button
    color="#000000"
    title={'Comenzar'}
    buttonStyle={{
      backgroundColor: "mediumaquamarine",
      marginRight:20,
    }}
    containerViewStyle={{
      marginVertical: 10,
      width: 70,
    }}
    {...props}
  />
);

const Skip = ({...props }) => (
  <TouchableOpacity
  style={{marginHorizontal:30}}
  {...props}
>
  <Text style={{fontSize:16, color:"#555555"}}>Saltar</Text>
</TouchableOpacity>
);



const Next = ({...props }) => (
  <Button
    title={'Siguiente'}
    buttonStyle={{
      backgroundColor: "mediumaquamarine",
      marginRight:20,
    }}
    containerViewStyle={{
      marginVertical: 10,
      width: 70,
    }}
    {...props}
  />
);


const OnBoardingScreen = ({navigation}) => {
  return(
    <Onboarding
        onSkip={()=>navigation.navigate("Main")}
        onDone={()=>navigation.navigate("Main")}
        
        DotComponent={Square}
        NextButtonComponent={Next}
        SkipButtonComponent={Skip}
        DoneButtonComponent={Done}
        titleStyles={{ color: '#000000' }} // set default color for the title
        
        pages={[
          {
    
            backgroundColor: "#FFF",
            image: <Image source={require("../../assets/buscar.png")} />,
            title: 'Busca la Ciudad',
            subtitle: 'Un Proceso simple y rápido',

          },
          {
            backgroundColor: "#FFF",
            image: <Image source={require("../../assets/clima.png")} />,
            title: 'Obten el Clima',
            subtitle: 'No te enfrentes a temporales',
          },
          {
            backgroundColor: "#FFF",
            image: <Image source={require("../../assets/city.png")} />,
            title: 'Registra tus ciudades',
            subtitle: "Crea tu lista personalizada",

          },
        ]}
    />
  )
  };

export default OnBoardingScreen;  