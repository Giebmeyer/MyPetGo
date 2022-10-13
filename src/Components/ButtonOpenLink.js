import React, { useCallback } from "react";
import { Alert, Button, Linking, StyleSheet, View } from "react-native";
import styled from "styled-components/native";

const supportedURL = "https://google.com";

const unsupportedURL = "slack://open?team=123456";


const OpenLinkButton = styled.TouchableOpacity`
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    background-color: #2A6E80;
`;

const OpenLinkButtonText = styled.Text`
    margin: 10px;
    font-size: 18px;
    color: #FFF;
`;

const OpenURLButton = ({ url, children, isDisable }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      if(!isDisable){
        Alert.alert("Aviso!", "Viagem não possuí dados suficiente para visualização no mapa");
      }else{
        await Linking.openURL(url);
      }
    } else {
      Alert.alert(`Não foi possivel abrir: ${url}`);
    }
  }, [url]);

  return <OpenLinkButton onPress={handlePress}><OpenLinkButtonText>{children}</OpenLinkButtonText></OpenLinkButton>;
};

export default ({placeholder, url, isDisable}) => {
    return (
        <View style={styles.container}>
        <OpenURLButton url={url} isDisable={isDisable}>
            {placeholder}
        </OpenURLButton>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {justifyContent: "center", alignItems: "center", flexDirection: "row"},
});

