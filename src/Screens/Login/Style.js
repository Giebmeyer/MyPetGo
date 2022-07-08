import react from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    background-color: #63C2D1;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const InputArea = styled.View`
    padding: 40px;    
    width: 100%;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #035266;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #FFF;
`;
