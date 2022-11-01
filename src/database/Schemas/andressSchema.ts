import { tableSchema } from '@nozbe/watermelondb';

export const andressSchema = tableSchema({
    name: 'Enderecos',
    columns: [
        {
            name: 'IdOnline',
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
            name: 'Cliente_id',
            type: 'string',
            isIndexed: true 
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