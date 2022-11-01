import { Model, associations } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default  class ClientModel extends Model {
    static table = 'Clientes';
    static associations = {
        Pets: { type: 'belongs_to', foreignKey: 'Cliente_id' },
        Quests: { type: 'belongs_to', key: 'Cliente_id' },
      }

    @field('IdOnline')
    IdOnline!: string;

    @field('Nome')
    Nome!: string;

    @field('Telefone')
    Usuario!: string;

    @field('CPF')
    Senha!: string;

    @field('Email')
    Token!: string;

    @field('created_at')
    created_at!: number;

    @field('updated_at')
    updated_at!: number;

}