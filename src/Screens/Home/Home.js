import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import {ListArea, Container, TextUser, TextUserQuest, Scroller} from "./Style";
import Card from "../../Components/Card";

import Api from "../../Api";

export default () => {

  const [list, setList] = useState([]);

  const getQuest = async () => {
    let quests = await Api.getQuest();
    setList(quests);
  }

  useEffect(() => {
    getQuest();
  }, []);

  return(
    <Container>
      <TextUser>
        Olá, Thiago!
      </TextUser>
      <TextUserQuest>
        Essas são as tarefas no momento:
      </TextUserQuest>
      <ListArea>
        {list.map((item, k)=>(
                          <Card key={k} data={item} />
                      ))}
      </ListArea>
    </Container>
  )
}
