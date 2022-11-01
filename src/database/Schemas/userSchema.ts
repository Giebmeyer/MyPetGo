import { tableSchema } from '@nozbe/watermelondb';

export const userSchema = tableSchema({
    name: 'Usuarios',
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
            name: 'Usuario',
            type: 'string',
        },
        {
            name: 'Senha',
            type: 'string',
        },
        {
            name: 'Token',
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