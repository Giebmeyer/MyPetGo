import { tableSchema } from '@nozbe/watermelondb';

export const clientSchema = tableSchema({
    name: 'Clientes',
    columns: [
        {
            name: 'IdOnline',
            type: 'string',
        },
        {
            name: 'Nome',
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
            name: 'created_at',
            type: 'number',
        },
        {
            name: 'updated_at',
            type: 'number',
        },
    ]
})