import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';
import { immutableRelation, relation } from '@nozbe/watermelondb/decorators'

export default class QuestModel extends Model {
    static table = 'Quests'
    static associations = {
        Clientes: { type: 'belongs_to', key: 'Cliente_id' },
        Pets: { type: 'belongs_to', key: 'Pet_id' },
        QuestAnnotation: { type: 'has_many', foreignKey: 'Quest_id' },
      }

    @field('IdOnline')
    IdOnline!: string;

    @field('Observacao')
    Observacao: string;

    @field('Tipo')
    Tipo!: string;

    @field('Status')
    Status!: string;

    @field('Sincronizado')
    Sincronizado!: string;

    @field('FotoEntrega')
    FotoEntrega: string;

    @field('FotoColeta')
    FotoColeta: string;

    @relation('Pets', 'Pet_id') 
    PetId;

    @relation('Clientes', 'Cliente_id') 
    ClienteId;

    @field('created_at')
    created_at!: number;

    @field('updated_at')
    updated_at!: number;

}