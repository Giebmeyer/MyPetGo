import React, {useEffect} from "react";
import { Text } from "react-native";
import { Container, LoadingIcon, Texto } from "./Style";
import {useNavigation} from '@react-navigation/native';

export default () => {

  const navigator = useNavigation();

  const checkToken = async() => {
    if(Token){
      navigator.reset({
        routes: [{name: 'Home'}]
    });
    }else{
      navigator.navigate('Login');
    }

  }

  useEffect(() => {
      checkToken();
  })

  return(
    <Container>
      <LoadingIcon size="large" color="#FFFFFF"/>
      <Texto>Carregando...</Texto>
    </Container>
  )
}
