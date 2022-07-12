import react from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const ContainerRigh = styled.View`
    background-color: #FFFFFF;
    width: 97%;
    borderTopRightRadius: 5px;
    borderBottomRightRadius: 5px;
`;

const ContainerLeft = styled.View`
    background-color: #63C2D1;
    width: 3%;
    borderTopLeftRadius: 20px;
    borderBottomLeftRadius: 30px;
`;

const Container = styled.TouchableOpacity`
    background-color: transparent;
    flex-direction: row;
    width: 97%;
    height: 150px;
    border-radius: 30px;
    margin-bottom: 10px;
`;

const Status = styled.View`
    border-radius: 50%;
    heidth: 10px;
    width: 10px;
`;

const Descricao = styled.Text`
    margin: 2px;
    color: #121215;
`;

const ContainerMainInformation = styled.View`
    justify-content: center;
    align-items: center;

`;

const InformationQuest = styled.View`
    margin-top: 15px;
    margin-left: 15px;
`;

const TextInformation = styled.Text`
    color: grey;
`;

const DescricaoMainInformation = styled.Text`
    color: grey;
`;

export default (data) => {

    const navigator = useNavigation();

    showInformationCard = (data) => {
        navigator.navigate("CardInformation",data);
    }

 return(

   <Container onPress = {() => this.showInformationCard(data)}>
        <ContainerLeft>
        </ContainerLeft>

        <ContainerRigh>

            <InformationQuest>
                    <Descricao>
                        Viagem #{data.data.id}
                    </Descricao>

                <ContainerMainInformation>
                    <DescricaoMainInformation>
                        Endereço
                    </DescricaoMainInformation>
            </ContainerMainInformation>

                <TextInformation>
                Bairro: {data.data.Endereco.Bairro}
                </TextInformation>

                <TextInformation>
                    {data.data.Endereco.Rua}, {data.data.Endereco.Numero}
                </TextInformation>

                <TextInformation>
                    {data.data.Tarefa.Tipo}
                </TextInformation>

                <ContainerMainInformation>
                    <DescricaoMainInformation>
                        Responsavel
                    </DescricaoMainInformation>
            </ContainerMainInformation>

                <TextInformation>
                    {data.data.Responsavel.Nome} - {data.data.Animal.Nome}
                </TextInformation>

                <TextInformation>
                    {data.data.Responsavel.Telefone}
                </TextInformation>
            </InformationQuest>

        </ContainerRigh>
   </Container>
 )

}