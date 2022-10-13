import {
    ContainerMainCard, ContainerQuests, TextMainCard,
    TextMainCardBack, ContainerQuestsBack, ContainerMainCardBack,
    CustomButton, CustomButtonText, ContainerTextCollection, TextStatusCollection,
    CustomButtonDisable, CustomButtonTextDisable, ContainerMain, ListArea, ContainerMainCardButton, ContainerMainAnnotation, CustomAnnotationText, TextMainAnnotations, SubContainer
} from "./CardInformationStyle";
import { View, Button, StyleSheet, Alert, Image, ScrollView } from "react-native";
import { GlobalContainer } from "../GlobalStyles/GlobalStyle";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import ButtonOpenLink from "../../Components/ButtonOpenLink";
import Api from "../../Api/Api";

import TabBarNavigation from "../../Components/CustomTabBar";


export default (Information) => {
    const navigator = useNavigation();
    const TypeCollection = Information.route.params.data.Quest.Status;

    let TextButton = "";
    let TextCollection = "";
    let anotations = [];

    var Cords = false;
    var disable = false;
    var itAnnotation = false;


    useEffect(() => {
        getAnotations();
    }, [])

    getAnotations = async () => {
        anotations = await Api.getAnnotations(Information.route.params.data.Quest.Id);
        console.log(anotations.length);
        if (anotations != null && anotations != "" && anotations.length > 0) {
            itAnnotation = true;
        }
        console.log(itAnnotation);
    }

    if (Information.route.params.data.Anotacoes != null && Information.route.params.data.Anotacoes != "") {
        itAnnotation = true;
    }

    if (Information.route.params.data.Endereco.Longitude != null && !Information.route.params.data.Endereco.Latitude != null) {
        Cords = true;
    }

    switch (TypeCollection) {
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
                        const returnPut = Api.putQuest(Information.route.params.data.Quest.Id);
                        if (returnPut == "Quest id null or Empty" || returnPut == "Nenhum registro encontrado para esse Id") {
                            Alert.alert("Aviso!", "Ocorreu um erro ao alterar o status da sua viagem");
                        } else {
                            navigator.goBack();
                        }

                    },
                },
                {
                    text: "Não",
                    onPress: () => {

                    },
                },
            ]
        );
    }



    return (
        <GlobalContainer>
            <ContainerMain>
                <ContainerMainCardBack>

                    <ContainerQuestsBack onPress={navigator.goBack}>

                        <Image
                            source={require("../../../Assets//ArrowBack.png")}
                            style={ImageStyle.RowBack}
                        />

                        <TextMainCardBack>
                            Coleta {Information.route.params.data.Quest.Id}
                        </TextMainCardBack>

                        <ContainerTextCollection>
                            <TextStatusCollection>{TextCollection}</TextStatusCollection>
                        </ContainerTextCollection>

                    </ContainerQuestsBack>
                </ContainerMainCardBack>

                <ListArea>

                    <ContainerMainCard>
                        <SubContainer>
                            <TextMainAnnotations>
                                Informações
                            </TextMainAnnotations>
                        </SubContainer>
                        <ContainerQuests>
                            <Image
                                source={require("../../../Assets/person.png")}
                                style={ImageStyle.RowBack}
                            />
                            <TextMainCard>
                                {Information.route.params.data.Endereco.Cliente.Nome} - {Information.route.params.data.Endereco.Cliente.CPF}
                            </TextMainCard>
                        </ContainerQuests>

                        <ContainerQuests>
                            <Image
                                source={require("../../../Assets/pets.png")}
                                style={ImageStyle.RowBack}
                            />
                            <TextMainCard>
                                {Information.route.params.data.Quest.Pet.Nome} - {Information.route.params.data.Quest.Pet.Especie}, {Information.route.params.data.Quest.Pet.Porte}
                            </TextMainCard>
                        </ContainerQuests>

                        <ContainerQuests>
                            <Image
                                source={require("../../../Assets/warningPerson.png")}
                                style={ImageStyle.RowBack}
                            />
                            <TextMainCard>
                                {Information.route.params.data.Observacao ? Information.route.params.data.Observacao : "Sem observações"}
                            </TextMainCard>
                        </ContainerQuests>

                        <ContainerQuests>
                            <Image
                                source={require("../../../Assets/call.png")}
                                style={ImageStyle.RowBack}
                            />
                            <TextMainCard>
                                {Information.route.params.data.Endereco.Cliente.Telefone}
                            </TextMainCard>
                        </ContainerQuests>

                        <ContainerQuests>
                            <Image
                                source={require("../../../Assets/home.png")}
                                style={ImageStyle.RowBack}
                            />
                            <TextMainCard>
                                {Information.route.params.data.Endereco.Rua}, Nº {Information.route.params.data.Endereco.Numero} {Information.route.params.data.Endereco.Bairro} - {Information.route.params.data.Endereco.Cidade}
                            </TextMainCard>
                        </ContainerQuests>

                        <View style={ViewStyle.container}>
                            <Image
                                source={require("../../../Assets/pin_drop.png")}
                                style={ImageStyle.RowBack}
                            />
                            <ButtonOpenLink
                                placeholder={"Abrir endereço no mapa"}
                                url={`https://www.google.com/maps?q=${Information.route.params.data.Endereco.Longitude},${Information.route.params.data.Endereco.Latitude}`}
                                isDisable={Cords}
                            >
                            </ButtonOpenLink>

                        </View>
                    </ContainerMainCard>

                    <ContainerMainCardButton>
                        {!disable ?

                            <CustomButton onPress={() => putQuest()}>
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
                    </ContainerMainCardButton>

                    {itAnnotation &&
                        <ContainerMainAnnotation>
                            <SubContainer>
                                <TextMainAnnotations>
                                    Anotações
                                </TextMainAnnotations>
                            </SubContainer>
                            {Information.route.params.data.Anotacoes.map((item, k) => (

                                <CustomAnnotationText key={k}>#{k+1} - {item.Anotacao}</CustomAnnotationText>

                            ))}
                        </ContainerMainAnnotation>}

                </ListArea>
            </ContainerMain>

            <TabBarNavigation currentSreen={"CardInformation"} idQuest={Information.route.params.data.Quest.Id}>

            </TabBarNavigation>
        </GlobalContainer>




    )
}

const ImageStyle = StyleSheet.create({
    RowBack: {
        width: 15,
        height: 15,
        padding: 15,
    }
});

const ViewStyle = StyleSheet.create({
    container: { justifyContent: "center", alignItems: "center", flexDirection: "row", marginBottom: 10, marginRight: 10 },
});