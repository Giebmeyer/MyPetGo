import React, {useState} from 'react';
import styled from 'styled-components/native';
import { useNavigation } from "@react-navigation/native";
import {StyleSheet, Image, View, Button, Alert} from "react-native";
import AlertInput from 'react-native-alert-input';


const TabArea = styled.View`
    height: 60px;
    background-color: #4EADBE;
    flex-direction: row;
    position:absolute;
    bottom: 15px; 
    width:100%;
`;

const TextTab = styled.Text`
    color: #FFF
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const TabItemCenter = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    justify-content: center;
    align-items: center;
    background-color: #035266;
    border-radius: 35px;
    border: 3px solid #4EADBE;
    margin-top: -30px;
`;

const TabCenter = styled.View`
    justify-content: center;
    align-items: center;
`;


export default ({currentSreen}) => {

    const navigatior = useNavigation();

    const goTo = (screenName) => {
        switch(screenName){
            case 'Home':
                navigatior.reset({
                    routes: [{name: 'Home'}]
                });
                break;
            
            case 'Login':
                navigatior.reset({
                    routes: [{name: 'Login'}]
                });
            break;

            case 'Settings':
                navigatior.navigate('Settings');
            break;

        }
    }

    const SettingsConfirm = () => {
        return (
            Alert.prompt('Digite a senha do técnico', null, (technicianPassword) =>
                {if(technicianPassword == "true"){
                    goTo('Settings')
                }else{
                    Alert.alert("Senha inválida");
                }}
          )
        )
    }

    const Anotation = () => {

    }

    switch(currentSreen){
        case "Home":
            return (
                <TabArea>
                    <TabItem onPress={()=> SettingsConfirm()}>
                        <Image 
                            source={require("../Assets/settings.png")}
                            style={ImageStyle.RowBack}
                        />
                        <TextTab>Opções</TextTab>
                    </TabItem>
        
                    <TabCenter>
                        <TabItemCenter onPress={()=> goTo('Home')}>
                        <Image 
                                source={require("../Assets/reload.png")}
                                style={ImageStyle.RowBack}
                            />
                        </TabItemCenter>
                        <TextTab>Atualizar Listagem</TextTab>
                    </TabCenter>
        
                    <TabItem onPress={()=>goTo('Login')}>
                        <Image 
                            source={require("../Assets/exit.png")}
                            style={ImageStyle.RowBack}
                        />
                        <TextTab>Sair</TextTab>
                    </TabItem>
                </TabArea>
        );

        case "CardInformation":
            return (
                <TabArea>
                    <TabItem onPress={()=>navigatior.goBack()}>
                        <Image 
                            source={require("../Assets/list.png")}
                            style={ImageStyle.RowBack}
                        />
                        <TextTab>Listagem</TextTab>
                    </TabItem>
        
                    <TabCenter>
                        <TabItemCenter onPress={() => Anotation()}>
                        <Image 
                                source={require("../Assets/pen.png")}
                                style={ImageStyle.RowBack}
                            />
                        </TabItemCenter>
                        <TextTab>Anotação</TextTab>
                    </TabCenter>
        
                    <TabItem onPress={()=>goTo('Login')}>
                        <Image 
                            source={require("../Assets/exit.png")}
                            style={ImageStyle.RowBack}
                        />
                        <TextTab>Sair</TextTab>
                    </TabItem>
                </TabArea>
        );

        case "Settings":
            return (
                <TabArea>
                    <TabItem onPress={()=>navigatior.goBack()}>
                        <Image 
                            source={require("../Assets/list.png")}
                            style={ImageStyle.RowBack}
                        />
                        <TextTab>Listagem</TextTab>
                    </TabItem>
        
                    <TabCenter>
                        <TabItemCenter onPress={() => Anotation()}>
                        <Image 
                                source={require("../Assets/save.png")}
                                style={ImageStyle.RowBack}
                            />
                        </TabItemCenter>
                        <TextTab>Gravar</TextTab>
                    </TabCenter>
        
                    <TabItem onPress={()=>navigatior.goBack()}>
                        <Image 
                            source={require("../Assets/exit.png")}
                            style={ImageStyle.RowBack}
                        />
                        <TextTab>Voltar</TextTab>
                    </TabItem>
                </TabArea>
        );
    }
}

const ImageStyle = StyleSheet.create({
    RowBack:{
        width: 15,
        height: 15,
        padding: 15,
    }
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });