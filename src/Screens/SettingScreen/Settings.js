import React, { useState } from "react";
import { Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { GlobalContainer } from "../GlobalStyles/GlobalStyle";
import TabBarNavigation from "../../Components/CustomTabBar";
import EntryInput from "../../Components/EntryInput";
import { InputArea } from "./SettingsStyle"

export default () => {

    const [serverField, setServerField] = useState("");
    const [portField, setPortField] = useState("");
    const [userField, setUserField] = useState("");
    const [passwordField, setpasswordField] = useState("");
    const [dataBaseField, setDataBaseField] = useState("");

    return (
        <GlobalContainer>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" >
                    <InputArea>
                        <EntryInput
                            placeholder={"Servidor"}
                            value={serverField}
                            onChangeText={t => setServerField(t)}
                            isPassword={false}
                        />

                        <EntryInput
                            placeholder={"Porta"}
                            value={portField}
                            onChangeText={t => setPortField(t)}
                            isPassword={false}
                        />

                        <EntryInput
                            placeholder={"Usuário"}
                            value={userField}
                            onChangeText={t => setUserField(t)}
                            isPassword={false}
                        />

                        <EntryInput
                            placeholder={"Senha"}
                            value={passwordField}
                            onChangeText={t => setpasswordField(t)}
                            isPassword={true}
                        />

                        <EntryInput
                            placeholder={"Banco de Dados"}
                            value={dataBaseField}
                            onChangeText={t => setDataBaseField(t)}
                            isPassword={false}
                        />
                    </InputArea>



                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            <TabBarNavigation currentSreen={"Settings"}>
            </TabBarNavigation>
        </GlobalContainer>

    )
} 