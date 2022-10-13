import React, { useEffect, useState } from "react";
import { Container, LoadingIcon, Texto } from "./PreloadStyle";
import { useNavigation } from '@react-navigation/native';


export default () => {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const navigator = useNavigation();

  const checkToken = async () => {
    await delay(3000); 
    if (true) { // token
      navigator.reset({
        routes: [{ name: 'Login' }]
      });
    } else {
      navigator.navigate('Login');
    }

  }

  useEffect(() => {

    checkToken();
  })

  return (
    <Container>
      <LoadingIcon size="large" color="#FFFFFF" />
      <Texto>Carregando...</Texto>
    </Container>
  )
}