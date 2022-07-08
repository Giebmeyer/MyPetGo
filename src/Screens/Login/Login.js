import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, InputArea, CustomButton, CustomButtonText } from "./Style";
import EntryInput from "../../Components/EntryInput";

export default () => {

  const navigation = useNavigation();

  const [emailField, setEmailField] = useState('');
  const [senhaField, setSenhaField] = useState('');
  
  const checkEntryInputs = async () =>{
    if(emailField != null || senhaField != null){
      navigation.reset({
        routes: [{name: 'Home'}]
    });
    }else{
      alert("Preencha todos os campos.");
    }
  }


  return(
    <Container>
      <InputArea>

        <EntryInput 
        placeholder={"Usuário"}
        value={emailField}
        onChangeText={t=>setEmailField(t)}
        isPassword={false}
        />
        
        <EntryInput 
        placeholder={"Senha"}
        value={senhaField}
        onChangeText={t=>setSenhaField(t)}
        isPassword={true}
        />

        <CustomButton onPress={checkEntryInputs}>
          <CustomButtonText>
            Entrar
          </CustomButtonText>
        </CustomButton>

      </InputArea>
    </Container>
  )
}
