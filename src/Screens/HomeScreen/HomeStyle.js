import react from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    background-color: #63C2D1;
    flex: 1;
    align-items: center;
`;

export const ListArea = styled.ScrollView`
    padding: 15px;    
    width: 100%;
    margin-bottom: 100px;
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
`;

export const TextMainCard = styled.Text`
    text-align: left;
    font-size: 18px;
    margin: 10px;
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

export const LoadingIcon = styled.ActivityIndicator`

`;

export const ContainerLoadingIcon = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`; 


