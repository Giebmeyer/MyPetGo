import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import { GlobalContainer } from "../GlobalStyles/GlobalStyle";
import { RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Api from "../../Api/Api";

import {
  ListArea, TextUser, TextUserQuest, ContainerTexts,
  ContainerMainCard, TextMainCard, ContainerQuests, LoadingIcon, ContainerLoadingIcon
} from "./HomeStyle";

import TabBarNavigation from "../../Components/CustomTabBar";

export var quests = [];

export default () => {

  const navigatior = useNavigation();

  let [listTakeOnly, setListTakeOnly] = useState([]);
  let [listSearchOnly, setListSearchOnly] = useState([]);
  let [listSearchTake, setListSearchTake] = useState([]);
  let [ListQuestCompleted, setListQuestCompleted] = useState([]);
  let [listQuest, setListQuest] = useState([]);

  const [completed, setCompleted] = useState(true)
  const [load, setLoad] = useState(true)
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  let retorno = false;

  const getQuest = async () => {
    setLoading(true);
    setRefreshing(true);
    quests = await Api.getQuest();

    setListQuest(quests);
    setListSearchOnly(quests.filter(SearchOnly => SearchOnly.Quest.Tipo == 'Apenas Buscar' && SearchOnly.Quest.Status != 'Entregue'));
    setListTakeOnly(quests.filter(TakeOnly => TakeOnly.Quest.Tipo == 'Apenas Levar' && TakeOnly.Quest.Status != 'Entregue'));
    setListSearchTake(quests.filter(SearchTake => SearchTake.Quest.Tipo == 'Levar e Buscar' && SearchTake.Quest.Status != 'Entregue'));

    if (quests.filter(SearchCompleted => SearchCompleted.Quest.Status == 'Entregue') != "") {
      setCompleted(true)
      setListQuestCompleted(quests.filter(SearchCompleted => SearchCompleted.Quest.Status == 'Entregue'));
    } else {
      setCompleted(false);
    }

    setRefreshing(false);
    setLoading(false);
  }


  useEffect(() => {
    getQuest();
    navigatior.addListener('focus', () => setLoad(!load));
    console.log("Retorno ",retorno);
  }, [load, navigatior])

  const onRefresh = () => {
    setRefreshing(true);
    getQuest();
  }

  return (
    <GlobalContainer style={{ flex: 1 }}>

      <ContainerTexts>
        <TextUserQuest>
          Relação de Entregas
        </TextUserQuest>
      </ContainerTexts>


      {loading ?
        <ContainerLoadingIcon>
          <LoadingIcon size="large" color="#FFFFFF" />
          <TextMainCard>Carregando...</TextMainCard>
        </ContainerLoadingIcon>
        :
        <ListArea refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

          <ContainerMainCard>
            <ContainerQuests>
              <TextMainCard>
                Somente Buscar
              </TextMainCard>
            </ContainerQuests>


            {listSearchOnly.map((item, k) => (
              <Card key={k} data={item} />
            ))}
          </ContainerMainCard>

          <ContainerMainCard>
            <ContainerQuests>
              <TextMainCard>
                Somente Levar
              </TextMainCard>
            </ContainerQuests>
            {listTakeOnly.map((item, k) => (
              <Card key={k} data={item} />
            ))}
          </ContainerMainCard>



          <ContainerMainCard>
            <ContainerQuests>
              <TextMainCard>
              Levar e Buscar
              </TextMainCard>
            </ContainerQuests>
            {listSearchTake.map((item, k) => (
              <Card key={k} data={item} />
            ))}
          </ContainerMainCard>


          {completed &&
            <ContainerMainCard>
              <ContainerQuests>
                <TextMainCard>
                  Concluídas
                </TextMainCard>
              </ContainerQuests>
              {ListQuestCompleted.map((item, k) => (
                <Card key={k} data={item} />
              ))}
            </ContainerMainCard>
          }

        </ListArea>
      }
      {<TabBarNavigation currentSreen={'Home'}>
      </TabBarNavigation>}

    </GlobalContainer>
  )
}

/*

    <ListArea>
            {listSearchTake.map((item, k)=>(
        <Card key={k} data={item} />
        ))}  
      </ListArea>


           <DropDownPicker
            open={open}
            value={value}
            items={listSearchTake}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setListSearchOnly}>
            </DropDownPicker>

      {listSearchTake.map((item, k)=>(
              <DropDownPicker
              open={open}
              value={value}
              items={listSearchTake}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setListSearchOnly}>
        </DropDownPicker>
        ))} 
*/
