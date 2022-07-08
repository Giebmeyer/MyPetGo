import React, {useEffect} from "react";
import { Text } from "react-native";
import { Container, LoadingIcon, Texto } from "./Style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation, userNavigation} from '@react-navigation/native';

export default () => {

  const navigator = useNavigation();

  useEffect(() => {
      const checkToken = async() => {
        const Token = await AsyncStorage.getItem('token');
        
        if(Token){

        }else{
          navigator.navigate('Login');
        }

      }
      checkToken();
  })

  return(
    <Container>
      <LoadingIcon size="large" color="#FFFFFF"/>
      <Texto>Carregando...</Texto>
    </Container>
  )
}
