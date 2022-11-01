import { tableSchema } from '@nozbe/watermelondb';

export const questSchema = tableSchema({
    name: 'Quests',
    columns: [
        {
            name: 'IdOnline',
            type: 'string',
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
            name: 'Sincronizado',
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
            name: 'Pet_id',
            type: 'string',
        },
        {
            name: 'Cliente_id',
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