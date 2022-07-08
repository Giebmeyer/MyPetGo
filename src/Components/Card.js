import react from "react";
import styled from "styled-components/native";

const ContainerRigh = styled.View`
    background-color: #FFFFFF;
    width: 97%;
    borderTopRightRadius: 5px;
    borderBottomRightRadius: 5px;
`;

const ContainerLeft = styled.View`
    background-color: #3A5C9E;
    width: 3%;
    borderTopLeftRadius: 20px;
    borderBottomLeftRadius: 30px;
`;

const Container = styled.TouchableOpacity`
    background-color: transparent;
    flex-direction: row;
    width: 300px;
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
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: black;
`;

const ContainerDescriptin = styled.View`
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

export default (data) => {
 return(

   <Container>
        <ContainerLeft>
        </ContainerLeft>

        <ContainerRigh>
           <ContainerDescriptin>
            <Descricao>
                    {data.data.Descricao}
                </Descricao>
           </ContainerDescriptin>

        <InformationQuest>
            <TextInformation>
                {data.data.id}
            </TextInformation>

            <TextInformation>
                {data.data.Descricao}
            </TextInformation>
        
            <TextInformation>
                {data.data.Descricao}
            </TextInformation>

        </InformationQuest>

        </ContainerRigh>
   </Container>
 )

}