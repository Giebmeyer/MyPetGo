import React, { useEffect, useState } from "react";
import { Container, LoadingIcon, Texto } from "./PreloadStyle";
import { useNavigation } from '@react-navigation/native';

import api from '../../Api/Api'
import sinc from '../../Api/Sincronizador'

import { database } from '../../database';
import { UserModel } from '../../database/Models/userModel'

import { Q } from '@nozbe/watermelondb';
import { writer } from '@nozbe/watermelondb/decorators'
import Api from "../../Api/Api";

export default () => {
  const navigator = useNavigation();

  const [textProgress, setTextProgress] = useState("Carregando...");
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const checkToken = async () => {
    const userToken = await database.localStorage.get("userToken")

    
    if (userToken) {
      navigator.reset({
        routes: [{ name: 'Home' }]
      });
    } else {
      navigator.reset({
        routes: [{ name: 'Login' }]
      });
    }

  }

  var users = [];
  var pets = [];
  var quests = [];
  var clients = [];

  const getUsuarios = async () => {
    setTextProgress("Colentando Usuários...");
    users = await sinc.getUsers();

    users.forEach(async element => {
      const busca = await validaDuplicidade(element, "Usuarios");

      if (busca == "NAN") {
        database.write(async () => {
          await database
            .get('Usuarios')
            .create(data => {
              data.IdOnline = String(element.Id),
                data.Nome = element.Nome,
                data.Usuario = element.Usuario,
                data.Senha = element.Senha,
                data.Token = element.Token
              data.created_at = Date.parse(element.createdAt)
              data.updated_at = Date.parse(element.updatedAt)
            }
            )
        }
        )
        console.log("Registro Criado");
      } else if (element.Id == busca.IdOnline && Date.parse(element.updatedAt) != busca.updated_at) {

        await database.write(async () => {
          await busca.update(data => {
            data.Nome = element.Nome,
              data.Usuario = element.Usuario,
              data.Senha = element.Senha,
              data.Token = element.Token
            data.updated_at = Date.parse(element.updatedAt)
          })
        })

        console.log("Registro Atualizado - Users");
      } else {
        console.log("Nada ocorreu");
      }
    }
    );
  }

  const getClients = async () => {
    setTextProgress("Colentando Clientes...");
    clients = await sinc.getClients();

    clients.forEach(async element => {
      const busca = await validaDuplicidade(element, "Clientes");

      if (busca == "NAN") {
        database.write(async () => {
          await database
            .get('Clientes')
            .create(data => {
              data.IdOnline = String(element.Id),
                data.Nome = String(element.Nome),
                data.Telefone = String(element.Telefone),
                data.CPF = String(element.CPF),
                data.Email = String(element.Email),
                data.created_at = Date.parse(element.createdAt)
              data.updated_at = Date.parse(element.updatedAt)
            }
            )
        }
        )
        console.log("Registro Criado");
      } else if (element.Id == busca.IdOnline && Date.parse(element.updatedAt) != busca.updated_at) {

        await database.write(async () => {
          await busca.update(data => {
            data.Nome = String(element.Nome),
              data.Telefone = String(element.Telefone),
              data.CPF = String(element.CPF),
              data.Email = String(element.Email),
              data.updated_at = Date.parse(element.updatedAt)
          })
        })

        console.log("Registro Atualizado - Clientes");
      } else {
        console.log("Nada ocorreu");
      }
    }
    );

  }

  const getPets = async () => {
    setTextProgress("Colentando Pets...");
    pets = await sinc.getPets();

    pets.forEach(async element => {
      const busca = await validaDuplicidade(element, "Pets");
      const clienteRelacionado = await procuraRelacionado(element.ClienteId, "Clientes");

      if (busca == "NAN") {
        database.write(async () => {
          await database
            .get('Pets')
            .create(data => {
              data.IdOnline = String(element.Id),
                data.Nome = element.Nome,
                data.Especie = element.Especie,
                data.Porte = element.Porte,
                data.ClienteId.id = String(clienteRelacionado.id),
                data.created_at = Date.parse(element.createdAt)
            }

            )
        }
        )
        console.log("Registro Criado");
      } else if (element.Id == busca.IdOnline && Date.parse(element.updatedAt) != busca.updated_at) {

        await database.write(async () => {
          await busca.update(data => {
            data.Nome = element.Nome,
              data.Especie = element.Especie,
              data.Porte = element.Porte,
              data.ClienteId.id = String(clienteRelacionado.id),
              data.updated_at = Date.parse(element.updatedAt)
          })
        })

        console.log("Registro Atualizado - Pets");
      } else {
        console.log("Nada ocorreu");
      }
    }
    );
  }

  const getQuests = async () => {
    setTextProgress("Colentando Tarefas...");
    quests = await sinc.getQuest();

    quests.forEach(async element => {
      const busca = await validaDuplicidade(element, "Quests");
      const clienteRelacionado = await procuraRelacionado(element.ClienteId, "Clientes");
      const PetRelacionado = await procuraRelacionado(element.PetId, "Pets");

      if (busca == "NAN") {
        database.write(async () => {
          await database
            .get('Quests')
            .create(data => {
              data.IdOnline = String(element.Id),
                data.Observacao = element.Observacao,
                data.Tipo = element.Tipo,
                data.Status = element.Status,
                data.Sincronizado = "1",
                data.FotoColeta = element.FotoColeta,
                data.FotoEntrega = element.FotoEntrega,
                data.ClienteId.id = String(clienteRelacionado.id),
                data.PetId.id = String(PetRelacionado.id),
                data.created_at = Date.parse(element.createdAt)
            }
            )
        }
        )
        console.log("Registro Criado");
      } else if (element.Id == busca.IdOnline && Date.parse(element.updatedAt) != busca.updated_at) {

        await database.write(async () => {
          await busca.update(data => {
            data.Observacao = element.Observacao,
              data.Tipo = element.Tipo,
              data.Status = element.Status,
              data.FotoColeta = element.FotoColeta,
              data.FotoEntrega = element.FotoEntrega,
              data.ClienteId.id = String(clienteRelacionado.id),
              data.PetId.id = String(PetRelacionado.id),
              data.updated_at = Date.parse(element.updatedAt)
          })
        })

        console.log("Registro Atualizado - Quests");
      } else {
        console.log("Nada ocorreu");
      }
    }
    );
  }

  const getAndress = async () => {
    setTextProgress("Colentando Endereços...");
    andress = await sinc.getAndress();

    andress.forEach(async element => {
      const busca = await validaDuplicidade(element, "Enderecos");
      const clienteRelacionado = await procuraRelacionado(element.ClienteId, "Clientes");
      if (busca == "NAN") {
        database.write(async () => {
          await database
            .get('Enderecos')
            .create(data => {
              data.IdOnline = String(element.Id),
                data.Pais = element.Pais,
                data.Estado = element.Estado,
                data.Cidade = element.Cidade,
                data.Bairro = element.Bairro,
                data.Rua = element.Rua,
                data.Numero = element.Numero,
                data.Latitude = element.Latitude,
                data.Longitude = element.Longitude,
                data.Complemento = element.Complemento,
                data.ClienteId.id = String(clienteRelacionado.id),
                data.created_at = Date.parse(element.createdAt)
            }
            )
        }
        )
        console.log("Registro Criado");
      } else if (element.Id == busca.IdOnline && Date.parse(element.updatedAt) != busca.updated_at) {

        await database.write(async () => {
          await busca.update(data => {
            data.Pais = element.Pais,
              data.Estado = element.Estado,
              data.Cidade = element.Cidade,
              data.Bairro = element.Bairro,
              data.Rua = element.Rua,
              data.Numero = element.Numero,
              data.Latitude = element.Latitude,
              data.Longitude = element.Longitude,
              data.Complemento = element.Complemento,
              data.ClienteId.id = String(clienteRelacionado.id)
              data.updated_at = Date.parse(element.updatedAt)
          })
        })

        console.log("Registro Atualizado - Enderecos");
      } else {
        console.log("Nada ocorreu");
      }
    }
    );
  }

  const getQuestAnnotation = async () => {
    setTextProgress("Colentando Anotações...");
    questAnnotations = await sinc.getAnnotations();

    questAnnotations.forEach(async element => {
      const busca = await validaDuplicidade(element, "QuestAnnotation");
      const QuestRelacionado = await procuraRelacionado(element.QuestId, "Quests");
      if (busca == "NAN") {
        database.write(async () => {
          await database
            .get('QuestAnnotation')
            .create(data => {
              data.IdOnline = String(element.Id),
                data.Anotacao = element.Anotacao,
                data.Excluida = element.Excluida,
                data.Sincronizado = "1",
                data.QuestId.id = String(QuestRelacionado.id),
                data.created_at = Date.parse(element.createdAt)
            }
            )
        }
        )
        console.log("Registro Criado");
      } else if (element.Id == busca.IdOnline && Date.parse(element.updatedAt) != busca.updated_at) {

        await database.write(async () => {
          await busca.update(data => {
            data.Anotacao = element.Anotacao,
              data.Excluida = element.Excluida,
              data.QuestId.id = String(QuestRelacionado.id),
              data.updated_at = Date.parse(element.updatedAt)
          })
        })

        console.log("Registro Atualizado - Anotações");
      } else {
        console.log("Nada ocorreu");
      }
    }
    );
  }

  const getAll = async () => {
    setTextProgress("Ajustando...");
    const all = await Api.getQuest();
    let index = 0;

    all.forEach(async (element, index) => {
      const busca = await validaDuplicidade(element, "All");

      if (busca == "NAN") {
        database.write(async () => {
          await database
            .get('All')
            .create(data => {
              data.IdOnline = String(element.Id),

                data.Cliente_Nome = element.Quest.Nome,
                data.Telefone = element.Quest.Telefone,
                data.CPF = element.Quest.CPF,
                data.Email = element.Quest.Email,

                data.Pet_Nome = element.Quest.Pet.Nome,
                data.Especie = element.Quest.Pet.Especie,
                data.Porte = element.Quest.Pet.Porte,

                data.Observacao = element.Quest.Observacao,
                data.Tipo = element.Quest.Tipo,
                data.Status = element.Quest.Status,
                data.FotoColeta = element.Quest.FotoColeta,
                data.FotoEntrega = element.Quest.FotoEntrega,

                data.Pais = element.Endereco.Pais,
                data.Estado = element.Endereco.Estado,
                data.Cidade = element.Endereco.Cidade,
                data.Bairro = element.Endereco.Bairro,
                data.Rua = element.Endereco.Rua,
                data.Numero = element.Endereco.Numero,
                data.Latitude = element.Endereco.Latitude,
                data.Longitude = element.Endereco.Longitude,
                data.Complemento = element.Endereco.Complemento,

                data.created_at = Date.parse(element.Quest.createdAt)
              data.updated_at = Date.parse(element.Quest.updatedAt)

            }
            )
        }
        )
        console.log("Registro Criado");
        index++;
      } else if (element.Id == busca.IdOnline && Date.parse(element.updatedAt) != busca.updated_at) {

        await database.write(async () => {
          await busca.update(data => {
            data.Pais = element.Pais,
              data.Estado = element.Estado,
              data.Cidade = element.Cidade,
              data.Bairro = element.Bairro,
              data.Rua = element.Rua,
              data.Numero = element.Numero,
              data.Latitude = element.Latitude,
              data.Longitude = element.Longitude,
              data.Complemento = element.Complemento,
              data.idCliente = String(element.ClienteId),
              data.updated_at = Date.parse(element.updatedAt)
          })
        })

        console.log("Registro Atualizado");
      } else {
        console.log("Nada ocorreu");
      }
    }
    );
  }

  const validaDuplicidade = async (elemento, tabela) => {
    console.log("Registro Valida Duplicidade => ", elemento)
    try {
      const registro = await database.get(`${tabela}`).query(
        Q.where('IdOnline', String(elemento.Id))
      )

      if (!registro[0]) {
        return "NAN"
      } else {
        return registro[0]
      }

    } catch (e) {

    }


  }



  const procuraRelacionado = async (id, tabela) => {
    try {
      const registro = await database.get(`${tabela}`).query(
        Q.where('IdOnline', String(id))
      )
      //console.log("REGISTRO RELACIONADO (", tabela, ")=> ", registro[0])
      if (!registro[0]) {
        return "NAN"
      } else {
        return registro[0]
      }

    } catch (e) {

    }
  }


  async function feathData() {
    const userCollection = database.get('QuestAnnotation');
    const response = await userCollection.query(
      Q.where('Sincronizado', "0")
    ).fetch();

    console.log("DADOS DO BANCO", response);
  }


  useEffect(() => {
    getUsuarios()

    getQuests();

    getClients();

    getAndress();

    getPets();

    getQuestAnnotation();

    //getAll();
    setTextProgress("Finalizando...");

    feathData();
    checkToken();
  })

  return (
    <Container>
      <LoadingIcon size="large" color="#FFFFFF" />
      <Texto>{textProgress}</Texto>
    </Container>
  )
}

