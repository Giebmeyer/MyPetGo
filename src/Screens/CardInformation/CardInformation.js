import react, { useState } from "react";
import { Text, Image, StyleSheet} from "react-native";
import { ContainerMainCard, ContainerQuests, TextMainCard, TextMainCardBack, ContainerQuestsBack, ContainerMainCardBack, CustomButton, CustomButtonText, ContainerTextCollection, TextStatusCollection} from "./Style";
import { GlobalContainer } from "../GlobalStyles/GlobalStyle";
import { useNavigation } from "@react-navigation/native";

export default (Information) => {

    const TypeCollection = Information.route.params.data.Tarefa.Status;
    let TextButton = "";
    let TextCollection = "";

    switch(TypeCollection){
        case "Coletado":
            TextButton = "Entregar Animal";
            TextCollection = "Coletado";
            break;
        
        case "Aguardando Coleta":
            TextButton = "Coletar Animal";
            TextCollection = "Aguardando Coleta"
            break;
    }
 
    const navigator = useNavigation();
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
                        source={require("../../Assets/pin_drop.png")}
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
                    {Information.route.params.data.Endereco.Rua}, Nº {Information.route.params.data.Endereco.Numero}, {Information.route.params.data.Endereco.Bairro} - {Information.route.params.data.Endereco.Cidade} 
                    </TextMainCard>
                </ContainerQuests>

            </ContainerMainCard>

            <CustomButton>
                <CustomButtonText>
                    {TextButton}
                </CustomButtonText>
            </CustomButton>


        </GlobalContainer>
    
        
    )
}

const ImageStyle = StyleSheet.create({
    RowBack:{
        width: 15,
        height: 15,
        padding: 15,
    }
})