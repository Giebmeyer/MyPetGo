import React, { useEffect, useState } from "react";
import {ListArea, TextUser, TextUserQuest, ContainerTexts,
  ContainerMainCard, TextMainCard, ContainerQuests} from "./Style";
import Card from "../../Components/Card";
import { GlobalContainer } from "../GlobalStyles/GlobalStyle";
import DropDownPicker from 'react-native-dropdown-picker';

import Api from "../../Api";

export default () => {

  let [listTakeOnly, setListTakeOnly] = useState([]);
  let [listSearchOnly, setListSearchOnly] = useState([]);
  let [listSearchTake, setListSearchTake] = useState([]);
  let [listQuest, setListQuest] = useState([]);

  const getQuest = async () => {
    let quests = await Api.getQuest();

      setListQuest(quests);
      setListSearchOnly(quests.filter(SearchOnly => SearchOnly.Tarefa.Tipo == 'Apenas Buscar'));
      setListTakeOnly(quests.filter(TakeOnly => TakeOnly.Tarefa.Tipo == 'Apenas Levar'));
      setListSearchTake(quests.filter(SearchTake => SearchTake.Tarefa.Tipo == 'Levar e Buscar'));

  }

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}]);

  useEffect(() => {
    getQuest();
  }, []);

  return(
    <GlobalContainer>
  
      <ContainerTexts>
          <TextUserQuest>
            Relação de Entregas
          </TextUserQuest>
        </ContainerTexts>
      
      <ListArea>
     
        <ContainerMainCard>
          <ContainerQuests>
            <TextMainCard>
              Somente Buscar
            </TextMainCard>
          </ContainerQuests>
          {listSearchTake.map((item, k)=>(
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
         {listSearchOnly.map((item, k)=>(
        <Card key={k} data={item} />
        ))}  
        </ContainerMainCard>   
      </ListArea>

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
