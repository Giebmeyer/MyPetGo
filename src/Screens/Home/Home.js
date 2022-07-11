import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import { GlobalContainer } from "../GlobalStyles/GlobalStyle";
import { RefreshControl } from "react-native";
import Api from "../../Api";

import {ListArea, TextUser, TextUserQuest, ContainerTexts,
  ContainerMainCard, TextMainCard, ContainerQuests, LoadingIcon, ContainerLoadingIcon} from "./Style";

export default () => {

  let [listTakeOnly, setListTakeOnly] = useState([]);
  let [listSearchOnly, setListSearchOnly] = useState([]);
  let [listSearchTake, setListSearchTake] = useState([]);
  let [listQuest, setListQuest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getQuest = async () => {
    setLoading(true);
    let quests = await Api.getQuest();

      setListQuest(quests);
      setListSearchOnly(quests.filter(SearchOnly => SearchOnly.Tarefa.Tipo == 'Apenas Buscar'));
      setListTakeOnly(quests.filter(TakeOnly => TakeOnly.Tarefa.Tipo == 'Apenas Levar'));
      setListSearchTake(quests.filter(SearchTake => SearchTake.Tarefa.Tipo == 'Levar e Buscar'));
      
    setLoading(false);
  }


  useEffect(() => {
    getQuest();
  }, []);

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
      
          
            {loading &&
                <ContainerLoadingIcon>
                    <LoadingIcon size="large" color="#FFFFFF" />
                    <TextMainCard>Carregando...</TextMainCard>
                </ContainerLoadingIcon>
            }
          

            {!loading &&
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
