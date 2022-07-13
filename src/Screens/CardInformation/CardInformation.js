import { ContainerMainCard, ContainerQuests, TextMainCard, 
    TextMainCardBack, ContainerQuestsBack, ContainerMainCardBack, 
    CustomButton, CustomButtonText, ContainerTextCollection, TextStatusCollection,
    CustomButtonDisable, CustomButtonTextDisable
} from "./Style";
import { View, Button, StyleSheet, Alert, Image } from "react-native";
import { GlobalContainer } from "../GlobalStyles/GlobalStyle";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import ButtonOpenLink from "../../Components/ButtonOpenLink";
import Api from "../../Api";




export default (Information) => {
console.log(`https://www.google.com/maps?q=${Information.route.params.data.Endereco.Longitude},${Information.route.params.data.Endereco.Latitude}`)
    const navigator = useNavigation();
    const TypeCollection = Information.route.params.data.Tarefa.Status;
    let TextButton = "";
    let TextCollection = "";

    let disable = false;

    switch(TypeCollection){
        case "Coletado":
            TextButton = "Entregar Animal";
            TextCollection = "Coletado";
            break;
        
        case "Aguardando Coleta":
            TextButton = "Coletar Animal";
            TextCollection = "Aguardando Coleta";
            break;
        case "Entregue":
            TextButton = "Entrega Concluída";
            TextCollection = "Entregue";
            disable = true;
            break;
    }
    
    const putQuest = () => {
        return Alert.alert(
            "Alteração de Status",
            "Você realmente deseja alterar o status dessa viagem?",
                [
                    {
                    text: "Sim",
                    onPress: () => {
                        Api.putQuest(Information.route.params.data.id);
                        navigator.goBack();
                    },
                    },
                    {
                    text: "Não",
                    onPress:  () => {

                    },
                    },
                ]
            );
        }

    return(
        <GlobalContainer>
            <ContainerMainCardBack>

              <ContainerQuestsBack onPress={navigator.goBack}>

              <Image 
                    source={require("../../Assets/ArrowBack.png")}
                    style={ImageStyle.RowBack}
                />

                <TextMainCardBack>
               {Information.route.params.data.Descricao} 
                </TextMainCardBack>

                <ContainerTextCollection>
                    <TextStatusCollection>{TextCollection}</TextStatusCollection>
                </ContainerTextCollection>

              </ContainerQuestsBack>
            </ContainerMainCardBack>
                

            <ContainerMainCard>
              <ContainerQuests>
                    <Image 
                            source={require("../../Assets/person.png")}
                            style={ImageStyle.RowBack}
                        /> 
                    <TextMainCard>
                        {Information.route.params.data.Responsavel.Nome} - {Information.route.params.data.Responsavel.CPF} 
                    </TextMainCard>
                </ContainerQuests>

                <ContainerQuests>
                    <Image 
                        source={require("../../Assets/pets.png")}
                        style={ImageStyle.RowBack}
                    />
                    <TextMainCard>
                    {Information.route.params.data.Animal.Nome} - {Information.route.params.data.Animal.Especie} 
                    </TextMainCard>
                </ContainerQuests>

                <ContainerQuests>
                    <Image 
                        source={require("../../Assets/warningPerson.png")}
                        style={ImageStyle.RowBack}
                    />
                    <TextMainCard>
                    {Information.route.params.data.Observacao} 
                    </TextMainCard>
                </ContainerQuests>

                <ContainerQuests>
                    <Image 
                        source={require("../../Assets/call.png")}
                        style={ImageStyle.RowBack}
                    />
                    <TextMainCard>
                    {Information.route.params.data.Responsavel.Telefone} 
                    </TextMainCard>
                </ContainerQuests>

                <ContainerQuests>
                    <Image 
                        source={require("../../Assets/home.png")}
                        style={ImageStyle.RowBack}
                    />
                    <TextMainCard>
                    {Information.route.params.data.Endereco.Rua}, Nº {Information.route.params.data.Endereco.Numero} {Information.route.params.data.Endereco.Bairro} - {Information.route.params.data.Endereco.Cidade}  
                    </TextMainCard>
                </ContainerQuests>

                    <View style={ViewStyle.container}>
                        <Image 
                            source={require("../../Assets/pin_drop.png")}
                            style={ImageStyle.RowBack}
                        />
                        <ButtonOpenLink
                            placeholder={"Abrir endereço no mapa"}
                            url={`https://www.google.com/maps?q=${Information.route.params.data.Endereco.Longitude},${Information.route.params.data.Endereco.Latitude}`}
                            isDisable={false}
                        >
                    </ButtonOpenLink>

                </View>

            </ContainerMainCard>

        {!disable?            
            <CustomButton onPress = {() => putQuest()}>
                <CustomButtonText>
                    {TextButton}
                </CustomButtonText>
            </CustomButton>
            :
            <CustomButtonDisable disabled={true}>
                <CustomButtonTextDisable>
                    {TextButton}
                </CustomButtonTextDisable>
            </CustomButtonDisable>
            }

        </GlobalContainer>
    
        
    )
}

const ImageStyle = StyleSheet.create({
    RowBack:{
        width: 15,
        height: 15,
        padding: 15,
    }
});

const ViewStyle = StyleSheet.create({
    container: {justifyContent: "center", alignItems: "center", flexDirection: "row", margin: 10 },
});