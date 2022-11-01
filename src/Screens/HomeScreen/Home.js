import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import { GlobalContainer } from "../GlobalStyles/GlobalStyle";
import { RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Api from "../../Api/Api";
import sinc from "../../Api/Sincronizador";
import {
  ListArea, TextUser, TextUserQuest, ContainerTexts,
  ContainerMainCard, TextMainCard, ContainerQuests, LoadingIcon, ContainerLoadingIcon
} from "./HomeStyle";

import TabBarNavigation from "../../Components/CustomTabBar";

import { database } from '../../database';
import { UserModel } from '../../database/Models/userModel'

import { Q } from '@nozbe/watermelondb';
import { writer } from '@nozbe/watermelondb/decorators'

export var quests = [];
export var questss = [];

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

    const allQuests = await database.get('Quests').query(
      Q.unsafeSqlQuery(
        'select distinct c.Nome as `Nome_Cliente`,' +
        ' c.CPF as `CPF_Cliente`,' +
        ' c.Telefone as `Telefone_Cliente`,' +
        ' q.id as `ID_Quests`, q.IdOnline as `IDOnline_Quest`, ' +
        ' q.*, p.*, e.* from Quests q ' +
        ' join clientes c on c.id = q.Cliente_id ' +
        ' join Enderecos e on e.Cliente_id = c.id ' +
        ' join Pets p on p.id = q.Pet_id' +
        ' where q.Cliente_id is not null and q.Pet_id is not null and q.updated_at != 0',
      )
    ).unsafeFetchRaw()

    setListQuest(allQuests);

    setListSearchOnly(allQuests.filter(SearchOnly => SearchOnly.Tipo == 'Apenas Buscar' && SearchOnly.Status != 'Entregue'));
    setListTakeOnly(allQuests.filter(TakeOnly => TakeOnly.Tipo == 'Apenas Levar' && TakeOnly.Status != 'Entregue'));
    setListSearchTake(allQuests.filter(SearchTake => SearchTake.Tipo == 'Levar e Buscar' && SearchTake.Status != 'Entregue'));

    if (allQuests.filter(SearchCompleted => SearchCompleted.Status == 'Entregue') != "") {
      setCompleted(true)
      setListQuestCompleted(allQuests.filter(SearchCompleted => SearchCompleted.Status == 'Entregue'));
    } else {
      setCompleted(false);
    }

    setRefreshing(false);
    setLoading(false);
  }

  const putQuest = async () => {
    const response = await database.get('Quests').query(
      Q.where('Sincronizado', "0")
    ).fetch()


    response.forEach(async element => {
      await database.write(async () => {
        await element.update(data => {
          data.Sincronizado = "1"
        })
      })
      await Api.postQuest(element.IdOnline, element.Status);
    });
  }

  const postAnnotations = async () => {


    console.log("CAIU AQUI")
    const response = await database.get('QuestAnnotation').query(
      Q.on('Quests', 'id', Q.notEq(null)),
      Q.where('Sincronizado', "0"),
      Q.where('Quest_Id', Q.notEq(null))
    ).fetch()

    response.forEach(async (element, index) => {
      console.log("Response => ", element, " Posicao : ", index)

      const quests = await database.get('Quests').query(
        Q.on('QuestAnnotation', 'id', element.id)
      ).fetch()

      console.log("Quests => ", quests)
      if (quests.length != 0) {
        console.log("Quest encontrada: ", quests[0].IdOnline)
        await database.write(async () => {
          await element.update(data => {
            data.Sincronizado = "1"
          })
        })


        await Api.postAnnotation(quests[0].IdOnline, element.Anotacao)
      } else {
        console.log("Quest indefinda")
      }



    });




  }

  useEffect(() => {
    getQuest();
    putQuest();
    postAnnotations();
    navigatior.addListener('focus', () => setLoad(!load));
  }, [load, navigatior])

  const onRefresh = () => {
    setRefreshing(true);
    putQuest();
    getQuest();
    postAnnotations();
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
