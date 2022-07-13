import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import { GlobalContainer } from "../GlobalStyles/GlobalStyle";
import { RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Api from "../../Api";

import {ListArea, TextUser, TextUserQuest, ContainerTexts,
  ContainerMainCard, TextMainCard, ContainerQuests, LoadingIcon, ContainerLoadingIcon} from "./Style";

export var quests = [];
  
export default () => {

  const navigatior = useNavigation()



  let [listTakeOnly, setListTakeOnly] = useState([]);
  let [listSearchOnly, setListSearchOnly] = useState([]);
  let [listSearchTake, setListSearchTake] = useState([]);
  let [ListQuestCompleted, setListQuestCompleted] = useState([]);
  let [listQuest, setListQuest] = useState([]);
  
  const [completed, setCompleted] = useState(true)
  const [load, setLoad] = useState(true)
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getQuest = async () => {
    setLoading(true);
    quests = await Api.getQuest();

      setListQuest(quests);
      setListSearchOnly(quests.filter(SearchOnly => SearchOnly.Tarefa.Tipo == 'Apenas Buscar' && SearchOnly.Tarefa.Status != 'Entregue'));
      setListTakeOnly(quests.filter(TakeOnly => TakeOnly.Tarefa.Tipo == 'Apenas Levar' && TakeOnly.Tarefa.Status != 'Entregue'));
      setListSearchTake(quests.filter(SearchTake => SearchTake.Tarefa.Tipo == 'Levar e Buscar' && SearchTake.Tarefa.Status != 'Entregue'));

      if(quests.filter(SearchCompleted => SearchCompleted.Tarefa.Status == 'Entregue') != ""){
        setCompleted(true)
        setListQuestCompleted(quests.filter(SearchCompleted => SearchCompleted.Tarefa.Status == 'Entregue'));
      }else{
        setCompleted(false);
      } 
      
    setLoading(false);
  }


  useEffect(()=>{
    getQuest();
    navigatior.addListener('focus', ()=>setLoad(!load));

 },[load, navigatior])

  const onRefresh = () => {
    setRefreshing(false);
    getQuest();
  }

  return(
    <GlobalContainer>

      <ContainerTexts>
          <TextUserQuest>
            Relação de Entregas
          </TextUserQuest>
        </ContainerTexts>
      
          
            {loading?
                <ContainerLoadingIcon>
                    <LoadingIcon size="large" color="#FFFFFF" />
                    <TextMainCard>Carregando...</TextMainCard>
                </ContainerLoadingIcon>
                :
                 <ListArea refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }>
      
              <ContainerMainCard>
                <ContainerQuests>
                  <TextMainCard>
                    Somente Buscar
                  </TextMainCard>
                </ContainerQuests>
  
      
                {listSearchOnly.map((item, k)=>(
              <Card key={k} data={item} />
              ))}  
              </ContainerMainCard>
              
              <ContainerMainCard>
                <ContainerQuests>
                  <TextMainCard>
                    Somente Levar
                  </TextMainCard>
                </ContainerQuests>
                {listTakeOnly.map((item, k)=>(
              <Card key={k} data={item} />
              ))}  
              </ContainerMainCard>
      
      
      
              <ContainerMainCard>
               <ContainerQuests>
                <TextMainCard>
                    Buscar e Levar
                  </TextMainCard>
               </ContainerQuests>
               {listSearchTake.map((item, k)=>(
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
               {ListQuestCompleted.map((item, k)=>(
              <Card key={k} data={item} />
              ))}  
              </ContainerMainCard> 
            }

              
            </ListArea>
            }
            
          

           
          

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
