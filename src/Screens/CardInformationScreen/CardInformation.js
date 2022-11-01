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

import { database } from '../../database';
import { Q } from '@nozbe/watermelondb';

export default (Information) => {
    const navigator = useNavigation();
    const TypeCollection = Information.route.params.data.Status;

    let TextButton = "";
    let TextCollection = "";
    const [Annotations, setAnnotations] = useState([])

    var Cords = false;
    var disable = false;
    let itAnnotation = false;


    useEffect(() => {
        getAnotations();
        console.log("==> ", Information.route.params.data);
    }, [])

    getAnotations = async () => {
        setAnnotations(await database.get('QuestAnnotation').query(
            Q.on('Quests', 'id', Information.route.params.data.ID_Quests),
            Q.where('Excluida', Q.notEq("1"))
        ).fetch())
    }



    if (Information.route.params.data.Longitude != null && !Information.route.params.data.Latitude != null) {
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
                    onPress: async () => {
                        var newStatus = "";

                        if (Information.route.params.data.Status == "Coletado") {
                            newStatus = "Entregue";
                        }
                        if (Information.route.params.data.Status == "Aguardando Coleta") {
                            newStatus = "Coletado";
                        }

                        const registro = await database.get(`Quests`).query(
                            Q.where('id', Information.route.params.data.ID_Quests)
                        )
                        console.log("REGISTRO RELACIONADO => ", registro[0].Status)
                        if (!registro[0]) {
                            return "NAN"
                        } else {

                            await database.write(async () => {
                                await registro[0].update(data => {
                                    data.Status = newStatus,
                                        data.Sincronizado = "0"
                                })
                            })
                            console.log("Registro Atualizado - Quests - Interno");
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
                            Coleta {Information.route.params.data.IdColeta}
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
                                {Information.route.params.data.Nome_Cliente} - {Information.route.params.data.CPF_Cliente ? Information.route.params.data.CPF_Cliente : "Sem CPF"}
                            </TextMainCard>
                        </ContainerQuests>

                        <ContainerQuests>
                            <Image
                                source={require("../../../Assets/pets.png")}
                                style={ImageStyle.RowBack}
                            />
                            <TextMainCard>
                                {Information.route.params.data.Nome} - {Information.route.params.data.Especie}, {Information.route.params.data.Porte}
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
                                {Information.route.params.data.Telefone ? Information.route.params.data.Telefone : "Sem telefone"}
                            </TextMainCard>
                        </ContainerQuests>

                        <ContainerQuests>
                            <Image
                                source={require("../../../Assets/home.png")}
                                style={ImageStyle.RowBack}
                            />
                            <TextMainCard>
                                {Information.route.params.data.Rua}, Nº {Information.route.params.data.Numero} {Information.route.params.data.Bairro} - {Information.route.params.data.Cidade}
                            </TextMainCard>
                        </ContainerQuests>

                        <View style={ViewStyle.container}>
                            <Image
                                source={require("../../../Assets/pin_drop.png")}
                                style={ImageStyle.RowBack}
                            />
                            <ButtonOpenLink
                                placeholder={"Abrir endereço no mapa"}
                                url={`https://www.google.com/maps?q=${Information.route.params.data.Longitude},${Information.route.params.data.Latitude}`}
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

                    <ContainerMainAnnotation>
                        <SubContainer>
                            <TextMainAnnotations>
                                Anotações
                            </TextMainAnnotations>
                        </SubContainer>
                        {Annotations.map((item, k) => (

                            <CustomAnnotationText CustomAnnotationText key={k}>#{k + 1} - {item.Anotacao}</CustomAnnotationText>

                        ))}
                    </ContainerMainAnnotation>

                </ListArea>
            </ContainerMain>

            <TabBarNavigation currentSreen={"CardInformation"} Quest={Information}>

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