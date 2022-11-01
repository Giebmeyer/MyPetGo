import { tableSchema } from '@nozbe/watermelondb';

export const allSchema = tableSchema({
    name: 'All',
    columns: [
        {
            name: 'IdOnline',
            type: 'string',
        },

        
        {
            name: 'Cliente_Nome',
            type: 'string',
        },
        {
            name: 'Telefone',
            type: 'string',
        },
        {
            name: 'CPF',
            type: 'string',
        },
        {
            name: 'Email',
            type: 'string',
        },


        {
            name: 'Pet_Nome',
            type: 'string',
        },
        {
            name: 'Especie',
            type: 'string',
        },
        {
            name: 'Porte',
            type: 'string',
        },


        {
            name: 'Pais',
            type: 'string',
        },
        {
            name: 'Estado',
            type: 'string',
        },
        {
            name: 'Cidade',
            type: 'string',
        },
        {
            name: 'Bairro',
            type: 'string',
        },
        {
            name: 'Rua',
            type: 'string',
        },
        {
            name: 'Numero',
            type: 'string',
        },
        {
            name: 'Complemento',
            type: 'string',
            isOptional: true
        },
        {
            name: 'Latitude',
            type: 'string',
            isOptional: true
        },
        {
            name: 'Longitude',
            type: 'string',
            isOptional: true
        },


        {
            name: 'Observacao',
            type: 'string',
            isOptional: true
        },
        {
            name: 'Tipo',
            type: 'string',
        },
        {
            name: 'Status',
            type: 'string',
        },
        {
            name: 'FotoColeta',
            type: 'string',
        },
        {
            name: 'FotoEntrega',
            type: 'string',
        },



        {
            name: 'created_at',
            type: 'number',
        },
        {
            name: 'updated_at',
            type: 'number',
        },
    ]
})