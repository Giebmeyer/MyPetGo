import react from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    background-color: #63C2D1;
    flex: 1;
    align-items: center;
`;

export const ListArea = styled.ScrollView` 
    padding: 10px;    
    width: 100%;
    margin-bottom: 50px;
`;

export const TextUser = styled.Text`
    font-size: 16px;
    color: #FFFFFF;
    margin-top: 5px;
`;

export const TextUserQuest = styled.Text`
    font-size: 20px;
    margin-top: 20px;
    margin-left: 10px;
    margin-bottom: 10px;
    color: #FFFFFF;
    font-weight: bold;
`;

export const ContainerTexts = styled.View`
    text-align: left;
    width: 100%;
`;

export const ContainerQuests = styled.View`
    text-align: left;
    width: 100%;
    margin: 5px;
    width: 95%;
    border-radius: 10px;
    background-color: #035266;

    flex-direction: row;
    word-wrap: normal;
`;

export const TextMainCard = styled.Text`
    text-align: left;
    font-size: 18px;
    margin: 10px;
    color: #FFFFFF;
`;

export const TextMainCardBack = styled.Text`
    text-align: left;
    font-size: 18px;
    margin-left: 20px;
    color: #FFFFFF;
    font-weight: bold;
`;

export const ContainerMainCard = styled.View`
    margin-bottom: 20px;
    width: 100%;
    border-radius: 10px;
    background-color: #035266;
    align-items: center;
`;

export const ContainerMainAnnotation = styled.View`
    margin-bottom: 50px;
    width: 100%;
    border-radius: 10px;
    background-color: #035266;
`;

export const CustomAnnotationText = styled.Text`
    font-size: 18px;
    padding: 10px
    color: #FFF;
`;

export const ContainerMainCardBack = styled.View`
    margin-bottom: 20px;
    margin-top: 20px;
    width: 95%;
    border-radius: 10px;
    background-color: #035266;
    align-items: center;
`;

export const ContainerQuestsBack = styled.TouchableOpacity`
    margin-bottom: 20px;
    margin-top: 20px;
    width: 95%;
    border-radius: 10px;
    background-color: #035266;
    align-items: center;
   
    flex-direction: row;
`;

export const ContainerMainCardButton = styled.View`
    margin-bottom: 50px;
    width: 100%;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #035266;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    width: 85%;
`;
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #FFF;
`;

export const CustomButtonDisable = styled.TouchableOpacity`
    height: 60px;
    background-color: #035266;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    width: 85%;
    box-shadow: 5px 2px 2px #51686B;
`;
export const CustomButtonTextDisable = styled.Text`
    font-size: 18px;
    color: #808080;
`;

export const ContainerTextCollection = styled.View`
    border-radius: 30px;
    background-color: #63C2D1;
    margin: auto;
`;

export const TextStatusCollection = styled.Text`
    font-size: 18px;
    margin: 5px;
    color: #FFF;
`;

export const ContainerMain = styled.View`
    align-items: center;
    flex: 1;
`;


export const TextMainAnnotations = styled.Text`
    font-size: 18px;
    margin: 5px;
    color: #FFF;
    font-weight: bold;
`;

export const SubContainer = styled.View`
    margin: 10px;
    width: 100%;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
`;