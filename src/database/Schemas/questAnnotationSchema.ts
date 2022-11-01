import { tableSchema } from '@nozbe/watermelondb';

export const questAnnotationSchema = tableSchema({
    name: 'QuestAnnotation',
    columns: [
        {
            name: 'IdOnline',
            type: 'string',
        },
        {
            name: 'Anotacao',
            type: 'string',
        },
        {
            name: 'Excluida',
            type: 'string',
        },
        {
            name: 'Sincronizado',
            type: 'string',
        },
        {
            name: 'Quest_id',
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