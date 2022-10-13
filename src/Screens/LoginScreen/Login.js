import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, InputArea, CustomButton, CustomButtonText } from "./LoginStyle";
import EntryInput from "../../Components/EntryInput";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image,
  StyleSheet,
  View
} from 'react-native';
import Api from "../../Api/Api";
import { GlobalContainer } from "../GlobalStyles/GlobalStyle";


export default () => {

  const navigation = useNavigation();

  const [emailField, setEmailField] = useState('');
  const [passwordField, setpasswordField] = useState('');

  const checkEntryInputs = async () => {

    if (emailField != '' && passwordField != '') {
      let json = await Api.postUser(emailField, passwordField);

      if (json.Token) {
        navigation.reset({
          routes: [{ name: 'Home' }]
        });
      } else {
        Alert.alert("Aviso!", "Usuário ou senha inválidos.");
      }

    } else {
      Alert.alert("Aviso!", "Preencha todos os campos.");
    }


  }



  return (
    <GlobalContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding" >

          <Container>
            <InputArea>
              <View style={styles.container}>
                <Image
                  style={styles.stretch}
                  source={require('../../../Assets/MyPetGoIcon.png')}
                />
              </View>

              <EntryInput
                placeholder={"Usuário"}
                value={emailField}
                onChangeText={t => setEmailField(t)}
                isPassword={false}
              />

              <EntryInput
                placeholder={"Senha"}
                value={passwordField}
                onChangeText={t => setpasswordField(t)}
                isPassword={true}
              />

              <CustomButton onPress={() => checkEntryInputs()}>
                <CustomButtonText>
                  Entrar
                </CustomButtonText>
              </CustomButton>

            </InputArea>
          </Container>

        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </GlobalContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  stretch: {
    width: 250,
    height: 250,
    resizeMode: 'stretch',
  },
});