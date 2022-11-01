import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';


export default class PetModel extends Model {
    static table = 'Pets'
    static associations = {
        Clientes: { type: 'belongs_to', key: 'Cliente_id' },
        Quests: { type: 'belongs_to', key: 'Pet_id' },
      }

    @field('IdOnline')
    IdOnline;

    @field('Nome')
    Nome;

    @field('Especie')
    Especie;

    @field('Porte')
    Porte;

    @relation('Clientes', 'Cliente_id') 
    ClienteId;

    @field('created_at')
    created_at;

    @field('updated_at')
    updated_at;

}