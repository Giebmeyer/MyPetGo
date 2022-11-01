import { tableSchema } from '@nozbe/watermelondb';

export const petSchema = tableSchema({
    name: 'Pets',
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
            name: 'Especie',
            type: 'string',
        },
        {
            name: 'Porte',
            type: 'string',
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